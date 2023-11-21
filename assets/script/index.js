'use strict';

/*-------------------------------------------------------*/
/*  Utility functions                                    */
/*-------------------------------------------------------*/
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function selectById(selector, parent = document) {
    return parent.getElementById(selector);
}

function selectAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}

function create(element, parent = document) {
    return parent.createElement(element);
}

//Creating HTML elements 
let formDate = select('.clock');
let hourInput = select('.hour');
let minutesInput = select('.minutes');
let setAlarm = select('.set-alarm-button');


let showAlarmHour = selectById('set-alarm-hour');
let showAlarmMinutes = selectById('set-alarm-minutes');
let showAlarmSimbol = selectById('set-alarm-simbol');

let bellIcon = selectById('bell');

let validHour = false;
let validMinutes = false;

let audioWin = new Audio('./assets/audio/mixkit-casino-bling-achievement-2067.wav');
let audioStart = new Audio('./assets/audio/mixkit-completion-of-a-level-2063.wav');

let dateAlarm = new Date();

/*--------------------------------------------------------------------------------*/
/* Function: Getting and showin the hour
/*--------------------------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function () {
    function formatTimeTwoDigits(value) {
        return value.toString().padStart(2, '0');
    }

    function updateClock() {
        const now = new Date();
        const hours = formatTimeTwoDigits(now.getHours());
        const minutes = formatTimeTwoDigits(now.getMinutes());

        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
    }

    // Uddate hora and minutes in one seconds 
    setInterval(updateClock, 1000);

    updateClock();


    audioWin.preload = 'auto';
    audioStart.preload = 'auto';

    // Check if the user-set alarm hour matches the current hour
    if (validHour && validMinutes && now.getHours() === dateAlarm.getHours() && now.getMinutes() === dateAlarm.getMinutes()) {
        playSoundWin();
        applyWinEffect();
    }
});

/*-------------------------------------------------------*/
/*  Function: Valide pattern                            */
/*-------------------------------------------------------*/
function validatingPattern(str) {
    const DATE_PATTERN = /^[0-9]{2}$/;

    if (DATE_PATTERN.test(str)) {
        return true;
    } else {
        return false;
    }
}

/*-------------------------------------------------------*/
/*  Function: Valide the hour                            */
/*-------------------------------------------------------*/
function isValidHour(cleanHour) {
    // Validating two numbers digits 

    if (validatingPattern(cleanHour)) {
        validHour = true;
        let parssedHour = parseInt(cleanHour, 10);

        // Checking if parsing was successful
        if (isNaN(parssedHour)) {
            validHour = false;
        } else if (parssedHour >= 0 && parssedHour <= 23) {
            // Validating hours from 0 to 23 
            validHour = true;
        }
    }
}

/*-------------------------------------------------------*/
/*  Function: Valide minutes                            */
/*-------------------------------------------------------*/
function isValidMinutes(cleanMinutes) {
    if (validatingPattern(cleanMinutes)) {

        let parssedMinutes = parseInt(cleanMinutes, 10);

        // Checking if parsing was successful
        if (isNaN(parssedMinutes)) {
            validMinutes = false;
        } else if (parssedMinutes >= 0 && parssedMinutes <= 59) {
            validMinutes = true;
        }
    }
}

/*--------------------------------------------------------------------------------*/
/* Function: onEven when the user do click in button Set Alarm
/*--------------------------------------------------------------------------------*/
onEvent('click', setAlarm, function (e) {
    e.preventDefault();

    let cleanHour = hourInput.value.trim();
    let cleanMinutes = minutesInput.value.trim();

    isValidHour(cleanHour);
    isValidMinutes(cleanMinutes);

    if (!validHour) {
        //Ad hover to inputHour
    }

    if (!validMinutes) {
        //Ad hover to inputMinute
    }

    if (validHour && validMinutes) {
        let paddedHour = cleanHour.toString().padStart(2, '0');
        let paddedMinutes = cleanMinutes.toString().padStart(2, '0');

        dateAlarm.setHours(paddedHour, paddedMinutes, 0);
        console.log(dateAlarm);

        bellIcon.style.display = 'block';
        showAlarmHour.textContent = dateAlarm.getHours();
        showAlarmSimbol.textContent = ':';
        showAlarmMinutes.textContent = dateAlarm.getMinutes();

        showAlarmHour.style.display = 'block';
        showAlarmMinutes.style.display = 'block';
        showAlarmSimbol.style.display = 'block';

        //element.style.display = 'none';

        console.log(`Ready to go ${dateAlarm}`);
    }
});


/*----------------------------------------------------------*/
/*  Function: Sounds                                        */
/*----------------------------------------------------------*/

// Function to play the audio
function playSoundWin() {
    audioWin.play();
}

function playSoundStart() {
    audioStart.play();
}


// Function to apply the win effect
function applyWinEffect() {
    document.body.classList.add('win-effect');
}

// Function to remove the win effect
function removeWinEffect() {
    document.body.classList.remove('win-effect');
}


