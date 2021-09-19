import { makeAutoObservable } from "mobx";


export class FilterStore {
    inputValue = '';
    previousPage = '';
    isFiltered = false;

    constructor(rootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    fillInputField(value) {
        this.inputValue = value;
    }

    get isFilled() {
        return this.inputValue.length > 0;
    }

    clearInputField() {
        this.inputValue = '';
    }

    searchCharacterByName(value) {
        this.rootStore.charactersStore.fetchCharacterFilter(value);
    }

    searchEpisodeByName(value) {
        this.isFiltered = true;
        this.rootStore.episodesStore.fetchGetEpisodeByName(value)
    }

    searchLocationByName(value) {
        this.rootStore.locationsStore.fetchLocationsFilter({ name: value, type: '', gender: '' })
    }

    fetchCharsFilter(values) {
        this.isFiltered = true;
        this.rootStore.charactersStore.fetchCharacterFilter(values);
    }

    fetchLocationFilter(values) {
        this.isFiltered = true;
        this.rootStore.locationsStore.fetchLocationsFilter(values);
    }

    removeFilter() {
        this.isFiltered = false;
    }
}
