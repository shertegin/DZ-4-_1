async function fetchCards() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error('Ошибка при загрузке данных');

        const data = await response.json();
        renderCards(data.slice(0, 12)); // только 12 карточек
    } catch (err) {
        console.error('Произошла ошибка при получении данных:', err);
    }
}

function renderCards(posts) {
    const container = document.getElementById('card-container');
    const imagePath = '../images/card1.jpg'; // одна картинка

    posts.forEach((post) => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
      <img src="${imagePath}" alt="Картинка" />
      <h3>${post.title}</h3>
      <p>${post.body}</p>
    `;

        container.appendChild(card);
    });
}

fetchCards();

