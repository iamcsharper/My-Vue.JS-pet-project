import { FilmListService, GenresService } from "../helpers/api.service";
import { 
    FETCH_MOVIES,
    FETCH_GENRES,
    UPDATE_FILTERS, 
    UPDATE_COMBINE, 
    LOAD_MORE } from "./actions.type";
import {
    FETCH_START,
    FETCH_END,
    SET_GENRES,
    SET_FILTERS,
    SELECT_MOVIE,
    SET_COMBINE,
    FETCH_APPEND_END,
    FETCH_APPEND_START
} from "./mutations.type";

function moviesFilter(state, sort) {
    const results = state.movies.filter((movie) => {
        let okayWithGenre = false;
        
        if (state.genres_filter.length) {
            for (let i = 0; i < movie.genre_ids.length; i++) {
                const has = state.genres_filter.includes(movie.genre_ids[i]);
                if (state.combine_filter == ',' && !has) {
                    okayWithGenre = false;
                    break;
                }
                if (state.combine_filter == '|' && has) {
                    okayWithGenre = true;
                    break;
                }
            }
        } else {
            okayWithGenre = true;
        }
        
        let okayWithYear = true;
        
        if (state.year_filter > 0) {
            okayWithYear = parseInt(movie.release_date.split('-')[0]) == state.year_filter;
        }
        
        let okayWithVotes = (movie.vote_average >= state.votes_filter);

        if (!movie.vote_average)
            movie.vote_average = true;
        
        const res = movie.overview.length && okayWithGenre && okayWithVotes && okayWithYear;
        
        return res;
    })
    if (sort) {
        return results.sort((a, b) => {
            const A = new Date(a.release_date);
            const B =  new Date(b.release_date);
    
            return B.getTime() - A.getTime();
        });
    }

    return results;
}

const state = {
    movies: [],
    page: 1,
    total_pages: 0,
    total_results: 0,
    isLoading: true,
    sort_by: 'release_date.desc',
    genres: [],
    filters: {},
    combine_filter: '|',
    votes_filter: 5,
    genres_filter: [],
    year_filter: -1,
    text_filter: '', 
    
    selectedMovie: -1,
    
    firstRun: true,
    
    infiniteLoaderState: null,
};

const getters = {
    totalResults(state) {
        return state.total_results;
    },
    totalPages(state) {
        return state.total_pages;
    },
    page(state) {
        return state.page;
    },
    movies(state) {
        return state.movies;
    },
    selectedMovie(state) {
        if (state.selectedMovie < 0)
            return null;

        for (let i = 0; i < state.movies.length; i++) {
            if (state.movies[i].id == state.selectedMovie) {
                return state.movies[i];
            }
        }

        return null;
    },
    //TODO фильтрация другая!
    moviesFiltered(state) {
        // // Если режим поиск по тексту, то фильтры сами пишем!
        // if (state.text_filter && state.text_filter.length) {
        //     return moviesFilter(state);
        // }
        
        return moviesFilter(state);


        //.filter((movie) => state.text_filter == '' ||
        //movie.title.toLowerCase().includes(state.text_filter.toLowerCase()) || 
        //movie.overview.toLowerCase().includes(state.text_filter.toLowerCase())
        //);
    },
    isLoading(state) {
        return state.isLoading;
    },
    genres(state) {
        return state.genres
    },
    sortKey(state) {
        return state.sort_by.split('.')[0];
    },
    sortOrder(state) {
        return state.sort_by.split('.')[1];
    },
    firstRun(state) {
        return state.firstRun;
    }
};

