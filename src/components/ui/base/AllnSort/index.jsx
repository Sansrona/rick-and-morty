import React from "react";

import UnknownIcon from "../../../icons/UnknownIcon";
import SortIcon from "../../../icons/Sort";
import styles from "./allNSort.module.scss";
import { Button } from "..";

const AllnSort = ({ allNumber, chars, definition, onToggleView, view }) => {
  return (
    <div className={styles.allAndSort}>
      <span className="subTitle1">
        Всего {definition}: {allNumber}
      </span>
      {chars && <Button onClick={onToggleView} >{
        view
          ? <SortIcon />
          : <UnknownIcon />
      }</Button>}
    </div>
  );
};

export default AllnSort;
