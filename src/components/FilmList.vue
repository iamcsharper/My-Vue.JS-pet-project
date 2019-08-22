<template>
    <div>
            <div v-if="!firstRun && isLoading" class="alert alert-danger" role="alert">Загрузка...</div>
            <div v-if="!firstRun && !isLoading && moviesFiltered.length <= 0" class="alert alert-danger" role="alert">К сожалению, фильмов по такому запросу не найдено. Возможно, вы выбрали слишком жесткие фильтры</div>
            <div v-if="moviesFiltered.length>0" key="mainCards">
                <div class="movie-card" v-for="(movie, i) in moviesFiltered" :key="i + '_movietitle'" style="position:relative"
                @click="setActiveMovie(movie.id)">
                    <h4>{{ movie.title}}</h4>
                    <p style="margin: 0">Дата выхода: <b>{{movie.release_date.split('-').reverse().join('.')}}</b></p>
                    <div class="rating noselect">
                        <span v-for="i in [10,9,8,7,6,5,4,3,2,1]" :key="i+'_rate'" :class="{active:movie.vote_average >= i  }">☆</span>
                    </div>
                    <p>{{ movie.overview }}</p>
                    <div class="flex-container">
                        <div class="flex-item selected" v-for="genre in getGenresNames(movie.genre_ids)" :key="genre">
                            {{ genre }}
                        </div>
                        <div style="width:100%"></div>
                    </div>
                    <div class="image" :style="{'background-image': imgPath(movie)}"></div>
                    <!-- <pre>{{ movie }}</pre> -->
                </div>
            </div>
            <div v-else key="placeholders">
                <div class="movie-card placeholder" v-for="i in [0,1,2,3]" :key="i + '_movietitle_'">
                    <h4>Загрузка...</h4>
                    <div class="rating">
                        <span v-for="i in [10,9,8,7,6,5,4,3,2,1]" :key="i+'_rate'" :class="{active:5 >= i  }">☆</span>
                    </div>
                    <p>Описание фильма...</p>
                    <div class="flex-container">
                        <div class="flex-item selected">
                            Жанр
                        </div>
                        <div style="width:100%"></div>
                    </div>
                    <!-- <pre>{{ movie }}</pre> -->
                </div>
            </div>
        <!-- </transition> -->
        <infinite-loading @infinite="loadMore"></infinite-loading>
    </div>
</template>

<style scoped>
.movie-card {
    width: 100%;
    margin-bottom: 30px;
    overflow: hidden;
    padding: 20px 30px;
    border-radius: 20px;
    color: #fff;
    cursor: pointer;
    transition: all .3s;
}
.movie-card:hover {
    transform: scale(1.033);
}
.movie-card .image {
    position:absolute; 
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0.9;
    z-index: -1;
    background-size:cover;
    background-repeat:no-repeat;
    background-position: center center;
    -webkit-filter:brightness(33%);
    filter: brightness(33%);
}
.movie-card.placeholder {
    opacity: 0.6;
    -webkit-filter: blur(3px);
    filter: blur(3px);
    pointer-events:none;
    user-select: none;
}
</style>

<script>
import InfiniteLoading from 'vue-infinite-loading';

import { mapGetters } from "vuex";
import {
    LOAD_MORE
} from '../store/actions.type';
import {
    SELECT_MOVIE
} from '../store/mutations.type';

export default {
    tag: 'film-list',
    components: {
        InfiniteLoading,
    },
    data() {
        return {
            count: 0,
            data: [],
            busy: false,
        }
    },
    computed: {
        ...mapGetters(['genres', 'moviesFiltered', 'isLoading', 'movies', 'firstRun']),
    },
    methods: {
        imgPath(movie) {
            if (!movie.poster_path)
                return `url('https://via.placeholder.com/500x300')`;
            return `url('https://image.tmdb.org/t/p/w500/${movie.poster_path}')`;
        },
        getGenresNames(genres) {
            return this.$store.state.home.genres.filter(genre => genres.includes(genre.id)).map(genre => genre.name);
        },
        loadMore($state) {
            if (!this.$store.getters.moviesFiltered)
                return;

            console.log('[FILMLIST] Loading more!');
            this.$store.dispatch(LOAD_MORE, $state);
        },
        setActiveMovie(id) {
            this.$store.dispatch('setActiveMovie', id);
        }
    }
}
</script>
