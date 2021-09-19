import charactersStore from "./charactersStore";
import authStore from "./authStore";
import episodesStore from "./episodesStore";
import locationsStore from "./locationsStore";
import { FilterStore } from "./filterStore";

class RootStore {
    constructor() {
        this.charactersStore = charactersStore;
        this.authStore = authStore;
        this.episodesStore = episodesStore;
        this.locationsStore = locationsStore;
        this.filterStore = new FilterStore(this);
    };
}

export default new RootStore();