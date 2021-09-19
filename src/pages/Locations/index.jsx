import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { CardContainer, LocationCard } from "../../components/domain";
import { Search, AllnSort } from "../../components/ui/base/";
import { useStore } from "../../providers/store/StoreProvider";
import NoFilter from '../../assets/images/no-filter.png';
import useDebounce from "../../utils/useDebounce";

const Locations = observer(() => {
  const { locationsStore, filterStore } = useStore();
  const locations = locationsStore.locationsList;
  const value = useDebounce(filterStore.inputValue, 200);

  useEffect(() => {
    !filterStore.isFiltered && filterStore.searchLocationByName(value);
    return () => {
      filterStore.removeFilter();
    }
  }, [value]);
  
  useEffect(() => {
    !locationsStore.locationsList.length && locationsStore.fetchGetLocations(1, 15)
    return () => {
      filterStore.clearInputField();
    }
  }, []);

  return (
    <>
      <Search placeholder={"Найти локацию"} />
      <AllnSort
        chars={false}
        definition="локаций"
        allNumber={!locationsStore.emptyResult ? locations.length : '0'}
      />
      <CardContainer view={true}>
        {locations && !locationsStore.emptyResult ? locations.map((location) => (
          <LocationCard
            key={location.id}
            id={location.id}
            name={location.name}
            type={location.type}
            image={location.imageName}
            measurements={location.measurements}
          />
        )) : (
          <div className='center'>
            <img src={NoFilter} alt="Нет совпадений" />
            <p>По данным фильтра ничего не найдено</p>
          </div>)}
      </CardContainer>
    </>
  );
});

export default Locations;
