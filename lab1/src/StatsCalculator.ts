import {Statistic} from "./Statistic";
import {SumCalculator} from "./Calculator/SumCalculator";
import {AvgCalculator} from "./Calculator/AvgCalculator";
import {MinCalculator} from "./Calculator/MinCalculator";
import {MaxCalculator} from "./Calculator/MaxCalculator";
import {CalculatorInterface} from "./Calculator/CalculatorInterface";

interface CalculatorConfig {
    label: string;
    calculator: CalculatorInterface;
}

export class StatsCalculator {
    private calculatorsConfig: CalculatorConfig[];

    constructor() {
        this.registerCalculators();
    }

    private registerCalculators(): void {
        this.calculatorsConfig = [
            <CalculatorConfig>{label: 'Suma', calculator: new SumCalculator()},
            <CalculatorConfig>{label: 'Średnia', calculator: new AvgCalculator()},
            <CalculatorConfig>{label: 'Min', calculator: new MinCalculator()},
            <CalculatorConfig>{label: 'Max', calculator: new MaxCalculator()},
        ];
    }

    calculateStats(numbers: number[]): Statistic[] {
        let stats = [];

        for(const statConfig of this.calculatorsConfig) {
            stats.push(<Statistic>{ label: statConfig.label, value: statConfig.calculator.calculate(numbers)})
        }

        return stats;
    }
}
