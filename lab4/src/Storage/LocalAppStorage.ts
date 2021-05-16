import AppStorage from "../AppStorage";
import Note, {NoteInterface} from "../Note";

class LocalAppStorage implements AppStorage {
    private key: string = "notes";
    getNotes(): Note[] {
        return (JSON.parse(localStorage.getItem(this.key)) ?? []).map((noteData: NoteInterface) => {
            return Note.createFromJson(noteData);
        });
    }

    saveNotes(notes: Note[]): void {
        localStorage.setItem(this.key, JSON.stringify(notes));
    }
}

export default LocalAppStorage;
