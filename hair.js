const textElement = document.getElementById("typing-text");
const textElement2 = document.getElementById("typing-text2");
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
  }
}

window.onload = typeWriter;
