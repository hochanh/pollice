import axios from 'axios'

const namespaced = true

const state = {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {}
}

const mutations = {
    auth_request(state){
        state.status = 'loading'
    },
    auth_success(state, token, user){
        state.status = 'success'
        state.token = token
        state.user = user
    },
    auth_error(state){
        state.status = 'error'
    },

    logout(state){
        state.status = ''
        state.token = ''
    },
}

const actions = {
    login: ({ commit }, token, user) => {
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = token
        commit('auth_success', token, user)
    },

    handleError: ({ commit }) => {
        commit('auth_error')
        localStorage.removeItem('token)')
    },

    logout: ({commit}) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
    },
}

const getters = {
    isLoggedIn: state => !!state.token,
}

export default {
    namespaced,
    state,
    getters,
    mutations,
    actions,
}