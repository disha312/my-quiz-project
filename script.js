const startScreen = document.querySelector('.start-screen');
const quizScreen = document.querySelector('.quiz-screen');
const endScreen = document.querySelector('.end-screen');
const questionBox = document.querySelector('.questions');
const optionBox = document.querySelector('.options');
const startBtn = document.querySelector('.startBtn');
const nextBtn = document.querySelector('.nextBtn');
const scoreDisplay = document.querySelector('.score');
const finalScoreDisplay = document.querySelector('.final-score');
const retryBtn = document.querySelector('.retryBtn');
const timerDisplay = document.getElementById('timerDisplay');  // Timer display element

// Quiz questions
const quiz = [
    {
        question: "Q. What is the capital of Australia?",
        options: ["Sydney", "Canberra", "Melbourne", "Brisbane"],
        answer: "Canberra"
    },
    {
        question: "Q. Who invented the telephone?",
        options: ["Alexander Graham Bell", "Nikola Tesla", "Thomas Edison", "Guglielmo Marconi"],
        answer: "Alexander Graham Bell"
    },
    {
        question: "Q. What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Fe", "Pb"],
        answer: "Au"
    },
    {
        question: "Q. Which programming language is known as the “language of the web”?",
        options: ["Python", "C++", "JavaScript", "Java"],
        answer: "JavaScript"
    },
    {
        question: "Q. What gas do plants primarily absorb during photosynthesis?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Methane"],
        answer: "Carbon Dioxide"
    },
    {
        question: "Q. Who was the first President of the United States?",
        options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"],
        answer: "George Washington"
    },
    {
        question: "Q. What is the square root of 144?",
        options: ["10", "12", "14", "16"],
        answer: "12"
    },
    {
        question: "Q. Which river is the longest in the world?",
        options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
        answer: "Nile"
    },
    {
        question: "Q. What is the chemical formula for water?",
        options: ["H2O", "O2", "H2", "CO2"],
        answer: "H2O"
    },
    {
        question: "Q. Who wrote the play ‘Romeo and Juliet’?",
        options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "George Orwell"],
        answer: "William Shakespeare"
    },
    {
        question: "Q. What does ‘HTTP’ stand for?",
        options: ["HyperText Transfer Protocol", "High Text Transfer Protocol", "Hyper Transfer Protocol", "High Text Transmission Protocol"],
        answer: "HyperText Transfer Protocol"
    },
    {
        question: "Q. Which famous artist painted the ‘Mona Lisa’?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "Q. Which country hosted the 2016 Summer Olympics?",
        options: ["Brazil", "China", "Russia", "United States"],
        answer: "Brazil"
    },
    {
        question: "Q. What is the capital currency of Japan?",
        options: ["Yen", "Won", "Ringgit", "Baht"],
        answer: "Yen"
    },
    {
        question: "Q. Who is known as the 'King of Pop'?",
        options: ["Elvis Presley", "Michael Jackson", "Justin Timberlake", "Prince"],
        answer: "Michael Jackson"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;
let isAnswered = false;
let timerInterval;
let timeRemaining = 15;  // Timer for 15 seconds per question

// Function to display a question
const showQuestion = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    // Clear previous options and reset selection
    optionBox.innerHTML = '';
    selectedOption = null;
    isAnswered = false;

    // Create and display options
    questionDetails.options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.textContent = option;
        optionDiv.classList.add('option');

        // Click event for option selection
        optionDiv.addEventListener('click', () => {
            if (isAnswered) return; // Prevent selection after answer is revealed

            const allOptions = optionBox.querySelectorAll('.option');
            allOptions.forEach(opt => opt.classList.remove('selected'));
            optionDiv.classList.add('selected');
            selectedOption = optionDiv;

            checkAnswer(); // Check the answer as soon as an option is selected
        });

        optionBox.appendChild(optionDiv);
    });

    // Update score display
    scoreDisplay.textContent = `Score: ${score}`;
    startTimer();  // Start the timer for this question
};

// Function to start the timer
const startTimer = () => {
    // Reset the timer display
    timerDisplay.textContent = `Time: ${timeRemaining}`;
    
    // Clear any previous intervals
    clearInterval(timerInterval);
    
    // Make the timer display visible if hidden
    timerDisplay.style.display = 'block';

    // Start the countdown
    timerInterval = setInterval(() => {
        timeRemaining--;
        timerDisplay.textContent = `Time: ${timeRemaining}`;  // Update timer display

        if (timeRemaining <= 0) {
            clearInterval(timerInterval); // Stop the timer
            alert("Time's up!");
            checkAnswer(); // Automatically check the answer when time's up
        }
    }, 1000); // Update every second
};

// Function to stop the timer
const stopTimer = () => {
    clearInterval(timerInterval);
};

// Function to check the answer and display feedback
const checkAnswer = () => {
    if (!selectedOption) {
        alert("Please select an option before proceeding!");
        return false;
    }

    const correctAnswer = quiz[currentQuestionIndex].answer;

    // Check if selected option is correct
    if (selectedOption.textContent === correctAnswer) {
        selectedOption.classList.add('correct'); // Mark as correct
        score++; // Increase score if correct
    } else {
        selectedOption.classList.add('incorrect'); // Mark as incorrect

        // Highlight the correct answer
        const allOptions = optionBox.querySelectorAll('.option');
        allOptions.forEach(option => {
            if (option.textContent === correctAnswer) {
                option.classList.add('correct'); // Highlight the correct option
            }
        });
    }

    // Disable further selection
    const allOptions = optionBox.querySelectorAll('.option');
    allOptions.forEach(option => option.classList.add('disabled'));

    isAnswered = true; // Mark this question as answered
    stopTimer(); // Stop the timer when the answer is selected
};

// Function to shuffle the questions
const shuffleQuestions = () => {
    for (let i = quiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]]; // Swap elements
    }
};

// Retry quiz and shuffle questions
retryBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    shuffleQuestions(); // Shuffle questions before restarting
    showQuestion();
    quizScreen.classList.remove('hidden');
    endScreen.classList.add('hidden');
});


// Start quiz
startBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden'); // Hide start screen
    quizScreen.classList.remove('hidden'); // Show quiz screen
    showQuestion(); // Display the first question
});

// Next button functionality
nextBtn.addEventListener('click', () => {
    // Ensure answer is checked before proceeding
    if (!isAnswered) {
        alert("Please select an option before proceeding!");
        return;
    }

    currentQuestionIndex++; // Increment question index

    if (currentQuestionIndex < quiz.length) {
        timeRemaining = 15; // Reset the timer for the next question
        showQuestion(); // Show the next question
    } else {
        quizScreen.classList.add('hidden'); // Hide quiz screen
        endScreen.classList.remove('hidden'); // Show end screen

        // Display the final score on the end screen
        finalScoreDisplay.textContent = `Your Final Score: ${score} / ${quiz.length}`;
    }
});

// Retry quiz
retryBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    timeRemaining = 15; // Reset timer
    showQuestion();
    quizScreen.classList.remove('hidden');
    endScreen.classList.add('hidden');
});



