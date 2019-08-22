/**
* Helper functions: string formatting, random, etc.
*/

import Vue from 'vue';

export default {
    /**
    * 
    * @param {Number} From  
    * @param {Number} To 
    */
    randomBetween(min, max) {
        return Math.floor(Math.random() * (max-min)) + min;
    },
    debounced(delay, fn) {
        let timerId;
        return function (...args) {
            if (timerId) {
                clearTimeout(timerId);
            }
            timerId = setTimeout(() => {
                fn(...args);
                timerId = null;
            }, delay);
        }
    },
    throttled(delay, fn) {
        let lastCall = 0;
        return function (...args) {
            const now = (new Date).getTime();
            if (now - lastCall < delay) {
                return;
            }
            lastCall = now;
            return fn(...args);
        }
    },
    
    bindDirectives() {
       
    },
};