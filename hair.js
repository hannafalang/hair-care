const textElement = document.getElementById("typing-text");
const textElement2 = document.getElementById("typing-text2");
const answerOutput = document.getElementById("answer-output");
const textToType = "this website will help you understand what products are best for your hair type!";
const textToType2 = "I want you to answer the following questions:";

let index = 0;
let index2 = 0;

function typeWriter() {
  if (index < textToType.length) {
    textElement.textContent += textToType.charAt(index);
    index++;
    setTimeout(typeWriter, 50);
    return;
  }

  if (index2 < textToType2.length) {
    textElement2.textContent += textToType2.charAt(index2);
    index2++;
    setTimeout(typeWriter, 50);
    return;
  }

  renderAnswerText();
}

window.onload = typeWriter;

const questionBank = [
  {
    question: "How would you describe your natural hair pattern?",
    answers: {
      A: "Straight — stays mostly flat",
      B: "Slightly wavy — loose, subtle waves",
      X: "Wavy — clear S-shaped waves",
      Y: "Curly — defined curls/ringlets"
    }
  },
  {
    question: "How thick does each individual strand of hair feel?",
    answers: {
      A: "Very fine — almost impossible to feel between my fingers",
      B: "Fine — feels delicate",
      X: "Medium — feels neither thin nor thick",
      Y: "Thick — feels strong and substantial"
    }
  }
];

let currentQuestionIndex = 0;
const userAnswers = {};

function renderAnswerText(selectedKey = null) {
  if (!answerOutput) return;

  const currentQuestion = questionBank[currentQuestionIndex];
  const entries = Object.entries(currentQuestion.answers);
  answerOutput.innerHTML = "";

  const questionLine = document.createElement("div");
  questionLine.className = "answer-question";
  questionLine.textContent = currentQuestion.question;
  answerOutput.appendChild(questionLine);

  let currentIndex = 0;

  function typeNextLine() {
    if (currentIndex >= entries.length) return;

    const [key, value] = entries[currentIndex];
    const line = document.createElement("div");
    line.className = "answer-line";

    if (selectedKey && key === selectedKey) {
      line.classList.add("selected");
    }

    answerOutput.appendChild(line);

    const fullText = `${key}. ${value}`;
    let charIndex = 0;

    const typeChar = () => {
      line.textContent = fullText.slice(0, charIndex);
      charIndex++;

      if (charIndex <= fullText.length) {
        setTimeout(typeChar, 28);
        return;
      }

      currentIndex++;
      setTimeout(typeNextLine, 120);
    };

    typeChar();
  }

  typeNextLine();
}

function answerQuestion(key) {
  const currentQuestion = questionBank[currentQuestionIndex];
  userAnswers[currentQuestionIndex] = key;

  console.log("Selected answer:", {
    questionIndex: currentQuestionIndex,
    question: currentQuestion.question,
    key,
    value: currentQuestion.answers[key]
  });

  console.log("Current user answers:", userAnswers);

  currentQuestionIndex += 1;

  if (currentQuestionIndex >= questionBank.length) {
    console.log("Final user answers:", userAnswers);
    answerOutput.innerHTML = "<div class='answer-question'>Thanks! Your answers have been saved.</div>";
    return;
  }

  renderAnswerText();
}

const buttons = {
  A: document.getElementById("button-a"),
  B: document.getElementById("button-b"),
  X: document.getElementById("button-x"),
  Y: document.getElementById("button-y")
};

Object.entries(buttons).forEach(([key, button]) => {
  if (!button) return;
  button.addEventListener("click", () => answerQuestion(key));
});