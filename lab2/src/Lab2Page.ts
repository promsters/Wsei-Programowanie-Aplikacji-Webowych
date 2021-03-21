import {PianoController, PianoPlayKeyEvent} from "./PianoController";
import {SoundManager} from "./SoundManager";
import {RecordingController} from "./RecordingController";

export class Lab2Page {
    piano : PianoController;
    soundManager : SoundManager;
    recordingController : RecordingController;

    constructor() {
        this.init();
    }

    init(): void {
        this.soundManager = new SoundManager();

        this.piano = new PianoController(document.querySelector('.piano'));
        this.piano.onPlayKeyEvent((event: PianoPlayKeyEvent) => {
            this.onPianoPlay(event);
        })

        this.recordingController = new RecordingController(this.soundManager, document.querySelector('.recorder'));
    }

    onPianoPlay(event: PianoPlayKeyEvent): void {
        this.soundManager.play(event.pianoKey.sound);
        this.recordingController.registerSound(event.pianoKey.sound);
    }
}
