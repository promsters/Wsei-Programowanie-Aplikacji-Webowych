import {RecordChannel, RecordChannelEntryAddEvent, TimelineEntry} from "./RecordChannel";
import {SoundColors} from "./SoundManager";

export class RecordChannelController {
    element: HTMLElement;
    recordChannel: RecordChannel;
    elements: ElementsObject = {
        recordButton: null,
        playButton: null,
        timeline: null
    };

    constructor(element: HTMLElement, recordChannel: RecordChannel) {
        this.element = element;
        this.recordChannel = recordChannel;

        this.elements = {
            recordButton: this.element.querySelector('.manage button[data-action="record"]'),
            playButton: this.element.querySelector('.manage button[data-action="play"]'),
            timeline: this.element.querySelector('.timeline')
        };

        this.init();
    }

    private init(): void {
        this.registerActionListeners();

        this.recordChannel.onRecordChannelEntryAdd((event: RecordChannelEntryAddEvent) => {
            this.onRecordChannelEntryAdded(event.entry);
        });
    }

    registerActionListeners(): void {
        this.element.querySelectorAll('.manage button').forEach((button : HTMLElement) => {
            button.addEventListener('click', () => {
                this.onManageAction(button.dataset.action);
            });
        });
    }

    onManageAction(action: string): void {
        switch(action) {
            case ManageActions.RECORD_ACTION: {
                if (this.recordChannel.isRecording) {
                    this.recordChannel.stopRecording();
                    this.elements.recordButton.classList.remove('active');
                } else {
                    this.recordChannel.startRecording();
                    this.elements.recordButton.classList.add('active');
                }
                break;
            }

            case ManageActions.PLAY_ACTION: {
                if (this.recordChannel.isPlaying) {
                    this.recordChannel.stopChannel();
                    this.elements.playButton.classList.remove('active');
                } else {
                    this.recordChannel.playChannel();
                    this.elements.playButton.classList.add('active');
                }
                break;
            }
        }
    }

    onRecordChannelEntryAdded(entry: TimelineEntry): void {
        const div = document.createElement('div');
        div.style.width = '10px';
        div.style.backgroundColor = "#" + SoundColors[entry.sound];
        div.style.left = `${(entry.timestamp/1000) * 40}px`

        this.elements.timeline.appendChild(div);
    }
}

enum ManageActions {
    RECORD_ACTION = 'record',
    PLAY_ACTION = 'play'
}

interface ElementsObject {
    [key: string]: HTMLElement;
}
