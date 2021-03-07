import {CalculatorInterface} from "./CalculatorInterface";
import {SumCalculator} from "./SumCalculator";

export class AvgCalculator implements CalculatorInterface {
    calculate(numbers: Array<number>): number {
        const length: number = numbers.length;
        return new SumCalculator().calculate(numbers)/length;
    }
}
