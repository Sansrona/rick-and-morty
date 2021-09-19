import React from "react";

import cn from "classnames";

import styles from "./locationcard.module.scss";
import { Link } from "react-router-dom";

function LocationCard({ id, name, type, image, measurements }) {
  return (
    <Link to={`/locations/${id}`}>
      <div className={styles.locationCard}>
        <img src={image} alt={name} />
        <div className={styles.info}>
          <p className="h4">{name}</p>
          <p className={cn("subTitle2", styles.subtitle)}>
            <span>{type}</span>
            {measurements && (
              <span>
                {" "}
                <span>•</span> {measurements}
              </span>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default LocationCard;
