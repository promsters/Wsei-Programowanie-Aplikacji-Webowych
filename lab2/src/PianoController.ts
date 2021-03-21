import {EventDispatcher, Handler} from "./EventDispatcher";

export class PianoController {
    element : HTMLElement;
    keys : PianoKey[];

    constructor(element: HTMLElement) {
        this.element = element;
        this.keys = [];

        this.init();
    }

    private init(): void {
        this.registerKeys();
        this.registerKeyboard();
    }

    private registerKeyboard(): void {
        document.addEventListener('keypress', (event) => {
            const pianoKey = this.getPianoKeyWithName(event.key);

            if (pianoKey !== null) {
                this.triggerKey(pianoKey);
            }
        });
    }

    private registerKeys(): void {
        this.element.querySelectorAll('button').forEach((button) => {
            this.keys.push({
                element: button,
                name: button.innerText,
                sound: button.dataset.sound || null
            });
        });
    }

    private getPianoKeyWithName(name: string): PianoKey {
        let found = null;
        this.keys.forEach((pianoKey) => {
            if (pianoKey.name === name) {
                found = pianoKey;
            }
        });

        return found;
    }

    private triggerKey(pianoKey : PianoKey): void {
        this.playKeyEventEventDispatcher.fire({pianoKey: pianoKey});
    }

    private playKeyEventEventDispatcher = new EventDispatcher<PianoPlayKeyEvent>();
    public onPlayKeyEvent(handler: Handler<PianoPlayKeyEvent>) {
        this.playKeyEventEventDispatcher.register(handler);
    }
}

interface PianoKey {
    element: HTMLButtonElement;
    name : string;
    sound : string;
}

export interface PianoPlayKeyEvent{
    pianoKey: PianoKey;
}
