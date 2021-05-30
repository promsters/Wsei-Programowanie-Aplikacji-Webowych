import Note from "./Note";

interface AppStorage {
    addNote(note: Note): Promise<Note>;
    removeNote(note: Note): void;
    updateNote(note: Note): void;
    getNotes(): Promise<Note[]>;
}

export default AppStorage;
