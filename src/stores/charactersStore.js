import { makeAutoObservable, action } from "mobx";

import { characterApi } from "../services/api/characters.api";
import {ERROR_MESSAGE} from '../utils/variables';

class CharactersStore {
  characters = [];
  character = {};
  fromAtoZ = true;
  emptyList = false;
  view = false;

  constructor() {
    makeAutoObservable(this);

  }

  fetchGetCharacters(pageNumber, pageSize) {
    characterApi.getAll(pageNumber, pageSize).then(action((res) => {
      this.characters = res.data;
    })).catch(action((err) => { console.log(err); this.characters = ERROR_MESSAGE }));
  }

  fetchGetCharacterById(id) {
    characterApi.getById(id).then(action(res => { this.character = res.data })).catch(action((err) => { console.log(err); this.characters = ERROR_MESSAGE }));
  }

  unFetchGetCharacterById() {
    this.character = {};
  }

  fetchCharacterFilter(values) {
    characterApi.getFilter(values).then(action((res) => {
      if (res.data.data.length === 0) {
        this.emptyList = true;
      } else { this.emptyList = false; }
      this.characters = res.data.data
    })).catch(action((err) => { console.log(err); this.characters = ERROR_MESSAGE }));
  }

  get characterList() {
    if (!this.fromAtoZ) {
      return this.characters.slice().sort((a, b) => b.fullName.match(/[А-Яа-я]/)[0].localeCompare(a.fullName.match(/[А-Яа-я]/)[0], 'ru-RU'))
    }
    return this.characters.slice().sort((a, b) => a.fullName.match(/[А-Яа-я]/)[0].localeCompare(b.fullName.match(/[А-Яа-я]/)[0], 'ru-RU'))
  }

  changeView() {
    this.view = !this.view;
  }

  makeFromAToZ() {
    this.fromAtoZ = true;
  }

  makeFromZToA() {
    this.fromAtoZ = false;
  }





}

export default new CharactersStore();
