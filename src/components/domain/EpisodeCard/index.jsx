import React from "react";

import styles from "./episodecard.module.scss";
import ArrowIcon from "../../icons/ArrowIcon";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

require('dayjs/locale/ru');

const EpisodeCard = ({ id, name, series, image, premiere }) => {
  const date = dayjs(premiere).locale('ru').format('D MMMM YYYY')
  return (
    <Link to={`/episodes/${id}`}>
      <div className={styles.episode}>
        <img src={image} alt={name} where='characterPage' />
        <div className={styles.info}>
          <p className='subTitle1'>Серия {series}</p>
          <p className='h5'>{name}</p>
          <p className='bodyOne'>{date}</p>
        </div>
        <ArrowIcon />
      </div>
    </Link>
  );
}

export default EpisodeCard;
