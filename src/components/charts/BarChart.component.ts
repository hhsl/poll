import { mixins as chartMixins, Bar } from 'vue-chartjs';
import { Prop, Component, Mixins } from 'vue-property-decorator';
import { ChartOptions, ChartData } from '@/components/charts/types';

const { reactiveProp } = chartMixins;

@Component({})
export default class BarChartComponent extends Mixins(Bar, reactiveProp) {
    @Prop() private options!: ChartOptions;
    @Prop() private chartData!: ChartData;

    public mounted() {
        this.renderChart(this.chartData, this.options);
    }
}
