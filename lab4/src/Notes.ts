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
        const form = this.container.querySelector('#addNoteContainer');
        form.querySelector('button').addEventListener('click', () => {
            const note = new Note(
                (form.querySelector('input[name=title]') as HTMLInputElement).value,
                (form.querySelector('textarea[name=message]') as HTMLTextAreaElement).value
            );

            this.notes.push(note);
            this.storage.saveNotes(this.notes);
            this.renderNotes();
        });
    }

    private renderNotes(): void {
        const notesContainer = this.container.querySelector('.notes-box:not(.pinned)');
        const pinnedNotesContainer = this.container.querySelector('.notes-box.pinned');
        notesContainer.innerHTML = '';
        pinnedNotesContainer.innerHTML = '';

        this.notes.forEach((note: Note, key: number) => {
            let node = note.getHtml() as HTMLElement;
            node.dataset.id = key.toString();
            if (note.pinned) {
                pinnedNotesContainer.append(node);
            } else {
                notesContainer.append(node);
            }
        });

        this.registerNoteListeners();
    }

    private registerNoteListeners(): void {
        this.container.querySelectorAll('.note').forEach((element: HTMLElement) => {
            const note = this.notes[parseInt(element.dataset.id)];

            this.registerPinAction(element, note);
            this.registerDeleteAction(element, note);
            this.registerEditAction(element, note);
        });
    }

    private registerPinAction(element: HTMLElement, note: Note): void {
        const pin = element.querySelector('.pin');
        pin.addEventListener('click', () => {
            note.togglePinned();
            this.renderNotes();
        });
    }

    private registerDeleteAction(element: HTMLElement, note: Note): void {
        const delButton = element.querySelector('.remove');
        delButton.addEventListener('click', () => {
            this.notes.splice(this.notes.indexOf(note), 1);
            this.renderNotes();
        });
    }

    private registerEditAction(element: HTMLElement, note: Note): void {
        const editButton = element.querySelector('.edit');
        const saveButton = element.querySelector('.edit-save');

        editButton.addEventListener('click', () => {
            element.classList.add('edited');
            document.body.classList.add('edit-mode');
        });

        saveButton.addEventListener('click', () => {
            const inputTitle = element.querySelector('[name="title"]') as HTMLInputElement;
            const inputMessage = element.querySelector('[name="message"]') as HTMLTextAreaElement;

            note.title = inputTitle.value;
            note.message = inputMessage.value;

            this.storage.saveNotes(this.notes);
            this.renderNotes();

            document.body.classList.remove('edit-mode');
        });
    }
}

export default Notes;
