// ============================================================
// 생태계 먹이 그물 대작전! - Step 3
// (1단계 초원 + 2단계 중간 포식자 + 3단계 최종 포식자 & 분해자 순환 + 효과음)
// ============================================================

// 1. HTML 요소 가져오기
const titleScreen = document.getElementById("titleScreen");
const gameScreen = document.getElementById("gameScreen");
const startGameBtn = document.getElementById("startGameBtn");
const stagePickBtns = document.querySelectorAll(".btn-stage-pick[data-stage]");

// 브리핑 모달
const briefingModal = document.getElementById("briefingModal");
const briefingStageTag = document.getElementById("briefingStageTag");
const briefingTitle = document.getElementById("briefingTitle");
const briefingConcept = document.getElementById("briefingConcept");
const briefingRule = document.getElementById("briefingRule");
const closeBriefingBtn = document.getElementById("closeBriefingBtn");

// 도움말 모달
const helpBtn = document.getElementById("helpBtn");
const helpModal = document.getElementById("helpModal");
const helpStageTag = document.getElementById("helpStageTag");
const helpTitle = document.getElementById("helpTitle");
const helpConcept = document.getElementById("helpConcept");
const helpRule = document.getElementById("helpRule");
const helpTip = document.getElementById("helpTip");
const closeHelpBtn = document.getElementById("closeHelpBtn");

// 처음으로 확인 모달
const homeBtn = document.getElementById("homeBtn");
const homeConfirmModal = document.getElementById("homeConfirmModal");
const cancelHomeBtn = document.getElementById("cancelHomeBtn");
const confirmHomeBtn = document.getElementById("confirmHomeBtn");

// 소리 버튼
const soundBtn = document.getElementById("soundBtn");

// 스테이지 클리어 모달
const stageClearModal = document.getElementById("stageClearModal");
const clearStageTag = document.getElementById("clearStageTag");
const clearTitle = document.getElementById("clearTitle");
const stat1Label = document.getElementById("stat1Label");
const stat1Value = document.getElementById("stat1Value");
const stat2Label = document.getElementById("stat2Label");
const stat2Value = document.getElementById("stat2Value");
const stat3Label = document.getElementById("stat3Label");
const stat3Value = document.getElementById("stat3Value");
const clearSummary = document.getElementById("clearSummary");
const retryStageBtn = document.getElementById("retryStageBtn");
const nextStageBtn = document.getElementById("nextStageBtn");
const clearHomeBtn = document.getElementById("clearHomeBtn");

// 게임 오버 모달
const gameOverModal = document.getElementById("gameOverModal");
const gameOverReason = document.getElementById("gameOverReason");
const gameOverRetryBtn = document.getElementById("gameOverRetryBtn");
const gameOverHomeBtn = document.getElementById("gameOverHomeBtn");

// HUD 표시 요소
const stageBadge = document.getElementById("stageBadge");
const playerRole = document.getElementById("playerRole");
const energyLabel = document.getElementById("energyLabel");
const energyText = document.getElementById("energyText");
const energyFill = document.getElementById("energyFill");
const balanceText = document.getElementById("balanceText");
const balanceFill = document.getElementById("balanceFill");
const scoreText = document.getElementById("scoreText");
const comboText = document.getElementById("comboText");

// 캔버스 및 조이스틱
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const joystickZone = document.getElementById("joystickZone");
const joystickKnob = document.getElementById("joystickKnob");

// ============================================================
// 2. 스테이지별 과학 개념·규칙·클리어 요약 데이터
// ============================================================
const STAGE_DATA = {
  1: {
    shortTitle: "1단계: 초원의 첫걸음",
    fullTitle: "1단계: 생산자 & 1차 소비자 [초원의 첫걸음]",
    concept: "식물(풀, 나무)의 광합성 에너지 생산과 초식동물(메뚜기, 토끼)의 1차 소비를 학습합니다.",
    rule: "초원에 떨어지는 ☀️ 햇살을 모아 새싹(🌱)을 광합성으로 키우세요! 다 자란 풀(🌿)과 나무(🌳)를 먹어 에너지를 100% 채우면 클리어입니다.",
    tip: "햇살을 먹어야 새싹이 자랍니다. 에너지가 50%가 되면 메뚜기에서 빠른 '토끼(🐇)'로 성장해요!",
    clearSummary: "식물(생산자)이 햇빛으로 광합성을 해 양분을 만들고, 메뚜기·토끼 같은 1차 소비자(초식동물)가 식물을 섭취해 에너지를 얻는 과정을 익혔습니다!",
  },
  2: {
    shortTitle: "2단계: 중간 포식자 등장",
    fullTitle: "2단계: 2차 소비자 [중간 포식자 등장]",
    concept: "육식 및 잡식 동물(개구리, 참새 등)의 2차 소비와 포식·피식 관계를 이해합니다.",
    rule: "개구리(🐸)가 되어 도망치는 1차 소비자(메뚜기·토끼)를 사냥해 에너지를 100% 채우세요! 단, 빨간 시야 원을 가진 상위 포식자(매🦅·뱀🐍)에게 3번 잡히면 게임오버입니다.",
    tip: "에너지 50%에 도달하면 빠른 '참새(🐦)'로 변신합니다! 상위 포식자의 붉은 시야 원 밖으로 우회해서 사냥하세요.",
    clearSummary: "개구리와 참새 같은 2차 소비자는 1차 소비자를 사냥해 에너지를 얻는 동시에, 더 큰 상위 포식자의 먹이가 되기도 하는 생태계의 연결 고리입니다!",
  },
  3: {
    shortTitle: "3단계: 순환의 완성",
    fullTitle: "3단계: 최종 포식자 & 분해자 [순환의 완성]",
    concept: "최상위 포식자(매, 호랑이)와 죽은 생물의 사체를 분해하는 분해자(버섯, 세균)의 물질 순환을 배웁니다.",
    rule: "① 최상위 포식자(매🦅→호랑이🐯)로 2차 소비자(개구리·참새)를 사냥해 사체(🦴)를 만드세요. ② 사체(🦴)를 물어 분해자(🍄 버섯·세균) 구역에 가져다 놓으면 영양분이 다시 흙(식물)으로 돌아갑니다! 순환 3회 완수 시 클리어!",
    tip: "사냥만 하고 분해를 안 하면 흙의 영양분이 줄어들어 먹이가 자라지 않습니다. 사체를 꼭 분해자(🍄)에게 전달해 주세요!",
    clearSummary: "최상위 포식자가 사냥을 마친 뒤 남는 사체는 버섯·세균 같은 분해자가 무기 양분으로 분해해 다시 흙(생산자)으로 돌려보냅니다. 이로써 생태계의 물질 순환이 완성됩니다!",
  },
  4: {
    shortTitle: "4단계: 생태계 평형",
    fullTitle: "4단계: 복잡한 먹이 그물 [생태계 평형]",
    concept: "단방향 먹이 사슬이 아닌, 다방향으로 얽힌 복잡한 '먹이 그물' 구조와 생태계 평형을 체험합니다.",
    rule: "특정 생물이 멸종하면 연쇄 반응으로 생태계가 파괴됩니다! 그물망의 균형을 유지하세요. (Step 4에서 열립니다)",
    tip: "실시간 개체수를 잘 살펴보고 멸종 위기 종을 보호하세요.",
    clearSummary: "복잡한 먹이 그물의 평형을 완벽하게 지켜냈습니다!",
  },
};

