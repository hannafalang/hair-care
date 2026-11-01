const textElement = document.getElementById("typing-text");
const textElement2 = document.getElementById("typing-text2");
const answerOutput = document.getElementById("answer-output");
const restartButton = document.getElementById("restart-button");
const textToType = "Finn ut hvilke produkter som passer best til håret ditt.";
const textToType2 = "Svar på fem spørsmål:";

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
    category: "Hårmønster",
    question: "Hvordan er hårets naturlige mønster?",
    answers: {
      A: "Rett",
      B: "Bølgete",
      X: "Krøllete",
      Y: "Tett krøllet"
    }
  },
  {
    category: "Hårstrå",
    question: "Hvor tykt føles hvert hårstrå?",
    answers: {
      A: "Fint og tynt",
      B: "Middels",
      X: "Tykt",
      Y: "Veldig tykt"
    }
  },
  {
    category: "Porøsitet",
    question: "Hvor raskt trekker håret til seg vann og tørker?",
    answers: {
      A: "Sakte – vann trekker sent inn, og håret tørker sakte",
      B: "Normalt – håret blir vått og tørker i vanlig tempo",
      X: "Raskt – håret blir vått og tørker fort",
      Y: "Jeg er usikker"
    }
  },
  {
    category: "Hodebunn",
    question: "Hvordan oppfører hodebunnen seg oftest?",
    answers: {
      A: "Tørr eller stram",
      B: "Balansert",
      X: "Blir fort fet",
      Y: "Sensitiv eller lett irritert"
    }
  },
  {
    category: "Behov",
    question: "Hva ønsker du mest hjelp med?",
    answers: {
      A: "Mer fukt og mykhet",
      B: "Mindre frizz og mer definisjon",
      X: "Reparere slitt eller skadet hår",
      Y: "Mer volum og lette produkter"
    }
  }
];

const productCatalog = {
  moisture: {
    name: "Fuktighetsgivende leave-in",
    description: "En leave-in-balsam som gir ekstra fukt og mykhet.",
    image: "images/moisture.png"
  },
  definition: {
    name: "Leave-in for frizzkontroll og definisjon",
    description: "En leave-in eller stylingkrem som samler håret og demper frizz.",
    image: "images/olaplex-oil.png"
  },
  repair: {
    name: "Reparerende hårkur",
    description: "En styrkende hårkur som kan brukes jevnlig i slitte lengder.",
    image: "images/repair.png"
  },
  volume: {
    name: "Lett volumprodukt",
    description: "En lett mousse eller spray som gir løft uten å tynge håret.",
    image: "images/volume.png"
  },
  dryScalp: {
    name: "Mild, fuktighetsgivende sjampo",
    description: "En skånsom sjampo som rengjør uten å føles uttørkende.",
    image: "images/dry-scalp.png"
  },
  balancedScalp: {
    name: "Skånsom hverdagssjampo",
    description: "En mild sjampo til vanlig vask og en balansert hodebunn.",
    image: "images/balanced-scalp.png"
  },
  oilyScalp: {
    name: "Lett, balanserende sjampo",
    description: "En lett sjampo som rengjør hodebunnen uten tunge pleiestoffer.",
    image: "images/oily-scalp.png"
  },
  sensitiveScalp: {
    name: "Parfymefri, mild sjampo",
    description: "Et skånsomt alternativ for en hodebunn som lett blir irritert.",
    image: "images/sensitive-scalp.png"
  }
};

let currentQuestionIndex = 0;
const userAnswers = {};

function renderAnswerText() {
  if (!answerOutput) return;

  const currentQuestion = questionBank[currentQuestionIndex];
  const entries = Object.entries(currentQuestion.answers);
  answerOutput.innerHTML = "";

  const progressLine = document.createElement("div");
  progressLine.className = "answer-progress";
  progressLine.textContent = `Spørsmål ${currentQuestionIndex + 1} av ${questionBank.length} · ${currentQuestion.category}`;
  answerOutput.appendChild(progressLine);

  const questionLine = document.createElement("div");
  questionLine.className = "answer-question";
  questionLine.textContent = currentQuestion.question;
  answerOutput.appendChild(questionLine);

  entries.forEach(([key, value]) => {
    const line = document.createElement("div");
    line.className = "answer-line";
    line.textContent = `${key}. ${value}`;
    answerOutput.appendChild(line);
  });
}

