<template>
  <div id="app">
    <vue-headful
      :title="title"
    />
      <keep-alive>
        <router-view style="margin-top:30px;"></router-view>
      </keep-alive>
  </div>
</template>

<script>
import config from './helpers/config.js'

export default {
  name: 'app',
  data () {
    return {
      msg: config.projectName
    }
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  }
}
</script>

<style>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #333; 
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}


.container {
    max-width: 1440px;
}
body {
  min-height: 500px;
  background: #121212;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity .4s
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}
.flex-container {
    flex: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.flex-item {
    line-height: 0px;
    font-size: 0.8em;
    user-select: none;
    cursor: pointer;
    background: rgba(0,0,0,0.3);
    padding: 15px 5px;
    text-align: center;
    margin: 5px 5px 0 0;
    align-self: baseline;
    width: auto;
    color: #ececec;
}
.flex-item.selected {
    background: rgba(0,0,0,0.5);
    color: #fff;
}
.rating {
    unicode-bidi: bidi-override;
    direction: rtl;
}
.rating.noselect {
  pointer-events: none;
}
.rating > span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    width: 1em;
    font-size: 2em;
    transition: all .3s;
    margin-left: -3px;
}
.rating > span:last-child {
  margin-left: 0;
}
.rating > span:hover,
.rating > span:hover ~ span {
    color: transparent;
}

.rating > span:before {
    transition: all .3s;
}

.rating.noselect > span:before {
  color:inherit!important;
    content: "\2605";
    position: absolute;
    left: 0; 
}

.rating > span:hover {
    opacity: 0.5;
}
.rating > span:hover:before,
.rating > span:hover ~ span:before,
.rating > span:active ~ span:before,
.rating > span:active:before,
.rating > span.active:before {
    color:gold!important;
    content: "\2605";
    position: absolute;
    left: 0; 
}
.header {
	margin: 50px auto;
	text-align: center;
}
.block {
	background-color: #41b883;
    padding: 10px 20px;
    border-radius: 5px;
}
</style>
