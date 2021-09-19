import React from "react";

import styles from "./charContainer.module.scss";

const CardContainer = ({ children, view }) => {
  return <div className={view ? styles.container : styles.container2}>{children}</div>;
};

export default CardContainer;
