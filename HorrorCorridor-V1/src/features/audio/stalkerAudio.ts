import type { EndlessExpeditionSnapshot, MonsterCueKind } from "@/types/shared";

export type StalkerAudio = Readonly<{
  resume: () => Promise<void>;
  update: (expedition: EndlessExpeditionSnapshot | null) => void;
  dispose: () => void;
}>;

type BrowserAudioWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

const cuePattern = (kind: MonsterCueKind): readonly Readonly<{
  delay: number;
  duration: number;
  frequency: number;
  endFrequency: number;
  type: OscillatorType;
}>[] => {
  switch (kind) {
    case "knock":
      return [0, 0.13, 0.28].map((delay) => ({
        delay,
        duration: 0.075,
        frequency: 84,
        endFrequency: 44,
        type: "square" as const,
      }));
    case "scrape":
      return [{ delay: 0, duration: 0.62, frequency: 310, endFrequency: 72, type: "sawtooth" }];
    case "breath":
      return [
        { delay: 0, duration: 0.5, frequency: 48, endFrequency: 82, type: "sine" },
        { delay: 0.08, duration: 0.58, frequency: 164, endFrequency: 96, type: "triangle" },
      ];
    case "footstep":
    default:
      return [
        { delay: 0, duration: 0.16, frequency: 62, endFrequency: 31, type: "sine" },
        { delay: 0.04, duration: 0.11, frequency: 118, endFrequency: 42, type: "triangle" },
      ];
  }
};

export const createStalkerAudio = (): StalkerAudio => {
  let context: AudioContext | null = null;
  let master: GainNode | null = null;
  let disposed = false;
  let lastCueKey = "";

  const ensureContext = (): AudioContext | null => {
    if (disposed || typeof window === "undefined") return null;
    if (context) return context;
    const AudioContextConstructor =
      window.AudioContext ?? (window as BrowserAudioWindow).webkitAudioContext;
    if (!AudioContextConstructor) return null;
    context = new AudioContextConstructor();
    master = context.createGain();
    master.gain.value = 0.34;
    master.connect(context.destination);
    return context;
  };

  const resume = async (): Promise<void> => {
    const audioContext = ensureContext();
    if (audioContext?.state === "suspended") await audioContext.resume();
  };

  const playCue = (
    kind: MonsterCueKind,
    pan: number,
    intensity: number,
  ): void => {
    const audioContext = ensureContext();
    if (!audioContext || !master || audioContext.state !== "running") return;
    const now = audioContext.currentTime;
    const panner = audioContext.createStereoPanner();
    panner.pan.setValueAtTime(Math.max(-1, Math.min(1, pan)), now);
    panner.connect(master);

    let finalStop = now;
    for (const pulse of cuePattern(kind)) {
      const start = now + pulse.delay;
      const stop = start + pulse.duration;
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = pulse.type;
      oscillator.frequency.setValueAtTime(pulse.frequency, start);
      oscillator.frequency.exponentialRampToValueAtTime(
        Math.max(1, pulse.endFrequency),
        stop,
      );
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(
        Math.max(0.008, Math.min(0.23, intensity * 0.16)),
        start + Math.min(0.025, pulse.duration * 0.25),
      );
      gain.gain.exponentialRampToValueAtTime(0.0001, stop);
      oscillator.connect(gain);
      gain.connect(panner);
      oscillator.start(start);
      oscillator.stop(stop + 0.01);
      finalStop = Math.max(finalStop, stop + 0.02);
    }
    window.setTimeout(() => panner.disconnect(), Math.max(1, (finalStop - now) * 1000 + 40));
  };

  const update = (expedition: EndlessExpeditionSnapshot | null): void => {
    const encounter = expedition?.activeEncounter;
    if (!encounter) return;
    const cueKey = `${encounter.id}:${encounter.audioCue.serial}`;
    if (cueKey === lastCueKey) return;
    lastCueKey = cueKey;
    playCue(encounter.audioCue.kind, encounter.audioCue.pan, encounter.audioCue.intensity);
  };

  return Object.freeze({
    resume,
    update,
    dispose: () => {
      disposed = true;
      master?.disconnect();
      master = null;
      if (context && context.state !== "closed") void context.close();
      context = null;
    },
  });
};
