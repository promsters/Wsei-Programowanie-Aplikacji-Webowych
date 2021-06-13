/**
 * @jest-environment jsdom
 */
import LocalAppStorage from "../src/Storage/LocalAppStorage";
import Note from "../src/Note";

test('it correctly persist notes', async () => {
    const storage = new LocalAppStorage();

    const note = new Note("Test note", "Test note message", "#fff", false, new Date(), null, null);

    expect((await storage.addNote(note)).id.length).toBeGreaterThan(0);
    expect((await storage.getNotes()).length).toBe(1);
});