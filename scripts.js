var request = new XMLHttpRequest();
var typingSpeed = 70, blinkingSpeed = 400;

const app = document.getElementById('root');
const header = document.getElementById('thought');
const foot = document.getElementById('author');

request.open('GET', 'https://www.reddit.com/r/Showerthoughts/new.json', true);
request.onload = function () {
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        printThoughts(0, data['data']['children']);
    }
    else {
        console.log('error');
    }
}

request.send()

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function printThoughts(index, thoughts){
    if (index >= thoughts.length) {
        location.reload();
        return
    }
    console.log(thoughts[index]['data'].title);
    header.textContent = thoughts[index]['data'].title;
    header.innerHTML = "";
    typeStringInside(header, thoughts[index]['data'].title)
    sleep(50000).then(() => {
        printThoughts(index+1, thoughts)
    });
}

function typeStringInside(element, elementString) {
  if (elementString == null || elementString == "") return;
  typeCharacterInsideElement(0, element, elementString);
}

function typeCharacterInsideElement(index, element, elementString) {
  if (index >= elementString.length) {
    typeBlinkingPipe(element);
    return;
  }
  var character = elementString[index];
  setTimeout(function() {
      element.innerHTML = element.innerHTML + character;
      typeCharacterInsideElement(index + 1, element, elementString); },
    typingSpeed);
}

function typeBlinkingPipe(element) {
  var newElementString = element.innerHTML +
    "<span class=\"blinking\" style=\"visibility: visible;\">|</span>";
  setTimeout(function() {
    element.innerHTML = newElementString;
    var blinkingElement = element.getElementsByClassName("blinking")[0];
    startBlinkingElement(blinkingElement);
  }, typingSpeed);
}

function startBlinkingElement(element) {
  setInterval(function() {
    var visibility = element.style.visibility;
    element.style.visibility = (visibility == "hidden" ? "visible" : "hidden");
  }, blinkingSpeed);
}