// ============================================================
// 3. 게임 전체 상태 관리 객체
// ============================================================
const gameState = {
  isPlaying: false,
  isPaused: false,
  isStageCleared: false,
  isGameOver: false,
  stage: 1,
  score: 0,
  combo: 1,
  maxCombo: 1,
  comboTimer: 0,
  energy: 0,               // 0 ~ 100
  balance: 100,            // 0 ~ 100
  lives: 3,                // 2단계 생존 목숨 (상위 포식자에게 3번 잡히면 게임오버)
  collectedSuns: 0,        // 1단계 통계
  eatenPlants: 0,          // 1단계 통계
  huntedCount: 0,          // 2·3단계 사냥 수
  cyclesCompleted: 0,      // 3단계 분해자 물질 순환 완료 횟수 (목표: 3회)
  frameCount: 0,
  animationFrameId: null,
};

// ============================================================
// 4. 플레이어 객체
// ============================================================
const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 26,
  speed: 4.5,
  emoji: "🦗",
  name: "메뚜기",
  role: "1차 소비자",
  tier: 1,
  facingLeft: false,
  walkTimer: 0,
  evolveEffectTimer: 0,
  invincibleTimer: 0,      // 2단계 피격 후 무적 시간 (깜빡임)
  carryingCarcass: false,  // 3단계: 사체(🦴)를 물고 분해자에게 옮기는 중인지 여부
  hintCooldown: 0,
};

// ============================================================
// 5. 월드 오브젝트 배열 (1~3단계 공용 및 전용)
// ============================================================
const sunbeams = [];         // 1단계: ☀️ 햇살
const plants = [];           // 1·3단계: 🌱 새싹 / 🌿 풀 / 🌳 나무
const preys = [];            // 2단계(🦗·🐇) & 3단계(🐸·🐦) 사냥감 목록
const predators = [];        // 2단계 상위 포식자(🦅·🐍) 목록
const carcasses = [];        // 3단계: 사냥 후 생성되는 사체(🦴) 목록
const decomposers = [];      // 3단계: 분해자 구역(🍄 버섯·🦠 세균) 목록
const photoBeams = [];       // 광합성 빛줄기 / 영양분 환원 빛줄기 효과
const floatingTexts = [];    // 떠오르는 텍스트
const dustParticles = [];    // 먼지 및 반짝이 파티클
const meadowDecorations = []; // 배경 장식

function createMeadowDecorations() {
  meadowDecorations.length = 0;
  const flowerColors = ["#fff59d", "#ffffff", "#ffcc80", "#f48fb1"];

  for (let i = 0; i < 45; i++) {
    meadowDecorations.push({
      x: Math.random() * (canvas.width - 40) + 20,
      y: Math.random() * (canvas.height - 40) + 20,
      type: Math.random() < 0.35 ? "flower" : "grass",
      color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
      size: Math.random() * 4 + 4,
    });
  }
}

// 안전한 무작위 좌표 생성 (조이스틱·아이템바·플레이어 근처 제외)
function getSafeRandomPosition(padding = 60, minPlayerDist = 110) {
  for (let attempt = 0; attempt < 25; attempt++) {
    const x = Math.random() * (canvas.width - padding * 2) + padding;
    const y = Math.random() * (canvas.height - padding * 2) + padding;

    const inJoystickArea = x < 165 && y > canvas.height - 165;
    const inItemBarArea = x > canvas.width - 280 && y > canvas.height - 110;
    const inTopBanner = y < 65;
    const tooCloseToPlayer = Math.hypot(x - player.x, y - player.y) < minPlayerDist;

    if (!inJoystickArea && !inItemBarArea && !inTopBanner && !tooCloseToPlayer) {
      return { x, y };
    }
  }
  return {
    x: Math.random() * (canvas.width - 160) + 80,
    y: Math.random() * (canvas.height - 220) + 80,
  };
}

// 떠오르는 텍스트 & 반짝이 파티클 유틸리티
function addFloatingText(x, y, text, color = "#1b5e20") {
  floatingTexts.push({ x, y, text, color, alpha: 1, vy: -1.1 });
}

function spawnSparkles(x, y, color, count = 10) {
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const speed = Math.random() * 2.6 + 1.2;
    dustParticles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: Math.random() * 4 + 2.5,
      color,
      alpha: 1,
    });
  }
}

// 콤보 증가 공통 함수
function addCombo() {
  if (gameState.comboTimer > 0) {
    gameState.combo = Math.min(5, gameState.combo + 1);
  } else {
    gameState.combo = 1;
  }
  gameState.maxCombo = Math.max(gameState.maxCombo, gameState.combo);
  gameState.comboTimer = 260; // 약 4.3초 유지
}

// ============================================================
// 6. 스테이지별 생성(Spawn) 및 초기화 함수
// ============================================================

// --- [1단계용] 햇살 & 식물 생성 ---
function spawnSunbeam() {
  if (sunbeams.length >= 5) return;
  const pos = getSafeRandomPosition(60, 95);
  sunbeams.push({
    x: pos.x,
    y: pos.y,
    radius: 20,
    pulse: Math.random() * Math.PI * 2,
  });
}

function spawnPlant(startGrown = false) {
  if (plants.length >= 10) return;
  const pos = getSafeRandomPosition(65, 90);
  const isTree = Math.random() < 0.35;

  plants.push({
    x: pos.x,
    y: pos.y,
    radius: startGrown ? (isTree ? 25 : 21) : 16,
    grown: startGrown,
    kind: isTree ? "tree" : "grass",
    emoji: startGrown ? (isTree ? "🌳" : "🌿") : "🌱",
    energyValue: isTree ? 22 : 14,
    scoreValue: isTree ? 150 : 100,
    sway: Math.random() * Math.PI * 2,
    growPop: startGrown ? 1 : 1,
  });
}

// --- [2단계 & 3단계용] 움직이는 먹이(사냥감) 생성 ---
function spawnPrey(stageNum) {
  if (preys.length >= 7) return;
  const pos = getSafeRandomPosition(65, 130);
  const angle = Math.random() * Math.PI * 2;

  if (stageNum === 2) {
    // 2단계 먹이: 1차 소비자 (메뚜기 🦗, 토끼 🐇)
    const isRabbit = Math.random() < 0.4;
    preys.push({
      x: pos.x,
      y: pos.y,
      vx: Math.cos(angle) * (isRabbit ? 1.8 : 1.3),
      vy: Math.sin(angle) * (isRabbit ? 1.8 : 1.3),
      baseSpeed: isRabbit ? 2.1 : 1.5,
      radius: isRabbit ? 21 : 18,
      emoji: isRabbit ? "🐇" : "🦗",
      name: isRabbit ? "토끼" : "메뚜기",
      energyValue: isRabbit ? 22 : 14,
      scoreValue: isRabbit ? 180 : 120,
      turnTimer: Math.floor(Math.random() * 90) + 40,
    });
  } else if (stageNum === 3) {
    // 3단계 먹이: 2차 소비자 (개구리 🐸, 참새 🐦)
    const isSparrow = Math.random() < 0.45;
    preys.push({
      x: pos.x,
      y: pos.y,
      vx: Math.cos(angle) * (isSparrow ? 2.1 : 1.5),
      vy: Math.sin(angle) * (isSparrow ? 2.1 : 1.5),
      baseSpeed: isSparrow ? 2.4 : 1.7,
      radius: 21,
      emoji: isSparrow ? "🐦" : "🐸",
      name: isSparrow ? "참새" : "개구리",
      energyValue: 0, // 3단계는 분해자 순환 완료 시 에너지가 크게 오름
      scoreValue: isSparrow ? 220 : 160,
      turnTimer: Math.floor(Math.random() * 80) + 40,
    });
  }
}

