import Note from "./Note";
import AppStorage from "./AppStorage";
import Colorpicker from "./Colorpicker";

const NoteColors = [
    '#3dd9c3', '#f530a5', '#6af51a', '#144274',
    '#000000', '#b564cc', '#78a7fe', '#5aca86',
    '#655855', '#ee4047', '#e5fd9c', '#688f8b',
    '#e4e32f', '#99adda', '#7f492b', '#510758'
];

class Notes {
    private notes: Note[];
    private container: HTMLElement;
    private storage: AppStorage;
    private colorpicker: Colorpicker;

    constructor(container: HTMLElement, storage: AppStorage) {
        this.container = container;
        this.storage = storage;
        this.colorpicker = new Colorpicker(
            container.querySelector('.color-picker'),
            NoteColors
        );

        this.init();
    }

    private init(): void {
        this.storage.getNotes().then(notes => {
            this.notes = notes;
            this.renderNotes();
        })

        this.registerListeners();
    }

    private registerListeners(): void {
        const form = this.container.querySelector('#addNoteContainer');
        form.querySelector('button').addEventListener('click', () => {
            const note = new Note(
                (form.querySelector('input[name=title]') as HTMLInputElement).value,
                (form.querySelector('textarea[name=message]') as HTMLTextAreaElement).value
            );

            this.storage.addNote(note).then(note => {
                this.notes.push(note);
                this.renderNotes();
            });
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
            this.registerColorpickAction(element, note);
        });
    }

    private registerPinAction(element: HTMLElement, note: Note): void {
        const pin = element.querySelector('.pin');
        pin.addEventListener('click', () => {
            note.togglePinned();
            this.storage.updateNote(note);
            this.renderNotes();
        });
    }

    private registerDeleteAction(element: HTMLElement, note: Note): void {
        const delButton = element.querySelector('.remove');
        delButton.addEventListener('click', () => {
            this.notes.splice(this.notes.indexOf(note), 1);
            this.storage.removeNote(note);
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

            this.storage.updateNote(note);
            this.renderNotes();

            document.body.classList.remove('edit-mode');
        });
    }

    private registerColorpickAction(element: HTMLElement, note: Note): void {
        const colorButton = element.querySelector('.change-color') as HTMLElement;

        colorButton.addEventListener('click', () => {
            this.colorpicker.show(colorButton, (color: string) => this.onNoteColorSelection(note, color));
        });
    }

    private onNoteColorSelection(note: Note, color: string): void {
        note.color = color;
        this.storage.updateNote(note);
        this.renderNotes();
    }
}

export default Notes;
