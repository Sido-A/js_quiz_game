const divContent = document.querySelector(".quiz__content");

const URL =
  "https://opentdb.com/api.php?amount=10&difficulty=easy&type=boolean";
let questionPerPage = 1;
let totalUserCorrectAnswers = 0;

const createNodeElem = (elem) => {
  return document.createElement(elem);
};

const append = (parent, elem) => {
  return parent.appendChild(elem);
};

const TrueOrFalseEventListener = (clickedButton, correctAnswer, quizArr) => {
  clickedButton.addEventListener("click", (e) => {
    const userAnswer = e.target.value;
    const stringifyCorrectAnswer = correctAnswer.toLowerCase();
    if (userAnswer === stringifyCorrectAnswer) {
      console.log("Correct ANSWER");
      clickedButton.classList.add("true");
      totalUserCorrectAnswers++;
    } else {
      console.log("Wrong ANSWER");
      clickedButton.classList.add("false");
    }
    setTimeout(() => {
      renderQuestion(quizArr);
    }, 500);
  });
};

const playAgainButtonListener = () => {
  window.location.reload();
  return;
};

const renderQuestion = (quizArr) => {
  divContent.innerHTML = "";
  const h1 = createNodeElem("h1");
  const p = createNodeElem("p");
  const buttonsDiv = createNodeElem("div");
  const trueButton = createNodeElem("button");
  const falseButton = createNodeElem("button");
  const playAgain = createNodeElem("button");

  playAgain.addEventListener("click", playAgainButtonListener);

  if (quizArr.length === 0) {
    h1.innerHTML = "Game over";
    p.innerHTML = `You have answered ${totalUserCorrectAnswers} answers correctly out of 10`;
    playAgain.classList.add("playAgain");
    playAgain.innerHTML = "Play again";

    append(divContent, h1);
    append(divContent, p);
    append(divContent, playAgain);

    return;
  } else {
    for (let i = 0; i <= questionPerPage - 1 && i <= quizArr.length; i++) {
      h1.innerHTML = quizArr[i].question;

      buttonsDiv.classList.add("buttons");

      trueButton.innerHTML = "TRUE";
      trueButton.value = true;

      falseButton.innerHTML = "FALSE";
      falseButton.value = false;

      append(divContent, h1);
      append(divContent, buttonsDiv);
      append(buttonsDiv, trueButton);
      append(buttonsDiv, falseButton);

      TrueOrFalseEventListener(trueButton, quizArr[i].correct_answer, quizArr);
      TrueOrFalseEventListener(falseButton, quizArr[i].correct_answer, quizArr);
      quizArr.shift();
      return;
    }
  }
};

const fetchQuizData = async () => {
  return await fetch(URL)
    .then((res) => res.json())
    .then((res) => {
      let quizs = res.results;
      renderQuestion(quizs);
    })
    .catch((err) => console.log("Error!", err));
};

fetchQuizData();
