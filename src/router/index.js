import Vue from 'vue'
import Router from 'vue-router'

import SignIn from '../routerViews/SignIn'
import Dashboard from '../components/Dashboard'

Vue.use(Router)

const router = new Router ({
    routes: [
        {
            path: '/',
            name: 'SignIn',
            component: SignIn,

            beforeEnter(to, from, next) {
                if (localStorage.getItem('auth') === 'true') {
                    // next({ path: '/:mac', params: {}})
                    next('/:mac')
                }
                else {
                    next()
                }
            }
        },
        {
            path: '/:mac',
            name: 'Dashboard',
            component: Dashboard,
            beforeEnter(to, from, next) {
                if (localStorage.getItem('auth') === 'true') {
                    next()
                }
                else {
                    next('/')
                }
            }
        }
    ]
})

export default router