// --- [2단계용] 상위 포식자(매 🦅, 뱀 🐍) 생성 ---
function spawnPredator(isHawk) {
  const pos = getSafeRandomPosition(80, 230); // 플레이어와 충분히 멀리서 등장
  const angle = Math.random() * Math.PI * 2;
  predators.push({
    x: pos.x,
    y: pos.y,
    vx: Math.cos(angle) * 1.8,
    vy: Math.sin(angle) * 1.8,
    patrolSpeed: isHawk ? 2.0 : 1.6,
    chaseSpeed: isHawk ? 3.2 : 2.7,
    visionRadius: isHawk ? 165 : 140, // 이 붉은 원 안에 들어오면 플레이어를 추격!
    radius: isHawk ? 28 : 25,
    emoji: isHawk ? "🦅" : "🐍",
    name: isHawk ? "매 (상위 포식자)" : "뱀 (상위 포식자)",
    isChasing: false,
    turnTimer: 90,
  });
}

// --- [3단계용] 분해자 구역(버섯 🍄, 세균 🦠) 생성 ---
function spawnDecomposersForStage3() {
  decomposers.length = 0;
  // 맵 왼쪽 위와 오른쪽 위 흙 구역에 분해자 서식지 2곳 배치
  decomposers.push({
    x: 165,
    y: 165,
    radius: 42,
    emoji: "🍄",
    subEmoji: "🦠",
    name: "분해자 (버섯·세균)",
    pulse: 0,
  });
  decomposers.push({
    x: canvas.width - 175,
    y: canvas.height - 175,
    radius: 42,
    emoji: "🍄",
    subEmoji: "🦠",
    name: "분해자 (버섯·세균)",
    pulse: Math.PI,
  });
}

// --- 모든 배열 비우고 지정된 스테이지(1~3) 세팅 ---
function setupStage(stageNumber, resetScore = false) {
  if (gameState.animationFrameId) {
    cancelAnimationFrame(gameState.animationFrameId);
    gameState.animationFrameId = null;
  }

  gameState.isPlaying = false;
  gameState.isPaused = false;
  gameState.isStageCleared = false;
  gameState.isGameOver = false;
  gameState.stage = stageNumber;
  if (resetScore) {
    gameState.score = 0;
    gameState.maxCombo = 1;
  }
  gameState.combo = 1;
  gameState.comboTimer = 0;
  gameState.energy = 0;
  gameState.balance = 100;
  gameState.lives = 3;
  gameState.collectedSuns = 0;
  gameState.eatenPlants = 0;
  gameState.huntedCount = 0;
  gameState.cyclesCompleted = 0;
  gameState.frameCount = 0;

  // 오브젝트 배열 초기화
  sunbeams.length = 0;
  plants.length = 0;
  preys.length = 0;
  predators.length = 0;
  carcasses.length = 0;
  decomposers.length = 0;
  photoBeams.length = 0;
  floatingTexts.length = 0;
  dustParticles.length = 0;

  // 플레이어 위치 및 공통 속성 초기화
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;
  player.tier = 1;
  player.facingLeft = false;
  player.walkTimer = 0;
  player.evolveEffectTimer = 0;
  player.invincibleTimer = 0;
  player.carryingCarcass = false;
  player.hintCooldown = 0;

  createMeadowDecorations();

  if (stageNumber === 1) {
    player.emoji = "🦗";
    player.name = "메뚜기";
    player.role = "1차 소비자";
    player.radius = 26;
    player.speed = 4.5;
    energyLabel.textContent = "⚡ 영양 단계 에너지";

    for (let i = 0; i < 4; i++) spawnSunbeam();
    for (let i = 0; i < 5; i++) spawnPlant(false);
    spawnPlant(true);
  } else if (stageNumber === 2) {
    player.emoji = "🐸";
    player.name = "개구리";
    player.role = "2차 소비자";
    player.radius = 26;
    player.speed = 4.7;
    energyLabel.textContent = "⚡ 사냥 에너지";

    for (let i = 0; i < 6; i++) spawnPrey(2);
    spawnPredator(true);  // 매 1마리
    spawnPredator(false); // 뱀 1마리
  } else if (stageNumber === 3) {
    player.emoji = "🦅";
    player.name = "매";
    player.role = "최상위 포식자";
    player.radius = 28;
    player.speed = 5.1;
    energyLabel.textContent = "♻️ 물질 순환 진행도";

    spawnDecomposersForStage3();
    for (let i = 0; i < 4; i++) spawnPlant(false); // 흙에 새싹 4개 (분해될 때마다 무성하게 자람!)
    for (let i = 0; i < 5; i++) spawnPrey(3);
  }

  clearAllKeys();
  resetJoystick();
  updateHUD();
}

// ============================================================
// 7. 입력 처리 (키보드 + 가상 조이스틱)
// ============================================================
const keys = { up: false, down: false, left: false, right: false };

function clearAllKeys() {
  keys.up = false;
  keys.down = false;
  keys.left = false;
  keys.right = false;
}

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (gameState.isPaused) return;

  if (["arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
    event.preventDefault();
  }
  if (key === "arrowup" || key === "w") keys.up = true;
  if (key === "arrowdown" || key === "s") keys.down = true;
  if (key === "arrowleft" || key === "a") keys.left = true;
  if (key === "arrowright" || key === "d") keys.right = true;
});

window.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  if (key === "arrowup" || key === "w") keys.up = false;
  if (key === "arrowdown" || key === "s") keys.down = false;
  if (key === "arrowleft" || key === "a") keys.left = false;
  if (key === "arrowright" || key === "d") keys.right = false;
});

const joystick = { active: false, dx: 0, dy: 0, maxRadius: 34 };

function updateJoystickFromPoint(clientX, clientY) {
  const rect = joystickZone.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  let diffX = clientX - centerX;
  let diffY = clientY - centerY;
  const distance = Math.hypot(diffX, diffY);

  if (distance > joystick.maxRadius) {
    diffX = (diffX / distance) * joystick.maxRadius;
    diffY = (diffY / distance) * joystick.maxRadius;
  }

  joystickKnob.style.transform = `translate(${diffX}px, ${diffY}px)`;
  joystick.dx = diffX / joystick.maxRadius;
  joystick.dy = diffY / joystick.maxRadius;
}

function resetJoystick() {
  joystick.active = false;
  joystick.dx = 0;
  joystick.dy = 0;
  joystickKnob.style.transform = "translate(0px, 0px)";
}

joystickZone.addEventListener("touchstart", (e) => {
  e.preventDefault();
  if (gameState.isPaused) return;
  joystick.active = true;
  updateJoystickFromPoint(e.touches[0].clientX, e.touches[0].clientY);
});
joystickZone.addEventListener("touchmove", (e) => {
  e.preventDefault();
  if (!joystick.active || gameState.isPaused) return;
  updateJoystickFromPoint(e.touches[0].clientX, e.touches[0].clientY);
});
joystickZone.addEventListener("touchend", resetJoystick);
joystickZone.addEventListener("touchcancel", resetJoystick);

joystickZone.addEventListener("mousedown", (e) => {
  if (gameState.isPaused) return;
  joystick.active = true;
  updateJoystickFromPoint(e.clientX, e.clientY);
});
window.addEventListener("mousemove", (e) => {
  if (!joystick.active || gameState.isPaused) return;
  updateJoystickFromPoint(e.clientX, e.clientY);
});
window.addEventListener("mouseup", () => {
  if (joystick.active) resetJoystick();
});

