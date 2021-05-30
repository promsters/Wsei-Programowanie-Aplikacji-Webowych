import {htmlToElement} from "./Utils";

class Colorpicker {
    private container: HTMLElement;
    private selectHandler: (color: string) => void;

    constructor(container: HTMLElement, colors: string[]) {
        this.container = container;
        this.init(colors);
    }

    private init(colors: string[]): void {
        colors.forEach((color: string) => {
            const element = htmlToElement(`
                <span class="pick" data-color="${color}" style="--background: ${color};"></span>
            `);

            this.container.append(element);
            element.addEventListener('click', () => {
                this.selectHandler(color);
                this.hide();
            });
        });
    }

    show(trigger: HTMLElement, selectHandler: (color: string) => void): void {
        this.container.style.left = `${trigger.getBoundingClientRect().left + 20}px`;
        this.container.style.top = `${trigger.getBoundingClientRect().top + 20}px`;

        this.container.style.display = 'flex';

        this.selectHandler = selectHandler;
    }

    hide(): void {
        this.container.style.display = 'none';
        this.container.style.left = '';
        this.container.style.top = '';
        this.selectHandler = null;
    }
}

export default Colorpicker;
