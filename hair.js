const textElement = document.getElementById("typing-text");
const textToType = "this website will help you understand what products are best for your hair type!";
let index = 0;

function typeWriter() {
  if (index < textToType.length) {
    textElement.innerHTML += textToType.charAt(index);
    index++;
    setTimeout(typeWriter, 100); // Speed of typing in milliseconds (100ms per letter)
  }
}

// Start the animation when the page loads
window.onload = typeWriter;
