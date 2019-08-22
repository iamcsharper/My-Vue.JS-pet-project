<template>
<div>
    <div class="block" v-if="!fixed">
        <div class="filters-panel" :class="{isOpen:isOpen}">
            <input type="text" v-model="searchText" class="search form-control" placeholder="человек-паук 2 часть" v-on:keyup.enter="update();search()">
            <div class="filters">
                <div class="form-group">
                    <h6>Жанры</h6>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="inlineRadio1" value="|" v-model="combine_filter">
                        <label class="form-check-label" for="inlineRadio1">Любой из</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="inlineRadio2" value="," v-model="combine_filter">
                        <label class="form-check-label" for="inlineRadio2">Только вместе</label>
                    </div>
                    <div class="flex-container">
                        <div class="flex-item" v-for="genre in genres" :class="{selected:isSelectedGenre(genre.id)}" :key="genre.id" @click="toggleGenre(genre.id)">
                            {{ genre.name }}
                        </div>
                        <div style="width:100%"></div>
                        <div class="btn-group" style="margin-top:15px;">
                            <button class="btn btn-primary" @click="selectAll($event)">Выбрать все</button>
                            <button class="btn btn-secondary" @click="clearAll($event)" >Очистить все</button>
                        </div>
                    </div>
                    <!-- <select class="form-control" v-model="filter_genres" multiple>
                        <option value="-1">Все жанры</option>
                        <option v-for="genre in genres" :key="genre.id" :value="genre.id">
                            {{ genre.name }}
                        </option>
                    </select> -->
                    <div class="form-group">
                        <h6>Минимальный рейтинг</h6>
                        <div class="rating">
                            <span v-for="i in [10,9,8,7,6,5,4,3,2,1]" :key="i+'_rate'" 
                            @click="setRating(i)" :class="{active:isActiveRating(i)}">☆</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <h6>Год</h6>
                        <select class="form-control" v-model="year">
                            <option v-for="yr in years" :value="yr" :key="'year_'+yr">{{yr}}</option>
                            <option :value="-1">Любой год</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="button" @click="isOpen = !isOpen">
            Фильтры
        </div>
        <input class="button" type="submit" value="Искать" @click="search($event)"/>
        <div class="clearfix"></div>
    </div>
    <div v-else class="block fixed container">
        <div class="filters-panel" :class="{isOpen:isOpen}">
            <input type="text" v-model="searchText" class="search form-control" placeholder="человек-паук 2 часть" >
            <div class="filters" v-closable="{exclude: ['filtersTriggerBtn'], handler: 'close' }">
                <div class="form-group">
                    <h6>Жанры</h6>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="inlineRadio1" value="|" v-model="combine_filter">
                        <label class="form-check-label" for="inlineRadio1">Любой из</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="inlineRadio2" value="," v-model="combine_filter">
                        <label class="form-check-label" for="inlineRadio2">Только вместе</label>
                    </div>
                    <div class="flex-container">
                        <div class="flex-item" v-for="genre in genres" :class="{selected:isSelectedGenre(genre.id)}" :key="genre.id" @click="toggleGenre(genre.id)">
                            {{ genre.name }}
                        </div>
                        <div style="width:100%"></div>
                        <div class="btn-group" style="margin-top:15px;">
                            <button class="btn btn-primary" @click="selectAll($event)">Выбрать все</button>
                            <button class="btn btn-secondary" @click="clearAll($event)" >Очистить все</button>
                        </div>
                    </div>
                    <!-- <select class="form-control" v-model="filter_genres" multiple>
                        <option value="-1">Все жанры</option>
                        <option v-for="genre in genres" :key="genre.id" :value="genre.id">
                            {{ genre.name }}
                        </option>
                    </select> -->
                    <div class="form-group">
                        <h6>Минимальный рейтинг</h6>
                        <div class="rating">
                            <span v-for="i in [10,9,8,7,6,5,4,3,2,1]" :key="i+'_rate'" 
                            @click="setRating(i)" :class="{active:isActiveRating(i)}">☆</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <h6>Год</h6>
                        <select class="form-control" v-model="year">
                            <option v-for="yr in years" :value="yr" :key="'year_'+yr">{{yr}}</option>
                            <option :value="-1">Любой год</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="button" @click="isOpen = !isOpen" ref="filtersTriggerBtn">
            Фильтры
        </div>
        <input class="button" type="submit" value="Искать" @click="search($event)"/>
    </div>
</div>
</template>

<style scoped>

.custom-range {
    border: none!important;
    background: transparent;
    outline: none!important;
    padding: 0;
    height: auto;
    margin: calc(1.2rem + 0.1rem) 0;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
}
.filters-panel {
    width: 100%;
}
.filters {
    visibility: hidden;
    transition: visibility 0s,height 0.3s linear, all 0.5s ease;
    opacity: 0;
    background-color: #3ea778;
    padding: 20px 30px;
    border-radius: 0 0 30px 30px;

    height: 0;
    overflow: hidden;
}

.fixed .filters, .fixed .search, .fixed .button, .fixed .isOpen .search{
    border-radius: 0!important;
}

.block:not(.fixed) {
    margin-top: calc(2rem);
}

.isOpen .filters {
    overflow: auto;
    height: auto;
    visibility: visible;
    opacity: 1;
}
.block {
	border-radius: 0;
    display: flex; 
    justify-content: space-between;
    align-items: self-start;
    padding: 0;
    background: transparent;
    margin-bottom: 30px;
    user-select: none;
}


