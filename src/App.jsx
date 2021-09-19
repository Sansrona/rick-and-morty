import React from "react";
import { observer } from "mobx-react-lite";

import "./App.scss";
import { Route, Switch } from "react-router-dom";

import { MainPage } from "./components/ui/layout/";
import CharacterPage from "./pages/Characters/Character";
import LocationPage from "./pages/Locations/Location";
import EpisodePage from "./pages/Episodes/Episode";
import { Registration, Login, ProfilePage, UpdateBio, UpdateLogin, CharacterFilterPage, LocationFilterPage, ByType, ByMeasurement } from "./pages/";
import ContextComponent from "./providers/store/StoreProvider";

import "./styles/normalize.css";

const App = observer(() => {
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', localStorage.theme)
  }, [])

  return (
    <ContextComponent>
      <Switch>
        <Route exact path="/characters/:charId">
          <CharacterPage />
        </Route>
        <Route exact path="/locations/:locationId">
          <LocationPage />
        </Route>
        <Route exact path="/episodes/:episodeId">
          <EpisodePage />
        </Route>
        <Route path="/register">
          <Registration />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/profile">
          <ProfilePage />
        </Route>
        <Route exact path="/profile/update-bio">
          <UpdateBio />
        </Route>
        <Route exact path="/profile/update-login">
          <UpdateLogin />
        </Route>
        <Route exact path="/filter-characters">
          <CharacterFilterPage />
        </Route>
        <Route exact path="/filter-locations">
          <LocationFilterPage />
        </Route>
        <Route exact path="/filter-locations/byType">
          <ByType />
        </Route>
        <Route exact path="/filter-locations/byMeasurement">
          <ByMeasurement />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </ContextComponent>
  );
});

export default App;
