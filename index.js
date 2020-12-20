let textArea = document.getElementById("txt-area");

let synth = window.speechSynthesis;

textArea.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    let lastWord = getLastWord(textArea.value);
    speak(lastWord);
  } else {
    // console.log(e.key);
    if (e.key == "Backspace") {
    } else if (e.key == "Enter" && !synth.speaking) {
      speak(textArea.value);
    } else {
      speak(e.key, 1.25);
    }
  }
});

function speak(word, rate = 1.0) {
  if (synth.speaking) {
    // synth.cancel();
    // console.error("speechSynthesis.speaking");
    return;
  }
  if (word !== "") {
    let utterThis = new SpeechSynthesisUtterance(word);
    utterThis.rate = rate;

    utterThis.onerror = function (event) {
      console.error("SpeechSynthesisUtterance.onerror");
    };

    synth.speak(utterThis);
  }
}

function getLastWord(sentence) {
  let result = "";

  for (let i = sentence.length - 1; i >= 0; i--) {
    if (sentence[i] != " ") {
      result = sentence[i] + result;
    } else {
      if (result != "") {
        break;
      }
    }
  }

  return result;
}
