import React from "react";

import cn from "classnames";
import { Link } from "react-router-dom";
import { statuses, genders } from "../../../utils/variables";

import ArrowIcon from "../../icons/ArrowIcon";
import styles from "./charcard.module.scss";

const CharacterCard = ({ id, fullName, gender, race, image, status, view }) => {
  return (
    <Link to={`/characters/${id}`}>
      <div className={view ? styles.characterCard :styles.characterCard2}>
        <img src={image} alt={fullName} />
        <div className={styles.characterInfo}>
          <span
            className={cn("subTitle1", {
              [styles.alive]: status === 0,
              [styles.dead]: status === 1,
              [styles.unknown]: status === 2,
            })}
          >
            {statuses[status]}
          </span>
          <span className={cn("h5", styles.fullName)}>{fullName}</span>
          <span className={cn("subTitle2", styles.bio)}>
            {race}, {genders[gender]}
          </span>
        </div>
        {view && <ArrowIcon />}
      </div>
    </Link>
  );
};

export default CharacterCard;
