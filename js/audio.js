// ============================================================
// 생태계 먹이 그물 대작전! - Web Audio API 효과음 모듈
// 별도의 mp3/wav 파일 없이 코드만으로 경쾌한 효과음을 생성합니다.
// ============================================================

const SoundFX = {
  ctx: null,      // 브라우저 오디오 엔진 객체
  muted: false,   // 음소거 여부 (true면 소리가 나지 않음)

  // 오디오 엔진 초기화 (브라우저 정책상 사용자가 버튼을 클릭한 뒤에 활성화됩니다)
  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  },

  // 음소거 켜기/끄기 전환
  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  },

  // 기본 음(Beep) 1개를 재생하는 도우미 함수
  // freq: 주파수(높을수록 높은 음), duration: 길이(초), type: 음색(sine/triangle/square/sawtooth)
  playTone(freq, duration = 0.12, type = "sine", volume = 0.15, delay = 0) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime + delay;
    const oscillator = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, now);

    // 소리가 뚝 끊기지 않도록 자연스럽게 페이드아웃 처리
    gainNode.gain.setValueAtTime(volume, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    oscillator.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    oscillator.start(now);
    oscillator.stop(now + duration);
  },

  // ☀️ 햇살 획득 소리 (맑고 높은 2연음)
  playSun() {
    this.playTone(660, 0.1, "sine", 0.14, 0);
    this.playTone(880, 0.14, "sine", 0.14, 0.07);
  },

  // 🌿 식물 섭취 / 먹이 사냥 소리 (콤보가 높을수록 음이 점점 높아짐!)
  playEat(combo = 1) {
    const baseFreq = 440 + Math.min(combo, 5) * 65;
    this.playTone(baseFreq, 0.09, "triangle", 0.16, 0);
    this.playTone(baseFreq * 1.25, 0.11, "triangle", 0.14, 0.06);
  },

  // 🦴 사체 획득 소리
  playPickup() {
    this.playTone(392, 0.08, "sine", 0.14, 0);
    this.playTone(523, 0.1, "sine", 0.14, 0.06);
  },

  // 🍄 분해자 물질 순환 완료 소리 (상승하는 자연 화음)
  playCycle() {
    this.playTone(523, 0.12, "sine", 0.15, 0);
    this.playTone(659, 0.12, "sine", 0.15, 0.09);
    this.playTone(784, 0.14, "sine", 0.16, 0.18);
    this.playTone(1046, 0.22, "triangle", 0.18, 0.27);
  },

  // ✨ 상위 동물로 변신(진화) 소리
  playEvolve() {
    const notes = [523, 659, 784, 1046];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 0.15, "triangle", 0.16, idx * 0.08);
    });
  },

  // ⚠️ 상위 포식자에게 잡혔을 때 경고/피격 소리
  playHit() {
    this.playTone(220, 0.16, "sawtooth", 0.14, 0);
    this.playTone(150, 0.22, "sawtooth", 0.14, 0.1);
  },

  // 🎉 스테이지 클리어 팡파르
  playClear() {
    const melody = [523, 659, 784, 659, 1046];
    const timings = [0, 0.11, 0.22, 0.33, 0.44];
    melody.forEach((freq, i) => {
      this.playTone(freq, i === 4 ? 0.35 : 0.12, "triangle", 0.18, timings[i]);
    });
  },

  // 💀 게임 오버 소리
  playGameOver() {
    const notes = [392, 349, 311, 261];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 0.2, "sawtooth", 0.12, idx * 0.14);
    });
  },
};