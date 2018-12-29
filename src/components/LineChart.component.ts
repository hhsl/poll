import { mixins as chartMixins, Line } from 'vue-chartjs';
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

const { reactiveProp } = chartMixins;

export interface ChartData {
    labels: number[];
    datasets: any[];
}

export interface ChartOptions {
    responsive?: boolean;
}

@Component({})
export class LineChartComponent extends mixins(reactiveProp, Line) {
    @Prop() private chartOptions!: ChartOptions;
    @Prop() private chartData!: ChartData;

    public mounted() {
        this.renderChart(this.chartData, this.chartOptions);
    }
}
