import Vue from "vue";

import config from './config.js'

const ApiService = {
    init() {
        Vue.prototype.$http.defaults.baseURL = config.apiUrl;
    },
    
    query(resource, params) {
        if (!params) {
            params = {};
        }
        params['language'] = config.lang;
        params['api_key'] = config.apiKey;
        return Vue.prototype.$http.get(resource, {
            params
        })
        .then((data) => data.data)
        .catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },
    
    get(resource, slug = "") {
        return Vue.prototype.$http.get(`${resource}/${slug}`)
        .then((data) => data.data)
        .catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },
    
    post(resource, params) {
        if (!params) {
            params = {};
        }
        params['language'] = config.lang;
        params['api_key'] = config.apiKey;
        return Vue.prototype.$http.post(`${resource}`, params);
    },
    
    update(resource, slug, params) {
        if (!params) {
            params = {};
        }
        params['language'] = config.lang;
        params['api_key'] = config.apiKey;
        return Vue.prototype.$http.put(`${resource}/${slug}`, params);
    },
    
    put(resource, params) {
        if (!params) {
            params = {};
        }
        params['language'] = config.lang;
        params['api_key'] = config.apiKey;
        return Vue.prototype.$http.put(`${resource}`, params);
    },
    
    delete(resource) {
        return Vue.prototype.$http.delete(resource).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    }
};

export default ApiService;

export const FilmListService = {
    fetch(params) {
        return ApiService.query('discover/movie', params);
    },
    query(params) {
        //  return ApiService.query('discover/movie', params);
        return ApiService.query('search/movie', params);
    },

    get(id) {
        return ApiService.query('movie/' + id);
    }
};

export const GenresService = {
    query() {
        return ApiService.query('genre/movie/list');
    }
};