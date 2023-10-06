const productNameInputElement = document.getElementById('product-name');
const remainingCharsElement = document.getElementById('remaining-chars');
const maxAllowedChars = productNameInputElement.maxLength;

function updateRemainingCharacters(event) {
  const enteredText = event.target.value;
  const enteredTextLength = enteredText.length

  const remainingCharacters = maxAllowedChars - enteredTextLength; 
  remainingCharsElement.textContent = remainingCharacters;

  if (remainingCharacters == 0) {
    productNameInputElement.classList.add('warning');
    remainingCharsElement.classList.add('warning');
  } else {
    productNameInputElement.classList.remove('warning');
    remainingCharsElement.classList.remove('warning');
  }
}

productNameInputElement.addEventListener('input', updateRemainingCharacters);