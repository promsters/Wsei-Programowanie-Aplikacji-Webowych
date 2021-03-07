import {CalculatorInterface} from "./CalculatorInterface";

export class SumCalculator implements CalculatorInterface {
    calculate(numbers: Array<number>): number {
        return numbers.reduce(function (prev, curr) {
            return prev + curr;
        });
    }
}
