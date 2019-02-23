//selectors
const sessionValue = document.querySelector('#session');
const breakValue = document.querySelector('#break');
const addSession = document.querySelector('#add-session');
const reduceSession = document.querySelector('#reduce-session');
const addBreak = document.querySelector('#add-break');
const reduceBreak = document.querySelector('#reduce-break');
const startBtn = document.querySelector("#start");
const pauseBtn = document.querySelector("#pause");
const stopBtn = document.querySelector("#stop");
const resetBtn = document.querySelector("#restart");
const timerValue = document.querySelector("#timer-counter");
const timerText = document.querySelector(".timer-text");
const sessionSelector = document.querySelector("#session-btn");
const breakSelector = document.querySelector("#break-btn");
const textSelector = document.querySelector(".action-text");


//variables
const alarm = new Audio('./sound/316833__lalks__alarm-01-short.wav');
const beep = new Audio('./sound/459992__florianreichelt__beep-short.mp3');

let sessionTime = 25;
let breakTime = 5;
let isSession = true;
let isBreak = false;
let counter;
let currentValue;

//handle display
sessionValue.innerHTML = `${sessionTime}:00`;
breakValue.innerHTML = `${breakTime}:00`;
timerValue.innerHTML = `${sessionTime}:00`;


//functions
const handleTimerDisplay = (sessionSelector, breakSelector) => {
    if (sessionSelector) {
        timerValue.innerHTML = `${sessionTime}:00`;
    } else if (breakSelector) {
        timerValue.innerHTML = `${breakTime}:00`
    }
}

const handleStart = (sessionSelector, breakSelector) => {
    beep.play();
    if (sessionSelector) {
        counter = setInterval(handleTimer, 1000);
        if (!currentValue) {
            currentValue = sessionTime * 60;
        }

    } else if (breakSelector) {
        counter = setInterval(handleTimer, 1000);
        if (!currentValue) {
            currentValue = breakTime * 60;
        }
    }
}

const handleTimer = () => {
    currentValue--;
    if (currentValue % 60 >= 10) {
        timerValue.innerHTML = `${Math.floor(currentValue / 60 )}:${currentValue % 60}`;
    } else {
        timerValue.innerHTML = `${Math.floor(currentValue / 60 )}:0${currentValue % 60}`;
    }
    if (currentValue == 0) {
        alarm.play();
        clearInterval(counter);
        currentValue = undefined;
        isSession ? timerText.innerHTML = `Switch to Break` : timerValue.innerHTML = `Switch Session`;
    }
}

const handleStop = () => {
    beep.play();
    clearInterval(counter);
    isSession = true;
    isBreak = false;
    handleReset();
}

const handleReset = () => {
    beep.play();
    currentValue = undefined;
    sessionTime = 25;
    breakTime = 5;
    handleTimerDisplay(isSession, isBreak);
    breakValue.innerHTML = `${breakTime}:00`;
    sessionValue.innerHTML = `${sessionTime}:00`;
    timerText.innerHTML = "";
}
const handlePause = () => {
    beep.play();
    clearInterval(counter);
}

//event listeners
//add session time
addSession.addEventListener('click', () => {
    if (sessionTime < 60) {
        beep.play();
        sessionTime++;
        sessionValue.innerHTML = `${sessionTime}:00`;
        handleTimerDisplay(isSession, isBreak);
    }
});
//reduce session time
reduceSession.addEventListener('click', () => {
    if (sessionTime > 1) {
        beep.play();
        sessionTime--;
        sessionValue.innerHTML = `${sessionTime}:00`;
        handleTimerDisplay(isSession, isBreak);
    }
});
//add break time
addBreak.addEventListener('click', () => {
    if (breakTime < 60) {
        beep.play();
        breakTime++;
        breakValue.innerHTML = `${breakTime}:00`;
        handleTimerDisplay(isSession, isBreak);
    }
});
//reduce break time

reduceBreak.addEventListener('click', () => {
    if (breakTime > 1) {
        beep.play();
        breakTime--;
        breakValue.innerHTML = `${breakTime}:00`;
        handleTimerDisplay(isSession, isBreak);
    }
});

//start timer
startBtn.addEventListener('click', handleStart);
//pause timer
pauseBtn.addEventListener('click', handlePause);
//stop timer
stopBtn.addEventListener('click', handleStop);
//reset timer
resetBtn.addEventListener('click', handleReset);
//session selector
sessionSelector.addEventListener('click', () => {
    beep.play();
    isSession = true;
    isBreak = false;
    timerValue.innerHTML = `${sessionTime}:00`;
    timerText.innerHTML = "";
    textSelector.innerHTML = `Session Time`;

});
//break selector
breakSelector.addEventListener('click', () => {
    beep.play();
    isBreak = true;
    isSession = false;
    timerValue.innerHTML = `${breakTime}:00`
    timerText.innerHTML = "";
    textSelector.innerHTML = `Break Time`;

});