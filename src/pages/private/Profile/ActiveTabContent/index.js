import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "../../../../routes";
import styles from "./ActiveTabContent.module.scss";

const Vault = lazy(() => import("../../../../components/Vault"));
const Store = lazy(() => import("../../../../components/Store"));
const Arts = lazy(() => import("../../../../components/Arts"));
const Worlds = lazy(() => import("../../../../components/Worlds"));

const ActiveTabContent = ({ viewAs }) => {
  const foreignBrandInfo = useSelector(
    (state) => state.profileReducer.profileInfo
  );
  return (
    <div className={styles.activeTabContent}>
      <Suspense fallback={null}>
        <Switch>
          <Route
            exact
            path={viewAs ? routes.viewAsWardrobe : routes.wardrobe}
            render={() => <Vault slug={viewAs} />}
          />
          <Route
            exact
            path={viewAs ? routes.viewAsStore : routes.store}
            component={Store}
          />
          <Route
            exact
            path={viewAs ? routes.viewAsWorlds : routes.worlds}
            render={(props) => (
              <Worlds {...props} foreignBrandInfo={foreignBrandInfo} />
            )}
          />
          <Route
            exact
            path={viewAs ? routes.viewAsArts : routes.arts}
            component={Arts}
          />
          <Redirect to={viewAs ? routes.viewAsStore : routes.store} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default ActiveTabContent;
