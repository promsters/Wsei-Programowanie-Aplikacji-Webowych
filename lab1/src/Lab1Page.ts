import {StatsCalculator} from "./StatsCalculator";

export class Lab1Page {
    inputAmountElement: HTMLInputElement;
    statsContainer: HTMLElement;
    numberInputs: HTMLInputElement[];
    statsCalculator: StatsCalculator;

    constructor() {
        this.init();
    }

    init(): void {
        this.statsCalculator = new StatsCalculator();
        this.numberInputs = [];
        this.inputAmountElement = document.querySelector("#inputAmount");
        this.statsContainer = document.querySelector("#statsContainer");
        this.registerInputAmountChangeListener();
    }

    registerInputAmountChangeListener(): void {
        this.inputAmountElement.addEventListener("change", () => {
            this.handleInputElements(Number.parseInt(this.inputAmountElement.value));
        });
    }

    handleInputElements(count: number): void {
        if (count > this.numberInputs.length) {
            const toCreate = count-this.numberInputs.length;

            for(let i = 0;i < toCreate;i++) {
                this.addInputElement(
                    this.createInputElement()
                );
            }
        } else {
            while(this.numberInputs.length > count) {
                this.numberInputs.pop().remove();
            }
        }

        this.refreshStats();
    }

    addInputElement(inputEl: HTMLInputElement): void {
        if (this.numberInputs.length == 0) {
            this.inputAmountElement.after(inputEl);
        } else {
            this.numberInputs[this.numberInputs.length-1].after(inputEl);
        }
        this.numberInputs.push(inputEl);
    }

    createInputElement(): HTMLInputElement {
        const inputEl = document.createElement("input");
        inputEl.type = 'number';
        inputEl.classList.add('numberInput');

        inputEl.addEventListener("input", () => {
            this.refreshStats();
        });

        return inputEl;
    }

    refreshStats(): void {
        if (this.numberInputs.length === 0) {
            return;
        }

        const numbers: number[] = [];
        for (let input of this.numberInputs) {
            numbers.push(input.value.length > 0 ? Number.parseInt(input.value) : 0);
        }

        const stats = this.statsCalculator.calculateStats(numbers);

        this.statsContainer.innerHTML = '';
        for(let stat of stats) {
            this.statsContainer.innerHTML += `${stat.label}: ${stat.value}<br>`;
        }
    }
}
