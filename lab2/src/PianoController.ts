const boomSound = require('../assets/sounds/boom.wav');

export class PianoController {
    element : HTMLElement;
    keys : PianoKey[];

    constructor(element: HTMLElement) {
        this.element = element;
        this.keys = [];

        this.init();
    }

    init(): void {
        this.registerKeys();
        this.registerKeyboard();
    }

    registerKeyboard(): void {
        document.addEventListener('keypress', (event) => {
            const pianoKey = this.getPianoKeyWithName(event.key);

            if (pianoKey !== null) {
                this.triggerKey(pianoKey);
            }
        });
    }

    registerKeys(): void {
        this.element.querySelectorAll('button').forEach((button) => {
            this.keys.push({
                element: button,
                name: button.innerText,
                sound: button.dataset.sound || null
            });
        });
    }

    getPianoKeyWithName(name: string): PianoKey {
        let found = null;
        this.keys.forEach((pianoKey) => {
            if (pianoKey.name === name) {
                found = pianoKey;
            }
        });

        return found;
    }

    triggerKey(pianoKey : PianoKey): void {
        console.log(pianoKey.name, pianoKey.sound);
        new Audio(boomSound).play();
    }
}

interface PianoKey {
    element: HTMLButtonElement;
    name : string;
    sound : string;
}
