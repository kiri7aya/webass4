let cardsVisible = false;

const cardPositions = [
    { x: -170, y: -90 }, // Верхний левый угол
    { x: 0, y: -155 },    // По центру сверху
    { x: 170, y: -90 },  // Верхний правый угол
    { x: -170, y: 90 },  // Нижний левый угол
    { x: 0, y: 155 },    // По центру снизу
    { x: 170, y: 90 }   // Нижний правый угол
];

function toggleCards() {
    const centralButton = document.getElementById('centralButton');
    const cards = [
        document.getElementById('card1'),
        document.getElementById('card2'),
        document.getElementById('card3'),
        document.getElementById('card4'),
        document.getElementById('card5'),
        document.getElementById('card6')
    ];

    if (!cardsVisible) {
        centralButton.style.width = '100px';
        centralButton.style.height = '100px';

        cards.forEach((card, index) => {
            card.style.opacity = 1;
            card.style.transform = `translate(${cardPositions[index].x}px, ${cardPositions[index].y}px)`;
        });
    } else {
        centralButton.style.width = '150px';
        centralButton.style.height = '150px';

        cards.forEach((card) => {
            card.style.transform = 'translate(0px, 0px)';
            card.style.opacity = 0;
        });
    }

    cardsVisible = !cardsVisible;
}

// Form Validation
document.getElementById('validationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const error = document.getElementById('formError');
    error.className = 'text-danger';

    if (!validateEmail(email)) {
        error.textContent = 'Invalid email format';
    } else if (password.length < 6) {
        error.textContent = 'Password must be at least 6 characters long';
    } else if (password !== confirmPassword) {
        error.textContent = 'Passwords do not match';
    } else {
        error.className = 'text-success';
        error.textContent = 'Form submitted successfully!';
    }
});

function validateEmail(email) {
    const re = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

// To-Do List
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const taskText = taskInput.value;

    if (taskText === '') {
        alert('Task cannot be empty');
        return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;
    li.classList.add('d-flex', 'justify-content-between', 'align-items-center');
    li.addEventListener('click', function () {
        li.classList.toggle();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'my-1');
    deleteBtn.addEventListener('click', function () {
        taskList.removeChild(li);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    taskInput.value = '';
}

// Number Sorting Tool
function sortNumbers(order) {
    const numbersInput = document.getElementById('numbersInput').value;
    const numbersArray = numbersInput.split(',').map(Number);

    if (numbersArray.some(isNaN)) {
        alert('Please enter valid numbers separated by commas');
        return;
    }

    numbersArray.sort((a, b) => (order === 'asc' ? a - b : b - a));
    document.getElementById('sortedNumbers').textContent = `Sorted Numbers: ${numbersArray.join(', ')}`;
}

// Change Background Color
function changeBackgroundColor() {
    const colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
}

// Display Current Date and Time
function updateDateTime() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const formattedTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
    document.getElementById('datetime').textContent = `${formattedDate}, ${formattedTime}`;
}

setInterval(updateDateTime, 1000);

let randomNumber = Math.floor(Math.random() * 100) + 1; // Генерируем случайное число
let attempts = 0;

document.getElementById('validationForm').addEventListener('submit', startGame);
function startGame() {
    const userGuess = parseInt(document.getElementById('gameInput').value); // Получаем введенное пользователем число
    const feedback = document.getElementById('gameFeedback'); // Элемент для вывода результата

    attempts ++;

    // Проверяем, ввел ли пользователь корректное число
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        feedback.textContent = "Please enter a valid number between 1 and 100.";
        feedback.classList.add('text-danger');
    } else if ((userGuess-randomNumber) >= -5 && (userGuess-randomNumber) < 0) {
        feedback.textContent = "A little bit more! Try again.";
        feedback.classList.add('text-warning');
        feedback.classList.remove('text-danger');
    } else if ((userGuess-randomNumber) <= 5 && (userGuess-randomNumber) > 0) {
        feedback.textContent = "A little bit less! Try again.";
        feedback.classList.add('text-warning');
        feedback.classList.remove('text-danger');
    } else if (userGuess < randomNumber) {
        feedback.textContent = "Too low! Try again.";
        feedback.classList.add('text-warning');
        feedback.classList.remove('text-danger');
    } else if (userGuess > randomNumber) {
        feedback.textContent = "Too high! Try again.";
        feedback.classList.add('text-warning');
        feedback.classList.remove('text-danger');
    } else {
        feedback.textContent = `Congratulations! You guessed the number ${randomNumber} in ${attempts} attempts!`;
        feedback.classList.remove('text-danger', 'text-warning');
        feedback.classList.add('text-success');
    }
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1; // Генерируем новое случайное число
    attempts = 0;
    const feedback = document.getElementById('gameFeedback');
    feedback.classList.add('text-dark');
    feedback.textContent = 'A new number has been guessed';
}