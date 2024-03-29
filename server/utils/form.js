const env = require('../config/env')

const getVoteForm = (question, again) => {
    return {
        data: {
            metadata: {
                app_name: 'Pollice',
                app_id: 123456,
                title: question.text,
                submit_button: {
                    label: again ? 'Submit again' : 'Submit',
                    background_color: '#6666ff',
                    cta: 'request',
                    url: `${env.serverUrl}/qr/${question._id}`,
                },
                reset_button: {
                    label: 'Clear',
                    background_color: '#669999',
                },
                elements: [
                    {
                        label: null,
                        type: question.openEnded
                            ? 'input'
                            : question.multiple
                            ? 'checkbox'
                            : 'radio',
                        input_type: question.openEnded && !question.wordCloud ? 'textarea' : 'text',
                        display_type: 'inline',
                        required: true,
                        error: 'Opps! Please try again!',
                        name: question._id,
                        placeholder: question.text,
                        options: question.answers.map(answer => ({
                            label: answer.text,
                            value: answer._id,
                        })),
                    },
                ],
            },
        },
    }
}

const getErrorForm = (code, message) => ({
    meta: {
        code: code || 401411,
        message: message || "Something wrong happened!",
    },
})

module.exports = {
    getVoteForm,
    getErrorForm,
}
