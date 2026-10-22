// Self-contained Web Audio API Ambient Synthesizer
// Provides atmospheric cyber audio with zero external dependencies and live frequency analysis

class AmbientSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private oscs: OscillatorNode[] = [];
  private filter: BiquadFilterNode | null = null;
  private intervalId: any = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 64;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.2, this.ctx.currentTime + 2);

    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(4, this.ctx.currentTime);

    // Warm chord drone frequencies (D minor ambient: D2, A2, F3, C4)
    const baseFreqs = [73.42, 110.0, 174.61, 261.63];
    this.oscs = [];

    baseFreqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

      // subtle detune for rich lush chorus
      osc.detune.setValueAtTime((idx - 1.5) * 8, this.ctx!.currentTime);

      gain.gain.setValueAtTime(0.12, this.ctx!.currentTime);

      osc.connect(gain);
      gain.connect(this.filter!);
      osc.start();
      this.oscs.push(osc);
    });

    this.filter.connect(this.masterGain);
    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);

    // Filter lfo sweep
    let phase = 0;
    this.intervalId = setInterval(() => {
      if (!this.ctx || !this.filter || !this.isPlaying) return;
      phase += 0.05;
      const cutoff = 380 + Math.sin(phase) * 220;
      this.filter.frequency.setTargetAtTime(cutoff, this.ctx.currentTime, 0.5);
    }, 100);

    this.isPlaying = true;
  }

  public stop() {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      setTimeout(() => {
        this.oscs.forEach(osc => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (e) {}
        });
        this.oscs = [];
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
      }, 900);
    }
    this.isPlaying = false;
  }

  public getFrequencyData(): Uint8Array {
    if (!this.analyser) return new Uint8Array(16);
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const ambientSynth = new AmbientSynth();
