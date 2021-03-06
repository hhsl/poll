import { mixins as chartMixins, Line } from 'vue-chartjs';
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ChartOptions, ChartData } from '@/components/charts/types';

const { reactiveProp } = chartMixins;

@Component({})
export default class LineChartComponent extends mixins(reactiveProp, Line) {
    @Prop() private chartOptions!: ChartOptions;
    @Prop() private chartData!: ChartData;

    public mounted() {
        this.renderChart(this.chartData, this.chartOptions);
    }
}
