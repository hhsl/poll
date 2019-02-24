import { mixins as chartMixins, Bar } from 'vue-chartjs';
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ChartOptions, ChartData } from '@/components/charts/types';

const { reactiveProp } = chartMixins;

@Component({})
export default class BarChartComponent extends mixins(reactiveProp, Bar) {
    @Prop() private chartOptions!: ChartOptions;
    @Prop() private chartData!: ChartData;

    public mounted() {
        this.renderChart(this.chartData, this.chartOptions);
    }
}
