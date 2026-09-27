let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

let timer = null;
let running = false;



function startStopwatch() {

    if (running) {
        return;
    }

    running = true;

    timer = setInterval(updateStopwatch, 10);
}


function updateStopwatch() {

    milliseconds++;

    if (milliseconds === 100) {

        milliseconds = 0;

        seconds++;
    }

    if (seconds === 60) {

        seconds = 0;

        minutes++;
    }

    if (minutes === 60) {

        minutes = 0;

        hours++;
    }

    updateDisplay();
}



function updateDisplay() {

    document.getElementById("hours").textContent =
        formatTime(hours);

    document.getElementById("minutes").textContent =
        formatTime(minutes);

    document.getElementById("seconds").textContent =
        formatTime(seconds);

    document.getElementById("milliseconds").textContent =
        formatTime(milliseconds);
}



function formatTime(value) {

    return value < 10 ? "0" + value : value;
}



function pauseStopwatch() {

    if (!running) {
        return;
    }

    clearInterval(timer);

    running = false;
}



function resetStopwatch() {

    clearInterval(timer);

    running = false;

    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;

    updateDisplay();

    document.getElementById("lapList").innerHTML = "";
}



function recordLap() {

    if (!running) {
        return;
    }

    const lapList = document.getElementById("lapList");

    const lap = document.createElement("li");

    const lapNumber = lapList.children.length + 1;

    const currentTime =
        `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;

    lap.innerHTML = `
        <span>Lap ${lapNumber}</span>
        <strong>${currentTime}</strong>
    `;

    lapList.appendChild(lap);
}