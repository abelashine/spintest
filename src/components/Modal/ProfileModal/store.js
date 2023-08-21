// import React, {useEffect, useState} from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Formik } from "formik";
// import { authActions } from "../../../actions/auth";
// import styles from "./ProfileModal.module.scss";
// import { initialValues, validate } from "./initForm";
// import { createDataToRequest } from "./helpers";
// import closeButton from "../../../static/icons/cross.svg";
// import backArrow from "../../../static/icons/back-arrowV2.svg";

// import Modal from "../index";
// import TextField from "../../Inputs/TextField";
// import ImageUploader from "../../Inputs/ImageUploader";
// import ButtonsBlock from "./ButtonsBlock";
// import UserProfileFields from "./UserProfileFields";
// import PublicDetails from "./PublicDetails";

// export default ({ onClose, goBack, crossBtn }) => {
//   const userInfo = useSelector((state) => state.authReducer.userInfo);
//   const dispatch = useDispatch();
//   const [cities, setCities] = useState([]);
//   const [isPrivateInfoTab, setIsPrivateInfoTab] = useState(false);

//   const updateProfile = (values) => {
//     const dataToRequestBody = createDataToRequest(values, cities, userInfo);
//     dispatch(authActions.updateProfileInfo(dataToRequestBody, userInfo, onClose));
//   };
//   const initValues = initialValues(userInfo);
//   const emailPlaceholder = userInfo.profile ? "Account email" : "Billing email";
//   const buttonToClose = crossBtn ? closeButton : backArrow;
//   const buttonHandler = crossBtn ? onClose : goBack;
//   return (
//     <Modal isOpen>
//       <img
//         src={buttonToClose}
//         alt="Button"
//         onClick={buttonHandler}
//         className={styles.topBtn}
//         data-cross={crossBtn}
//       />
//       <div className={styles.modalBody}>
//         <div className={styles.modalTitle}>Edit profile</div>
//         <div className={styles.details}>
//           <Formik
//             initialValues={initValues}
//             validate={(values) =>
//               validate(values, cities, initValues.city, userInfo.type)
//             }
//             onSubmit={updateProfile}
//           >
//             {({ handleSubmit }) => (
//               <form onSubmit={handleSubmit}>
//                 <div className={styles.avatar}>
//                   <ImageUploader name="avatar" preview={userInfo.image.url} />
//                 </div>
//                 {userInfo?.business_role === "brand" &&
//                 <div className={styles.tabsContainer} >
//                   <div
//                       className={
//                         !isPrivateInfoTab ?
//                             styles.tabsContainer_active_tab
//                             :
//                             styles.tabsContainer_un_active_tab
//                       }
//                       onClick={() => setIsPrivateInfoTab(false)}
//                   >
//                     PUBLIC DETAILS
//                   </div>
//                   <div
//                       className={
//                         isPrivateInfoTab ?
//                             styles.tabsContainer_active_tab
//                             :
//                             styles.tabsContainer_un_active_tab
//                       }
//                       onClick={() => setIsPrivateInfoTab(true)}
//                   >
//                     PRIVATE DETAILS
//                   </div>
//                 </div>}
//                 { !isPrivateInfoTab &&
//                   <PublicDetails
//                       isBusinessAccount={!userInfo.profile}
//                       cities={cities}
//                       setCities={setCities}
//                   />
//                 }
//                 {userInfo.profile &&
//                   <div className={styles.detailsTitle}>
//                     Personal Details
//                   </div>
//                 }
//                 {userInfo.profile && <UserProfileFields />}
//                 {
//                   isPrivateInfoTab &&
//                     <TextField
//                       name="email"
//                       type="text"
//                       variant="underline"
//                       label={emailPlaceholder}
//                     />
//                 }
//                 <ButtonsBlock onClose={onClose} />
//               </form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </Modal>
//   );
// };
