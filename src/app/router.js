import Vue from 'vue'
import Router from 'vue-router'
import ConfigView from './views/ConfigView.vue'
import PwnedView from './views/PwnedView.vue'
import EssidView from  './views/EssidView.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',

    routes: [
        {
            path: '/',
            name: 'home',
            component: ConfigView
        },
        {
            path: '/pwned',
            name: 'Pwned',
            component: PwnedView
        },
        {
            path: '/pwned/:id',
            name: 'EssidView',
            component: EssidView
        }
    ]
});