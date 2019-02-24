<template>
    <div class="bar-chart">
        <h2>
            {{ poll.title }}
        </h2>

        <ul>
            <li v-for="option in poll.options" :key="option.id">
                {{ option.text }} {{ option.count }}
                <button @click="onVote(option.id)">vote</button>
            </li>
        </ul>

        <BarChartComponent :chart-data="chartData" :chart-options="chartOptions"></BarChartComponent>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Poll, UUID, PollOption } from '@/components/poll/types';
import { ChartOptions, ChartData } from '@/components/charts/types';
import BarChartComponent from '@/components/charts/BarChart.component';
import { LOCAL_STORAGE_USERID } from '@/components/user/CreateUser.vue';
import POLL_VOTE_ADD from '@/graphql/PollVoteAdd.gql';

@Component({
    components: {
        BarChartComponent
    }
})
export default class ThePoll extends Vue {
    @Prop() public poll!: Poll;

    public chartData: ChartData;
    public chartOptions: ChartOptions;

    constructor() {
        super();

        this.chartData = {
            labels: this.poll.options.map((option) => option.text),
            datasets: this.poll.options.map((option) => {
                    return {
                        label: option.text,
                        data: [option.count],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)'
                        ],
                    };
                })
        };

        this.chartOptions = {
            responsive: false,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1
                        }
                    }
                ]
            }
        };

    }

    public async onVote(optionId: UUID) {
        return await this.$apollo.mutate({
            mutation: POLL_VOTE_ADD,
            variables: {
                created_for: optionId,
                created_by: localStorage.getItem(LOCAL_STORAGE_USERID)
            }
        });
    }
}
</script>

<style lang="scss">
    canvas {
        margin: 0 auto;
    }
</style>
