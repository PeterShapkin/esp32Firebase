import Vue from 'vue'
import Router from 'vue-router'

import SignIn from '../routerViews/SignIn'
import Dashboard from '../components/Dashboard'

Vue.use(Router)

export default new Router ({
    routes: [
        {
            path: '/',
            name: 'SignIn',
            component: SignIn
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        }
    ]
})
