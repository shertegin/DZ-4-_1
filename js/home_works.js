//// HOMEWORK 1 (1)

const gmailInput = document.querySelector("#gmail_input");
const gmailButton = document.querySelector("#gmail_button");
const gmailResult = document.querySelector("#gmail_result");

const regExp = /^[a-zA-Z0-9_.%+-]+@gmail\.com$/;

gmailButton.onclick = () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = "SAVE"
        gmailResult.style.color = "green"
    } else {
        gmailResult.innerHTML = "ERROR"
        gmailResult.style.color = "red"
    }
};


//// HOMEWORK 1(2)
window.addEventListener('DOMContentLoaded', () => {
    const parent = document.querySelector('.parent_block');
    const child = document.querySelector('.child_block');

    const parentSize = parent.clientWidth;
    const childSize = child.clientWidth;
    const max = parentSize - childSize;
    let x = 0, y = 0;
    let direction = "right";

    child.style.position = "absolute";

    function move() {
        child.style.left = `${x}px`;
        child.style.top = `${y}px`;

        switch (direction) {
            case "right":
                if (x < max) {
                    x += 2;
                } else {
                    direction = "down";
                }
                break;
            case "down":
                if (y < max) {
                    y += 2;
                } else {
                    direction = "left";
                }
                break;
            case "left":
                if (x > 0) {
                    x -= 2;
                } else {
                    direction = "up";
                }
                break;
            case "up":
                if (y > 0) {
                    y -= 2;
                } else {
                    direction = "right";
                }
                break;
        }

        requestAnimationFrame(move);
    }

    move();
});



//// HOMEWORK 2
window.addEventListener('DOMContentLoaded', () => {
    const secondsDisplay = document.getElementById('seconds');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const resetButton = document.getElementById('reset');

    let counter = 0;
    let interval;
    let isRunning = false;

    startButton.addEventListener('click', () => {
        if (isRunning) {
            return;
        }

        isRunning = true;

        interval = setInterval(() => {
            counter++;
            secondsDisplay.textContent = counter;
        }, 1000);
    });

    stopButton.addEventListener('click', () => {
        clearInterval(interval); // Останавливаем счётчик
        isRunning = false;
    });

    resetButton.addEventListener('click', () => {
        clearInterval(interval);
        isRunning = false;
        counter = 0;
        secondsDisplay.textContent = counter;
    });
});