// ============================================================
// 8. HUD 및 모달 제어 함수
// ============================================================
function updateHUD() {
  const info = STAGE_DATA[gameState.stage] || STAGE_DATA[1];
  stageBadge.textContent = info.shortTitle;
  playerRole.textContent = `${player.emoji} ${player.name} (${player.role})`;

  energyText.textContent = `${Math.round(gameState.energy)}%`;
  energyFill.style.width = `${gameState.energy}%`;

  balanceText.textContent = `${Math.round(gameState.balance)}%`;
  balanceFill.style.width = `${gameState.balance}%`;

  scoreText.textContent = gameState.score.toLocaleString();
  comboText.textContent = `x${gameState.combo}`;
}

function openStageBriefing(stageNumber) {
  const info = STAGE_DATA[stageNumber] || STAGE_DATA[1];
  briefingStageTag.textContent = `STAGE ${stageNumber}`;
  briefingTitle.textContent = info.fullTitle;
  briefingConcept.textContent = info.concept;
  briefingRule.textContent = info.rule;

  gameState.isPaused = true;
  clearAllKeys();
  resetJoystick();
  briefingModal.classList.remove("hidden");
}

function openStageHelp() {
  const info = STAGE_DATA[gameState.stage] || STAGE_DATA[1];
  helpStageTag.textContent = `STAGE ${gameState.stage} 도움말`;
  helpTitle.textContent = info.fullTitle;
  helpConcept.textContent = info.concept;
  helpRule.textContent = info.rule;
  helpTip.textContent = info.tip;

  gameState.isPaused = true;
  clearAllKeys();
  resetJoystick();
  helpModal.classList.remove("hidden");
}

function closeStageHelp() {
  helpModal.classList.add("hidden");
  if (!gameState.isStageCleared && !gameState.isGameOver) {
    gameState.isPaused = false;
  }
}

function openHomeConfirm() {
  gameState.isPaused = true;
  clearAllKeys();
  resetJoystick();
  homeConfirmModal.classList.remove("hidden");
}

// 스테이지 클리어 팝업 열기 (1~3단계 자동 맞춤)
function openStageClearModal() {
  gameState.isStageCleared = true;
  gameState.isPaused = true;
  clearAllKeys();
  resetJoystick();
  SoundFX.playClear();

  const stage = gameState.stage;
  const info = STAGE_DATA[stage];

  clearStageTag.textContent = `STAGE ${stage} CLEAR!`;
  clearSummary.textContent = info.clearSummary;

  stat1Label.textContent = "누적 점수";
  stat1Value.textContent = `${gameState.score.toLocaleString()}점`;
  stat3Label.textContent = "최대 콤보";
  stat3Value.textContent = `x${gameState.maxCombo}`;

  if (stage === 1) {
    clearTitle.textContent = "🎉 1단계 완수! 2차 소비자(개구리)로 진화!";
    stat2Label.textContent = "모은 햇살 / 식물";
    stat2Value.textContent = `${gameState.collectedSuns} / ${gameState.eatenPlants}`;
    nextStageBtn.textContent = "🐸 2단계로 진화하기";
    nextStageBtn.style.display = "inline-block";
  } else if (stage === 2) {
    clearTitle.textContent = "🎉 2단계 완수! 최상위 포식자(매)로 진화!";
    stat2Label.textContent = "사냥한 1차 소비자";
    stat2Value.textContent = `${gameState.huntedCount}마리`;
    nextStageBtn.textContent = "🦅 3단계로 진화하기";
    nextStageBtn.style.display = "inline-block";
  } else if (stage === 3) {
    clearTitle.textContent = "🏆 3단계 완수! 생태계 물질 순환 성공!";
    stat2Label.textContent = "물질 순환 완수";
    stat2Value.textContent = `${gameState.cyclesCompleted} / 3회`;
    nextStageBtn.style.display = "none"; // 4단계는 Step 4에서 연결 예정
  }

  stageClearModal.classList.remove("hidden");
}

// 게임 오버 팝업 열기
function openGameOverModal(reasonText) {
  gameState.isGameOver = true;
  gameState.isPaused = true;
  clearAllKeys();
  resetJoystick();
  SoundFX.playGameOver();

  gameOverReason.textContent = reasonText;
  gameOverModal.classList.remove("hidden");
}

// ============================================================
// 9. 스테이지별 핵심 상호작용 로직
// ============================================================

// [1단계] 햇살 획득 -> 광합성으로 새싹 성장
function handleSunbeamCollected(sun) {
  SoundFX.playSun();
  gameState.collectedSuns += 1;
  gameState.score += 30 * gameState.combo;

  spawnSparkles(sun.x, sun.y, "#ffd54f", 10);
  addFloatingText(sun.x, sun.y - 16, "☀️ 광합성 에너지!", "#f57f17");

  if (plants.filter((p) => !p.grown).length === 0) {
    spawnPlant(false);
    spawnPlant(false);
  }

  const targetSprouts = plants
    .filter((p) => !p.grown)
    .sort((a, b) => Math.hypot(a.x - sun.x, a.y - sun.y) - Math.hypot(b.x - sun.x, b.y - sun.y))
    .slice(0, 2);

  for (const sprout of targetSprouts) {
    sprout.grown = true;
    sprout.emoji = sprout.kind === "tree" ? "🌳" : "🌿";
    sprout.radius = sprout.kind === "tree" ? 25 : 21;
    sprout.growPop = 1.6;

    photoBeams.push({ x1: sun.x, y1: sun.y, x2: sprout.x, y2: sprout.y, alpha: 1, color: "255, 235, 59" });
    spawnSparkles(sprout.x, sprout.y, "#66bb6a", 8);
    addFloatingText(sprout.x, sprout.y - 20, sprout.kind === "tree" ? "🌳 나무 성장!" : "🌿 풀 성장!", "#2e7d32");
  }

  gameState.balance = Math.min(100, gameState.balance + 4);
  updateHUD();
}

// [1단계] 다 자란 식물 섭취
function handlePlantEaten(plant) {
  gameState.eatenPlants += 1;
  addCombo();
  SoundFX.playEat(gameState.combo);

  const gainedScore = plant.scoreValue * gameState.combo;
  gameState.score += gainedScore;
  gameState.energy = Math.min(100, gameState.energy + plant.energyValue);

  spawnSparkles(plant.x, plant.y, "#81c784", 12);
  addFloatingText(plant.x, plant.y - 18, `+${plant.energyValue}% 에너지 (+${gainedScore})`, "#1b5e20");

  // 에너지 50% -> 토끼로 성장
  if (gameState.energy >= 50 && player.tier === 1) {
    player.tier = 2;
    player.emoji = "🐇";
    player.name = "토끼";
    player.speed = 5.3;
    player.radius = 29;
    player.evolveEffectTimer = 70;
    SoundFX.playEvolve();
    spawnSparkles(player.x, player.y, "#ffca28", 20);
    addFloatingText(player.x, player.y - 40, "✨ 🐇 토끼로 성장! (속도 UP)", "#e65100");
  }

  spawnPlant(false);
  updateHUD();

  if (gameState.energy >= 100 && !gameState.isStageCleared) {
    spawnSparkles(player.x, player.y, "#ffeb3b", 26);
    setTimeout(openStageClearModal, 350);
  }
}

