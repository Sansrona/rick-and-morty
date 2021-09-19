import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import { Characters, Episodes, Locations, Settings } from "../../../../pages/";

import styles from "./MainPage.module.scss";
import { useStore } from "../../../../providers/store/StoreProvider";

import { Navbar } from "../index";

const MainPage = () => {
  const { authStore } = useStore();
  return (
    <div className={styles.wrapper}>
      <Switch>
        <Route path="/characters" render={() => <Characters />} />
        <Route path="/locations" render={() => <Locations />} />
        <Route path="/episodes" render={() => <Episodes />} />
        <Route path="/settings" render={() => <Settings />} />
        <Route
          exact
          path="/"
          render={() => (
            <>
            </>
          )}
        />
      </Switch>

      <Navbar />
      {!authStore.isAuth && <Redirect to="/login" />}
    </div>
  );
};

export default MainPage;
