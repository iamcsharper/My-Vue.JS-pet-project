import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'

import home from './home.module.js'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
  },
  plugins: [createPersistedState({
    paths: ['sort_by', 'genres', 'filters', 'combine_filter', 'votes_filter', 'genres_filter', 'year_filter', 'text_filter','selectedMovie'].map(el=>'home.'+el)
  })]
});