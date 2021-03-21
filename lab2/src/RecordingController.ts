import {SoundManager} from "./SoundManager";
import {RecordChannel} from "./RecordChannel";
import {RecordChannelController} from "./RecordChannelController";
import {EventDispatcher, Handler} from "./EventDispatcher";
import {PianoPlayKeyEvent} from "./PianoController";

export class RecordingController {
    soundManager: SoundManager;
    element: HTMLElement;
    elements: ElementsObject;

    channelElements: RecordChannelElement[];

    constructor(soundManager: SoundManager, element: HTMLElement) {
        this.soundManager = soundManager;
        this.element = element;
        this.channelElements = [];

        this.elements = {
            channelsContainer: this.element.querySelector('.channels'),
            console: this.element.querySelector('.console')
        };

        this.init();
    }

    private init(): void {
        this.registerConsoleButtons();
    }

    private registerConsoleButtons(): void {
        this.elements.console.querySelectorAll('button[data-action]').forEach((button: HTMLElement) => {
            button.addEventListener('click', () => {
               this.onConsoleAction(button.dataset.action);
            });
        });
    }

    private onConsoleAction(action: string): void {
        switch(action) {
            case ConsoleActions.ADD_CHANNEL: {
                this.addChannel();
                break;
            }
        }
    }

    private addChannel(): void {
        const element = RecordingController.createChannelElement();
        const recordChannel = new RecordChannel(this.soundManager, element);

        this.elements.channelsContainer.appendChild(element);
        this.channelElements.push({
            element: element,
            channel: recordChannel
        });
        element.dataset.channelIndex = `${this.channelElements.length-1}`;

        this.registerChannelListeners(element);

        new RecordChannelController(element, recordChannel);
    }

    private removeChannel(index: number): void {
        this.channelElements[index].element.remove();
        delete this.channelElements[index];
    }

    private registerChannelListeners(element: HTMLElement): void {
        element.querySelector('.manage button[data-action="remove"]').addEventListener('click', () => {
            this.removeChannel(parseInt(element.dataset.channelIndex));
        });
    }

    public registerSound(sound: string): void {
        this.channelElements.forEach((channelElement) => {
            channelElement.channel.addSound(sound);
        });
    }

    private static createChannelElement(): HTMLElement {
        const div = document.createElement('div');
        div.classList.add('channel');

        const manageDiv = document.createElement('div');
        manageDiv.classList.add('manage');

        const buttonRemove = document.createElement('button');
        buttonRemove.innerText = 'Remove';
        buttonRemove.dataset['action'] = 'remove';
        const buttonRecord = document.createElement('button');
        buttonRecord.innerText = 'Record';
        buttonRecord.dataset['action'] = 'record';
        const buttonPlay = document.createElement('button');
        buttonPlay.innerText = 'Play';
        buttonPlay.dataset['action'] = 'play';

        manageDiv.appendChild(buttonRemove);
        manageDiv.appendChild(buttonRecord);
        manageDiv.appendChild(buttonPlay);

        div.appendChild(manageDiv);

        const timelineDiv = document.createElement('div');
        timelineDiv.classList.add('timeline');
        div.appendChild(timelineDiv);

        return div;
    }
}

interface ElementsObject {
    [key: string]: HTMLElement;
}

interface RecordChannelElement {
    element: HTMLElement,
    channel: RecordChannel
}

enum ConsoleActions {
    ADD_CHANNEL = 'add-channel'
}
