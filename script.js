const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')
const timeElement = document.getElementById('timer')


var shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

// Function to start the game and set the timer 
function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    var timeLeft = 15;
    var timeInterval = setInterval(function() {
        timeElement.textContent = timeLeft;
        timeLeft--;
        if (timeLeft === 0) {
            clearInterval(timeInterval);
            sendMessage();
        }
    }
    , 1000);
}

// Function to set the next question
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])   
}
// Function to show the question
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
    
}
//function to reset the game 
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
  
}

// Function to select a answer
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
   
}

// Function to set the status of the answer
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }

}

// Function to clear the status of the answer
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
 
}

//question array
const questions = [
    {
        question: 'What is the capital of Florida?',
        answers: [
            { text: 'Tallahassee', correct: true },
            { text: 'Miami', correct: false },
            { text: 'Orlando', correct: false },
            { text: 'Jacksonville', correct: false },
        ]
    },

    {    question: 'What is the capital of California?',
        answers: [
            { text: 'Los Angeles', correct: false },
            { text: 'San Francisco', correct: false },
            { text: 'Sacramento', correct: true },
            { text: 'San Diego', correct: false },
        ]
    },
    {
        question: 'What is the capital of Texas?',
        answers: [
            { text: 'Houston', correct: false },
            { text: 'Austin', correct: true },
            { text: 'Dallas', correct: false },
            { text: 'San Antonio', correct: false },
        ]
    },
    {   question: 'What is the capital of New York?',
        answers: [
            { text: 'New York City', correct: false },
            { text: 'Albany', correct: true },
            { text: 'Buffalo', correct: false },
            { text: 'Rochester', correct: false },
        ]
    }
]
