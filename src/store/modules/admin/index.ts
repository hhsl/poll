import { Module } from 'vuex';
import { actions } from './actions';
import { AdminState } from './types';
import { RootState } from '@/store/types';

export const state: AdminState = {
    allUser: [],
    error: false
};

const namespaced: boolean = true;

export const profile: Module<AdminState, RootState> = {
    namespaced,
    state,
    actions,
};
