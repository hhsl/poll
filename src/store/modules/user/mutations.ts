import { MutationTree } from 'vuex';
import { UserState } from './types';

export const LOCAL_STORAGE_USERID: string = 'userid';

export const mutations: MutationTree<UserState> = {
    login(state, id) {
        localStorage.setItem(LOCAL_STORAGE_USERID, id);
        state.id = id;
        state.isLoggedIn = true;
    },
    logout(state) {
        localStorage.removeItem(LOCAL_STORAGE_USERID);
        state.id = '';
        state.isLoggedIn = false;
    }
};
