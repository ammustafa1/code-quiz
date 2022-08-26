const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

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

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

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

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Commonly used data types do NOT include _____',
        answers: [
            { text: 'Booleans', correct: true },
            { text: 'Alerts', correct: false },
            { text: 'Numbers', correct: false },
            { text: 'Strings', correct: false },
        ]
    },
    {
        question: 'Arrays in JS can be used to store ____',
        answers: [
            { text: 'Numbers and Strings', correct: false },
            { text: 'Other arrays', correct: false },
            { text: 'Booleans', correct: false },
            { text: 'All of the above', correct: true }
        ]
    },
    {
        question: 'String values must be enclosed in _____ when when being assigned to variables.',
        answers: [
            { text: 'Quotes', correct: false },
            { text: 'Parentheses', correct: true },
            { text: 'Curly brackets', correct: false },
            { text: 'All of the above', correct: false }
        ]
    },
    {
        question: 'Rubber duckies have a special kind of magic allowing them to be able to debug any code.',
        answers: [
            { text: 'False', correct: false },
            { text: 'True', correct: true }
        ]
    }
]