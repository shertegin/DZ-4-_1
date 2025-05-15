//// PHONE BLOCK

const phoneInput = document.querySelector("#phone_input");
const phoneButton = document.querySelector("#phone_button");
const phoneResult = document.querySelector("#phone_result");

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = "SAVE";
        phoneResult.style.color = "green";
    } else {
        phoneResult.innerHTML = "ERROR";
        phoneResult.style.color = "red";
    }
}


//// TAB SLIDER
const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items');

const hideTabContent = () => {
    tabContentBlocks.forEach((item) => {
        item.style.display = "none";
    });
    tabs.forEach(tab => {
        tab.classList.remove('tab_content_item_active');
    });
};

const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'block';
    tabs[index].classList.add('tab_content_item_active');
};

hideTabContent();
showTabContent();

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab, tabIndex) => {
            if (event.target === tab) {
                hideTabContent();
                showTabContent(tabIndex);
                currentIndex = tabIndex;
            }
        });
    }
};

let currentIndex = 0;

setInterval(() => {
    hideTabContent();
    currentIndex = (currentIndex + 1) % tabContentBlocks.length;
    showTabContent(currentIndex);
}, 3000);



//// CONVERTER

const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const cnyInput = document.querySelector('#cny');

const converter = (element, other1, rate1, other2, rate2) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open('GET', '../data/converter.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();

        request.onload = () => {
            const data = JSON.parse(request.response);
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

            if (other1.id === 'usd') {
                other1.value = (som / data.usd).toFixed(2);
            } else if (other1.id === 'cny') {
                other1.value = (som / data.cny).toFixed(2);
            } else if (other1.id === 'som') {
                other1.value = som.toFixed(2);
            }

            if (other2.id === 'usd') {
                other2.value = (som / data.usd).toFixed(2);
            } else if (other2.id === 'cny') {
                other2.value = (som / data.cny).toFixed(2);
            } else if (other2.id === 'som') {
                other2.value = som.toFixed(2);
            }
        }
    }
}

converter(somInput, usdInput, 'usd', cnyInput, 'cny');
converter(usdInput, somInput, 'som', cnyInput, 'cny');
converter(cnyInput, somInput, 'som', usdInput, 'usd');
