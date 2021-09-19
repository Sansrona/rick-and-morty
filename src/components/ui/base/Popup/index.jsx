import React from "react";

import cn from "classnames";

import styles from "./popup.module.scss";

function Popup({ children, className, togglePopup }) {
  return (
    <div className={cn(styles.popup)}>
      <div className={cn(styles.content, {
        [styles.loginPopup]: className==="loginPopup",
        [styles.themePopup]: className==="themePopup",
        })}>{children}</div>
    </div>
  );
}

export default Popup;
