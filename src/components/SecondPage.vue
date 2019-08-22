<template>
<div>
    <search-filter v-if="fixed" :pressSearch="true" :fixed="fixed"></search-filter>
	<div class="container" :class="{fixed:fixed}">
        <div class="row">
            <div role="main" class="col-md-9 ml-sm-auto col-lg-8">
                <search-filter v-if="!fixed" :pressSearch="true" :fixed="fixed"></search-filter>
                <film-list></film-list>
            </div>
            <div class="col-md-4">
                <sidebar></sidebar>
            </div>
        </div>
	</div>
</div>
</template>

<style scoped>
.container.fixed {
    margin-top: 100px;
}
</style>

<script>

export default {
    route: '/search',
    tag: 'SecondPage',
    title: 'Vue - Поиск фильма',
    data() {
        return {
            fixed: true,
        }
    },
}
</script>
