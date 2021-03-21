export class SoundManager {
    audioSources: AudioSource;

    constructor() {
        this.init();
    }

    private init(): void {
        this.audioSources = {
            boom: new Audio('../../assets/sounds/boom.wav'),
            clap: new Audio('../../assets/sounds/clap.wav'),
            hihat: new Audio('../../assets/sounds/hihat.wav'),
            kick: new Audio('../../assets/sounds/kick.wav'),
            openhat: new Audio('../../assets/sounds/openhat.wav'),
            ride: new Audio('../../assets/sounds/ride.wav'),
            snare: new Audio('../../assets/sounds/snare.wav'),
            tink: new Audio('../../assets/sounds/tink.wav'),
            tom: new Audio('../../assets/sounds/tom.wav')
        };
    }

    play(soundName: string): void {
        if (!this.audioSources[soundName]) {
            return;
        }

        this.audioSources[soundName].currentTime = 0;
        this.audioSources[soundName].play();
    }
}


interface AudioSource {
    [key: string]: HTMLAudioElement;
}

export const SoundColors: SoundColor = {
    boom: "a30000",
    clap: "a35700",
    hihat: "a3a000",
    kick: "5aa300",
    openhat: "00a36a",
    ride: "00a393",
    snare: "006aa3",
    tink: "000ea3",
    tom: "6d00a3"
};

interface SoundColor {
    [key: string]: string;
}
