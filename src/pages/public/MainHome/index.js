import React, { createRef, useEffect, useState } from "react";
import styles from "./MainHome.module.scss";
import HomeScreenItem from "./MainHomeScreenItem";
import ScrollContainer from "react-indiana-drag-scroll";
import GetWorld from "../../../components/Modal/GetWorld";
import ModalBackground from "../../../static/images/my_world.png";
import CustomHeader from "../../../components/CustomHeader";
import { store } from "../../../store";
import { profileActions } from "../../../actions/profile";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { authActions } from "../../../actions/auth";
import ArchitectureImage1 from "../../../static/icons/home_arhitecture_test_ic_1.png";
import ArchitectureImage2 from "../../../static/icons/home_arhitecture_test_ic_2.png";
import ArchitectureImage3 from "../../../static/icons/home_arhitecture_test_ic_3.png";

const architectureData = [
  {
    id: 1,
    title: "Grand Palais",
    image: ArchitectureImage1,
  },
  {
    id: 2,
    title: "Grand Palais É...",
    image: ArchitectureImage2,
  },
  {
    id: 3,
    title: "Bourse de Commerce",
    image: ArchitectureImage3,
  },
];

const Home = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      isLoading: true,
      wearablePaginationCurrentCount: 1,
      wearablePaginationTotalCount: 0,
      wearableData: [],
      artPaginationCurrentCount: 1,
      artPaginationTotalCount: 0,
      artData: [],
    },
  });
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
  const scrollRef = createRef();
  const { homePageWearableContent, homePageArtContent } = useSelector(
    (item) => item?.profileReducer
  );

  const onChangeLoading = (isLoading) => {
    formik.setFieldValue("isLoading", isLoading);
  };

  useEffect(() => {
    store.dispatch(authActions.startLoading());
  }, []);

  useEffect(() => {
    (async () => {
      await store.dispatch(
        profileActions.fetchHomepageWearableItem(
          formik.values.wearablePaginationCurrentCount,
          () => {
            onChangeLoading(false);
            store.dispatch(authActions.finishLoading());
          }
        )
      );
    })();
  }, [formik.values.wearablePaginationCurrentCount]);

  useEffect(() => {
    (async () => {
      await store.dispatch(
        profileActions.fetchHomepageArtItem(
          formik.values.artPaginationCurrentCount,
          () => {
            onChangeLoading(false);
            store.dispatch(authActions.finishLoading());
          }
        )
      );
    })();
  }, [formik.values.artPaginationCurrentCount]);

  useEffect(() => {
    if (homePageWearableContent?.results) {
      formik.setFieldValue(
        "wearablePaginationTotalCount",
        homePageWearableContent?.count
      );
      formik.setFieldValue("wearableData", homePageWearableContent?.results);
    }
  }, [homePageWearableContent]);

  useEffect(() => {
    if (homePageArtContent?.results) {
      formik.setFieldValue(
        "artPaginationTotalCount",
        homePageArtContent?.count
      );
      formik.setFieldValue("artData", homePageArtContent?.results);
    }
  }, [homePageArtContent]);

  const onScrollSection = (
    currentPaginationCount,
    totalPaginationCount,
    fieldName
  ) => {
    if (
      Math.round((totalPaginationCount / 10) * 100) / 100 >=
      currentPaginationCount
    ) {
      formik.setFieldValue(fieldName, formik.values[fieldName] + 1);
    }
  };

  const truncate = (str, n) => {
    return str.length > n ? str.slice(0, n - 1) + "..." : str;
  };

  const enableKeyboardCursorToScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.focus();
    }
  };

  const onToggleModal = () => setIsOpenInfoModal((prev) => !prev);

  const onPressItem = (host, slug) => {
    const path = `/product/${slug}`;
    history.push(path);
  };

  return (
    <div
      className={styles.HomeRedesign}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {isOpenInfoModal ? (
        <GetWorld
          world={{
            image: ModalBackground,
          }}
          onClose={onToggleModal}
        />
      ) : (
        <></>
      )}
      <CustomHeader />
      <div className={styles.main}>
        <div className={styles.title}>TOP CREATORS</div>
        <div className={styles.titleDescribtion}>
          Collect items and join the creators hubs to get access to exclusive
          experiences
        </div>
        <ScrollContainer
          onEndScroll={() =>
            onScrollSection(
              formik.values.artPaginationCurrentCount,
              formik.values.artPaginationTotalCount,
              "artPaginationCurrentCount"
            )
          }
          className={styles.container}
        >
          <section
            className={styles.tiles}
            onFocus={enableKeyboardCursorToScroll}
            ref={scrollRef}
          >
            {formik.values.artData.length ? (
              formik.values.artData.map((el) => (
                <div key={el.name + el.id + Math.random()}>
                  <HomeScreenItem
                    onPressItem={() => onPressItem(el.id, el.slug)}
                    imageUrl={el?.productphoto_set[0]?.photo?.image}
                    title={truncate(el.name, 12)}
                  />
                </div>
              ))
            ) : (
              <div className={styles.title_no_data}>NO Data</div>
            )}
          </section>
        </ScrollContainer>
        <div className={styles.title}>Artefacts</div>
        <div className={styles.titleDescribtion}>
          Experience to own trending phygital art through AR exhibition
        </div>
        <ScrollContainer
          onEndScroll={() =>
            onScrollSection(
              formik.values.artPaginationCurrentCount,
              formik.values.artPaginationTotalCount,
              "artPaginationCurrentCount"
            )
          }
          className={styles.container}
        >
          <section
            className={styles.tiles}
            onFocus={enableKeyboardCursorToScroll}
            ref={scrollRef}
          >
            {formik.values.artData.length ? (
              formik.values.artData.map((el) => (
                <div key={el.name + el.id + Math.random()}>
                  <HomeScreenItem
                    onPressItem={() => onPressItem(el.id, el.slug)}
                    imageUrl={el?.productphoto_set[0]?.photo?.image}
                    title={truncate(el.name, 12)}
                  />
                </div>
              ))
            ) : (
              <div className={styles.title_no_data}>NO Data</div>
            )}
          </section>
        </ScrollContainer>
        <div className={styles.title}>wearables</div>
        <div className={styles.titleDescribtion}>
          Experience to own trending phygital fashion through AR exhibition &
          tryon
        </div>

        <ScrollContainer
          onEndScroll={() =>
            onScrollSection(
              formik.values.wearablePaginationCurrentCount,
              formik.values.wearablePaginationTotalCount,
              "wearablePaginationCurrentCount"
            )
          }
          className={styles.container}
        >
          <section
            className={styles.tiles}
            onFocus={enableKeyboardCursorToScroll}
            ref={scrollRef}
          >
            {formik.values.wearableData.length ? (
              formik.values.wearableData.map((el) => (
                <div key={el.name + el.id + Math.random()}>
                  <HomeScreenItem
                    onPressItem={() => onPressItem(el.id, el.slug)}
                    imageUrl={el?.productphoto_set[0]?.photo?.image}
                    title={truncate(el.name, 12)}
                  />
                </div>
              ))
            ) : (
              <div className={styles.title_no_data}>NO Data</div>
            )}
          </section>
        </ScrollContainer>
        <div className={styles.title}>ARCHITECTURE</div>
        <div className={styles.titleDescribtion}>
          Experience iconic phygital buildings and spaces through immersive VR
        </div>
        <ScrollContainer className={styles.container}>
          <section
            className={styles.tiles}
            onFocus={enableKeyboardCursorToScroll}
            ref={scrollRef}
          >
            {architectureData.map((el) => (
              <div key={el.id}>
                <HomeScreenItem
                  imageUrl={el.image}
                  onPressItem={onToggleModal}
                  title={el.title}
                />
              </div>
            ))}
          </section>
        </ScrollContainer>
      </div>
    </div>
  );
};

export default Home;
