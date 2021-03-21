import {PianoController} from "./PianoController";

export class Lab2Page {
    piano : PianoController;

    constructor() {
        this.init();
    }

    init(): void {
        this.piano = new PianoController(document.querySelector('.piano'));
    }
}
