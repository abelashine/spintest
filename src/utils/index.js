import { chatActions } from "../actions/chat";
import { authActions } from "../actions/auth";
import { IMKitApi } from "imkit-js-api-v3";
import { store } from "../store";

// Network

export const statusHelper = async (res) => {
  const response = await res.json();
  if (!res.ok) {
    if (response.error) {
      throw new Error(response.error);
    } else if (response) {
      if (
        response.detail === "Please subscribe to upload products" ||
        response.detail ===
          "You have reached the limit of items in your subscription plan"
      ) {
        throw new Error(response.detail);
      } else {
        throw new Error("Error");
      }
    }
  }
  return { response };
};

export const createFormDataObj = (payload) => {
  const formData = new FormData();
  for (const key in payload) {
    if (Array.isArray(payload[key])) {
      payload[key].forEach((item) => {
        formData.append(key, item);
      });
    } else {
      formData.append(key, payload[key]);
    }
  }
  return formData;
};

// Local Storage

export const getUserToken = () => localStorage.getItem("access_token");

export const getUserInfo = () => JSON.parse(localStorage.getItem("user_info"));

export const deleteUserInfo = () => localStorage.clear();

export const getClientId = () => localStorage.getItem("client_id");

// Media

/**
 * @param {canvas} canvasWithImage source image
 * @param {object} cropArea x,y - start coords of crop selection, width, height
 * @description https://i.stack.imgur.com/LNgjx.png
 */

export async function getCroppedImg(
  canvasWithImage,
  cropArea,
  width = 310,
  height = 310,
  imagetype
) {
  const scaleX = canvasWithImage.width / width;
  const scaleY = canvasWithImage.height / height;
  const destinationImageWidth = cropArea.width * scaleX;
  const destinationImageHeight = cropArea.height * scaleY;

  const canvas = document.createElement("canvas");
  canvas.width = destinationImageWidth;
  canvas.height = destinationImageHeight;

  const ctx = canvas.getContext("2d");

  const destinationImage = new Image(
    canvasWithImage.width,
    canvasWithImage.height
  );
  destinationImage.src = canvasWithImage.toDataURL();

  return new Promise((resolve, reject) => {
    destinationImage.onload = () => {
      ctx.drawImage(
        destinationImage,
        cropArea.x * scaleX,
        cropArea.y * scaleY,
        destinationImageWidth,
        destinationImageHeight,
        0,
        0,
        destinationImageWidth,
        destinationImageHeight
      );
      canvas.toBlob((blob) => {
        resolve(blob);
      }, imagetype);
    };
  });
}

// other

export const getImageUrl = (image) => {
  if (!image) return null;
  if (typeof image === "string") return image;
  return URL.createObjectURL(image);
};
export const getImgSizes = (width, height, minWidth, minHeight) => {
  let imgWidth = width;
  let imgHeight = height;
  if (imgWidth < minWidth && imgHeight >= minHeight) {
    const coefficient = Number((imgWidth / minWidth).toFixed(2));
    imgWidth *= coefficient;
    imgHeight *= coefficient;
  }
  return { imgWidth, imgHeight };
};

const getChatInterLocutors = async (res, dispatch, history, isStart) => {
  const dataForWork = JSON.parse(JSON.stringify(res));
  const membersIds = [];
  for (let i = 0; i < dataForWork.data.length; i++) {
    for (let j = 0; j < dataForWork.data[i].members.length; j++) {
      membersIds.push(dataForWork.data[i].members[j].id);
    }
  }
  let url = `${process.env.REACT_APP_BASE_URL}/content/foreign_profilebrand_by_ids?`;
  for (let i = 0; i < membersIds.length; i++) {
    url += "id=" + membersIds[i] + "&";
  }
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (isStart) {
        dispatch(chatActions.setStartChatUsers(data));
      } else dispatch(chatActions.updateChatUsers(data));
      dispatch(authActions.finishLoading());
    })
    .catch((e) => history.push("/"));
};

export const getChatRooms = (
  history,
  dispatch,
  userInfo,
  roomsSkipNum = 0,
  isStart = true
) => {
  if (!userInfo) return;
  const apiConfig = {
    domain: process.env.REACT_APP_IMKIT_DEV_CHAT_SERVER_URL,
    clientKey: process.env.REACT_APP_IMKIT_DEV_CLIENT_KEY,
    token: userInfo.chat_token,
  };
  const api = new IMKitApi(apiConfig);
  api.room.getRoomsList(20, roomsSkipNum).then((res) => {
    if (isStart) {
      dispatch(chatActions.setStartAllChatData(res));
    } else dispatch(chatActions.updateAllChatData(res));
    getChatInterLocutors(res, dispatch, history, isStart);
  });
};

// set chat connection
export const setDialogConnectionHandler = (
  history,
  userInfo,
  foreignBrandInfo,
  callback = null
) => {
  store.dispatch(authActions.startLoading());
  // IMKIT info
  const TOKEN = userInfo.chat_token;
  const CHAT_SERVER_URL = process.env.REACT_APP_IMKIT_DEV_CHAT_SERVER_URL;
  const IMKIT_API_CLIENT_KEY = process.env.REACT_APP_IMKIT_DEV_CLIENT_KEY;

  const apiConfig = {
    domain: CHAT_SERVER_URL,
    clientKey: IMKIT_API_CLIENT_KEY,
    token: TOKEN,
  };
  const api = new IMKitApi(apiConfig);
  api.room
    .createAndJoinRoom({
      roomType: "direct",
      invitee: [String(foreignBrandInfo.id)],
    })
    .then((room) => {
      api.room.addMember(room.id, foreignBrandInfo.id).then(() => {
        history.push({
          pathname: `/${foreignBrandInfo.slug}/profile/dialog`,
          state: {
            chatRoomId: room.id,
            interlocutor: foreignBrandInfo,
          },
        });
        if (callback) {
          callback();
        }
      });
    })
    .catch(() => store.dispatch(authActions.finishLoading()));
};
