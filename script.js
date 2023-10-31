const passwordInput = document.getElementById("passwordInput");
const passwordLength = document.getElementById("passwordLength");

let currentRule = 0;

let completedRules = [];

let timeRunning = false;
let timeInterval;
let timeIconId = 2;

const inputEvent = new Event("input");

// rule variables
let rule8_currentSponsor;
let rule13_questionAnswer;
let rule15_songBPM;
let rule15_songPlaying;
let rule16_currentUnicode;
let rule17_dragonState;
let rule17_replacedOnce;
let rule20_deletedTimeOnce;
let rule20_timeAdded;

function setGreen(rule) {
  let ruleId = "rule" + rule;
  let ruleElement = document.getElementById(ruleId);
  let ruleTop = document.getElementById(ruleId + "Top")
  let ruleImage = document.getElementById(ruleId + "Image")
  let ruleContainer = document.getElementById("ruleContainer");
  ruleElement.style.borderColor = "#267b30";
  ruleElement.style.backgroundColor = "#e3ffe3";
  ruleElement.style.boxShadow = "2px 2px 5px 2px rgba(60,155,71,.2)";
  ruleTop.style.backgroundColor = "#aef3ae";
  ruleImage.src = "tick.svg";

  let index = completedRules.indexOf(rule);
  if (index == -1) {
    completedRules.push(rule);
    completedRules.sort((a, b) => a-b);
  }

  ruleContainer.appendChild(ruleElement);
  for (i = 0; i < parseInt(completedRules.length - 1); i++) {
    if (ruleElement.previousElementSibling !== null) {
          ruleContainer.insertBefore(ruleElement, ruleElement.previousElementSibling);
    }
  }
}

function setRed(rule) {
  let ruleId = "rule" + rule;
  let ruleElement = document.getElementById(ruleId);
  let ruleTop = document.getElementById(ruleId + "Top");
  let ruleImage = document.getElementById(ruleId + "Image");
  let ruleContainer = document.getElementById("ruleContainer");
  ruleElement.style.borderColor = "red";
  ruleElement.style.backgroundColor = "#ffecec";
  ruleElement.style.boxShadow = "2px 2px 5px 2px rgba(255,0,0,.12)";
  ruleTop.style.backgroundColor = "#ffc7c7";
  ruleImage.src = "cross.svg";

  let index = completedRules.indexOf(rule);
  if (index != -1) {
    completedRules.splice(index, 1);
  }

  ruleContainer.insertBefore(ruleElement, ruleContainer.firstChild);
}

function checkRules() {
  for (let i = 0; i < currentRule; i++) {
    if (!(completedRules[i] == i + 1)) {
      return false;
    }
  }
  return true;
}

function addRule(rule) {
  let ruleElement = document.getElementById("rule" + rule);
  currentRule++;
  ruleElement.classList.add("fadeIn");
  ruleElement.style.display = "block";
  ruleElement.addEventListener('animationend', function() {
    ruleElement.classList.remove('fadeIn');
    ruleElement.style.opacity = "1"
  });
}