const actions = {
    setActiveMovie({commit}, id) {
        commit('selectMovie', id);
    },
    [LOAD_MORE]({commit, state}, $state) {
        if ($state)
            commit('setInfiniteLoader', $state);

        commit(FETCH_APPEND_START);
        
        if (state.total_pages > 0 && state.page >= state.total_pages) {
            console.log('[HOME.MODULE.JS]  Пусто, ну и хватит на этом!');
            commit(FETCH_APPEND_END, null);
            if ($state) $state.complete();
            return new Promise((resolve) => resolve(true));
        }
        
        if (state.text_filter && state.text_filter.length>0) {
            return FilmListService.query({
                query: state.text_filter,
                page: state.page,
            })
            .then( data => {
                if (!data.results) {
                    if ($state) $state.complete();
                    return true;
                } else {
                    commit(FETCH_APPEND_END, data);
                    
                    if ($state) $state.loaded();
                    return false;
                }
            })
            .catch(error => {
                throw new Error(error);
            });
        } else {
            let query = {
                sort_by: state.sort_by,
                page: state.page,
                ...state.filters
            };
            
            return FilmListService.fetch(query)
            .then( data  => {
                if (!data.results) {
                    if ($state) $state.complete();
                    return true;
                } else {
                    commit(FETCH_APPEND_END, data);
                    if ($state) $state.loaded();
                    return false;
                }
            })
            .catch(error => {
                throw new Error(error);
            });
        }
    },
    [UPDATE_COMBINE]({commit, state}, combine_filter) {
        commit(SET_COMBINE, combine_filter)
    },
    // TODO rewrite this shitty piece of shit
    [UPDATE_FILTERS]({commit, state}, filters) {
        let obj = {};
        
        state.page = 1;
        
        if (state.infiniteLoaderState && typeof state.infiniteLoaderState.reset === 'function')
            state.infiniteLoaderState.reset();
        
        if (filters.genres !== undefined)
        state.genres_filter = filters.genres;
        if (filters.text !== undefined)
        state.text_filter = filters.text;
        if (filters.year !== undefined)
        state.year_filter = filters.year;
        if (filters.combine_filter !== undefined)
        state.combine_filter = filters.combine_filter;
        
        if (filters.genres && filters.genres.length) {
            obj.with_genres = filters.genres.join(state.combine_filter);
        }
        
        if (filters.votes) {
            obj['vote_average.gte'] = filters.votes;
            state.votes_filter = filters.votes;
        }
        if (filters.year) {
            if (filters.year > -1) {
                obj.year = filters.year;
            } else {
                delete state.filters['year'];
            }
        }
        
        commit(SET_FILTERS, obj);
    },
    [FETCH_MOVIES]({ commit, state }) {
        commit(FETCH_START);
        
        if (state.text_filter && state.text_filter.length>0) {
            return FilmListService.query({
                query: state.text_filter,
                page: state.page,
            })
            .then( data => {
                commit(FETCH_END, data);
            })
            .then( () => {
                commit(FETCH_APPEND_START);

                return FilmListService.query({
                    query: state.text_filter,
                    page: state.page,
                }).then((data)=>{
                    commit(FETCH_APPEND_END, data);
                });
            })
            .catch(error => {
                throw new Error(error);
            });
        } else {
            let query = {
                sort_by: state.sort_by,
                page: state.page,
                ...state.filters
            };
            
            return FilmListService.fetch(query)
            .then( data  => {
                commit(FETCH_END, data);
            })
            .catch(error => {
                throw new Error(error);
            });
        }
    },
    [FETCH_GENRES]({ commit, state }) {
        if (state.genres.length) {
            return new Promise((resolve, reject) => {resolve(state.genres)});
        }
        
        commit(FETCH_START);
        
        return GenresService.query()
        .then(data => {
            commit(SET_GENRES, data);
        })
        .catch(error => {
            throw new Error(error);
        });
    }
};

const mutations = {
    clear(state) {
        state.movies = [];
    },
    setInfiniteLoader(state, $state) {
        state.infiniteLoaderState = $state;
    },
    selectMovie(state, id) {
        state.selectedMovie = id;
    },
    [SET_COMBINE](state, data) {
        state.combine_filter = data;
    },
    [FETCH_START](state) {
        state.isLoading = true;
    },
    [SET_GENRES](state, data) {
        state.genres = data.genres;
    },
    [FETCH_APPEND_START](state) {
        state.isLoading = true;
        state.page += 1;

        console.log('APPEND START STATE:', state.page);
    },
    sortMovies(state) {
        state.movies = state.movies.sort((a, b) => {
            const A = new Date(a.release_date);
            const B =  new Date(b.release_date);
    
            return B.getTime() - A.getTime();
        })
    },
    [FETCH_APPEND_END](state, data) {
        state.firstRun = false;
        if (data) {
            state.movies = state.movies.concat(data.results);

            state.page = data.page; // Why?
            state.total_pages = data.total_pages;
            state.total_results = data.total_results;
        }
        state.isLoading = false;
    },
    [FETCH_END](state, data, unset = false) {
        state.firstRun = false;
        state.isLoading = false;

        if (unset) {
            console.log("Fetch end unset...");
            state.movies = [];
            return;
        }
        state.movies = data.results;
        state.page = data.page;
        state.total_pages = data.total_pages;
        state.total_results = data.total_results;
    },
    [SET_FILTERS](state, filters) {
        for (let filter in filters) {
            state.filters[filter] = filters[filter];
        }
    },
    [SELECT_MOVIE](state, movie) {
        state.selectedMovie = movie;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};