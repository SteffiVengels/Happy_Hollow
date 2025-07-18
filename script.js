// Globale Konfiguration
const frameWidth = 50;
const walkFrames = 6;
const idleFrames = 4;

/**
 * Init wird beim Seitenladen aufgerufen
 */
function init() {
    animateCharacter();
}

/**
 * Aktualisiert das Sprite für ein beliebiges Element
 * @param {HTMLElement} element - Das Element, das animiert werden soll
 * @param {Object} currentFrame - Objekt mit dem aktuellen Frame-Wert
 * @param {number} totalFrames - Anzahl der Animationsframes
 */
function updateSprite(element, currentFrame, totalFrames) {
    currentFrame.value = (currentFrame.value + 1) % totalFrames;
    const offsetX = currentFrame.value * frameWidth;
    element.style.backgroundPosition = `-${offsetX}px 0`;
}

/**
 * Startet die Idle-Animation für ein Element
 * @param {HTMLElement} element 
 * @param {Object} currentFrame 
 */
function startIdleAnimation(element, currentFrame) {
    element.style.backgroundImage = "url('./assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/Pink_Monster_Idle_4.png')";
    element.style.backgroundSize = `${frameWidth * idleFrames}px 50px`;
    currentFrame.value = 0;

    function idle() {
        updateSprite(element, currentFrame, idleFrames);
        setTimeout(idle, 240);
    }
    idle();
}

/**
 * Lässt ein Element nach rechts laufen und wechselt dann zur Idle-Animation
 * @param {HTMLElement} element 
 * @param {Object} currentFrame 
 * @param {number} startPos 
 * @param {number} endPos 
 * @param {number} speed 
 */
function walk(element, currentFrame, startPos, endPos, speed) {
    let position = startPos;

    function step() {
        if (position < endPos) {
            position += speed;
            element.style.left = position + 'px';
            updateSprite(element, currentFrame, walkFrames);
            setTimeout(() => requestAnimationFrame(step), 120);
        } else {
            element.style.transform = 'scaleX(-1)';
            startIdleAnimation(element, currentFrame);
        }
    }
    step();
}

/**
 * Start-Character animieren
 */
function animateCharacter() {
    const character = document.querySelector('.character-animation');
    if (!character) return;

    const currentFrame = { value: 0 };
    walk(character, currentFrame, 0, 620, 4);
}

/**
 * Menü-Character erstellen & idle animieren
 */
function showMenuCharacter() {
    const menuChar = document.createElement('div');
    menuChar.classList.add('character-animation');
    menuChar.style.position = 'absolute';
    menuChar.style.left = '20px';
    menuChar.style.bottom = '32px';

    document.getElementById('menu_screen').appendChild(menuChar);

    const currentFrame = { value: 0 };
    startIdleAnimation(menuChar, currentFrame);
}

/**
 * Header animieren
 */
function animateHeader() {
    const header = document.querySelector('#start_screen header');
    header.classList.add('animate');
}

/**
 * Menü-Screen öffnen
 */
function openMenuScreen() {
    animateHeader();
    document.getElementById("new_game_button").classList.add('d_none');

    const startChar = document.querySelector('.character-animation');
    if (startChar) startChar.style.display = 'none';

    setTimeout(() => {
        document.getElementById("start_screen").classList.add('d_none');
        document.getElementById("menu_screen").classList.remove('d_none');
        document.getElementById("header").classList.remove('d_none');
        showMenuCharacter();
    }, 800);
}


