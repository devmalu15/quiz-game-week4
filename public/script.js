document.addEventListener("DOMContentLoaded", () => {
    let currentQuestionIndex = 0;
    let score = 0;
    let questions = [];

    fetch('/questions')
        .then(response => response.json())
        .then(data => {
            questions = data;
            loadQuestion();
        });

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const questionObj = questions[currentQuestionIndex];
            document.getElementById('question').innerText = questionObj.question;
            const optionsContainer = document.getElementById('options');
            optionsContainer.innerHTML = "";
            questionObj.options.forEach(option => {
                const button = document.createElement("button");
                button.innerText = option;
                button.onclick = () => checkAnswer(option);
                optionsContainer.appendChild(button);
            });
        } else {
            document.getElementById('quiz-container').innerHTML = `<h2>Quiz Completed</h2><p>Your score: ${score}/${questions.length}</p>`;
        }
    }

    function checkAnswer(selectedOption) {
        const questionObj = questions[currentQuestionIndex];
        if (selectedOption === questionObj.answer) {
            score++;
        }
        currentQuestionIndex++;
        loadQuestion();
    }

    document.getElementById('next-btn').addEventListener("click", loadQuestion);
});