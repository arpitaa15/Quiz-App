const questions = [
    {
    question: "Who is the Father of our Nation?",
    answers:[
        {text: "Mahatma Gandhi", correct: true},
        {text: "Jawaharlal Nehru", correct: false},
        {text: "Babasaheb Ambedkar", correct: false},
        {text: "Subhas Chandra Bose", correct: false},
      ]
    },
    {
    question: "Who is Sachin Tendulkar?",
    answers:[
        {text: "Hockey player", correct: false},
        {text: "Badminton player", correct: false},
        {text: "Cricketer", correct: true},
        {text: "Footballer", correct: false},
      ]
    },
    {
    question: "Where is Taj Mahal located in India?",
    answers:[
        {text: "New Delhi", correct: false},
        {text: "Kolkata", correct: false},
        {text: "Agra", correct: true},
        {text: "Gujarat", correct: false},
      ]
    },
    {
    question: "India lies in which continent?",
    answers:[
        {text: "Australia", correct: false},
        {text: "Antarctica", correct: false},
        {text: "Europe", correct: false},
        {text: "Asia", correct: true},
      ]
    },
    {
    question: "Which of the following is the national bird of India?",
    answers:[
        {text: "Peacock", correct: true},
        {text: "Parrot", correct: false},
        {text: "Sparrow", correct: false},
        {text: "Owl", correct: false},
      ]
    }
  ];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("buttons");
const nextButton = document.getElementById("btn-next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  })
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `Total score : ${score}/${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});

startQuiz();