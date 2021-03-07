import {CalculatorInterface} from "./CalculatorInterface";

export class MaxCalculator implements CalculatorInterface {
    calculate(numbers: Array<number>): number {
        return numbers.reduce(function (prev, curr) {
            return curr > prev ? curr : prev;
        });
    }
}
