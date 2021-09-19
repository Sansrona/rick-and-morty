import { makeAutoObservable, action } from "mobx";

import { locationsApi } from "../services/api/locations.api";
import {ERROR_MESSAGE} from '../utils/variables';

class LocationsStore {
  locations = [];
  location = {};
  fromAtoZ = true;
  type = '';
  measurement = '';
  emptyResult = false;


  constructor() {
    makeAutoObservable(this);
  }

  fetchGetLocations(pageNumber, pageSize) {
    locationsApi.getAll(pageNumber, pageSize).then(action((res) => {
      this.locations = res.data
    })).catch(action((err) => { console.log(err); this.locations = ERROR_MESSAGE }));
  }

  fetchGetLocationById(id) {
    locationsApi.getById(id).then(action(res => { this.location = res.data })).catch(action(err => { console.log(err.response.status); this.locations = ERROR_MESSAGE }));
  }

  unFetchGetLocationById() {
    this.location = {};
  }


  fetchLocationsFilter({ name, type, measurement }) {
    locationsApi.getFilter({ name, type, measurement }).then(action(res => {
      if (res.data.data.length === 0) {
        this.emptyResult = true;
      } else { this.emptyResult = false; }
      this.locations = res.data.data
    })).catch(action((err) => { console.log(err.response.status); this.locations = ERROR_MESSAGE }));
  }

  get locationsList() {
    if (!this.fromAtoZ) {
      return this.locations.slice().filter(a => !a.name[0].match(/[a-zA-Z]/)).sort((a, b) => b.name.match(/[А-Яа-я]/)[0].localeCompare(a.name.match(/[А-Яа-я]/)[0], 'ru-RU'))
    }
    return this.locations.slice().filter(a => !a.name[0].match(/[a-zA-Z]/)).sort((a, b) => a.name.match(/[А-Яа-я]/)[0].localeCompare(b.name.match(/[А-Яа-я]/)[0], 'ru-RU'))
  }

  getLocationType(type) {
    this.type = type;
  }

  getLocationMeasurement(measurement) {
    this.measurement = measurement;
  }

  makeFromAToZ() {
    this.fromAtoZ = true;
  }
  makeFromZToA() {
    this.fromAtoZ = false;
  }

}

export default new LocationsStore();
