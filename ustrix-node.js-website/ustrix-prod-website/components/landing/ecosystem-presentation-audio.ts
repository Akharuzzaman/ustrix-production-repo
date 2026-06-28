type PresentationAudio = {
  enable: () => void;
  disable: () => void;
  playSceneTransition: () => void;
  playWorkflowTick: () => void;
  dispose: () => void;
};

export function createPresentationAudio(): PresentationAudio {
  let context: AudioContext | null = null;
  let masterGain: GainNode | null = null;
  let ambientOscillators: OscillatorNode[] = [];
  let enabled = false;

  const ensureContext = () => {
    if (!context) {
      context = new AudioContext();
      masterGain = context.createGain();
      masterGain.gain.value = 0;
      masterGain.connect(context.destination);
    }

    if (context.state === 'suspended') {
      void context.resume();
    }

    return context;
  };

  const setMasterVolume = (value: number) => {
    if (!context || !masterGain) {
      return;
    }

    masterGain.gain.setTargetAtTime(value, context.currentTime, 0.12);
  };

  const startAmbient = () => {
    const audio = ensureContext();
    if (ambientOscillators.length > 0 || !masterGain) {
      return;
    }

    const output = masterGain;
    if (!output) {
      return;
    }

    const frequencies = [55, 82.5, 110];
    ambientOscillators = frequencies.map((frequency) => {
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.value = frequency === 55 ? 0.07 : 0.03;
      oscillator.connect(gain);
      gain.connect(output);
      oscillator.start();
      return oscillator;
    });
  };

  const stopAmbient = () => {
    ambientOscillators.forEach((oscillator) => {
      try {
        oscillator.stop();
      } catch {
        /* already stopped */
      }
    });
    ambientOscillators = [];
  };

  const playTone = (
    frequencyStart: number,
    frequencyEnd: number,
    duration: number,
    volume: number,
    type: OscillatorType = 'sine',
  ) => {
    if (!enabled || !masterGain) {
      return;
    }

    const audio = ensureContext();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    const now = audio.currentTime;

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequencyStart, now);
    oscillator.frequency.exponentialRampToValueAtTime(
      Math.max(frequencyEnd, 1),
      now + duration * 0.7,
    );
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(gain);
    gain.connect(masterGain);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.05);
  };

  return {
    enable: () => {
      enabled = true;
      ensureContext();
      startAmbient();
      setMasterVolume(0.42);
    },
    disable: () => {
      enabled = false;
      stopAmbient();
      setMasterVolume(0);
    },
    playSceneTransition: () => {
      playTone(180, 360, 0.35, 0.09);
      playTone(90, 120, 0.5, 0.05, 'triangle');
    },
    playWorkflowTick: () => {
      playTone(520, 680, 0.12, 0.06);
    },
    dispose: () => {
      stopAmbient();
      if (context) {
        void context.close();
      }
      context = null;
      masterGain = null;
      enabled = false;
    },
  };
}
