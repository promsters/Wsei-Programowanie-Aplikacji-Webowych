import {SoundManager} from "./SoundManager";
import {EventDispatcher, Handler} from "./EventDispatcher";
import {PianoPlayKeyEvent} from "./PianoController";

export class RecordChannel {
    soundManager: SoundManager;
    element: HTMLElement;

    timeline: TimelineEntry[];

    isRecording: boolean;
    recordingStartTimestamp: number;

    isPlaying: boolean;
    playIndex: number;

    constructor(soundManager: SoundManager, element: HTMLElement) {
        this.soundManager = soundManager;
        this.element = element;
        this.timeline = [];
    }

    public startRecording(): void {
        this.isRecording = true;
        this.recordingStartTimestamp = Date.now();
    }

    public stopRecording(): void {
        this.isRecording = false;
        this.recordingStartTimestamp = null;
    }

    public addSound(sound: string): void {
        if (!this.isRecording) {
            return;
        }
        const entry = {
            timestamp: Date.now() - this.recordingStartTimestamp,
            sound: sound
        };

        this.timeline.push(entry);
        this.recordChannelEntryAddEventEventDispatcher.fire({entry: entry});
    }

    public playChannel(): void {
        this.isPlaying = true;
        this.playIndex = 0;

        this.playTimeline();
    }

    private playTimeline(): void {
        if (this.timeline.length <= this.playIndex) {
            return;
        }

        const waitTime = this.playIndex !== 0 ? this.timeline[this.playIndex].timestamp - this.timeline[this.playIndex-1].timestamp : this.timeline[this.playIndex].timestamp;

        setTimeout(() => {
            if (!this.isPlaying) {
                return;
            }

            this.soundManager.play(this.timeline[this.playIndex].sound);

            this.playIndex++;
            this.playTimeline();
        }, waitTime);
    }

    public pauseChannel(): void {

    }

    public stopChannel(): void {
        this.isPlaying = false;
    }

    private recordChannelEntryAddEventEventDispatcher = new EventDispatcher<RecordChannelEntryAddEvent>();
    public onRecordChannelEntryAdd(handler: Handler<RecordChannelEntryAddEvent>) {
        this.recordChannelEntryAddEventEventDispatcher.register(handler);
    }
}

export interface TimelineEntry {
    timestamp: number;
    sound: string;
    label?: string;
}

export interface RecordChannelEntryAddEvent {
    entry: TimelineEntry;
}
