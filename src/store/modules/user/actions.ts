import { ActionTree } from 'vuex';
import { UserState } from './types';
import { RootState } from '@/store/types';

export const actions: ActionTree<UserState, RootState> = {
    login({ commit }, id) {
        commit('login', id);
    },
    logout({ commit }) {
        commit('logout');
    }
};
