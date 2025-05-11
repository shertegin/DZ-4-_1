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


//// CHARACTERS.JSON
document.addEventListener("DOMContentLoaded", () => {
    const list = document.querySelector('.characters-list');

    fetch('../data/characters.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(character => {
                const card = document.createElement('div');
                card.classList.add('character-card');

                card.innerHTML = `
                    <div class="character-photo">
                        <img src="${character.image}" alt="${character.name}">
                    </div>
                    <h3>${character.name}</h3>
                    <p><strong>Возраст:</strong> ${character.age}</p>
                    <p><strong>Рекорд:</strong> ${character.record}</p>
                    <p><strong>Позиция:</strong> ${character.title}</p>
                `;

                list.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Ошибка при загрузке персонажей:", error);
        });
});



//// ANY.JSON
const xhr = new XMLHttpRequest();

xhr.open('GET', '../data/any.json', true);  // Путь к файлу data/any.json

xhr.onload = function() {
    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);

        console.log('Информация о Темиркулове Шертегине:');
        console.log(`Имя: ${data.name}`);
        console.log(`Возраст: ${data.age} лет`);
        console.log(`Рост: ${data.height}`);
        console.log(`Вес: ${data.weight}`);
        console.log(`Степень: ${data.degree}`);
        console.log(`Хобби: ${data.hobbies.join(', ')}`);
    } else {
        console.error('Ошибка при загрузке данных: ', xhr.statusText);
    }
};

xhr.onerror = function() {
    console.error('Запрос не удался');
};

xhr.send();
