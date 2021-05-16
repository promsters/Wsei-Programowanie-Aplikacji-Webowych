import Note from "./Note";

interface AppStorage {
    saveNotes(notes: Note[]): void;
    getNotes(): Note[];
}

export default AppStorage;