// [2단계] 1차 소비자 사냥 성공
function handleStage2PreyCaught(prey) {
  gameState.huntedCount += 1;
  addCombo();
  SoundFX.playEat(gameState.combo);

  const gainedScore = prey.scoreValue * gameState.combo;
  gameState.score += gainedScore;
  gameState.energy = Math.min(100, gameState.energy + prey.energyValue);

  spawnSparkles(prey.x, prey.y, "#ffca28", 12);
  addFloatingText(prey.x, prey.y - 18, `사냥 성공! +${prey.energyValue}% (+${gainedScore})`, "#e65100");

  // 에너지 50% -> 빠른 참새로 변신!
  if (gameState.energy >= 50 && player.tier === 1) {
    player.tier = 2;
    player.emoji = "🐦";
    player.name = "참새";
    player.speed = 5.5;
    player.radius = 27;
    player.evolveEffectTimer = 70;
    SoundFX.playEvolve();
    spawnSparkles(player.x, player.y, "#4fc3f7", 20);
    addFloatingText(player.x, player.y - 40, "✨ 🐦 참새로 변신! (비행 속도 UP)", "#0277bd");
  }

  spawnPrey(2);
  updateHUD();

  if (gameState.energy >= 100 && !gameState.isStageCleared) {
    spawnSparkles(player.x, player.y, "#ffeb3b", 26);
    setTimeout(openStageClearModal, 350);
  }
}

// [2단계] 상위 포식자에게 잡혔을 때 처리
function handleHitByPredator(predator) {
  SoundFX.playHit();
  gameState.lives -= 1;
  gameState.combo = 1;
  gameState.comboTimer = 0;
  gameState.energy = Math.max(0, gameState.energy - 15);
  player.invincibleTimer = 110; // 약 1.8초간 무적

  // 포식자 반대 방향으로 살짝 밀려나기(넉백)
  const angle = Math.atan2(player.y - predator.y, player.x - predator.x);
  player.x += Math.cos(angle) * 55;
  player.y += Math.sin(angle) * 55;

  spawnSparkles(player.x, player.y, "#ef5350", 14);
  addFloatingText(player.x, player.y - 25, `⚠️ ${predator.name}에게 피격!`, "#c62828");
  updateHUD();

  if (gameState.lives <= 0 && !gameState.isGameOver) {
    openGameOverModal(
      `${predator.name}에게 여러 번 잡혀 생존 에너지를 모두 잃었습니다! 2차 소비자는 먹이를 사냥하는 동시에 상위 포식자의 시야(붉은 점선 원)를 피해 달아나야 합니다.`
    );
  }
}

// [3단계] 2차 소비자 사냥 -> 사체(🦴) 생성
function handleStage3PreyCaught(prey) {
  gameState.huntedCount += 1;
  addCombo();
  SoundFX.playEat(gameState.combo);

  const gainedScore = prey.scoreValue * gameState.combo;
  gameState.score += gainedScore;

  // 사냥한 자리에 사체(🦴)가 생성됨 (최대 3개까지)
  if (carcasses.length < 3) {
    carcasses.push({
      x: prey.x,
      y: prey.y,
      radius: 19,
      pulse: 0,
    });
  }

  spawnSparkles(prey.x, prey.y, "#ffab91", 12);
  addFloatingText(prey.x, prey.y - 18, `사냥 성공! 🦴 사체를 분해자(🍄)에게 옮기세요!`, "#bf360c");

  // 분해 순환을 안 하면 생태계 평형이 조금씩 내려가도록 표현
  gameState.balance = Math.max(50, gameState.balance - 6);
  updateHUD();
}

// [3단계] 분해자(🍄) 구역에 사체(🦴)를 전달 -> 물질 순환 1회 완료!
function handleDecomposerCycleComplete(decomposer) {
  player.carryingCarcass = false;
  gameState.cyclesCompleted += 1;
  addCombo();
  SoundFX.playCycle();

  const cycleScore = 300 * gameState.combo;
  gameState.score += cycleScore;
  gameState.energy = Math.min(100, Math.round((gameState.cyclesCompleted / 3) * 100));
  gameState.balance = 100; // 물질이 흙으로 돌아가 생태계 평형 완벽 회복!

  spawnSparkles(decomposer.x, decomposer.y, "#66bb6a", 22);
  addFloatingText(
    decomposer.x,
    decomposer.y - 36,
    `♻️ 물질 순환 ${gameState.cyclesCompleted}/3 완성! (+${cycleScore})`,
    "#1b5e20"
  );

  // 분해된 영양분이 초록빛 줄기를 타고 흙(식물)으로 퍼져 식물이 무성하게 자람!
  const sprouts = plants.filter((p) => !p.grown);
  if (sprouts.length === 0) spawnPlant(false);
  plants.forEach((p) => {
    if (!p.grown) {
      p.grown = true;
      p.emoji = p.kind === "tree" ? "🌳" : "🌿";
      p.radius = p.kind === "tree" ? 25 : 21;
      p.growPop = 1.6;
      photoBeams.push({
        x1: decomposer.x,
        y1: decomposer.y,
        x2: p.x,
        y2: p.y,
        alpha: 1,
        color: "102, 187, 106",
      });
    }
  });
  // 영양분이 풍부해졌으므로 새로운 2차 소비자 먹이도 다시 등장
  spawnPrey(3);
  spawnPrey(3);

  // 1회 순환 완료 시 매(🦅)에서 백수의 왕 호랑이(🐯)로 진화!
  if (gameState.cyclesCompleted >= 1 && player.tier === 1) {
    player.tier = 2;
    player.emoji = "🐯";
    player.name = "호랑이";
    player.speed = 5.6;
    player.radius = 30;
    player.evolveEffectTimer = 75;
    SoundFX.playEvolve();
    spawnSparkles(player.x, player.y, "#ffb300", 24);
    addFloatingText(player.x, player.y - 44, "✨ 🐯 호랑이로 진화!", "#e65100");
  }

  updateHUD();

  // 순환 3회 완수 시 3단계 클리어!
  if (gameState.cyclesCompleted >= 3 && !gameState.isStageCleared) {
    setTimeout(openStageClearModal, 450);
  }
}

// ============================================================
// 10. 매 프레임 게임 업데이트(계산) 로직
// ============================================================
function update() {
  if (gameState.isPaused) return;

  gameState.frameCount += 1;
  if (player.evolveEffectTimer > 0) player.evolveEffectTimer -= 1;
  if (player.invincibleTimer > 0) player.invincibleTimer -= 1;
  if (player.hintCooldown > 0) player.hintCooldown -= 1;

  // 콤보 유지 시간 감소
  if (gameState.comboTimer > 0) {
    gameState.comboTimer -= 1;
    if (gameState.comboTimer === 0 && gameState.combo > 1) {
      gameState.combo = 1;
      updateHUD();
    }
  }

  // 1) 플레이어 이동
  let moveX = 0;
  let moveY = 0;
  if (keys.left) moveX -= 1;
  if (keys.right) moveX += 1;
  if (keys.up) moveY -= 1;
  if (keys.down) moveY += 1;

  if (moveX !== 0 && moveY !== 0) {
    const length = Math.hypot(moveX, moveY);
    moveX /= length;
    moveY /= length;
  }

  if (moveX === 0 && moveY === 0 && joystick.active) {
    moveX = joystick.dx;
    moveY = joystick.dy;
  }

  const isMoving = Math.abs(moveX) > 0.05 || Math.abs(moveY) > 0.05;
  if (isMoving) {
    player.x += moveX * player.speed;
    player.y += moveY * player.speed;
    if (moveX < -0.1) player.facingLeft = true;
    if (moveX > 0.1) player.facingLeft = false;
    player.walkTimer += 0.25;

    if (Math.random() < 0.2) {
      dustParticles.push({
        x: player.x,
        y: player.y + player.radius * 0.7,
        vx: 0,
        vy: 0,
        radius: Math.random() * 3.5 + 2,
        color: "#ffffff",
        alpha: 0.65,
      });
    }
  } else {
    player.walkTimer = 0;
  }

  const margin = player.radius + 8;
  player.x = Math.max(margin, Math.min(canvas.width - margin, player.x));
  player.y = Math.max(margin, Math.min(canvas.height - margin, player.y));

  // 2) 스테이지별 전용 업데이트 분기
  if (gameState.stage === 1) {
    updateStage1();
  } else if (gameState.stage === 2) {
    updateStage2();
  } else if (gameState.stage === 3) {
    updateStage3();
  }

  // 3) 공용 이펙트(빛줄기, 파티클, 텍스트) 업데이트
  for (let i = photoBeams.length - 1; i >= 0; i--) {
    photoBeams[i].alpha -= 0.035;
    if (photoBeams[i].alpha <= 0) photoBeams.splice(i, 1);
  }
  for (let i = dustParticles.length - 1; i >= 0; i--) {
    const p = dustParticles[i];
    p.x += p.vx || 0;
    p.y += p.vy || 0;
    p.alpha -= 0.03;
    p.radius += 0.05;
    if (p.alpha <= 0) dustParticles.splice(i, 1);
  }
  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    const ft = floatingTexts[i];
    ft.y += ft.vy;
    ft.alpha -= 0.016;
    if (ft.alpha <= 0) floatingTexts.splice(i, 1);
  }
}

