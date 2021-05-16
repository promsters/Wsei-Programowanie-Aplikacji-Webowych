class Note {
    private title: string;
    private message: string;
    private color: string;
    private pinned: boolean;
    private createdAt: Date;
    private editedAt?: Date;

    constructor(
        title: string,
        message: string,
        color: string = "red",
        pinned: boolean = false,
        createdAt: Date = new Date(),
        editedAt: Date = null
    ) {
        this.title = title;
        this.message = message;
        this.color = color;
        this.pinned = pinned;
        this.createdAt = createdAt;
        this.editedAt = editedAt;
    }

    static createFromJson(data: NoteInterface): Note {
        return new Note(
            data.title,
            data.message,
            data.color,
            data.pinned,
            new Date(data.createdAt),
            data.editedAt !== null ? new Date(data.editedAt) : null
        );
    }
}

interface NoteInterface {
    title: string;
    message: string;
    color: string;
    pinned: boolean;
    createdAt: string;
    editedAt?: string;
}

export {NoteInterface};
export default Note;
