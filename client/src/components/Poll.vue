<template>
    <div class="poll-view">
        <div class="poll-view__title">{{ questionId ? 'Edit poll' : 'New poll' }}</div>
        <div class="poll-view__inner">
            <div class="px-20-pc">
                <div class="poll-view__question">
                    <input
                        class="poll-input"
                        v-model="question.text"
                        type="text"
                        placeholder="Your Question..."
                    />
                </div>
                <div class="poll-view__answers" v-if="!question.openEnded">
                    <div
                        v-for="(answer, index) in question.answers"
                        :key="index"
                        class="answer"
                        :style="{zIndex: question.answers.length - index}"
                    >
                        <input
                            class="poll-input"
                            :placeholder="'Answer ' + (index + 1)"
                            @focus="createNewInput(index)"
                            v-model="question.answers[index].text"
                            type="text"
                        />
                        <span class="delete" @click="deleteInput(index)">X</span>
                    </div>
                </div>
                <div class="poll-view__options">
                    <div class="custom-checkbox">
                        <label for="multiple" class="label-cbx">
                            <input
                                v-model="question.multiple"
                                id="multiple"
                                type="checkbox"
                                class="invisible"
                            />
                            <div class="checkbox">
                                <svg width="48" height="48" viewBox="0 0 48 48">
                                    <circle cx="24" cy="24" r="11" />
                                    <polyline points="19 26 24 29 29 18" />
                                </svg>
                            </div>
                            <span class="checkbox-title">Allow multiple votes</span>
                        </label>
                    </div>

                    <div class="custom-checkbox">
                        <label for="openEnded" class="label-cbx">
                            <input
                                v-model="question.openEnded"
                                id="openEnded"
                                type="checkbox"
                                class="invisible"
                            />
                            <div class="checkbox">
                                <svg width="48" height="48" viewBox="0 0 48 48">
                                    <circle cx="24" cy="24" r="11" />
                                    <polyline points="19 26 24 29 29 18" />
                                </svg>
                            </div>
                            <span class="checkbox-title">Is open-ended question</span>
                        </label>
                    </div>

                    <div class="custom-checkbox" v-if="question.openEnded">
                        <label for="wordCloud" class="label-cbx">
                            <input
                                v-model="question.wordCloud"
                                id="wordCloud"
                                type="checkbox"
                                class="invisible"
                            />
                            <div class="checkbox">
                                <svg width="48" height="48" viewBox="0 0 48 48">
                                    <circle cx="24" cy="24" r="11" />
                                    <polyline points="19 26 24 29 29 18" />
                                </svg>
                            </div>
                            <span class="checkbox-title">Make a word cloud</span>
                        </label>
                    </div>
                </div>
                <div class="poll-view__submit">
                    <button
                        class="btn btn-save"
                        @click="upsertPoll"
                    >{{ questionId ? 'Update' : 'Save' }}</button>
                </div>
            </div>
            <div
                class="poll-view__info"
                :class="{'success' : success === true, 'error' : success === false}"
                v-if="success !== null"
            >
                <div v-if="success === true">{{ questionId ? 'Updated' : 'Created' }}</div>
                <div v-if="success === false">Error</div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../services/api'

export default {
    name: 'poll-create',
    data() {
        return {
            question: {
                text: '',
                answers: [{ text: '' }, { text: '' }],
                multiple: false,
                openEnded: false,
                wordCloud: false,
            },
            success: null,
            questionId: null,
        }
    },
    mounted() {
        this.questionId = this.$route.params.questionId
        if (this.questionId) {
            api.getPoll(this.questionId, (err, question) => {
                if (!err) this.question = question
            })
        } else {
            if (this.question.answers.length == 0) {
                this.question.answers.push({ answer: '' })
            }
        }
    },
    methods: {
        createNewInput(index) {
            if (this.question.answers.length - 1 == index) {
                this.question.answers.push({ answer: '' })
            }
        },
        deleteInput(index) {
            if (index > 0 || this.question.answers.length > 1) {
                this.question.answers.splice(index, 1)
            }
        },
        upsertPoll() {
            if (this.questionId) this.updatePoll()
            else this.createPoll()
        },
        createPoll() {
            this.clean()
            api.createPoll(this.question, err => {
                if (err) this.alert(false)
                else {
                    this.alert(true)
                    setTimeout(() => {
                        this.$router.push({ name: 'poll-list' })
                    }, 1500)
                }
            })
        },
        updatePoll() {
            this.clean()
            api.updatePoll(this.questionId, this.question, (err, question) => {
                if (err) this.alert(false)
                else {
                    this.alert(true)
                    this.questionId = question._id
                    setTimeout(() => {
                        this.$router.push({ name: 'poll-list' })
                    }, 1500)
                }
            })
        },
        clean() {
            this.question.answers = this.question.answers.filter(
                answer => answer.text && answer.text.length
            )
        },
        alert(success) {
            this.success = success
            setTimeout(() => {
                this.success = null
            }, 3000)
        },
    },
}
</script>

<style lang="scss">
@import '../assets/pollice.scss';
</style>
