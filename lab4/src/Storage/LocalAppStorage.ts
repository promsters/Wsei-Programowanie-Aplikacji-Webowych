import AppStorage from "../AppStorage";
import Note, {NoteInterface} from "../Note";

class LocalAppStorage implements AppStorage {
    private key: string = "notes";

    private getNotesInternal(): Note[] {
        return (JSON.parse(localStorage.getItem(this.key)) ?? []).map((noteData: NoteInterface) => {
            return Note.createFromJson(noteData);
        });
    }

    private saveNotes(notes: Note[]): void {
        localStorage.setItem(this.key, JSON.stringify(notes));
    }

    getNotes(): Promise<Note[]>
    {
        return new Promise<Note[]>((resolve => resolve(this.getNotesInternal())));
    }

    addNote(note: Note): Promise<Note> {
        let notes = this.getNotesInternal();
        note.id = notes.length.toString();
        notes.push(note);

        this.saveNotes(notes);

        return new Promise<Note>((resolve) => resolve(note));
    }

    removeNote(note: Note): void {
        let notes = this.getNotesInternal();
        notes.splice(parseInt(note.id), 1);
        this.saveNotes(notes);
    }

    updateNote(note: Note): void {
        let notes = this.getNotesInternal();
        notes[parseInt(note.id)] = note;
        this.saveNotes(notes);
    }
}

export default LocalAppStorage;
