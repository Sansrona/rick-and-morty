import React, { useEffect, useMemo } from "react";

import cn from "classnames";
import { Link, useParams, useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";

import ArrowIcon from "../../../components/icons/ArrowIcon";
import BackArrowIcon from "../../../components/icons/BackArrowIcon";
import { CardContainer, EpisodeCard } from '../../../components/domain'
import { Button } from '../../../components/ui/base/'

import { statuses, genders } from "../../../utils/variables";
import { useStore } from "../../../providers/store/StoreProvider";
import styles from "./character.module.scss";

const CharacterPage = observer(() => {
  const { charId } = useParams();
  const history = useHistory();
  const { charactersStore } = useStore();
  let {
    fullName,
    status,
    about,
    gender,
    race,
    imageName,
    locationId,
    location,
    placeOfBirthId,
    placeOfBirth,
    episodes,
  } = charactersStore.character;
  const headerStyle = useMemo(() => ({
    backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(11, 30, 45, 0.39) 37.29%, rgba(11, 30, 45, 0) 68.93%), linear-gradient(0deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.01)), url(${imageName})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 30%",
    backgroundSize: "cover",
    height: "200px",
  }), [imageName]);
  useEffect(() => {
    charactersStore.fetchGetCharacterById(charId);
    return () => {
      charactersStore.unFetchGetCharacterById()
    }
  }, [charactersStore, charId]);
  episodes = episodes && episodes.slice().sort(function (a, b) {
    if (a.season < b.season && a.series < b.series) {
      return -1;
    }
    if (a.season < b.season) {
      return -1;
    }
    if (a.season === b.season && a.series < b.series) {
      return -1;
    }
    return 0;
  })

  const onGoBack = () => {
    history.goBack();
  }
  return (
    <div>
      <div className={styles.header} style={headerStyle}>
        <Button onClick={onGoBack}>
          <BackArrowIcon />
        </Button>
        <img src={imageName} alt={fullName} className={styles.avatar} />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <span className="h2">{fullName}</span>
          <span
            className={cn("subTitle1", {
              [styles.alive]: status === 0,
              [styles.dead]: status === 1,
              [styles.unknown]: status === 2,
            })}
          >
            {statuses[status]}
          </span>
        </div>
        <p className="description">{about}</p>
        <div className={styles.bio}>
          <div>
            <p className="subTitle2">Пол</p>
            <p className="bodyOne">{genders[gender]}</p>
          </div>
          <div>
            <p className="subTitle2">Раса</p>
            <p className="bodyOne">{race}</p>
          </div>
        </div>
        <div className={styles.birthPlace}>
          <div>
            <p className="subTitle2">Место рождения</p>
            <p className="bodyOne">{placeOfBirth ? placeOfBirth.name : "Неизвестно"}</p>
          </div>
          {placeOfBirth && <Link to={`/locations/${placeOfBirthId}`}>
            <Button><ArrowIcon /></Button>
          </Link>}
        </div>
        <div className={styles.location}>
          <div>
            <p className="subTitle2">Местоположение</p>
            <p className="bodyOne">{location ? location.name : "Неизвестно"}</p>
          </div>
          {location && <Link to={`/locations/${locationId}`}>
            <Button><ArrowIcon /></Button>
          </Link>}
        </div>
      </div>
      <div className={styles.episodes}>
        <CardContainer view={true}>
          <div className={styles.episodesHeader}>
            <span className='h4'>Эпизоды</span>
            <Link to="/episodes">
              <span className='subTitle2'>Все эпизоды</span>
            </Link>
          </div>
          {episodes && episodes.length ? episodes.map(episode => (
            <EpisodeCard
              key={episode.id}
              where={'characterPage'}
              id={episode.id}
              name={episode.name}
              series={episode.series}
              image={episode.imageName}
              premiere={episode.premiere}
            />
          )) : <p>Ничего не найдено &#128529; </p>}
        </CardContainer>
      </div>
    </div>
  )
});

export default CharacterPage;
