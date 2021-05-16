import Note from "./Note";
import AppStorage from "./AppStorage";

class Notes {
    private notes: Note[];
    private container: HTMLElement;
    private storage: AppStorage;

    constructor(container: HTMLElement, storage: AppStorage) {
        this.container = container;
        this.storage = storage;
        this.init();
    }

    private init(): void {
        this.notes = this.storage.getNotes();
        this.registerListeners();
        this.renderNotes();
    }

    private registerListeners(): void {
        const form = document.querySelector('#addNoteContainer');
        form.querySelector('button').addEventListener('click', () => {
            const note = new Note(
                (form.querySelector('input[name=title]') as HTMLInputElement).value,
                (form.querySelector('textarea[name=message]') as HTMLTextAreaElement).value
            );

            this.notes.push(note);
            this.storage.saveNotes(this.notes);
        });
    }

    private renderNotes(): void {
        console.log(this.notes);
    }
}

export default Notes;
