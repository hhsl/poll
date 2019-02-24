<template>
  <div class="hello">
    <LineChartComponent :chart-data="chartData" :chart-options="chartOptions"></LineChartComponent>
    <button @click="onFillData()">Randomize</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LineChartComponent from './LineChart.component';
import { ChartData, ChartOptions } from '@/components/charts/types';

@Component({
    components: {
        LineChartComponent
    }
})
export default class RandomChartComponent extends Vue {
    private chartData: ChartData;
    private chartOptions: ChartOptions;

    constructor() {
        super();
        this.chartData = this.getRandomChartData();
        this.chartOptions = {};
    }

    public onFillData(): void {
        this.chartData = this.getRandomChartData();
    }

    private getRandomChartData(): ChartData {
        return {
            labels: [this.getRandomInt(), this.getRandomInt()],
            datasets: [
                {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [this.getRandomInt(), this.getRandomInt()]
                }, {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [this.getRandomInt(), this.getRandomInt()]
                }
            ]
        };
    }

    private getRandomInt(): number {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
}
</script>
