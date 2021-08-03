
import BLOCKS from "./blocks.js";

// DOM
const playground = document.querySelector('.playground > ul');
const gameText = document.querySelector('.game_text');
const maxDisplay = document.querySelector('.max_');
const scoreDisplay = document.querySelector('.score_');
const levelDisplay = document.querySelector('.level_');
const cleansDisplay = document.querySelector('.cleans_');
const levelUpDisplay = document.querySelector('.levelUp');
const restartBtn = document.querySelector('.game_text > button');

// Setting
const Game_rows = 20;
const Game_cols = 10;

// Variables
let score = 0;
let duration = 500;
let erasedLines = 0;
let level = 1;
let totalLines = 0;
let highScore = 0;
let downInterval, tempMovingItem;


const movingItem = {
    type: '',
    direction: 0,
    down: 0,
    right: 3,
}

createPlayground()

// Functions
function createPlayground() {
    tempMovingItem = {...movingItem};
    for (let i = 0; i < Game_rows; i++) { // create 20 ea rows
        createNewLine();
    }
    generateNewBlock();
}

function createNewLine() {
    const li = document.createElement('li');
    const ul = document.createElement('ul');
    for (let j = 0; j < Game_cols; j++) { // create 10 ea columns
        const matrix = document.createElement('li');
        ul.prepend(matrix);
    }
    li.prepend(ul);
    playground.prepend(li);
}

function generateNewBlock() { // reset location and create new random block
    clearInterval(downInterval);
    downInterval = setInterval(() => {
        moveBlock('down', 1);
    }, duration)

    const blockArray = Object.entries(BLOCKS);
    const randomIndex = Math.floor(Math.random() * blockArray.length);
    movingItem.type = blockArray[randomIndex][0];
    movingItem.down = 0;
    movingItem.right = 3;
    movingItem.direction = 0;
    tempMovingItem = {...movingItem };
    renderBlock();
}

function renderBlock(moveType = '') {
    const { type, direction, down, right } = tempMovingItem;
    const movingBlocks = document.querySelectorAll('.moving'); 
    movingBlocks.forEach(moving => {
        moving.classList.remove(type, 'moving'); // when block moves, remove block on previous location 
    })
    BLOCKS[type][direction].some(block => {
        const x = block[0] + right; // X-axis movement
        const y = block[1] + down; // Y-axis movement
        
        // check blocks out of playground area
        const target = playground.childNodes[y]?.childNodes[0].childNodes[x] ?? null; 
        // if there's other existing blocks, return block to original location
        const isAvailable = checkEmpty(target); 
        if(isAvailable) {
            target.classList.add(type, 'moving'); 
        } else {
            tempMovingItem = {...movingItem};
            if(moveType === 'retry') {
                clearInterval(downInterval);
                showGameoverText();
            }
            setTimeout(() => {  
                renderBlock('retry') // recursion
                if(moveType === 'down') { // if block is on bottom, fix the block
                    score += 10;
                    showScreen();
                    seizeBlock();
                }
            }, 0);
            return true;
        }
    });
    movingItem.right = right; // update movingItem when block is rendered properly
    movingItem.down = down;
    movingItem.direction = direction;
}

function showGameoverText() {
    gameText.style.display = 'flex';
}

function seizeBlock() { // when block is fixed, add 'seized' class a
    const movingBlocks = document.querySelectorAll('.moving');
    movingBlocks.forEach(moving => {
        moving.classList.remove('moving'); 
        moving.classList.add('seized'); 
    })
    checkMatch();
    generateNewBlock();
}

function checkMatch() { // check if the line can be removed

    const childNodes = playground.childNodes;
    childNodes.forEach(child => {
        let matched = true;
        child.children[0].childNodes.forEach(li => {
            if(!li.classList.contains('seized')) {
                matched = false;
            }
        });
        if(matched) {
            child.classList.add(`flink`);
            setTimeout(() => {
                child.remove();
                createNewLine();
                erasedLines++;
                totalLines++;
                levelUp();
                getPoints();
                showScreen();
            }, 300);
        }
    })
    erasedLines = 0;
}

function showScreen() {
    if(score >= highScore) {
        highScore = score;
    }
    maxDisplay.innerHTML = highScore;
    scoreDisplay.innerHTML = score;
    cleansDisplay.innerHTML = totalLines;
}

function levelUp() {
    let addlevel = Math.floor(1 + totalLines * 1);
    console.log(addlevel)
    if (addlevel > level) {
        level = addlevel;
        levelUpDisplay.innerHTML = ' Up!';
        setTimeout(() => {
            levelUpDisplay.innerHTML = '';
        }, 2000);
    }
    levelDisplay.innerHTML = level;
    duration = 500 - 40 * (level - 1);
    
}

function getPoints() {
    
    switch (erasedLines) {
        case 1:
            score += 70 * level;
            break;
        case 2:
            score += 120 * level; // 70 + 120
            break;
        case 3:
            score += 200 * level; // 70 + 120 + 200
            break;
        case 4:
            score += 300 * level; // 70 + 120 + 200 + 300
        default:
            break;
    }
}

function checkEmpty(target) { // false = stop block goving down, true = keep block going down
    if(!target || target.classList.contains('seized')) {
        return false;
    }
    return true;
}

function moveBlock(moveType, amount) {
    tempMovingItem[moveType] += amount;
    renderBlock(moveType);
}

function rotateBlock() {
    const direction = tempMovingItem.direction;
    direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1;
    renderBlock();
}

function dropBlock() {
    clearInterval(downInterval);
    downInterval = setInterval(() => {
        moveBlock('down', 1);
    }, 8);    
}

function reset() {
    score = 0;
    totalLines = 0;
    erasedLines = 0;
    level = 1;
    duration = 500;
}

// Event handling
document.addEventListener('keydown', event => {
    switch (event.keyCode) {
        case 39:
            moveBlock('right', 1); 
            break;
        case 37:
            moveBlock('right', -1);
            break; 
        case 40:
            moveBlock('down', 1); 
            break;
        case 38:
            rotateBlock();
            break;
        case 32:
            dropBlock();
            break;
        default:
            break;
    }
})

restartBtn.addEventListener('click', () => {
    reset();
    playground.innerHTML = ''; 
    scoreDisplay.innerHTML = score;
    gameText.style.display = 'none';
    createPlayground();
})

