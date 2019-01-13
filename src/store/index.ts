import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import user from './modules/user';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        version: '0.0.1'
    },
    modules: {
        user
    }
};

export default new Vuex.Store<RootState>(store);
