import { Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import { UserState } from './types';
import { RootState } from '@/store/types';

export const state: UserState = {
    isLoggedIn: false
};

const namespaced: boolean = true;

const user: Module<UserState, RootState> = {
    namespaced,
    state,
    actions,
    mutations
};

export default user;
