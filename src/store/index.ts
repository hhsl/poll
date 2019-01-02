import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        version: '0.0.1'
    }
};

export default new Vuex.Store<RootState>(store);
