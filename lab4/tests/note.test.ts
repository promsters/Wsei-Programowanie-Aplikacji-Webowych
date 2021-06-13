import Note, {NoteInterface} from "../src/Note";

test('create note from json', () => {
    const data = {
        title: 'Asdf',
        message: 'ehe',
        color: '#fff',
        pinned: true,
        createdAt: '2021-06-01 11:24:56',
        editedAt: null,
        id: null
    } as NoteInterface;

    const note = Note.createFromJson(data);

    expect(note).toBeInstanceOf(Note);
    expect(note).toStrictEqual(new Note(
        data.title,
        data.message,
        data.color,
        data.pinned,
        new Date(data.createdAt),
        data.editedAt === null ? null : new Date(data.editedAt),
        data.id
    ));
});