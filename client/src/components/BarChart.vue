<script>
import { Bar } from 'vue-chartjs'

export default {
    extends: Bar,
    props: ['result'],
    data() {
        return {
            colors: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(255, 205, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(201, 203, 207, 0.8)',
            ],
            options: {
                legend: {
                    display: false,
                },
                maintainAspectRatio: false,
            },
        }
    },
    methods: {
        getChartData(result) {
            if (!result.answers) return
            return {
                labels: result.answers.map(a => a.text),
                datasets: [
                    {
                        label: result.text,
                        backgroundColor: this.getColor,
                        data: result.answers.map(a => a.votes),
                    },
                ],
            }
        },
        getColor(context) {
            const index = context.dataIndex
            return this.colors[index % this.colors.length]
        },
    },
    mounted() {
        this.renderChart(this.getChartData(this.result), this.options)
    },
    watch: {
        result: function() {
            this.renderChart(this.getChartData(this.result), this.options)
        },
    },
}
</script>