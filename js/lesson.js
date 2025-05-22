//// PHONE BLOCK

const phoneInput = document.querySelector("#phone_input");
const phoneButton = document.querySelector("#phone_button");
const phoneResult = document.querySelector("#phone_result");

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/;

phoneButton.addEventListener('click', () => {
    try {
        if (regExp.test(phoneInput.value.trim())) {
            phoneResult.textContent = "SAVE";
            phoneResult.style.color = "green";
        } else {
            phoneResult.textContent = "ERROR";
            phoneResult.style.color = "red";
        }
    } catch (error) {
        console.error('Ошибка валидации телефона:', error);
        phoneResult.textContent = "ERROR";
        phoneResult.style.color = "red";
    }
});



//// TAB SLIDER

const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items');

let currentIndex = 0;

const hideTabContent = () => {
    tabContentBlocks.forEach(item => {
        item.style.display = "none";
    });
    tabs.forEach(tab => {
        tab.classList.remove('tab_content_item_active');
    });
};

const showTabContent = (index = 0) => {
    if (index < 0 || index >= tabContentBlocks.length) {
        console.error('showTabContent: индекс вне диапазона');
        return;
    }
    tabContentBlocks[index].style.display = 'block';
    tabs[index].classList.add('tab_content_item_active');
};

const initTabs = () => {
    try {
        hideTabContent();
        showTabContent(currentIndex);

        tabsParent.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('tab_content_item')) {
                tabs.forEach((tab, index) => {
                    if (target === tab) {
                        hideTabContent();
                        showTabContent(index);
                        currentIndex = index;
                    }
                });
            }
        });

        setInterval(() => {
            hideTabContent();
            currentIndex = (currentIndex + 1) % tabContentBlocks.length;
            showTabContent(currentIndex);
        }, 3000);

    } catch (error) {
        console.error('Ошибка инициализации табов:', error);
    }
};

initTabs();




//// CONVERTER

const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const cnyInput = document.querySelector('#cny');

const converter = (element, other1, rate1, other2, rate2) => {
    element.oninput = async () => {
        try {
            const response = await fetch('../data/converter.json');
            if (!response.ok) {
                throw new Error('Ошибка загрузки курса валют');
            }
            const data = await response.json();
            const value = parseFloat(element.value);

            if (!value) {
                other1.value = '';
                other2.value = '';
                return;
            }

            let som;

            if (element.id === 'som') {
                som = value;
            } else if (element.id === 'usd') {
                som = value * data.usd;
            } else if (element.id === 'cny') {
                som = value * data.cny;
            }

            const setValue = (input) => {
                if (input.id === 'usd') {
                    input.value = (som / data.usd).toFixed(2);
                } else if (input.id === 'cny') {
                    input.value = (som / data.cny).toFixed(2);
                } else if (input.id === 'som') {
                    input.value = som.toFixed(2);
                }
            };

            setValue(other1);
            setValue(other2);

        } catch (error) {
            console.error('Ошибка конвертации:', error);
            other1.value = '';
            other2.value = '';
        }
    };
};

converter(somInput, usdInput, 'usd', cnyInput, 'cny');
converter(usdInput, somInput, 'som', cnyInput, 'cny');
converter(cnyInput, somInput, 'som', usdInput, 'usd');




////// CARD SWITCHER

const cardBlock = document.querySelector('.card');
const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');

const MAX_ID = 200;
let cardId = 1;

async function loadCard(id) {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const { title, completed } = await res.json();

        cardBlock.innerHTML = `
            <p>${title}</p>
            <p style="color:${completed ? 'green' : 'red'}">${completed}</p>
            <span>${id}</span>
        `;
    } catch (error) {
        cardBlock.innerHTML = '<p style="color:red">Ошибка загрузки</p>';
        console.error('Ошибка при загрузке карточки:', error);
    }
}

const nextId = id => (id % MAX_ID) + 1;
const prevId = id => (id - 2 + MAX_ID) % MAX_ID + 1;

btnNext.addEventListener('click', () => {
    cardId = nextId(cardId);
    loadCard(cardId);
});

btnPrev.addEventListener('click', () => {
    cardId = prevId(cardId);
    loadCard(cardId);
});

loadCard(cardId);



//// fetch в console

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts => console.log(posts))
    .catch(err => console.error(err));



//// WEATHER
const searchInput = document.querySelector('.cityName')
const searchButton = document.querySelector('#search')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')

const BASE_API = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'

searchButton.onclick = async () => {
    try {
        if (searchInput.value !== '') {
            const response = await fetch(`${BASE_API}?q=${searchInput.value}&units=metric&lang=ru&appid=${API_KEY}`)
            const data = await response.json()
            city.innerHTML = data.name || 'Город не найден...'
            temp.innerHTML = Math.round(data.main.temp) + '&deg;C'
            searchInput.value = ''
        } else {
            city.innerHTML = 'Введите город'
            temp.innerHTML = ''
        }
    } catch (e) {
        console.log(e)
    }
}