// --- 1단계 업데이트 ---
function updateStage1() {
  if (gameState.frameCount % 130 === 0) spawnSunbeam();
  if (gameState.frameCount % 210 === 0 && plants.length < 8) spawnPlant(false);

  for (let i = sunbeams.length - 1; i >= 0; i--) {
    const sun = sunbeams[i];
    sun.pulse += 0.08;
    if (Math.hypot(player.x - sun.x, player.y - sun.y) < player.radius + sun.radius) {
      sunbeams.splice(i, 1);
      handleSunbeamCollected(sun);
    }
  }

  for (let i = plants.length - 1; i >= 0; i--) {
    const plant = plants[i];
    plant.sway += 0.05;
    if (plant.growPop > 1) plant.growPop = Math.max(1, plant.growPop - 0.04);

    if (Math.hypot(player.x - plant.x, player.y - plant.y) < player.radius + plant.radius) {
      if (plant.grown) {
        plants.splice(i, 1);
        handlePlantEaten(plant);
      } else if (player.hintCooldown === 0) {
        addFloatingText(plant.x, plant.y - 22, "☀️ 햇살로 먼저 키워주세요!", "#ef6c00");
        player.hintCooldown = 70;
      }
    }
  }
}

// --- 먹이 AI 공용 이동 (2·3단계: 배회하다가 플레이어가 가까워지면 도망) ---
function updatePreysAI(stageNum) {
  for (let i = preys.length - 1; i >= 0; i--) {
    const prey = preys[i];
    const distToPlayer = Math.hypot(prey.x - player.x, prey.y - player.y);

    if (distToPlayer < 130) {
      // 플레이어 반대 방향으로 도망!
      const fleeAngle = Math.atan2(prey.y - player.y, prey.x - player.x);
      prey.vx = Math.cos(fleeAngle) * (prey.baseSpeed * 1.25);
      prey.vy = Math.sin(fleeAngle) * (prey.baseSpeed * 1.25);
    } else {
      // 평소에는 초원을 자유롭게 배회
      prey.turnTimer -= 1;
      if (prey.turnTimer <= 0) {
        const angle = Math.random() * Math.PI * 2;
        prey.vx = Math.cos(angle) * prey.baseSpeed;
        prey.vy = Math.sin(angle) * prey.baseSpeed;
        prey.turnTimer = Math.floor(Math.random() * 90) + 45;
      }
    }

    prey.x += prey.vx;
    prey.y += prey.vy;

    // 벽에 닿으면 튕겨 나옴
    if (prey.x < 35 || prey.x > canvas.width - 35) prey.vx *= -1;
    if (prey.y < 60 || prey.y > canvas.height - 35) prey.vy *= -1;
    prey.x = Math.max(35, Math.min(canvas.width - 35, prey.x));
    prey.y = Math.max(60, Math.min(canvas.height - 35, prey.y));

    // 플레이어와 충돌(사냥 성공!)
    if (distToPlayer < player.radius + prey.radius) {
      preys.splice(i, 1);
      if (stageNum === 2) {
        handleStage2PreyCaught(prey);
      } else if (stageNum === 3) {
        handleStage3PreyCaught(prey);
      }
    }
  }
}

// --- 2단계 업데이트 ---
function updateStage2() {
  if (gameState.frameCount % 160 === 0 && preys.length < 6) spawnPrey(2);
  updatePreysAI(2);

  // 상위 포식자(매·뱀) 순찰 및 추격 AI
  for (const pred of predators) {
    const distToPlayer = Math.hypot(player.x - pred.x, player.y - pred.y);

    if (distToPlayer < pred.visionRadius && player.invincibleTimer === 0) {
      // 시야 안에 들어오면 플레이어를 추격!
      pred.isChasing = true;
      const chaseAngle = Math.atan2(player.y - pred.y, player.x - pred.x);
      pred.vx = Math.cos(chaseAngle) * pred.chaseSpeed;
      pred.vy = Math.sin(chaseAngle) * pred.chaseSpeed;
    } else {
      // 시야 밖이면 천천히 순찰
      pred.isChasing = false;
      pred.turnTimer -= 1;
      if (pred.turnTimer <= 0) {
        const angle = Math.random() * Math.PI * 2;
        pred.vx = Math.cos(angle) * pred.patrolSpeed;
        pred.vy = Math.sin(angle) * pred.patrolSpeed;
        pred.turnTimer = Math.floor(Math.random() * 100) + 60;
      }
    }

    pred.x += pred.vx;
    pred.y += pred.vy;

    if (pred.x < 45 || pred.x > canvas.width - 45) pred.vx *= -1;
    if (pred.y < 65 || pred.y > canvas.height - 45) pred.vy *= -1;
    pred.x = Math.max(45, Math.min(canvas.width - 45, pred.x));
    pred.y = Math.max(65, Math.min(canvas.height - 45, pred.y));

    // 플레이어 피격 판정
    if (player.invincibleTimer === 0 && distToPlayer < player.radius + pred.radius - 4) {
      handleHitByPredator(pred);
    }
  }
}

// --- 3단계 업데이트 ---
function updateStage3() {
  if (gameState.frameCount % 180 === 0 && preys.length < 5) spawnPrey(3);
  updatePreysAI(3);

  for (const plant of plants) {
    plant.sway += 0.05;
    if (plant.growPop > 1) plant.growPop = Math.max(1, plant.growPop - 0.04);
  }

  // 사체(🦴) 줍기 체크 (아직 사체를 물고 있지 않을 때)
  for (let i = carcasses.length - 1; i >= 0; i--) {
    const c = carcasses[i];
    c.pulse += 0.09;
    const dist = Math.hypot(player.x - c.x, player.y - c.y);

    if (dist < player.radius + c.radius) {
      if (!player.carryingCarcass) {
        carcasses.splice(i, 1);
        player.carryingCarcass = true;
        SoundFX.playPickup();
        addFloatingText(player.x, player.y - 28, "🦴 사체 확보! 🍄 분해자 구역으로 이동하세요!", "#6d4c41");
      } else if (player.hintCooldown === 0) {
        addFloatingText(player.x, player.y - 28, "먼저 들고 있는 사체를 🍄 분해자에게 가져다주세요!", "#e65100");
        player.hintCooldown = 75;
      }
    }
  }

  // 분해자(🍄) 구역 도달 체크 (사체를 물고 있을 때 분해 완료!)
  for (const dec of decomposers) {
    dec.pulse += 0.05;
    const dist = Math.hypot(player.x - dec.x, player.y - dec.y);
    if (player.carryingCarcass && dist < player.radius + dec.radius) {
      handleDecomposerCycleComplete(dec);
    }
  }
}

