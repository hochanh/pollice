import axios from 'axios'
import env from '../config/env'

const baseUrl = env.serverUrl;

export default {
    createPoll(data, callback) {
        axios
            .post(`${baseUrl}/polls/`, data)
            .then(res => {
                callback(null, res.data)
            })
            .catch(error => {
                callback(error)
            })
    },
    auth(data, callback) {
        axios
            .post(`${baseUrl}/auth/`, data)
            .then(res => {
                callback(null, res.data)
            })
            .catch(error => {
                callback(error)
            })
    },
    vote(questionId, data, callback) {
        axios
            .post(`${baseUrl}/votes/${questionId}`, data)
            .then(res => {
                callback(null, res.data)
            })
            .catch(error => {
                callback(error)
            })
    },
    response(questionId, data, callback) {
        axios
            .post(`${baseUrl}/responses/${questionId}`, data)
            .then(res => {
                callback(null, res.data)
            })
            .catch(error => {
                callback(error)
            })
    },
    getPolls(callback) {
        axios
            .get(`${baseUrl}/polls`)
            .then(res => {
                callback(null, res.data)
            })
            .catch(error => {
                callback(error)
            })
    },
    getPoll(questionId, callback) {
        axios
            .get(`${baseUrl}/polls/${questionId}`)
            .then(res => {
                callback(null, res.data)
            })
            .catch(error => {
                callback(error)
            })
    },
    updatePoll(questionId, data, callback) {
        axios
            .put(`${baseUrl}/polls/${questionId}`, data)
            .then(res => {
                callback(null, res.data)
            })
            .catch(error => {
                callback(error)
            })
    },
    getResult(questionId, callback) {
        axios
            .get(`${baseUrl}/results/${questionId}`)
            .then(res => {
                let totalVotes = 0
                const votes = {}
                const question = res.data.question
                res.data.votes.forEach(vote => {
                    votes[vote._id] = vote.count
                    totalVotes += vote.count
                })
                question.answers = question.answers.map(answer =>
                    Object.assign(answer, {
                        votes: votes[answer._id] || 0,
                    })
                )
                question.totalVotes = totalVotes
                callback(null, question)
            })
            .catch(error => {
                callback(error)
            })
    },
    getResponses(questionId, callback) {
        axios
            .get(`${baseUrl}/responses/${questionId}`)
            .then(res => {
                callback(null, res.data)
            })
            .catch(error => {
                callback(error)
            })
    },
}