.block.fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
    padding-right: 15px;
    padding-left: 15px;
}

.block, .block * {
    transition: all .3s;
}

.block .search, .block .search:not(:focus):valid {
    border: none;
    box-shadow: none;
    color: #19412f;
    outline: none;
    border-radius: 30px 0 0 30px;
	background-color: #41b883;
    height: 64px;
    font-weight: bolder;
    padding: 20px 30px;
    font-size: 1.2em;
}

.isOpen .search {
    border-radius: 30px 0 0 0!important;
}
.block .search:active, .block .search:focus {
    font-size: 1.1em;
}
.block .search::placeholder {
  color: #2d7f5a;
    text-decoration: underline;
}
.block .search:focus::placeholder {
    color: #1d4e38;
}
.block .button {
    display: block;
    border: none;
    padding: 20px 30px;
    background-color: #008C8B;
    height: 64px;
    cursor: pointer;
    text-decoration: none;
    color: #fff!important;
    outline: none;
    display: block;
    line-height: 50%;
    border-radius: 0;
}
.block .button:hover {
    background-color: #097372;
}
.block.fixed .button:last-child,
.block:not(.fixed) .button:last-of-type {
    border-radius: 0 30px 30px 0;
}
.dropdown {
    position: absolute;
    left: 50%;
    transform: translatex(-50%) rotatex(90deg) scale(0);
    margin-top: 0.55em;
    transform-origin: 0 0;
    background-color: rgb(0, 162, 139);
    visibility: hidden;
    opacity: 0;
    transition: all 200ms linear;
    width: 100%;
}
.dropdown.isOpen {
    transform: translatex(-50%);
    visibility: visible;
    opacity: 1;
}
</style>

<script>
import { debounce } from 'lodash';

import helpers from '../helpers/functions.js'
import { mapGetters } from "vuex";
import {
    FETCH_MOVIES, FETCH_GENRES, UPDATE_FILTERS, UPDATE_COMBINE, LOAD_MORE
} from '../store/actions.type';

import closable from '../helpers/closable'

export default {
    tag: 'search-filter',
    props: {
        pressSearch: Boolean,
        fixed: Boolean,
    },
    data() {
        const years = [];

        for (let i = 1920; i <= 2019; i++) {
            years.push(i);
        }

        return {
            years: years,
            year: this.$store.state.home.year_filter,
            searchText: this.$store.state.home.text_filter,
            combine_filter: this.$store.state.home.combine_filter,
            filter_rating: this.$store.state.home.votes_filter,
            filter_genres: this.$store.state.home.genres_filter,
            sort_key: 'genre',
            sort_order: 'desc',

            isOpen: !(this.fixed),
        }
    },
    computed: {
        ...mapGetters(['genres']),
    },
    async created() {
        this.$store.dispatch(FETCH_GENRES);
        this.update();

        if (this.pressSearch) {
            this.search();
        }
    },
    methods: {
        close() {
            this.isOpen = false
        },
        clearAll($event) {
            if ($event) {
                $event.preventDefault();
            }
            this.filter_genres = [];
        },
        selectAll($event) {
            if ($event) {
                $event.preventDefault();
            }
            let arr = [];
            for (let i = 0; i < this.$store.state.home.genres.length; i++) {
                arr.push(this.$store.state.home.genres[i].id);
            }

            this.filter_genres = arr;
        },
        isActiveRating(rating) {
            return rating <= this.filter_rating;
        },
        isSelectedGenre(id) {
            return this.filter_genres.includes(id);
        },
        async search($event) {
            if ($event)
                $event.preventDefault();

            if(this.pressSearch) {
                await this.$store.dispatch(FETCH_MOVIES);

                while (this.$store.getters.moviesFiltered.length < 20 /* || this.$store.getters.page < this.$store.getters.totalPages*/) {
                    console.log('[SEARCHFILTER] Загрузили мало!', this.$store.getters.moviesFiltered.length);
                    if (await this.$store.dispatch(LOAD_MORE)) {
                        break;
                    }
                }

                this.$store.commit('sortMovies');
            } else
                this.$router.replace({ name: 'SecondPage' });
        },
        setRating(rating) {
            this.filter_rating = rating;
        },
        toggleGenre(genre) {
            const i = this.filter_genres.indexOf(genre)
            if(i == -1) {
                this.filter_genres.push(genre);
            } else {
                this.filter_genres.splice(i, 1);
            }
        },
        update() {
            if (this.filter_genres.length)
                this.$store.dispatch(UPDATE_COMBINE, this.combine_filter);

            this.$store.dispatch(UPDATE_FILTERS, {
                text: this.searchText,
                genres: this.filter_genres,
                votes: this.filter_rating,
                year: this.year
            });
        }
    },
    watch: {
        searchText: debounce(function(newVal) {
            this.update();

            if (this.pressSearch) {
                this.search();
            }
        }, 500),
        filter_genres(newVal) {
            this.update();

            if (this.pressSearch) {
                this.search();
            }
        },
        filter_rating(newVal) {
            this.update();

            if (this.pressSearch) {
                this.search();
            }
        },
        year(newVal) {
            this.update();

            if (this.pressSearch) {
                this.search();
            }
        },
        combine_filter(newVal) {
            this.update();

            if (this.pressSearch && this.filter_genres.length) {
                this.search();
            }
        }
    }
}
</script>
