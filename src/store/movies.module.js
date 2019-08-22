import Vue from "vue";
import {
    FilmListService,
    GenresService,
} from "../helpers/api.service";
import {
    FETCH_GENRES,
    FETCH_MOVIES
} from "./actions.type";
import {
    SET_MOVIE,
    SET_GENRES,
    UPDATE_MOVIE_IN_LIST
} from "./mutations.type";

const initialState = {
    movie: {
        vote_count: 0,
        id: 0,
        video: false,
        vote_average: 0,
        title: "",
        popularity: 0,
        original_language: "",
        original_title: "",
        genre_ids: [],
        adult: false,
        backdrop_path: "",
        overview: "",
        release_date: "",
        poster_path: "",
    },
    genres: [],
};

export const state = Object.assign({}, initialState);

export const actions = {
    [FETCH_MOVIES](context, movieId) {
        // // avoid extronuous network call if article exists
        // if (prevMovie !== undefined) {
        //     return context.commit(SET_MOVIE, prevMovie);
        // }
        return FilmListService.get(movieId).then(({ data }) => {
            context.commit(SET_MOVIE, data);
            return data;
        });
    },
    [FETCH_GENRES](context) {
        return GenresService.query().then(({ data }) => {
            context.commit(SET_COMMENTS, data);
        });
    },
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
    [SET_MOVIE](state, movie) {
        state.movie = movie;
    },
    // [RESET_STATE]() {
    //     for (let f in state) {
    //         Vue.set(state, f, initialState[f]);
    //     }
    // }
};

const getters = {
    movie(state) {
        return state.movie;
    },
    genres(state) {
        return state.genres;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};