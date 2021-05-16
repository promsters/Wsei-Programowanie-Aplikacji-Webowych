import Notes from "./Notes";
import LocalAppStorage from "./Storage/LocalAppStorage";

export class App {
    constructor() {
        this.init();
    }

    private init(): void {
        new Notes(
            document.querySelector('.container'),
            new LocalAppStorage()
        );
    }
}
