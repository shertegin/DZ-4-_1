//// PART 1

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


//// PART 2
window.addEventListener('DOMContentLoaded', () => {
    const parent = document.querySelector('.parent_block');
    const child = document.querySelector('.child_block');

    function moveRight(position = 0) {
        const maxRight = parent.clientWidth - child.clientWidth;

        child.style.left = `${position}px`;

        if (position < maxRight) {
            requestAnimationFrame(() => moveRight(position + 1));
        }
    }
    moveRight();
});