// ============================================================
// 11. 화면 그리기(렌더링) 로직
// ============================================================
function draw() {
  // 스테이지마다 은은하게 달라지는 자연 배경색 (1단계 밝은 초원, 2단계 습지 초원, 3단계 깊은 숲)
  const bgColors = { 1: "#aed581", 2: "#9ccc65", 3: "#8bc34a" };
  ctx.fillStyle = bgColors[gameState.stage] || "#aed581";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 연한 격자 무늬
  ctx.strokeStyle = "rgba(255, 255, 255, 0.14)";
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 60) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // 작은 연못 장식
  ctx.save();
  ctx.fillStyle = "rgba(79, 195, 247, 0.55)";
  ctx.beginPath();
  ctx.ellipse(canvas.width - 120, 95, 78, 44, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();

  // 잔디·꽃 장식
  for (const deco of meadowDecorations) {
    if (deco.type === "grass") {
      ctx.strokeStyle = "#689f38";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(deco.x, deco.y);
      ctx.lineTo(deco.x - 3, deco.y - deco.size);
      ctx.moveTo(deco.x, deco.y);
      ctx.lineTo(deco.x + 3, deco.y - deco.size);
      ctx.stroke();
    } else {
      ctx.fillStyle = deco.color;
      ctx.beginPath();
      ctx.arc(deco.x, deco.y, deco.size * 0.55, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // [3단계] 분해자(🍄 버섯·세균) 흙 구역 그리기
  if (gameState.stage === 3) {
    for (const dec of decomposers) {
      const glow = Math.sin(dec.pulse) * 4;
      ctx.save();
      // 기름진 흙 구역 원
      ctx.fillStyle = player.carryingCarcass ? "rgba(141, 110, 99, 0.55)" : "rgba(121, 85, 72, 0.35)";
      ctx.strokeStyle = player.carryingCarcass ? "#ffeb3b" : "#5d4037";
      ctx.lineWidth = player.carryingCarcass ? 4 : 2.5;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.arc(dec.x, dec.y, dec.radius + (player.carryingCarcass ? glow : 0), 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.font = "30px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(dec.emoji, dec.x - 10, dec.y - 2);
      ctx.font = "22px sans-serif";
      ctx.fillText(dec.subEmoji, dec.x + 16, dec.y + 8);

      ctx.fillStyle = "#3e2723";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText(
        player.carryingCarcass ? "여기로 사체 전달!" : dec.name,
        dec.x,
        dec.y + dec.radius + 14
      );
      ctx.restore();
    }
  }

  // 광합성 / 영양분 환원 빛줄기
  for (const beam of photoBeams) {
    ctx.save();
    ctx.strokeStyle = `rgba(${beam.color || "255, 235, 59"}, ${beam.alpha})`;
    ctx.lineWidth = 5;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(beam.x1, beam.y1);
    ctx.lineTo(beam.x2, beam.y2);
    ctx.stroke();
    ctx.restore();
  }

  // [1·3단계] 식물 그리기
  for (const plant of plants) {
    const scale = plant.growPop || 1;
    const swayX = Math.sin(plant.sway) * 2;
    ctx.save();
    ctx.translate(plant.x + swayX, plant.y);
    ctx.scale(scale, scale);

    ctx.fillStyle = "rgba(0, 0, 0, 0.14)";
    ctx.beginPath();
    ctx.ellipse(0, plant.radius * 0.7, plant.radius * 0.75, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    if (plant.grown) {
      ctx.fillStyle = "rgba(232, 245, 233, 0.75)";
      ctx.strokeStyle = "#2e7d32";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, plant.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.strokeStyle = "rgba(121, 85, 72, 0.45)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(0, 0, plant.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.font = plant.grown ? (plant.kind === "tree" ? "32px sans-serif" : "26px sans-serif") : "22px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(plant.emoji, 0, 1);

    if (gameState.stage === 1) {
      ctx.fillStyle = plant.grown ? "#1b5e20" : "#6d4c41";
      ctx.font = "bold 11px sans-serif";
      ctx.fillText(plant.grown ? "먹기 가능" : "새싹", 0, plant.radius + 11);
    }
    ctx.restore();
  }

  // [1단계] 햇살 그리기
  for (const sun of sunbeams) {
    const glowRadius = sun.radius + Math.sin(sun.pulse) * 4;
    ctx.save();
    ctx.fillStyle = "rgba(255, 238, 88, 0.45)";
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, glowRadius + 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255, 249, 196, 0.9)";
    ctx.strokeStyle = "#ffb300";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.font = "24px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("☀️", sun.x, sun.y + 1);
    ctx.restore();
  }

  // [3단계] 사체(🦴) 그리기
  for (const c of carcasses) {
    const bounce = Math.sin(c.pulse) * 3;
    ctx.save();
    ctx.fillStyle = "rgba(255, 243, 224, 0.9)";
    ctx.strokeStyle = "#8d6e63";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(c.x, c.y + bounce, c.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.font = "22px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🦴", c.x, c.y + bounce + 1);

    ctx.fillStyle = "#5d4037";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText("사체 (줍기)", c.x, c.y + c.radius + 12);
    ctx.restore();
  }

  // [2·3단계] 먹이(사냥감) 그리기
  for (const prey of preys) {
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.14)";
    ctx.beginPath();
    ctx.ellipse(prey.x, prey.y + prey.radius - 2, prey.radius * 0.8, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#558b2f";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(prey.x, prey.y, prey.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.font = "24px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(prey.emoji, prey.x, prey.y + 1);

    ctx.fillStyle = "#2e7d32";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText(prey.name, prey.x, prey.y + prey.radius + 11);
    ctx.restore();
  }

  // [2단계] 상위 포식자(매·뱀) 및 위험 시야 원 그리기
  for (const pred of predators) {
    ctx.save();
    // 시야 반경(붉은 점선 원)
    ctx.fillStyle = pred.isChasing ? "rgba(239, 83, 80, 0.14)" : "rgba(239, 83, 80, 0.06)";
    ctx.strokeStyle = pred.isChasing ? "rgba(211, 47, 47, 0.85)" : "rgba(211, 47, 47, 0.35)";
    ctx.lineWidth = pred.isChasing ? 2.5 : 1.5;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.arc(pred.x, pred.y, pred.visionRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.setLineDash([]);

    // 포식자 본체
    ctx.fillStyle = "#ffebee";
    ctx.strokeStyle = "#c62828";
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(pred.x, pred.y, pred.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.font = "30px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(pred.emoji, pred.x, pred.y + 1);

    // 추격 중이면 머리 위에 느낌표 경고 표시!
    ctx.fillStyle = "#b71c1c";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText(pred.isChasing ? "⚠️ 추격 중!" : pred.name, pred.x, pred.y - pred.radius - 8);
    ctx.restore();
  }

  // 먼지·반짝이 파티클
  for (const p of dustParticles) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.alpha);
    ctx.fillStyle = p.color || "#ffffff";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // 플레이어 캐릭터 그리기 (무적 중일 때는 깜빡임 효과)
  const isBlinkHidden = player.invincibleTimer > 0 && Math.floor(player.invincibleTimer / 6) % 2 === 0;
  if (!isBlinkHidden) {
    const bounceY = Math.abs(Math.sin(player.walkTimer)) * 5;

    if (player.evolveEffectTimer > 0) {
      ctx.save();
      ctx.strokeStyle = `rgba(255, 193, 7, ${player.evolveEffectTimer / 70})`;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(player.x, player.y - bounceY, player.radius + 14, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
    ctx.beginPath();
    ctx.ellipse(player.x, player.y + player.radius - 2, player.radius * 0.85, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = player.tier === 2 ? "#fff8e1" : "#fffde7";
    ctx.strokeStyle = player.tier === 2 ? "#f57c00" : "#2e7d32";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(player.x, player.y - bounceY, player.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.save();
    ctx.translate(player.x, player.y - bounceY + 2);
    if (player.facingLeft) ctx.scale(-1, 1);
    ctx.font = player.tier === 2 ? "34px sans-serif" : "30px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(player.emoji, 0, 0);
    ctx.restore();

    // 3단계에서 사체를 물고 있으면 캐릭터 옆에 🦴 아이콘 표시
    if (player.carryingCarcass) {
      ctx.font = "22px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("🦴", player.x + 26, player.y - bounceY - 12);
    }

    ctx.fillStyle = "rgba(27, 94, 32, 0.92)";
    ctx.font = "bold 13px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(player.name, player.x, player.y - player.radius - bounceY - 10);
  }

  // 떠오르는 텍스트
  for (const ft of floatingTexts) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, ft.alpha);
    ctx.font = "bold 15px sans-serif";
    ctx.textAlign = "center";
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
    ctx.strokeText(ft.text, ft.x, ft.y);
    ctx.fillStyle = ft.color;
    ctx.fillText(ft.text, ft.x, ft.y);
    ctx.restore();
  }

  // 상단 왼쪽 실시간 미션 안내바 (스테이지별 맞춤 표시)
  let missionText = "";
  if (gameState.stage === 1) {
    const grownCount = plants.filter((p) => p.grown).length;
    const sproutCount = plants.filter((p) => !p.grown).length;
    missionText = `☀️ 햇살: ${sunbeams.length} | 🌱 새싹: ${sproutCount} | 🌿 자란 식물: ${grownCount} (목표: 에너지 100%)`;
  } else if (gameState.stage === 2) {
    const hearts = "❤️".repeat(Math.max(0, gameState.lives)) + "🤍".repeat(Math.max(0, 3 - gameState.lives));
    missionText = `생존 목숨: ${hearts}  |  사냥: ${gameState.huntedCount}마리  |  ⚠️ 매·뱀의 붉은 원을 피하세요!`;
  } else if (gameState.stage === 3) {
    const carryStatus = player.carryingCarcass ? "🦴 사체 운반 중 → 🍄 분해자로!" : "🐸·🐦 사냥 후 🦴 사체를 줍세요!";
    missionText = `♻️ 물질 순환: ${gameState.cyclesCompleted} / 3회  |  ${carryStatus}`;
  }

  ctx.fillStyle = "rgba(255, 253, 247, 0.88)";
  ctx.fillRect(14, 12, 515, 30);
  ctx.strokeStyle = "#2e7d32";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(14, 12, 515, 30);

  ctx.fillStyle = "#1b5e20";
  ctx.font = "bold 13px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(missionText, 24, 32);

  // 콤보가 x2 이상일 때 상단 오른쪽에 콤보 배너 표시
  if (gameState.combo >= 2) {
    ctx.save();
    ctx.fillStyle = "rgba(255, 111, 0, 0.9)";
    ctx.fillRect(canvas.width - 170, 12, 155, 30);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`🔥 먹이 사슬 ${gameState.combo} COMBO!`, canvas.width - 92, 32);
    ctx.restore();
  }
}

// ============================================================
// 12. 메인 게임 루프
// ============================================================
function gameLoop() {
  if (!gameState.isPlaying) return;
  update();
  draw();
  gameState.animationFrameId = requestAnimationFrame(gameLoop);
}

// 특정 스테이지 시작 공용 함수
function startStageFlow(stageNumber, resetScore = false) {
  SoundFX.init();
  setupStage(stageNumber, resetScore);
  titleScreen.classList.remove("active");
  gameScreen.classList.add("active");
  draw();
  openStageBriefing(stageNumber);
}

// ============================================================
// 13. 버튼 이벤트 연결
// ============================================================

// 타이틀 화면 -> '1단계부터 탐험 시작하기'
startGameBtn.addEventListener("click", () => {
  startStageFlow(1, true);
});

// 타이틀 화면 -> 스테이지 바로 선택 버튼 (1·2·3단계)
stagePickBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetStage = Number(btn.dataset.stage);
    if (targetStage >= 1 && targetStage <= 3) {
      startStageFlow(targetStage, true);
    }
  });
});

// 브리핑 팝업 -> '탐험 시작!'
closeBriefingBtn.addEventListener("click", () => {
  SoundFX.init();
  briefingModal.classList.add("hidden");
  gameState.isPaused = false;
  if (!gameState.isPlaying) {
    gameState.isPlaying = true;
    gameLoop();
  }
});

// 소리 켜기 / 음소거 버튼
soundBtn.addEventListener("click", () => {
  const isMuted = SoundFX.toggleMute();
  soundBtn.textContent = isMuted ? "🔇 음소거" : "🔊 소리";
  soundBtn.classList.toggle("muted", isMuted);
});

// 도움말 열기 / 닫기
helpBtn.addEventListener("click", openStageHelp);
closeHelpBtn.addEventListener("click", closeStageHelp);

// 처음으로 확인 열기 / 취소 / 확정
homeBtn.addEventListener("click", openHomeConfirm);

cancelHomeBtn.addEventListener("click", () => {
  homeConfirmModal.classList.add("hidden");
  if (!gameState.isStageCleared && !gameState.isGameOver) {
    gameState.isPaused = false;
  }
});

function returnToTitleScreen() {
  homeConfirmModal.classList.add("hidden");
  briefingModal.classList.add("hidden");
  helpModal.classList.add("hidden");
  stageClearModal.classList.add("hidden");
  gameOverModal.classList.add("hidden");

  setupStage(1, true);
  gameScreen.classList.remove("active");
  titleScreen.classList.add("active");
}

confirmHomeBtn.addEventListener("click", returnToTitleScreen);
clearHomeBtn.addEventListener("click", returnToTitleScreen);
gameOverHomeBtn.addEventListener("click", returnToTitleScreen);

// 클리어 팝업 -> 이 단계 다시 도전 / 다음 단계로 진화
retryStageBtn.addEventListener("click", () => {
  stageClearModal.classList.add("hidden");
  setupStage(gameState.stage, false);
  gameState.isPlaying = true;
  gameLoop();
});

nextStageBtn.addEventListener("click", () => {
  stageClearModal.classList.add("hidden");
  const nextStage = Math.min(3, gameState.stage + 1);
  startStageFlow(nextStage, false); // 점수는 이어서 누적!
});

// 게임 오버 팝업 -> 이 단계 다시 도전
gameOverRetryBtn.addEventListener("click", () => {
  gameOverModal.classList.add("hidden");
  setupStage(gameState.stage, false);
  gameState.isPlaying = true;
  gameLoop();
});