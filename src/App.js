import React, { Suspense, lazy, useState, useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./App.module.scss";
import routes from "./routes";
import { watchNewMessages, isThereUnrMes, catchGoToChatRoute } from "./helpers";
import { getChatRooms } from "./utils";

// Components
import Spinner from "./components/Spinner";
import UploadSelection from "./components/Modal/UploadSelection";
const NavBar = lazy(() => import("./components/NavBar"));
const ErrorRequestModal = lazy(() =>
  import("./components/Modal/ErrorRequestModal")
);
const ReachedLimitModal = lazy(() => import("./components/Modal/SubscriptionModals/ReachedLimitModal"))

// Public routes
const MainHome = lazy(() => import("./pages/public/MainHome"));
const Login = lazy(() => import("./pages/public/Login"));
const Signup = lazy(() => import("./pages/public/Signup"));
const Footer = lazy(() => import("./components/Footer"));
const HeaderPreAuth = lazy(() => import("./components/Header/HeaderPreAuth"));
const ResetPassword = lazy(() => import("./pages/public/ResetPassword"));
const Error = lazy(() => import("./pages/public/Error"));

// Private routes
const Profile = lazy(() => import("./pages/private/Profile"));
const Following = lazy(() => import("./pages/private/Following"));
const Spins = lazy(() => import("./pages/private/Spins"));
const ProductInfo = lazy(() => import("./pages/private/ProductInfo"));
const ConfirmPasson = lazy(() => import("./pages/private/ConfirmPasson"));
const Chat = lazy(() => import("./pages/private/Chat"));
const Dialog = lazy(() => import("./pages/private/Chat/Dialog"));
const BrandVault = lazy(() => import("./pages/private/BrandVault"));
const Vouchers = lazy(() => import("./pages/private/Vouchers"));
const Gallery = lazy(() => import("./pages/private/Gallery"));
const GalleryListView = lazy(() => import("./pages/private/GalleryListView"));
const Subscription = lazy(()=>import("./pages/private/Subscription"));





const App = () => {
  const store = useSelector((state) => state.authReducer);
  const { all, requests } = useSelector((state) => state.chatReducer);
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.authReducer);
  const { scrollTop } = useSelector((state) => state.profileReducer);
  const [isUploadSelectionOpened, setIsUploadSelectionOpened] = useState(false);
  const [isUnreadMessage, setIsUnreadMessage] = useState(false);

  useEffect(() => {
    catchGoToChatRoute(location, history);
    watchNewMessages(dispatch, userInfo, history);
  }, []);
  useEffect(() => {
    if (store.isAuthenticated && userInfo?.slug) {
      getChatRooms(history, dispatch, userInfo);
    }
  }, [userInfo, store.isAuthenticated]);
  useEffect(() => {
    isThereUnrMes(all, requests, setIsUnreadMessage);
  }, [all, requests]);

  const closeUploadSelection = () => {
    window.scrollTo({ top: scrollTop });
    setIsUploadSelectionOpened(false);
    document.body.style.overflow = "initial";
  };

  if (
    !store.isAuthenticated &&
    (location.pathname === routes.prelogin ||
      location.pathname === routes.register ||
      location.pathname === "/reset_password" ||
      location.pathname === routes.main
    )
  ) {
    return (
      <Suspense fallback={null}>
        <ErrorRequestModal />
        <ReachedLimitModal />
        <div className={styles.App}>
          <main className={styles.mainLogin}>
            <Switch>
              {/*<Route exact path={routes.main} component={MainHome} />*/}
              <Route exact path={routes.prelogin} component={Login} />
              <Route exact path={routes.register} component={Signup} />
              <Route path={"/reset_password"} component={ResetPassword} />
              <Redirect to={routes.prelogin} />
            </Switch>
          </main>
        </div>
        <Spinner />
      </Suspense>
    );
  }

  if (!store.isAuthenticated) {
    return (
      <Suspense fallback={null}>
        <ErrorRequestModal />
        <ReachedLimitModal />
        <div className={styles.App}>
          <main>
            <Switch>
              <Route
                exact
                path={[
                  routes.viewAsProfile,
                  `${routes.viewAsProfile}/:activeTab`,
                ]}
                render={(props) => {
                  return (
                    <Profile
                      isPublic
                      {...props}
                      setIsUploadSelectionOpened={setIsUploadSelectionOpened}
                      isUnreadMessage={isUnreadMessage}
                    />
                  );
                }}
              />
              <Route
                exact
                path={[routes.spins, routes.viewAsSpins]}
                render={(props) => (
                  <Spins
                    isPublic
                    {...props}
                    isUnreadMessage={isUnreadMessage}
                  />
                )}
              />
              <Route
                exact
                path={[
                  routes.tokenizedProduct,
                  routes.product,
                  routes.checkoutProduct,
                ]}
                render={(props) => <ProductInfo isPublic {...props} />}
              />
              <Route path={routes.subscription} component={Subscription}/>
              <Route path={routes.error} component={Error} />
              <Redirect to={routes.prelogin} />
            </Switch>
          </main>
        </div>
        <Spinner />
      </Suspense>
    );
  }

  // ! Private routes
  return (
    <Suspense fallback={null}>
      <ErrorRequestModal />
      <ReachedLimitModal />
      <div className={`${styles.App} ${styles.isAuthenticated}`}>
        <main>
          <Switch>
            <Route exact path={routes.main} component={MainHome} />
            <Route exact path={routes.dialog} component={Dialog} />
            <Route
              exact
              path={routes.chat}
              render={(props) => (
                <Chat {...props} isUnreadMessage={isUnreadMessage} />
              )}
            />
            <Route
              exact
              path={[routes.brandVault, routes.viewAsBrandVault]}
              component={BrandVault}
            />
            <Route
              exact
              path={[routes.vouchers, routes.viewAsVouchers]}
              component={Vouchers}
            />
            <Route exact path={routes.gallery} component={Gallery} />
            <Route
              exact
              path={routes.galleryListView}
              component={GalleryListView}
            />
            <Route
              exact
              path={[
                routes.profile,
                `${routes.profile}/:activeTab`,
                routes.viewAsProfile,
                `${routes.viewAsProfile}/:activeTab`,
                routes.giveback,
              ]}
              render={(props) => (
                <Profile
                  {...props}
                  setIsUploadSelectionOpened={setIsUploadSelectionOpened}
                  isUnreadMessage={isUnreadMessage}
                />
              )}
            />
            <Route
              exact
              path={[routes.following, routes.viewAsFollowing]}
              render={(props) => (
                <Following {...props} isUnreadMessage={isUnreadMessage} />
              )}
            />
            <Route
              exact
              path={[routes.spins, routes.viewAsSpins]}
              render={(props) => (
                <Spins {...props} isUnreadMessage={isUnreadMessage} />
              )}
              component={Spins}
            />
            <Route
              exact
              path={[
                routes.tokenizedProduct,
                routes.product,
                routes.checkoutProduct,
              ]}
              component={ProductInfo}
            />
            <Route path={routes.subscription} component={Subscription}/>
            <Route path={routes.confirmPasson} component={ConfirmPasson} />
            <Route path={routes.error} component={Error} />
            <Redirect to={`/${store.userInfo.slug}/profile`} />
          </Switch>
          <NavBar
            setIsUploadSelectionOpened={setIsUploadSelectionOpened}
            isUnreadMessage={isUnreadMessage}
          />
          {isUploadSelectionOpened && (
            <UploadSelection
              role={userInfo?.business_role}
              onClose={closeUploadSelection}
            />
          )}
        </main>
      </div>
      <Spinner />
    </Suspense>
  );
};
export default App;
