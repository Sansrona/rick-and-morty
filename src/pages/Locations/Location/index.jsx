import React, { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../providers/store/StoreProvider";
import BackArrowIcon from "../../../components/icons/BackArrowIcon";
import { Button } from '../../../components/ui/base/';
import cn from "classnames";

import styles from "./location.module.scss";
import { useParams, useHistory } from "react-router-dom";
import CharacterCard from "../../../components/domain/CharCard";


const LocationPage = observer(() => {
  const { locationsStore } = useStore();
  const { locationId } = useParams();
  const history = useHistory();
  const { name, type, measurements, about, imageName, characters, placeOfBirthCharacters } =
    locationsStore.location;
  const headerStyle = useMemo(() => (
    {
      backgroundImage: `linear-gradient(180deg, rgba(11, 30, 45, 0) 68.93%, rgba(0, 0, 0, 0.65) 100%), linear-gradient(180deg, rgba(0, 0, 0, 0.65) 0%, rgba(11, 30, 45, 0) 37.29%, rgba(11, 30, 45, 0) 68.93%), url(${imageName})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50% 30%",
      backgroundSize: "cover",
      height: "200px",
    }
  ), [imageName]);

  useEffect(() => {
    locationsStore.fetchGetLocationById(locationId);
    return () => {
      locationsStore.unFetchGetLocationById()
    }
  }, [locationId, locationsStore]);

  const onGoBack = () => {
    history.goBack();
  };

  return (
    <div>
      <div className={styles.header} style={headerStyle}>
        <Button onClick={onGoBack}>
          <BackArrowIcon />
        </Button>
      </div>
      <div className={styles.wrapper}>
        <p className="h3">{name}</p>
        <p className={cn("subTitle2", styles.subtitle)}>
          <span>{type}</span>
          {measurements && (
            <span>
              {" "}
              <span>•</span> {measurements}
            </span>
          )}
        </p>
        <p className="description">{about}</p>
        <div className={styles.characters}>
          <p className="h4">Персонажи</p>
          {characters &&
            characters.map((char) => (
              <CharacterCard
                key={char.id}
                id={char.id}
                fullName={char.fullName}
                gender={char.gender}
                race={char.race}
                image={char.imageName}
                status={char.status}
                view={true}
              />
            ))}
          {placeOfBirthCharacters &&
            placeOfBirthCharacters.map((char) => (
              <CharacterCard
                key={char.id}
                id={char.id}
                fullName={char.fullName}
                gender={char.gender}
                race={char.race}
                image={char.imageName}
                status={char.status}
                view={true}
              />
            ))}
        </div>
      </div>
    </div>
  );
});

export default LocationPage;