function getHairProfile() {
  const pattern = userAnswers[0];
  const thickness = userAnswers[1];
  const porosity = userAnswers[2];

  const patternText = questionBank[0].answers[pattern];
  const thicknessText = questionBank[1].answers[thickness];
  const porosityLabels = {
    A: "lav porøsitet",
    B: "middels porøsitet",
    X: "høy porøsitet",
    Y: "usikker porøsitet"
  };
  const porosityText = porosityLabels[porosity];

  return `${patternText.toLowerCase()} hår med ${thicknessText.toLowerCase()} hårstrå og ${porosityText}`;
}

function getPersonalizedTip() {
  const thickness = userAnswers[1];
  const porosity = userAnswers[2];
  const pattern = userAnswers[0];

  if (thickness === "A" || (porosity === "A" && thickness === "B")) {
    return "Velg gjerne lette produkter og start med en liten mengde, så håret ikke tynges.";
  }

  if (porosity === "X" || pattern === "X" || pattern === "Y") {
    return "Prøv produktet først i lengdene. Krøllete hår kan ofte ha nytte av litt ekstra pleie.";
  }

  return "Start med en liten mengde og juster etter hvordan håret føles.";
}

function getRecommendations() {
  const goalProducts = {
    A: productCatalog.moisture,
    B: productCatalog.definition,
    X: productCatalog.repair,
    Y: productCatalog.volume
  };
  const scalpProducts = {
    A: productCatalog.dryScalp,
    B: productCatalog.balancedScalp,
    X: productCatalog.oilyScalp,
    Y: productCatalog.sensitiveScalp
  };
  const goal = questionBank[4].answers[userAnswers[4]].toLowerCase();
  const scalp = questionBank[3].answers[userAnswers[3]].toLowerCase();

  return [
    {
      ...goalProducts[userAnswers[4]],
      reason: `Passer til ønsket ditt om ${goal}.`
    },
    {
      ...scalpProducts[userAnswers[3]],
      reason: `Et forslag til hodebunnen, som du beskriver som ${scalp}.`
    }
  ];
}

function appendProductRecommendation(product, index) {
  const card = document.createElement("section");
  card.className = "product-recommendation";

  const title = document.createElement("div");
  title.className = "product-title";
  title.textContent = `${index + 1}. ${product.name}`;
  card.appendChild(title);

  if (product.image) {
    const image = document.createElement("img");
    image.className = "product-image";
    image.src = product.image;
    image.alt = product.name;
    card.appendChild(image);
  } else {
    const imagePlaceholder = document.createElement("div");
    imagePlaceholder.className = "product-image-placeholder";
    imagePlaceholder.textContent = "Produktbilde kan legges til her";
    card.appendChild(imagePlaceholder);
  }

  [product.description, product.reason].forEach((text) => {
    const line = document.createElement("div");
    line.className = "product-description";
    line.textContent = text;
    card.appendChild(line);
  });

  answerOutput.appendChild(card);
}

function renderResults() {
  answerOutput.innerHTML = "";

  const heading = document.createElement("div");
  heading.className = "answer-question";
  heading.textContent = "Din hårprofil";
  answerOutput.appendChild(heading);

  const profile = document.createElement("div");
  profile.className = "result-profile";
  profile.textContent = getHairProfile();
  answerOutput.appendChild(profile);

  const answerSummary = document.createElement("div");
  answerSummary.className = "answer-summary";
  questionBank.forEach((question, questionIndex) => {
    const line = document.createElement("div");
    line.textContent = `${question.category}: ${question.answers[userAnswers[questionIndex]]}`;
    answerSummary.appendChild(line);
  });
  answerOutput.appendChild(answerSummary);

  const recommendationHeading = document.createElement("div");
  recommendationHeading.className = "answer-question recommendation-heading";
  recommendationHeading.textContent = "Produktforslag";
  answerOutput.appendChild(recommendationHeading);

  getRecommendations().forEach(appendProductRecommendation);

  const tip = document.createElement("div");
  tip.className = "result-tip";
  tip.textContent = getPersonalizedTip();
  answerOutput.appendChild(tip);

  restartButton.hidden = false;
}

function answerQuestion(key) {
  if (currentQuestionIndex >= questionBank.length) return;

  userAnswers[currentQuestionIndex] = key;
  currentQuestionIndex += 1;

  if (currentQuestionIndex >= questionBank.length) {
    renderResults();
    return;
  }

  renderAnswerText();
}

function restartQuiz() {
  currentQuestionIndex = 0;
  Object.keys(userAnswers).forEach((key) => delete userAnswers[key]);
  restartButton.hidden = true;
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

restartButton.addEventListener("click", restartQuiz);
