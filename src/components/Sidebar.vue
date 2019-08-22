<template>
    <div class="col-md-12 sticky-sidebar">
        <div class="sidebar">
            <div v-if="selectedMovie">
                <h4>{{selectedMovie.title}}</h4>
                <img :src="`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`" alt="" class="poster">
                <!-- <div class="poster" :style="{'background-image':`url('https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}')`}"></div> -->
                {{selectedMovie}}
            </div>
            <div v-else>
                <p>Выберите фильм, чтобы узнать подробности</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.poster {
    display: block;
    width: 100%;
    max-width: 250px;
}
.sticky-sidebar {
    position:fixed;
    max-width: 24%;
    height: 100%;
}
.sidebar {
    background: #1d1d1d;
    padding: 20px 30px;
    color: #fff;
    height: 100%;
    overflow-y: scroll;
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
    tag: 'sidebar',
    computed: {
        ...mapGetters(['selectedMovie']),
    },
}
</script>
