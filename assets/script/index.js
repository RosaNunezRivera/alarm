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

let invalidInputStyle = selectById('invalid-input');

let bellIcon = selectById('bell');

let validHour = false;
let validMinutes = false;

let dateAlarm = new Date();

//Creating HTML audio element 
let audioAlarm = selectById('my-audio-alarm');

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

    function checkingAlarm() {
        // Check if the user-set alarm hour matches the current hour
        const now = new Date(); // Move this line inside the function

        if (validHour && validMinutes && now.getHours() === dateAlarm.getHours() && now.getMinutes() === dateAlarm.getMinutes()) {
            playSound();
        }
    }

    // Uddate hora and minutes in one seconds 
    setInterval(updateClock, 1000);
    setInterval(checkingAlarm, 1000);

    updateClock();
    checkingAlarm();

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
        let parssedHour = parseInt(cleanHour, 10);

        // Checking if parsing was successful
        if (isNaN(parssedHour) || parssedHour < 0 || parssedHour > 23) {
            validHour = false;
        } else {
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
        if (isNaN(parssedMinutes) || parssedMinutes < 0 || parssedMinutes > 59) {
            validMinutes = false;
        } else {
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
        hourInput.value = '';
    }

    if (!validMinutes) {
        minutesInput.value = '';
    }

    if (validHour && validMinutes) {
        let paddedHour = cleanHour.toString().padStart(2, '0');
        let paddedMinutes = cleanMinutes.toString().padStart(2, '0');

        dateAlarm.setHours(paddedHour, paddedMinutes, 0);

        bellIcon.style.display = 'block';
        showAlarmHour.textContent = dateAlarm.getHours();
        showAlarmSimbol.textContent = ':';
        showAlarmMinutes.textContent = dateAlarm.getMinutes();

        showAlarmHour.style.display = 'block';
        showAlarmMinutes.style.display = 'block';
        showAlarmSimbol.style.display = 'block';
    }
});


/*----------------------------------------------------------*/
/*  Function: Sounds                                        */
/*----------------------------------------------------------*/

audioAlarm.volume = 0.5;

// Function to play the audio
function playSound() {
    audioAlarm.play();

    setTimeout(function () {
        stopSound();
    }, 5000);

}

function stopSound() {
    audioAlarm.pause();
    audioAlarm.currentTime = 0; // Reset the audio to the beginning
    reset();
}

/*-------------------------------------------------------*/
/*  Function: Valide pattern                            */
/*-------------------------------------------------------*/
function reset() {
    // Reset input fields
    dateAlarm.setHours(0, 0, 0);

    hourInput.value = '';
    minutesInput.value = '';

    // Reset alarm display elements
    showAlarmHour.textContent = '';
    showAlarmMinutes.textContent = '';
    showAlarmSimbol.textContent = '';

    // Hide the bell icon
    bellIcon.style.display = 'none';
    showAlarmHour.style.display = 'none';
    showAlarmMinutes.style.display = 'none';
    showAlarmSimbol.style.display = 'none';

    // Clear the dateAlarm object
    dateAlarm = new Date();

    // Reset validation flags
    validHour = false;
    validMinutes = false;
}