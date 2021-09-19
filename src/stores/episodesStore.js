import { action, makeAutoObservable } from "mobx";

import { episodesApi } from "../services/api/episodes.api";
import { ERROR_MESSAGE } from '../utils/variables';

class EpisodesStore {
  episodes = [];
  episode = {};

  constructor() {
    makeAutoObservable(this);
  }

  fetchGetEpisodes(value) {
    episodesApi.getAll(value).then(action((res) => {
      this.episodes = res.data
    })).catch(action((err) => { console.log(err); this.episodes = ERROR_MESSAGE }));
  }

  fetchGetEpisodeById(id) {
    episodesApi.getById(id).then(action(res => { this.episode = res.data })).catch(action(err => { console.error(err); this.episodes = ERROR_MESSAGE }));
  }

  unFetchGetEpisodeById() {
    this.episode = {};
  }

  fetchGetEpisodeByName(name) {
    episodesApi.getByName(name).then(action((res) => {
      this.episodes = res.data
    })).catch(action((err) => { console.log(err); this.episodes = ERROR_MESSAGE }));;
  }

  get sortedEpisodes() {
    return this.episodes.slice().sort((a, b) => a.series - b.series)
  }


}

export default new EpisodesStore();