passwordInput.addEventListener("input", function() {
  
  // update password length (continued below)
  let passwordArray = passwordInput.innerText.split('');
  for (let i = 0; i < passwordArray.length; i++) {
    if (passwordArray[i] == "\n") {
      passwordArray[i] = "";
    }
  }
  let passwordNoNewLine = passwordArray.join("");

  // time
  function updateTime() {
    let timeIndex;

    for (let i = 0; i < passwordArray.length; i++) {
      let codePoint = passwordNoNewLine.codePointAt(i);
      if (codePoint >= 0x1F550 && codePoint <= 0x1F55B) {
        timeIndex = i;
        break;
      }
    }

    if (timeIconId === 1) {
      passwordArray[timeIndex + 1] = "\uDD51";
    } else if (timeIconId === 2) {
      passwordArray[timeIndex + 1] = "\uDD52";
    } else if (timeIconId === 3) {
      passwordArray[timeIndex + 1] = "\uDD53";
    } else if (timeIconId === 4) {
      passwordArray[timeIndex + 1] = "\uDD54";
    } else if (timeIconId === 5) {
      passwordArray[timeIndex + 1] = "\uDD55";
    } else if (timeIconId === 6) {
      passwordArray[timeIndex + 1] = "\uDD56";
    } else if (timeIconId === 7) {
      passwordArray[timeIndex + 1] = "\uDD57";
    } else if (timeIconId === 8) {
      passwordArray[timeIndex + 1] = "\uDD58";
    } else if (timeIconId === 9) {
      passwordArray[timeIndex + 1] = "\uDD59";
    } else if (timeIconId === 10) {
      passwordArray[timeIndex + 1] = "\uDD5A";
    } else if (timeIconId === 11) {
      passwordArray[timeIndex + 1] = "\uDD5B";
    } else if (timeIconId === 12) {
      passwordArray[timeIndex + 1] = "\uDD50";
    }
    timeIconId++
    if (timeIconId === 13) {
      timeIconId = 1;
    }
    passwordInput.innerText = passwordArray.join("");
  }

  if ((passwordNoNewLine.includes("\uD83D\uDD50") || passwordNoNewLine.includes("\uD83D\uDD51") || passwordNoNewLine.includes("\uD83D\uDD52") || passwordNoNewLine.includes("\uD83D\uDD53") || passwordNoNewLine.includes("\uD83D\uDD54") || passwordNoNewLine.includes("\uD83D\uDD55") || passwordNoNewLine.includes("\uD83D\uDD56") || passwordNoNewLine.includes("\uD83D\uDD57") || passwordNoNewLine.includes("\uD83D\uDD58") || passwordNoNewLine.includes("\uD83D\uDD59") || passwordNoNewLine.includes("\uD83D\uDD5A") || passwordNoNewLine.includes("\uD83D\uDD5B")) && timeRunning == false) {
    clearInterval(timeInterval);
    timeInterval = setInterval(updateTime, 600);
    timeRunning = true;
  } else if (!(passwordNoNewLine.includes("\uD83D\uDD50") || passwordNoNewLine.includes("\uD83D\uDD51") || passwordNoNewLine.includes("\uD83D\uDD52") || passwordNoNewLine.includes("\uD83D\uDD53") || passwordNoNewLine.includes("\uD83D\uDD54") || passwordNoNewLine.includes("\uD83D\uDD55") || passwordNoNewLine.includes("\uD83D\uDD56") || passwordNoNewLine.includes("\uD83D\uDD57") || passwordNoNewLine.includes("\uD83D\uDD58") || passwordNoNewLine.includes("\uD83D\uDD59") || passwordNoNewLine.includes("\uD83D\uDD5A") || passwordNoNewLine.includes("\uD83D\uDD5B")) && timeRunning == true && timeIconId === 12) {
    clearInterval(timeInterval);
    timeRunning = false;
  }
  
  // password length part 2
  passwordNoNewLine = passwordArray.join("");
  passwordLength.style.opacity = 1;
  if (passwordNoNewLine.length == 0) {
    passwordLength.style.opacity = 0;
  }
  passwordLength.innerText = passwordNoNewLine.length;

  // rule functions
  function rule5_checkDigitsIs53() {
    let currentDigitsSum = 0;
    for (let i = 0; i < passwordArray.length; i++) {
      if (/[0-9]/.test(passwordArray[i])) {
        currentDigitsSum = currentDigitsSum + parseInt(passwordArray[i]);
      }
    }
    if (currentDigitsSum == 53) {
      return true;
    } else {
      return false;
    }
  }

  function rule8_getSponsor() {
    const sponsorImage = document.getElementById("rule8Sponsor");
    if (!rule8_currentSponsor) {
      rule8_currentSponsor = Math.floor(Math.random() * (7 - 1 + 1) + 1);
    }

    if (rule8_currentSponsor == 1) {
      sponsorImage.src = "rule8_sponsors/algodoo.png";
      if (passwordNoNewLine.toLowerCase().includes("algodoo")) {
        return true;
      } else {
        return false;
      }
    } else if (rule8_currentSponsor == 2) {
      sponsorImage.src = "rule8_sponsors/flstudio.png";
      if (passwordNoNewLine.toLowerCase().includes("fl studio") || passwordNoNewLine.toLowerCase().includes("flstudio")) {
        return true;
      } else {
        return false;
      }
    } else if (rule8_currentSponsor == 3) {
      sponsorImage.src = "rule8_sponsors/musescore.png";
      if (passwordNoNewLine.toLowerCase().includes("musescore")) {
        return true;
      } else {
        return false;
      }
    } else if (rule8_currentSponsor == 4) {
      sponsorImage.src = "rule8_sponsors/obs.png";
      if (passwordNoNewLine.toLowerCase().includes("obs") || passwordNoNewLine.toLowerCase().includes("openbroadcast") || passwordNoNewLine.toLowerCase().includes("open broadcast")) {
        return true;
      } else {
        return false;
      }
    } else if (rule8_currentSponsor == 5) {
      sponsorImage.src = "rule8_sponsors/vlc.png";
      if (passwordNoNewLine.toLowerCase().includes("vlc") || passwordNoNewLine.toLowerCase().includes("videolan")) {
        return true;
      } else {
        return false;
      }
    } else if (rule8_currentSponsor == 6) {
      sponsorImage.src = "rule8_sponsors/blender.png";
      if (passwordNoNewLine.toLowerCase().includes("blender")) {
        return true;
      } else {
        return false;
      }
    } else if (rule8_currentSponsor == 7) {
      sponsorImage.src = "rule8_sponsors/steam.png";
      if (passwordNoNewLine.toLowerCase().includes("steam")) {
        return true;
      } else {
        return false;
      }
    }
  }

  function rule9_getRomanNumeralsMultiply107() {
    let romanNumeralArray = passwordNoNewLine.match(/[IVXLCDM]+/g) || [];
    let finalValue = 1;
    let decimalValue = 0;
    for (let i = 0; i < romanNumeralArray.length; i++) {
      let romanToDecimalMap = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
      };

      decimalValue = 0;
      let previousValue = 0;
      let romanNumeral = romanNumeralArray[i];

      for (let j = romanNumeral.length - 1; j >= 0; j--) {
        let currentChar = romanNumeral[j];
        let currentValue = romanToDecimalMap[currentChar];

        if (currentValue < previousValue) {
          decimalValue -= currentValue;
        } else {
          decimalValue += currentValue;
          previousValue = currentValue;
        }
      }
      finalValue = finalValue * decimalValue;
    }

    if (finalValue == 107) {
      return true;
    } else {
      return false;
    }
  }

  function rule11_getMoonPhase() {
function getLunarPhase() {
const getJulianDate = (date = new Date()) => {
  const time = date.getTime();
  const tzoffset = date.getTimezoneOffset()
  
  return (time / 86400000) - (tzoffset / 1440) + 2440587.5;
}

  const LUNAR_MONTH = 29.530588853;
const getLunarAge = (date = new Date()) => {
  const percent = getLunarAgePercent(date);
  const age = percent * LUNAR_MONTH;
  return age;
}
const getLunarAgePercent = (date = new Date()) => {
  return normalize((getJulianDate(date) - 2451550.1) / LUNAR_MONTH);
}
const normalize = value => {
  value = value - Math.floor(value);
  if (value < 0)
    value = value + 1
  return value;
}

  const age = getLunarAge();
  if (age < 1.84566)
    return "New";
  else if (age < 5.53699)
    return "Waxing Crescent";
  else if (age < 9.22831)
    return "First Quarter";
  else if (age < 12.91963)
    return "Waxing Gibbous";
  else if (age < 16.61096)
    return "Full";
  else if (age < 20.30228)
    return "Waning Gibbous";
  else if (age < 23.99361)
    return "Last Quarter";
  else if (age < 27.68493)
    return "Waning Crescent";
  return "New";
}
    
    let moonPhase = getLunarPhase()

    if (moonPhase == "New") {
      if (passwordNoNewLine.toLowerCase().includes("new")) {
        return true;
      } else {
        return false;
      }
    } else if (moonPhase == "Waxing Crescent") {
      if (passwordNoNewLine.toLowerCase().includes("waxingcrescent") || passwordNoNewLine.toLowerCase().includes("waxing crescent")) {
        return true;
      } else {
        return false;
      }
    } else if (moonPhase == "First Quarter") {
      if (passwordNoNewLine.toLowerCase().includes("firstquarter") || passwordNoNewLine.toLowerCase().includes("first quarter")) {
        return true;
      } else {
        return false;
      }
    } else if (moonPhase == "Waxing Gibbous") {
      if (passwordNoNewLine.toLowerCase().includes("waxinggibbous") || passwordNoNewLine.toLowerCase().includes("waxing gibbous")) {
        return true;
      } else {
        return false;
      }
    } else if (moonPhase == "Full") {
      if (passwordNoNewLine.toLowerCase().includes("full")) {
        return true;
      } else {
        return false;
      }
    } else if (moonPhase == "Waning Gibbous") {
      if (passwordNoNewLine.toLowerCase().includes("waninggibbous") || passwordNoNewLine.toLowerCase().includes("waning gibbous")) {
        return true;
      } else {
        return false;
      }
    } else if (moonPhase == "Last Quarter") {
      if (passwordNoNewLine.toLowerCase().includes("lastquarter") || passwordNoNewLine.toLowerCase().includes("last quarter")) {
        return true;
      } else {
        return false;
      }
    } else if (moonPhase == "Waning Crescent") {
      if (passwordNoNewLine.toLowerCase().includes("waningcrescent") || passwordNoNewLine.toLowerCase().includes("waning crescent")) {
        return true;
      } else {
        return false;
      }
    }
  }

  function rule13_getMathQuestion() {
    if (!rule13_questionAnswer) {
      let number1 = Math.floor(Math.random() * (35 - 15 + 1)) + 15
      let number2 = Math.floor(Math.random() * (60 - 15 + 1)) + 15
      let number3 = Math.floor(Math.random() * (10 - 1 + 1)) + 1
      rule13_questionAnswer = Math.round(Math.abs(Math.log10(Math.sin(number1 * (Math.PI / 180)) * number2) / Math.sqrt(number3)) * 1000) / 1000;

      document.getElementById("rule13Equation").innerText = `|log(sin(${number1})×${number2})÷√${number3}|`
    }
    if (passwordNoNewLine.includes(rule13_questionAnswer)) {
      return true;
    } else {
      return false;
    }
  }

  function rule15_getSongBPM() {
    let nonListedBPMs = [71, 74, 76, 77, 79, 81, 83, 88, 89, 93, 94, 97, 99, 101, 104, 106, 107, 112, 114, 116, 121, 126, 131, 136, 137, 139, 141, 142, 143, 144, 146, 147, 149]
    if (!rule15_songBPM) {
      rule15_songBPM = Math.floor(Math.random() * ((150 - nonListedBPMs.length) - 70 + 1)) + 70;
      for (let i = 0; i < nonListedBPMs.length; i++) {
        if (rule15_songBPM >= nonListedBPMs[i]) {
          rule15_songBPM++
        } else {
          break;
        }
      }
    }

    if (rule15_songBPM == 70) {
      let bpmSong;
      let randomizerBpm = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
      if (randomizerBpm == 1) {
        bpmSong = new Audio("rule15_songs/70-1.mp3");
      } else {
        bpmSong = new Audio("rule15_songs/70-2.mp3");
      }
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(70) || passwordNoNewLine.includes(140)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 72) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/72.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(72) || passwordNoNewLine.includes(144)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 73) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/73.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(73) || passwordNoNewLine.includes(146)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 75) {
      let bpmSong;
      let randomizerBpm = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
      if (randomizerBpm == 1) {
        bpmSong = new Audio("rule15_songs/75-1.mp3");
      } else {
        bpmSong = new Audio("rule15_songs/75-2.mp3");
      }
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(75) || passwordNoNewLine.includes(150)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 78) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/78.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(78)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 80) {
      let bpmSong;
      let randomizerBpm = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
      if (randomizerBpm == 1) {
        bpmSong = new Audio("rule15_songs/80-1.mp3");
      } else {
        bpmSong = new Audio("rule15_songs/80-2.mp3");
      }
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(80)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 82) {
      let bpmSong;
      let randomizerBpm = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
      if (randomizerBpm == 1) {
        bpmSong = new Audio("rule15_songs/82-1.mp3");
      } else {
        bpmSong = new Audio("rule15_songs/82-2.mp3");
      }
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(82)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 84) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/84.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(84)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 85) {
      let bpmSong;
      let randomizerBpm = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
      if (randomizerBpm == 1) {
        bpmSong = new Audio("rule15_songs/85-1.mp3");
      } else {
        bpmSong = new Audio("rule15_songs/85-2.mp3");
      }
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(85)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 86) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/86.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(86)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 87) {
      let bpmSong;
      let randomizerBpm = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
      if (randomizerBpm == 1) {
        bpmSong = new Audio("rule15_songs/87-1.mp3");
      } else {
        bpmSong = new Audio("rule15_songs/87-2.mp3");
      }
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(87)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 90) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/90.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(90)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 91) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/91.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(91)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 92) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/92.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(92)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 95) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/95.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(95)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 96) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/96.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(96)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 98) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/98.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(98)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 100) {
      let bpmSong;
      let randomizerBpm = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
      if (randomizerBpm == 1) {
        bpmSong = new Audio("rule15_songs/100-1.mp3");
      } else if (randomizerBpm == 2) {
        bpmSong = new Audio("rule15_songs/100-2.mp3");
      } else {
        bpmSong = new Audio("rule15_songs/100-3.mp3");
      }
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(100)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 102) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/102.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(102)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 103) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/103.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(103)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 105) {
      let bpmSong;
      let randomizerBpm = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
      if (randomizerBpm == 1) {
        bpmSong = new Audio("rule15_songs/105-1.mp3");
      } else {
        bpmSong = new Audio("rule15_songs/105-2.mp3");
      }
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(105)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 108) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/108.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(108)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 110) {
      let bpmSong;
      let randomizerBpm = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
      if (randomizerBpm == 1) {
        bpmSong = new Audio("rule15_songs/110-1.mp3");
      } else {
        bpmSong = new Audio("rule15_songs/110-2.mp3");
      }
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(110)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 111) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/111.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(111)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 113) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/113.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(113)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 115) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/115.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(115)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 117) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/117.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(117)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 118) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/118.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(118)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 119) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/119.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(119)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 120) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/120.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(120)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 122) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/122.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(122)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 123) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/123.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(123)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 124) {
      let bpmSong;
      let randomizerBpm = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
      if (randomizerBpm == 1) {
        bpmSong = new Audio("rule15_songs/124-1.mp3");
      } else {
        bpmSong = new Audio("rule15_songs/124-2.mp3");
      }
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(124)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 125) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/125.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(125)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 127) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/127.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(127)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 128) {
      let bpmSong;
      let randomizerBpm = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
      if (randomizerBpm == 1) {
        bpmSong = new Audio("rule15_songs/128-1.mp3");
      } else {
        bpmSong = new Audio("rule15_songs/128-2.mp3");
      }
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(128)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 129) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/129.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(129)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 130) {
      let bpmSong;
      let randomizerBpm = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
      if (randomizerBpm == 1) {
        bpmSong = new Audio("rule15_songs/130-1.mp3");
      } else if (randomizerBpm == 2) {
        bpmSong = new Audio("rule15_songs/130-2.mp3");
      } else {
        bpmSong = new Audio("rule15_songs/130-3.mp3");
      }
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(130)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 132) {
      let bpmSong;
      let randomizerBpm = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
      if (randomizerBpm == 1) {
        bpmSong = new Audio("rule15_songs/132-1.mp3");
      } else {
        bpmSong = new Audio("rule15_songs/132-2.mp3");
      }
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(132)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 133) {
      let bpmSong;
      let randomizerBpm = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
      if (randomizerBpm == 1) {
        bpmSong = new Audio("rule15_songs/133-1.mp3");
      } else {
        bpmSong = new Audio("rule15_songs/133-2.mp3");
      }
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(133)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 134) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/134.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(134)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 135) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/135.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(135)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 138) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/138.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(138)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 140) {
      let bpmSong;
      let randomizerBpm = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
      if (randomizerBpm == 1) {
        bpmSong = new Audio("rule15_songs/140-1.mp3");
      } else {
        bpmSong = new Audio("rule15_songs/140-2.mp3");
      }
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(140)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 145) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/145.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(145)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 148) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/148.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(148)) {
        return true;
      } else {
        return false;
      }
    } else if (rule15_songBPM == 150) {
      let bpmSong;
        bpmSong = new Audio("rule15_songs/150.mp3");
      if (!rule15_songPlaying) {
        bpmSong.play();
        rule15_songPlaying = true;
      }
      if (passwordNoNewLine.includes(150)) {
        return true;
      } else {
        return false;
      }
    }
    
  }

  function rule16_getUnicodeCharacter() {
    let numberOfZeros = "";
    if (!rule16_currentUnicode) {
      rule16_currentUnicode = Math.floor(Math.random() * (0xFFFF - 0x0000 + 1)) + 0x0000;
      for (let i = 3; i >= 0; i--) {
        if (rule16_currentUnicode.toString(16).toUpperCase().length <= i) {
          numberOfZeros = "0" + numberOfZeros;
        }
      }
      document.getElementById("rule16Unicode").innerText = `U+${numberOfZeros}${rule16_currentUnicode.toString(16).toUpperCase()}`
    }
    return passwordNoNewLine.includes(String.fromCharCode(rule16_currentUnicode));
  }

  function rule17_getDragonState() {
    if (!(currentRule >= 23)) {
      if (passwordNoNewLine.includes("🥚")) {
        rule17_dragonState = true;
        return true;
      } else {
        if (rule17_dragonState) {
          document.getElementById("deathScreen").classList.add("fadeIn");
          document.getElementById("deathScreen").style.display = "block";
          window.getSelection().removeAllRanges();
        }
        return false;
      }
    } else {
      if (passwordNoNewLine.includes("🥚") && !rule17_replacedOnce) {
        rule17_replacedOnce = true
        passwordInput.innerText = passwordInput.innerText.replace(/🥚/, "🐉");
      }
      if (passwordNoNewLine.includes("🐉")) {
        return true;
      } else {
        return false;
      }
    }
  }

  function rule18_getAtomicNumberSum() {
    const periodicTable = {
      He: 2, Li: 3, Be: 4, B: 5, C: 6, N: 7, O: 8, F: 9, Ne: 10, Na: 11, Mg: 12, Al: 13, Si: 14, P: 15, S: 16, Cl: 17, Ar: 18, K: 19, Ca: 20, Sc: 21, Ti: 22, V: 23, Cr: 24, Mn: 25, Fe: 26, Co: 27, Ni: 28, Cu: 29, Zn: 30, Ga: 31, Ge: 32, As: 33, Se: 34, Br: 35, Kr: 36, Rb: 37, Sr: 38, Y: 39, Zr: 40, Nb: 41, Mo: 42, Tc: 43, Ru: 44, Rh: 45, Pd: 46, Ag: 47, Cd: 48, In: 49, Sn: 50, Sb: 51, Te: 52, I: 53, Xe: 54, Cs: 55, Ba: 56, La: 57, Ce: 58, Pr: 59, Nd: 60, Pm: 61, Sm: 62, Eu: 63, Gd: 64, Tb: 65, Dy: 66, Ho: 67, Er: 68, Tm: 69, Yb: 70, Lu: 71, Hf: 72, Ta: 73, W: 74, Re: 75, Os: 76, Ir: 77, Pt: 78, Au: 79, Hg: 80, Tl: 81, Pb: 82, Bi: 83, Th: 90, Pa: 91, U: 92, Np: 93, Pu: 94, Am: 95, Cm: 96, Bk: 97, Cf: 98, Es: 99, Fm: 100, Md: 101, No: 102, Lr: 103, Rf: 104, Db: 105, Sg: 106, Bh: 107, Hs: 108, Mt: 109, Ds: 110, Rg: 111, Cn: 112, Nh: 113, Fl: 114, Mc: 115, Lv: 116, Ts: 117, Og: 118,
  };
    
    let atomicNumberSum = 0;
    const elements = passwordNoNewLine.match(/(?:He|Li|Be|Ne|Na|Mg|Al|Si|Cl|Ar|Ca|Sc|Ti|Cr|Mn|Fe|Co|Ni|Cu|Zn|Ga|Ge|As|Se|Br|Kr|Rb|Sr|Zr|Nb|Mo|Tc|Ru|Rh|Pd|Ag|Cd|In|Sn|Sb|Te|Xe|Cs|Ba|La|Ce|Pr|Nd|Pm|Sm|Eu|Gd|Tb|Dy|Ho|Er|Tm|Yb|Lu|Hf|Ta|Re|Os|Ir|Pt|Au|Hg|Tl|Pb|Bi|Th|Pa|Np|Pu|Am|Cm|Bk|Cf|Es|Fm|Md|No|Lr|Rf|Db|Sg|Bh|Hs|Mt|Ds|Rg|Cn|Nh|Fl|Mc|Lv|Ts|Og|B|C|N|O|F|P|S|K|V|Y|I|W|U)/g);

    if (elements) {
      for (let i = 0; i < elements.length; i++) {
        const symbol = elements[i];
        atomicNumberSum = atomicNumberSum + periodicTable[symbol];
      }
    }
    if (atomicNumberSum == 397) {
      return true;
    } else {
      return false;
    }
  }

  function rule19_getBoldConsonants() {
    let elements = passwordInput.querySelectorAll("b");
    let consonantArray = passwordNoNewLine.match(/[bcdfghjklmnpqrstvwxyz]+/gi);
    let consonantAmount = consonantArray.length;
    if (elements.length === 0) {
      return false;
    }

    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      if (!/[bcdfghjklmnpqrstvwxyz]/i.test(element.innerText)) {
        return false;
      }
    }
    if (elements.length === consonantAmount) {
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].innerText.length != consonantArray[i].length) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  function rule20_getTimeReplaced() {
    let dragonIndex;
    if (!rule20_deletedTimeOnce) {
      if (!rule20_timeAdded) {
        for (let i = 0; i < passwordNoNewLine.length; i++) {
          if (passwordNoNewLine[i] == "🥚") {
            dragonIndex = i;
          }
        }
        let randomIndex = Math.floor(Math.random() * (passwordNoNewLine.length - 1 + 1)) + 1 + 1;
        if (randomIndex === dragonIndex - 1) {
          randomIndex++
        }
        if (randomIndex === dragonIndex) {
          randomIndex++;
        }
        passwordArray[randomIndex] = "\uD83D";
        passwordArray[randomIndex + 1] = "\uDD50"
        passwordNoNewLine = passwordArray.join("");
        passwordInput.innerText = passwordNoNewLine;
        rule20_timeAdded = true;

        passwordInput.dispatchEvent(inputEvent);
      }
      if (passwordNoNewLine.includes("\uD83D\uDD50") || passwordNoNewLine.includes("\uD83D\uDD51") || passwordNoNewLine.includes("\uD83D\uDD52") || passwordNoNewLine.includes("\uD83D\uDD53") || passwordNoNewLine.includes("\uD83D\uDD54") || passwordNoNewLine.includes("\uD83D\uDD55") || passwordNoNewLine.includes("\uD83D\uDD56") || passwordNoNewLine.includes("\uD83D\uDD57") || passwordNoNewLine.includes("\uD83D\uDD58") || passwordNoNewLine.includes("\uD83D\uDD59") || passwordNoNewLine.includes("\uD83D\uDD5A") || passwordNoNewLine.includes("\uD83D\uDD5B")) {
        return false;
      }
    }
    rule20_deletedTimeOnce = true;
    return true;
  }

  function rule21_getSpecialUnicodeSum() {
    let specialCharacters = passwordNoNewLine.match(/[^A-Za-z0-9]/g);
    let currentTotalUnicode = 0;

    for (let i = 0; i < specialCharacters.length; i++) {
      currentTotalUnicode = currentTotalUnicode + specialCharacters[i].charCodeAt(0);
    }

    if (currentTotalUnicode === 250000) {
      return true;
    } else {
      return false;
    }
  }
  
  // rules
  if (currentRule == 0 && passwordNoNewLine.length > 0) {
    addRule(1)
  }

  if (currentRule >= 1 && passwordNoNewLine.length > 5) { // rule 1
    setGreen(1);
    if (currentRule == 1 && checkRules()) {
      addRule(2)
    }
  } else {
    setRed(1);
  }

  if (currentRule >= 2 && /[0-9]/.test(passwordNoNewLine)) { // rule 2
    setGreen(2);
    if (currentRule == 2 && checkRules()) {
      addRule(3)
    }
  } else {
    setRed(2);
  }

  if (currentRule >= 3 && /[A-Z]/.test(passwordNoNewLine)) { // rule 3
    setGreen(3);
    if (currentRule == 3 && checkRules()) {
      addRule(4)
    }
  } else {
    setRed(3);
  }

  if (currentRule >= 4 && /[^A-Za-z0-9]/.test(passwordNoNewLine)) { // rule 4
    setGreen(4);
    if (currentRule == 4 && checkRules()) {
      addRule(5)
    }
  } else {
    setRed(4);
  }

  if (currentRule >= 5 && rule5_checkDigitsIs53()) { // rule 5
    setGreen(5);
    if (currentRule == 5 && checkRules()) {
      addRule(6)
    }
  } else {
    setRed(5);
  }

  if (currentRule >= 6 && passwordNoNewLine.length <= 256) { // rule 6
    setGreen(6);
    if (currentRule == 6 && checkRules()) {
      addRule(7)
    }
  } else {
    setRed(6);
  }

  if (currentRule >= 7 && /[IVXLCDM]+/.test(passwordNoNewLine)) { // rule 7
    setGreen(7);
    if (currentRule == 7 && checkRules()) {
      addRule(8)
    }
  } else {
    setRed(7);
  }

  if (currentRule >= 8 && rule8_getSponsor()) { // rule 8
    setGreen(8);
    if (currentRule == 8 && checkRules()) {
      addRule(9)
    }
  } else {
    setRed(8);
  }

  if (currentRule >= 9 && rule9_getRomanNumeralsMultiply107()) { // rule 9
    setGreen(9);
    if (currentRule == 9 && checkRules()) {
      addRule(10)
    }
  } else {
    setRed(9);
  }

  if (currentRule >= 10 && /(?:He|Li|Be|Ne|Na|Mg|Al|Si|Cl|Ar|Ca|Sc|Ti|Cr|Mn|Fe|Ni|Cu|Zn|Ga|Ge|As|Se|Br|Kr|Rb|Sr|Zr|Nb|Mo|Tc|Ru|Rh|Pd|Ag|Cd|In|Sn|Sb|Te|Xe|Cs|Ba|La|Ce|Pr|Nd|Pm|Sm|Eu|Gd|Tb|Dy|Ho|Er|Tm|Yb|Lu|Hf|Ta|Re|Os|Ir|Pt|Au|Hg|Tl|Pb|Bi|Po|At|Rn|Fr|Ra|Ac|Th|Pa|Np|Pu|Am|Cm|Bk|Cf|Es|Fm|Md|No|Lr|Rf|Db|Sg|Bh|Hs|Mt|Ds|Rg|Cn|Nh|Fl|Mc|Lv|Ts|Og)/.test(passwordNoNewLine)) { // rule 10
    setGreen(10);
    if (currentRule == 10 && checkRules()) {
      addRule(11)
    }
  } else {
    setRed(10);
  }

  if (currentRule >= 11 && rule11_getMoonPhase()) { // rule 11
    setGreen(11);
    if (currentRule == 11 && checkRules()) {
      addRule(12)
    }
  } else {
    setRed(11);
  }

  if (currentRule >= 12 && passwordNoNewLine[0] == passwordNoNewLine[passwordNoNewLine.length - 1]) { // rule 12
    setGreen(12);
    if (currentRule == 12 && checkRules()) {
      addRule(13)
    }
  } else {
    setRed(12);
  }

  if (currentRule >= 13 && rule13_getMathQuestion()) { // rule 13
    setGreen(13);
    if (currentRule == 13 && checkRules()) {
      addRule(14)
    }
  } else {
    setRed(13);
  }

  if (currentRule >= 14 && passwordNoNewLine.toLowerCase().includes("llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch")) { // rule 14
    setGreen(14);
    if (currentRule == 14 && checkRules()) {
      addRule(15)
    }
  } else {
    setRed(14);
  }

  if (currentRule >= 15 && rule15_getSongBPM()) { // rule 15
    setGreen(15);
    if (currentRule == 15 && checkRules()) {
      addRule(16)
    }
  } else {
    setRed(15);
  }

  if (currentRule >= 16 && rule16_getUnicodeCharacter()) { // rule 16
    setGreen(16);
    if (currentRule == 16 && checkRules()) {
      addRule(17)
    }
  } else {
    setRed(16);
  }

  if (currentRule >= 17 && rule17_getDragonState()) { // rule 17
    setGreen(17);
    if (currentRule == 17 && checkRules()) {
      addRule(18)
    }
  } else {
    setRed(17);
  }

  if (currentRule >= 18 && rule18_getAtomicNumberSum()) { // rule 18
    setGreen(18);
    if (currentRule == 18 && checkRules()) {
      addRule(19)
    }
  } else {
    setRed(18);
  }

  if (currentRule >= 19 && rule19_getBoldConsonants()) { // rule 19
    setGreen(19);
    if (currentRule == 19 && checkRules()) {
      addRule(20)
    }
  } else {
    setRed(19);
  }

  if (currentRule >= 20 && rule20_getTimeReplaced()) { // rule 20
    setGreen(20);
    if (currentRule == 20 && checkRules()) {
      addRule(21)
    }
  } else {
    setRed(20);
  }

  if (currentRule >= 21 && rule21_getSpecialUnicodeSum()) { // rule 21
    setGreen(21);
    if (currentRule == 21 && checkRules()) {
      addRule(22)
    }
  } else {
    setRed(21);
  }

  if (currentRule >= 22 && passwordNoNewLine.toLowerCase().includes("1")) { // rule 22
    setGreen(22);
    if (currentRule == 22 && checkRules()) {
      addRule(23)
    }
  } else {
    setRed(22);
  }
});