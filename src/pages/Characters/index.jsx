import React, { useEffect } from "react";

import { CardContainer, CharCard } from "../../components/domain";
import { Search, AllnSort } from "../../components/ui/base/";
import { useStore } from "../../providers/store/StoreProvider";
import { observer } from "mobx-react-lite";
import NoFilter from '../../assets/images/no-filter.png';
import useDebounce from "../../utils/useDebounce";

const Characters = observer(() => {
  const { charactersStore, filterStore } = useStore();
  const value = useDebounce(filterStore.inputValue, 200);
  const chars = charactersStore.characterList;


  useEffect(() => {
    !filterStore.isFiltered && filterStore.searchCharacterByName({ name: value, status: '', gender: '' });
  }, [value])

  useEffect(() => {
    !charactersStore.characterList.length && charactersStore.fetchGetCharacters(1, 50);
    return () => {
      filterStore.clearInputField();
    }
  }, []);

  const onToggleView = () => {
    charactersStore.changeView();
  }

  return (
    <>
      <Search placeholder={"Найти персонажа"} />
      <AllnSort
        chars={true}
        allNumber={!charactersStore.emptyList ? chars.length : '0'}
        definition="персонажей"
        onToggleView={onToggleView}
        view={charactersStore.view} />
      <CardContainer view={charactersStore.view}>
        {chars && !charactersStore.emptyList ? chars.map((char) => (
          <CharCard
            key={char.id}
            id={char.id}
            fullName={char.fullName}
            gender={char.gender}
            race={char.race}
            image={char.imageName}
            status={char.status}
            view={charactersStore.view}
          />
        )) : (
          <div className='center'>
            <img src={NoFilter} alt="Нет совпадений" />
            <p>По данным фильтра ничего не найдено</p>
          </div>
        )}
      </CardContainer>

    </>
  );
});

export default Characters;
