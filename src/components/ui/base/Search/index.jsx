import React, { useRef, useEffect } from "react";

import FilterIcon from "../../../icons/FilterIcon";
import SearchIcon from "../../../icons/SearchIcon";
import CancelIcon from "../../../icons/CancelIcon";
import { useStore } from "../../../../providers/store/StoreProvider";

import styles from "./search.module.scss";
import { Link, useLocation } from 'react-router-dom';
import { observer } from "mobx-react-lite";

const Search = observer(({ placeholder, episodes }) => {
  const inputRef = useRef();
  const location = useLocation();
  const { filterStore } = useStore();
  const currentLocation = location.pathname.split('/')[1];

  const onInput = () => {
    filterStore.fillInputField(inputRef.current.value)
  }

  const onClear = () => {
    filterStore.clearInputField();
    inputRef.current.value = '';
  }
  useEffect(() => {
    return () => {
      filterStore.clearInputField();
    }
  }, [])

  return (
    <div className={styles.search}>
      <SearchIcon />
      <span className={episodes ? styles.noLine : ''}>
        <input ref={inputRef} type="text" name="search" onInput={onInput} tabIndex='0' placeholder={placeholder} />
        {filterStore.inputValue.length > 0 && <CancelIcon onClear={onClear} />}
      </span>
      {currentLocation !== 'episodes' && <Link to={`/filter-${currentLocation}`}>
        <FilterIcon />
      </Link>}
    </div>
  );
})

export default Search;
