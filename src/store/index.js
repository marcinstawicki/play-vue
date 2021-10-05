import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [createPersistedState()],
  state: {
    childCollection: [],
    isAuthenticated: false,
    activePage: 'page01'
  },
  getters: {
    getterChildCollection(state){
      return state.childCollection;
    },
    getterIsAuthenticated(state){
      return state.isAuthenticated
    },
    getterActivePage(state){
      return state.activePage;
    }
  },
  mutations: {
    addChildMutation(state,payload){
      const ids = state.childCollection.map(child => child.id);
      let lastID = 0;
      if(ids.length > 0){
        lastID = Math.max(...ids);
      }
      const child = {identifier: payload, id: ++lastID};
      state.childCollection = [...state.childCollection,child];
    },
    deleteChildMutation(state,payload){
      state.childCollection = [...state.childCollection.filter(child => child.id !== payload)];
    },
    isAuthenticatedMutation(state,payload){
      state.isAuthenticated = payload;
    },
    activePageMutation(state,payload){
      state.activePage = payload;
    }
  },
  actions: {
    addChildAction({commit}, payload){
      commit('addChildMutation',payload);
    },
    deleteChildAction({commit}, payload){
      commit('deleteChildMutation',payload);
    },
    isAuthenticatedAction({commit},payload){
      commit('isAuthenticatedMutation',payload);
    },
    activePageAction({commit},payload){
      commit('activePageMutation',payload);
    }
  },
  modules: {}
})
