import AppStorage from "../AppStorage";
import Note, {NoteInterface} from "../Note";
import firebase from "firebase";
import {CONFIG} from "../config";
import Firestore = firebase.firestore.Firestore;

class FirestoreAppStorage implements AppStorage
{
    private firestore: Firestore;
    constructor() {
        const fb = firebase.initializeApp(CONFIG.firebaseConfig);
        this.firestore = fb.firestore();
    }

    getNotes(): Promise<Note[]> {
        return this.firestore.collection('notes').get().then(res => {
            return res.docs.map((doc) => {
                const data = doc.data();

                return new Note(
                    data.title,
                    data.message,
                    data.color,
                    data.pinned,
                    data.createdAt.toDate(),
                    data.editedAt?.toDate(),
                    doc.ref.id
                );
            });
        })
    }

    async addNote(note: Note): Promise<Note> {
        await this.firestore.collection('notes').add(Object.assign({}, note)).then((docRef) => {
            note.id = docRef.id;
        });

        return new Promise<Note>((resolve => resolve(note)));
    }

    removeNote(note: Note): void {
        this.firestore.collection('notes').doc(note.id).delete();
    }

    updateNote(note: Note): void {
        this.firestore.collection('notes').doc(note.id).update(Object.assign({}, note));
    }
}

export default FirestoreAppStorage;
