const questions = [
    {
        question: "Which HTML5 element is used to display dynamic calculation output?",
        options: ["<result>", "<output>", "<display>", "<calc>"],
        answer: "<output>"
    },
    {
        question: "Which CSS property controls the space inside an element's border?",
        options: ["margin", "padding", "border-spacing", "gap"],
        answer: "padding"
    },
    {
        question: "Which JavaScript method selects an element by its id attribute?",
        options: ["querySelectorAll()", "getElementsByClassName()", "getElementById()", "getElementByTag()"],
        answer: "getElementById()"
    },
    {
        question: "Which math helper generates a random integer from 1 to 10 in JS?",
        options: ["Math.floor(Math.random() * 10) + 1", "Math.random(1, 10)", "Math.ceil(Math.random() * 9)", "Math.round(Math.random() * 10)"],
        answer: "Math.floor(Math.random() * 10) + 1"
    },
    {
        question: "Which HTML attribute makes an input field mandatory before form submission?",
        options: ["validate", "autofocus", "required", "placeholder"],
        answer: "required"
    }
];

let shuffledQuestions = [];
let currentIndex = 0;
let score = 0;
let timeLeft = 15;
let timerId = null;
let answeredCurrent = false;

function shuffleQuestions() {
    shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
}

function startTimer() {
    clearInterval(timerId);
    timeLeft = 15;
    document.getElementById("timer").textContent = "Time left: " + timeLeft + "s";

    timerId = setInterval(function () {
        timeLeft--;
        document.getElementById("timer").textContent = "Time left: " + timeLeft + "s";

        if (timeLeft <= 0) {
            clearInterval(timerId);
            if (!answeredCurrent) {
                answeredCurrent = true;
                document.getElementById("feedback-text").textContent =
                    "Time's up! Correct answer: " + shuffledQuestions[currentIndex].answer;
                document.getElementById("feedback-text").style.color = "#c0392b";
                document.getElementById("submit-btn").disabled = true;
                document.getElementById("next-btn").disabled = false;
            }
        }
    }, 1000);
}

function displayQuestion() {
    const current = shuffledQuestions[currentIndex];
    answeredCurrent = false;

    document.getElementById("question-counter").textContent =
        "Question " + (currentIndex + 1) + " of " + shuffledQuestions.length;
    document.getElementById("question-text").textContent = current.question;
    document.getElementById("feedback-text").textContent = "";

    const container = document.getElementById("options-container");
    container.innerHTML = "";

    for (let idx = 0; idx < current.options.length; idx++) {
        const opt = current.options[idx];
        const label = document.createElement("label");
        label.className = "option-item";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "quizOption";
        radio.value = opt;
        radio.id = "opt-" + idx;

        const span = document.createElement("span");
        span.textContent = opt;

        label.appendChild(radio);
        label.appendChild(span);
        container.appendChild(label);
    }

    document.getElementById("submit-btn").disabled = false;
    document.getElementById("next-btn").disabled = true;
    startTimer();
}

function checkAnswer() {
    if (answeredCurrent) return;

    const selected = document.querySelector('input[name="quizOption"]:checked');
    const feedback = document.getElementById("feedback-text");

    if (!selected) {
        feedback.textContent = "Please select an option before submitting.";
        feedback.style.color = "#d35400";
        return;
    }

    clearInterval(timerId);
    answeredCurrent = true;

    const correctAnswer = shuffledQuestions[currentIndex].answer;
    if (selected.value === correctAnswer) {
        score++;
        feedback.textContent = "Correct!";
        feedback.style.color = "#1e8449";
    } else {
        feedback.textContent = "Incorrect. The correct answer is " + correctAnswer + ".";
        feedback.style.color = "#c0392b";
    }

    document.getElementById("score-display").textContent = "Score: " + score;
    document.getElementById("submit-btn").disabled = true;
    document.getElementById("next-btn").disabled = false;
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < shuffledQuestions.length) {
        displayQuestion();
    } else {
        clearInterval(timerId);
        document.getElementById("question-text").textContent = "Quiz Completed!";
        document.getElementById("options-container").innerHTML = "";
        document.getElementById("submit-btn").disabled = true;
        document.getElementById("next-btn").disabled = true;
        document.getElementById("feedback-text").textContent =
            "Final Score: " + score + " out of " + shuffledQuestions.length + ".";
        document.getElementById("feedback-text").style.color = "#1b4f72";
    }
}

function startQuiz() {
    score = 0;
    currentIndex = 0;
    document.getElementById("score-display").textContent = "Score: " + score;
    shuffleQuestions();
    displayQuestion();
}