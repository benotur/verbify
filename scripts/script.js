import "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {
  getDatabase,
  ref,
  get,
  set,
  child,
  update,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import disallowedUsernames from "./cursewords.js";
import { updateLeaderboard } from "./leaderboard.js";
import { app } from "./firebase.js";
import {
  achievements,
  checkAchievements,
  showAchievementAlert,
  updateAchievementsInDatabase,
  renderAchievements,
} from "./achievements.js";

const database = getDatabase(app);
const usersRef = ref(database, "users");
const auth = getAuth(app);
const leaderboardRef = ref(database, "leaderboard");

const ranks = [
  { name: "Unranked", minTranslations: 0 },
  { name: "Bronze I", minTranslations: 50 },
  { name: "Bronze II", minTranslations: 100 },
  { name: "Bronze III", minTranslations: 200 },
  { name: "Silver I", minTranslations: 350 },
  { name: "Silver II", minTranslations: 500 },
  { name: "Silver III", minTranslations: 700 },
  { name: "Gold I", minTranslations: 950 },
  { name: "Gold II", minTranslations: 1200 },
  { name: "Gold III", minTranslations: 1500 },
  { name: "Platinum I", minTranslations: 1800 },
  { name: "Platinum II", minTranslations: 2200 },
  { name: "Platinum III", minTranslations: 2600 },
  { name: "Diamond I", minTranslations: 3000 },
  { name: "Diamond II", minTranslations: 3500 },
  { name: "Diamond III", minTranslations: 4000 },
  { name: "Immortal I", minTranslations: 4500 },
  { name: "Immortal II", minTranslations: 5000 },
  { name: "Immortal III", minTranslations: 6000 },
  { name: "Master I", minTranslations: 7000 },
  { name: "Master II", minTranslations: 8500 },
  { name: "Master III", minTranslations: 10000 },
];

const rankIcons = [
  { name: "Unranked", icon: "images/ranks/unranked.png" },
  { name: "Bronze I", icon: "images/ranks/bronze1.png" },
  { name: "Bronze II", icon: "images/ranks/bronze2.png" },
  { name: "Bronze III", icon: "images/ranks/bronze3.png" },
  { name: "Silver I", icon: "images/ranks/silver1.png" },
  { name: "Silver II", icon: "images/ranks/silver2.png" },
  { name: "Silver III", icon: "images/ranks/silver3.png" },
  { name: "Gold I", icon: "images/ranks/gold1.png" },
  { name: "Gold II", icon: "images/ranks/gold2.png" },
  { name: "Gold III", icon: "images/ranks/gold3.png" },
  { name: "Platinum I", icon: "images/ranks/platinum1.png" },
  { name: "Platinum II", icon: "images/ranks/platinum2.png" },
  { name: "Platinum III", icon: "images/ranks/platinum3.png" },
  { name: "Diamond I", icon: "images/ranks/diamond1.png" },
  { name: "Diamond II", icon: "images/ranks/diamond2.png" },
  { name: "Diamond III", icon: "images/ranks/diamond3.png" },
  { name: "Immortal I", icon: "images/ranks/immortal1.png" },
  { name: "Immortal II", icon: "images/ranks/immortal2.png" },
  { name: "Immortal III", icon: "images/ranks/immortal3.png" },
  { name: "Master I", icon: "images/ranks/master1.png" },
  { name: "Master II", icon: "images/ranks/master2.png" },
  { name: "Master III", icon: "images/ranks/master3.png" },
];

let correctTranslations = 0;

document.addEventListener("DOMContentLoaded", function () {
  const checkBtn = document.getElementById("checkBtn");
  checkBtn.addEventListener("click", checkTranslation);
});

let verbsSpanish = [];
let verbsGerman = [];
let verbsFrench = [];
let verbsItalian = [];
let verbsHungarian = [];
let verbsJapanese = [];
let verbsKorean = [];
let verbsTurkish = [];
let verbsSwahili = [];
let verbsSlovak = [];
let verbsCzech = [];
let verbsRussian = [];
let verbsPolish = [];
let verbsSerboCroatian = [];
let verbsSwedish = [];
let verbsNorwegian = [];
let verbsDanish = [];
let verbsFinnish = [];

let verbArrays = {
  spanish: verbsSpanish,
  german: verbsGerman,
  french: verbsFrench,
  italian: verbsItalian,
  hungarian: verbsHungarian,
  japanese: verbsJapanese,
  korean: verbsKorean,
  turkish: verbsTurkish,
  swahili: verbsSwahili,
  slovak: verbsSlovak,
  czech: verbsCzech,
  russian: verbsRussian,
  polish: verbsPolish,
  serbocroatian: verbsSerboCroatian,
  swedish: verbsSwedish,
  norwegian: verbsNorwegian,
  danish: verbsDanish,
  finnish: verbsFinnish,
};

let isLanguageToEnglish = true; // Default direction for translation

const gradients = [
  "linear-gradient(to right, #ed213a, #93291e)", // Red
  "linear-gradient(to right, #fdc830, #f37355)", // Orange
  "linear-gradient(to right, #00b4db, #0083b0)", // Blue
  "linear-gradient(to right, #56ab2f, #a8e063)", // Green
  "linear-gradient(to right, #8e2de2, #4a00e0)", // Purple
  "linear-gradient(to right, #f953c6, #b91d73)", // Pink
];

let currentGradientIndex = 0;

document.addEventListener("DOMContentLoaded", function () {
  var usernameInput = document.getElementById("usernameInput");
  var passwordInput = document.getElementById("passwordInput");
  var registerAppBtn = document.getElementById("registerAppBtn");
  var loginAppBtn = document.getElementById("loginAppBtn");

  registerAppBtn.addEventListener("click", registerUser);
  loginAppBtn.addEventListener("click", loginUser);

  var savedUsername = getCookie("username");
  if (savedUsername) {
    var expiration = parseInt(getCookie("username_expiration"));
    var currentTime = new Date().getTime();
    if (currentTime < expiration) {
      usernameInput.value = savedUsername;
      // startApp();
    } else {
      setCookie("username", "", -1);
      setCookie("username_expiration", "", -1);
    }
  }
});

function showCustomAlert(message) {
  const alertContainer = document.getElementById("customAlertContainer"); // Odkaz na kontajner pre vlastný alert
  const alertMessage = document.getElementById("customAlertMessage"); // Odkaz na element pre správu alertu

  alertMessage.textContent = message; // Nastavenie textu správy
  alertContainer.style.display = "block"; // Zobrazenie alertu

  setTimeout(function () {
    alertContainer.style.display = "none"; // Skrytie alertu po 3 sekundách
  }, 3000);
}

function fetchVerbs() {
  const verbsRef = ref(database, "verbs"); // Odkaz na zoznam slovies v databáze
  get(verbsRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val(); // Získanie dát z databázy

        // Priradenie hodnôt slovies pre jednotlivé jazyky
        verbsSpanish = data.spanish || [];
        verbsGerman = data.german || [];
        verbsFrench = data.french || [];
        verbsItalian = data.italian || [];
        verbsHungarian = data.hungarian || [];
        verbsJapanese = data.japanese || [];
        verbsKorean = data.korean || [];
        verbsTurkish = data.turkish || [];
        verbsSwahili = data.swahili || [];
        verbsSlovak = data.slovak || [];
        verbsCzech = data.czech || [];
        verbsRussian = data.russian || [];
        verbsPolish = data.polish || [];
        verbsSerboCroatian = data.serbocroatian || [];
        verbsSwedish = data.swedish || [];
        verbsNorwegian = data.norwegian || [];
        verbsDanish = data.danish || [];
        verbsFinnish = data.finnish || [];

        // Priradenie hodnôt slovies pre jednotlivé jazyky do objektu
        verbArrays = {
          spanish: verbsSpanish,
          german: verbsGerman,
          french: verbsFrench,
          italian: verbsItalian,
          hungarian: verbsHungarian,
          japanese: verbsJapanese,
          korean: verbsKorean,
          turkish: verbsTurkish,
          swahili: verbsSwahili,
          slovak: verbsSlovak,
          czech: verbsCzech,
          russian: verbsRussian,
          polish: verbsPolish,
          serbocroatian: verbsSerboCroatian,
          swedish: verbsSwedish,
          norwegian: verbsNorwegian,
          danish: verbsDanish,
          finnish: verbsFinnish,
        };

        displayRandomVerb(); // Zobrazenie náhodného slovesa po načítaní dát
      } else {
        console.log("No data available in the database.");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function registerUser() {
  // Získanie hodnoty uživateľovho mena a hesla z inputov
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Kontrola, či boli zadané oba hodnoty
  if (username === "" || password === "") {
    showCustomAlert("Please enter both a username and a password.");
    return;
  }

  // Kontrola, či je zadané uživateľské meno platné (3-16 znakov, písmená, čísla, podčiarkovník)
  const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
  if (!usernameRegex.test(username)) {
    showCustomAlert(
      "Invalid username. Please enter a username between 3 and 16 characters long, containing only letters, numbers, and underscores."
    );
    return;
  }

  // Kontrola, či uživateľské meno už neexistuje v databáze
  get(child(usersRef, username)).then((snapshot) => {
    if (snapshot.exists()) {
      showCustomAlert(
        "Username already exists. Please choose a different username."
      );
      return;
    }

    // Získanie aktuálneho dátumu vo formáte YYYY-MM-DD
    const currentDate = new Date().toISOString().split("T")[0];

    // Vytvorenie nového záznamu v databáze pre nového uživateľa
    set(child(usersRef, username), {
      password: password, // Heslo používateľa
      lastLoginDate: currentDate, // Dátum posledného prihlásenia
      dailyStreak: 1, // Počiatočný dailystreak
      loginCount: 1, // Počet prihlásení (žačína na 1)
    })
      .then(() => {
        showCustomAlert("User registered successfully!");
        startApp(); // Spustenie aplikácie po úspešnej registrácii
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        showCustomAlert("Error registering user: " + error.message);
      });
  });
}

function loginUser() {
  // Získanie hodnoty uživateľovho mena a hesla z inputov
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Kontrola, či boli zadané oba hodnoty
  if (username === "" || password === "") {
    showCustomAlert("Please enter both a username and a password.");
    playWarningSound();
    return;
  }

  // Kontrola, či uživateľské meno existuje v databáze
  get(child(usersRef, username)).then((snapshot) => {
    if (!snapshot.exists()) {
      showCustomAlert("Username does not exist. Please register first.");
      playWarningSound();
      return;
    }

    // Kontrola, či zadané heslo zodpovedá heslu v databáze
    const storedPassword = snapshot.val().password;
    if (password !== storedPassword) {
      showCustomAlert("Incorrect password. Please try again.");
      playWarningSound();
      return;
    }

    // Získanie údajov používateľa z databázy
    const userData = snapshot.val();
    const newLoginCount = (userData.loginCount || 0) + 1; // Zvýšenie počtu prihlásení o 1

    // Aktualizácia počtu prihlásení v databáze
    update(child(usersRef, username), { loginCount: newLoginCount })
      .then(() => {
        showCustomAlert("User logged in successfully!");
        playLoginSuccessSound();

        // Nastavenie jazyka, ak si ho použivateľ predtým zvolil
        if (userData.currentLanguage) {
          currentLanguage = userData.currentLanguage;
          languageSelect.value = currentLanguage;
          displayRandomVerb(); // Zobrazenie náhodného slovesa v novom jazyku
        }

        // Nastavenie pozadia, ak si ho použivateľ predtým zvolil
        if (userData.themeGradient) {
          document.documentElement.style.setProperty(
            "--background-gradient",
            userData.themeGradient
          );
          currentGradientIndex = gradients.indexOf(userData.themeGradient);
        }

        startApp(); // Spustenie aplikácie po úspešnom prihlásení
      })
      .catch((error) => {
        console.error("Error updating login count:", error);
        showCustomAlert("Error updating login count: " + error.message);
      });
  });
}

document.getElementById("profileBtn").addEventListener("click", function () {
  window.location.href = "profiles.html";
});

function startApp() {
  var username = document.getElementById("usernameInput").value.trim();
  var userRef = ref(database, `users/${username}`);
  get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        var userData = snapshot.val();
        highScore = userData.highScores[currentLanguage] || 0;
        scoreDisplay.textContent = score + " / " + highScore;

        const lastLoginDate = userData.lastLoginDate || "";
        const currentDate = new Date().toISOString().split("T")[0];

        let dailyStreak = userData.dailyStreak || 0;

        if (lastLoginDate === currentDate) {
          console.log("User has already logged in today.");
        } else {
          const lastLogin = new Date(lastLoginDate);
          const current = new Date(currentDate);
          const timeDifference = current.getTime() - lastLogin.getTime();
          const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

          if (dayDifference === 1) {
            dailyStreak += 1;
          } else {
            dailyStreak = 1;
          }

          update(userRef, {
            lastLoginDate: currentDate,
            dailyStreak: dailyStreak,
          })
            .then(() => {
              console.log("Daily streak updated successfully.");
              showCustomAlert("Daily streak updated successfully.");
            })
            .catch((error) => {
              console.error("Error updating daily streak:", error);
              showCustomAlert("Error updating daily streak: " + error.message);
            });
        }

        const previousAchievements = userData.achievements || [];
        const newAchievements = checkAchievements(
          userData,
          previousAchievements
        );

        newAchievements.forEach((achievement) => {
          if (!previousAchievements.includes(achievement.id)) {
            showAchievementAlert(achievement);
          }
        });

        renderAchievements(userData);
      } else {
        highScore = 0;
        set(child(userRef, `highScores/${currentLanguage}`), 0);
        scoreDisplay.textContent = score + " / " + highScore;
      }
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });

  if (username === "") {
    warningSound.play();
    showCustomAlert("Please enter your name to start the game.");
    return;
  } else if (username.length > 10) {
    warningSound.play();
    showCustomAlert("Username cannot be longer than 10 characters.");
    return;
  } else if (disallowedUsernames.includes(username.toLowerCase())) {
    warningSound.play();
    showCustomAlert("Username is not allowed.");
    return;
  }

  localStorage.setItem("username", username);

  fetchVerbs();

  score = 0;
  highScore = parseInt(getCookie(username + "_highScore")) || 0;

  document.getElementById("logoutAppBtn").style.display = "block";
  document.getElementById("loginContainer").style.display = "none";
  document.getElementById("quizContainer").style.display = "block";
  document.getElementById("navbarContainer").style.display = "flex";
  document.getElementById("usernameDisplay").textContent =
    "Welcome, " + username + "!";
  scoreDisplay.textContent = score + " / " + highScore;

  // Attach the event listener for toggleDirectionBtn after making quizContainer visible
  const toggleDirectionBtn = document.getElementById("toggleDirectionBtn");
  if (toggleDirectionBtn) {
    toggleDirectionBtn.addEventListener("click", function () {
      console.log("Button clicked");
      isLanguageToEnglish = !isLanguageToEnglish; // Toggle the direction

      toggleDirectionBtn.textContent = isLanguageToEnglish
        ? "Translate to English"
        : "Translate to Language";

      displayRandomVerb(); // Display a new verb based on the updated direction
    });
  } else {
    console.error("Toggle Direction Button not found in the DOM.");
  }
}

function logoutFromApp() {
  playLogoutSound();
  localStorage.removeItem("username");

  setCookie("username", "", -1);
  setCookie("username_expiration", "", -1);

  document.getElementById("logoutAppBtn").style.display = "none";
  document.getElementById("loginContainer").style.display = "block";
  document.getElementById("quizContainer").style.display = "none";
  document.getElementById("navbarContainer").style.display = "none";
  document.getElementById("usernameDisplay").textContent = "";
  showCustomAlert("Logged out successfully.");
}

document.addEventListener("DOMContentLoaded", function () {
  var savedUsername = localStorage.getItem("username");
  if (savedUsername) {
    document.getElementById("usernameInput").value = savedUsername;
    startApp();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var logoutAppBtn = document.getElementById("logoutAppBtn");
  logoutAppBtn.addEventListener("click", logoutFromApp);
});

var username = "";
var verbDisplay = document.getElementById("verbDisplay");
var translationInput = document.getElementById("translationInput");
var checkBtn = document.getElementById("checkBtn");
var result = document.getElementById("result");
var scoreDisplay = document.getElementById("scoreDisplay");
var languageSelect = document.getElementById("languageSelect");
var volumeSlider = document.getElementById("volumeSlider");
var startAppBtn = document.getElementById("startAppBtn");
var logoutAppBtn = document.getElementById("logoutAppBtn");
var score = 0;
var highScore = getCookie("highScore") || 0;
var volumeBtn = document.getElementById("volumeBtn");
var volumeMenu = document.getElementById("volumeMenu");
var currentLanguage = "spanish";
var answerTimer;
var usedIndices = [];
var currentIndex = -1;

var correctSound = new Audio("./sounds/correctSound.mp3");
var incorrectSound = new Audio("./sounds/incorrectSound.mp3");
var highScoreSound = new Audio("./sounds/highScoreSound.mp3");
var warningSound = new Audio("./sounds/warningSound.mp3");
var loginSuccessSound = new Audio("./sounds/loginSuccessSound.mp3");
var logoutSound = new Audio("./sounds/logoutSound.mp3");
var achievementUnlockedSound = new Audio(
  "./sounds/achievementUnlockedSound.mp3"
);
var changeSound = new Audio("./sounds/changeSound.mp3");
var timerExpiredSound = new Audio("./sounds/timerExpiredSound.mp3");

checkBtn.addEventListener("click", checkTranslation);

translationInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    checkTranslation();
  }
});

volumeBtn.addEventListener("click", function () {
  if (volumeMenu.style.display === "block") {
    volumeMenu.style.display = "none";
  } else {
    volumeMenu.style.display = "block";
  }
});

languageSelect.addEventListener("change", function () {
  currentLanguage = languageSelect.value; // Nastavenie aktuálneho jazyka na hodnotu vybranú v selecte
  displayRandomVerb(); // Zobrazenie náhodného slovesa v novom jazyku

  var username = localStorage.getItem("username");
  var userRef = ref(database, `users/${username}`);

  // Aktualizácia aktuálneho jazyka v databáze
  update(userRef, { currentLanguage: currentLanguage })
    .then(() => {
      console.log("Current language updated successfully.");
      playChangeSound();
    })
    .catch((error) => {
      console.error("Error updating current language:", error);
    });

  // Načítanie používateľského high score pre aktuálny jazyk
  var userHighScoreRef = ref(
    database,
    `users/${username}/highScores/${currentLanguage}`
  );

  get(userHighScoreRef)
    .then((snapshot) => {
      const userHighScore = snapshot.exists() ? snapshot.val() : 0;
      scoreDisplay.textContent = score + " / " + userHighScore; // Aktualizácia zobrazenia skóre
    })
    .catch((error) => {
      console.error("Error getting user high score:", error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  fetchVerbs();
  var username = localStorage.getItem("username");
  if (username) {
    var userRef = ref(database, `users/${username}`);
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          var userData = snapshot.val();
          if (userData.currentLanguage) {
            currentLanguage = userData.currentLanguage;
            languageSelect.value = currentLanguage;
            displayRandomVerb();
          }
          var userHighScoreRef = ref(
            database,
            `users/${username}/highScores/${currentLanguage}`
          );
          get(userHighScoreRef)
            .then((snapshot) => {
              const userHighScore = snapshot.exists() ? snapshot.val() : 0;
              scoreDisplay.textContent = score + " / " + userHighScore;
            })
            .catch((error) => {
              console.error("Error getting user high score:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error loading user data:", error);
      });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("username");
  if (username) {
    const userRef = ref(database, `users/${username}`);
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          if (userData.themeGradient) {
            document.documentElement.style.setProperty(
              "--background-gradient",
              userData.themeGradient
            );
            currentGradientIndex = gradients.indexOf(userData.themeGradient);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }
});

document.getElementById("cycleThemeBtn").addEventListener("click", function () {
  const username = localStorage.getItem("username");
  currentGradientIndex = (currentGradientIndex + 1) % gradients.length;
  const newGradient = gradients[currentGradientIndex];

  updateThemeGradient(username, newGradient)
    .then(() => {
      document.documentElement.style.setProperty(
        "--background-gradient",
        newGradient
      );
      playChangeSound();
      showCustomAlert("Theme updated successfully");
    })
    .catch((error) => {
      console.error("Error updating theme:", error);
    });
});

function updateThemeGradient(username, gradient) {
  const userRef = ref(database, `users/${username}`);
  return update(userRef, { themeGradient: gradient });
}

function playCorrectSound() {
  correctSound.currentTime = 0;
  correctSound.play();
}

function playIncorrectSound() {
  incorrectSound.currentTime = 0;
  incorrectSound.play();
}

function playHighScoreSound() {
  highScoreSound.currentTime = 0;
  highScoreSound.play();
}

function playWarningSound() {
  warningSound.currentTime = 0;
  warningSound.play();
}

function playLoginSuccessSound() {
  loginSuccessSound.currentTime = 0;
  loginSuccessSound.play();
}

function playLogoutSound() {
  logoutSound.currentTime = 0;
  logoutSound.play();
}

function playAchievementUnlockedSound() {
  achievementUnlockedSound.currentTime = 0;
  achievementUnlockedSound.play();
}

function playChangeSound() {
  changeSound.currentTime = 0;
  changeSound.play();
}

function playTimerExpiredSound() {
  timerExpiredSound.currentTime = 0;
  timerExpiredSound.play();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayRandomVerb() {
  clearInterval(answerTimer); // Clear the previous timer

  // Check if verbs are available for the current language
  if (!verbArrays || !verbArrays[currentLanguage]) {
    console.error("Verb arrays or current language array is not defined.");
    return;
  }

  let verbs = verbArrays[currentLanguage];

  if (!verbs || verbs.length === 0) {
    console.error("No verbs available for the selected language.");
    return;
  }

  shuffleArray(verbs); // Shuffle the verbs array

  currentIndex = (currentIndex + 1) % verbs.length; // Cycle through verbs
  let randomVerb = verbs[currentIndex];

  if (!randomVerb || !randomVerb[currentLanguage] || !randomVerb.english) {
    console.error("Random verb or its translation is not defined.");
    return;
  }

  // Display the verb based on the current input direction
  if (isLanguageToEnglish) {
    verbDisplay.textContent = randomVerb[currentLanguage]; // Show the verb in the selected language
  } else {
    verbDisplay.textContent = randomVerb.english; // Show the verb in English
  }

  translationInput.value = ""; // Clear the input field
  translationInput.focus(); // Focus on the input field
  result.textContent = ""; // Clear the result display

  let timeLeft = 15; // Time for the user to answer
  const timerDisplay = document.getElementById("timerDisplay");
  timerDisplay.textContent = "Time left: " + timeLeft + "s";

  // Start the timer
  answerTimer = setInterval(function () {
    timeLeft--;
    timerDisplay.textContent = "Time left: " + timeLeft + "s";
    if (timeLeft <= 0) {
      clearInterval(answerTimer);
      handleIncorrectTranslation("Time's up! No answer provided.", null, true);
      playTimerExpiredSound();
    }
  }, 1000);
}

function checkTranslation() {
  const inputText = translationInput.value.trim().toLowerCase();
  const currentVerbText = verbDisplay.textContent.trim().toLowerCase(); // Get the displayed verb text
  let currentVerb;
  let correctTranslation;

  clearTimeout(answerTimer); // Clear the answer timer

  console.log("Current language:", currentLanguage);

  // Check if verbs are available for the current language
  const currentVerbArray = verbArrays[currentLanguage];
  if (!currentVerbArray || currentVerbArray.length === 0) {
    console.error("Verb array for current language is empty or not defined.");
    return;
  }

  currentVerb = verbDisplay.textContent.trim().toLowerCase(); // Get the displayed verb text
  console.log("Current verb:", currentVerb);

  // Find the index of the current verb in the array
  const currentVerbIndex = currentVerbArray.findIndex((verb) => {
    if (!verb || !verb[currentLanguage] || !verb.english) {
      console.error("Verb or its translation is not defined:", verb);
      return false;
    }
    const verbText = isLanguageToEnglish
      ? verb[currentLanguage].trim().toLowerCase()
      : verb.english.trim().toLowerCase();
    return verbText === currentVerb;
  });

  // If the verb is found in the array, get the correct translation
  if (currentVerbIndex !== -1) {
    correctTranslation = isLanguageToEnglish
      ? currentVerbArray[currentVerbIndex].english.toLowerCase()
      : currentVerbArray[currentVerbIndex][currentLanguage].toLowerCase();
    console.log("Correct translation:", correctTranslation);

    // Compare the input translation with the correct translation
    if (inputText === correctTranslation) {
      handleCorrectTranslation(); // Handle correct answer
      updateUserProfileCorrectTranslations(); // Update user profile
      return;
    }
  } else {
    console.error("Verb not found in the array. Current verb:", currentVerb);
    console.error("Verb array content:", currentVerbArray);
  }

  // Handle incorrect answer
  handleIncorrectTranslation(correctTranslation);
}

function updateUserProfileCorrectTranslations() {
  const username = localStorage.getItem("username"); // Získanie uživateľského mena z localStorage
  const userRef = ref(database, `users/${username}`); // Odkaz na profil používateľa v databáze
  get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      const userData = snapshot.val(); // Získanie dát používateľa z databázy

      // Aktualizácia počtu správnych prekladov a celkových pokusov
      const updatedCorrectTranslations =
        (userData.correctTranslations || 0) + 1;
      const updatedTotalAttempts = (userData.totalAttempts || 0) + 1;
      const updatedRank = getRank(updatedCorrectTranslations); // Získanie nového ranku

      const currentDate = new Date().toISOString().split("T")[0]; // Získanie aktuálneho dátumu vo formáte YYYY-MM-DD
      const progressDates = userData.progressDates || []; // Získanie dátumov progresu
      const progressValues = userData.progressValues || []; // Získanie hodnôt progresu

      // Ak neexistuje záznam pre aktuálny deň, pridá ho, inak aktualizuje hodnotu pre aktuálny deň
      if (
        progressDates.length === 0 ||
        progressDates[progressDates.length - 1] !== currentDate
      ) {
        progressDates.push(currentDate);
        progressValues.push(updatedCorrectTranslations);
      } else {
        progressValues[progressValues.length - 1] = updatedCorrectTranslations;
      }

      // Aktualizácia profilu používateľa v databáze
      update(userRef, {
        correctTranslations: updatedCorrectTranslations,
        totalAttempts: updatedTotalAttempts,
        rank: updatedRank,
        progressDates: progressDates,
        progressValues: progressValues,
        lastLoginDate: currentDate, // Aktualizácia dátumu posledného prihlásenia
        dailyStreak: userData.dailyStreak || 0, // Aktualizácia dailystreaku
      })
        .then(() => {
          console.log("User profile updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating user profile:", error);
          showCustomAlert("Error updating user profile: " + error.message);
        });
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("username");
  if (username) {
    const userRef = ref(database, `users/${username}`);
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          checkAchievements(userData);
          renderAchievements(userData);
          updateAchievementsInDatabase(username, achievements);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        showCustomAlert("Error fetching user data: " + error.message);
      });
  }
});

function getRank(correctTranslations) {
  for (let i = ranks.length - 1; i >= 0; i--) {
    if (correctTranslations >= ranks[i].minTranslations) {
      return ranks[i].name;
    }
  }
  return "Unranked";
}

export { checkTranslation, updateUserProfileCorrectTranslations };

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function handleCorrectTranslation() {
  var translation = translationInput.value.trim();
  if (translation === "") {
    showCustomAlert("Please enter the translation before proceeding.");
    playWarningSound();
    return;
  }

  result.textContent = "Correct!";
  score++;

  var username = document.getElementById("usernameInput").value.trim();
  var userHighScoreRef = ref(
    database,
    `users/${username}/highScores/${currentLanguage}`
  );

  get(userHighScoreRef)
    .then((snapshot) => {
      var userHighScore = snapshot.exists() ? snapshot.val() : 0;

      if (score > userHighScore) {
        set(userHighScoreRef, score)
          .then(() => {
            console.log("High score updated successfully.");
            scoreDisplay.textContent = score + " / " + score;
          })
          .catch((error) => {
            console.error("Error updating high score:", error);
          });

        playHighScoreSound();
      } else {
        scoreDisplay.textContent = score + " / " + userHighScore;
      }

      updateLeaderboard(languageSelect.value);
    })
    .catch((error) => {
      console.error("Error getting user high score:", error);
    });

  playCorrectSound();

  displayRandomVerb();
}

var isCooldownActive = false;

function handleIncorrectTranslation(
  correctTranslation,
  defaultMessage,
  isTimerExpired = false
) {
  var translation = translationInput.value.trim();

  if (isCooldownActive) {
    return;
  }

  if (!isTimerExpired && !defaultMessage && translation === "") {
    showCustomAlert("Please enter the translation before proceeding.");
    playWarningSound();
    return;
  }

  if (isTimerExpired) {
    result.textContent = "Time's up! No answer provided.";
  } else {
    result.textContent =
      "Incorrect. The correct translation is: " + correctTranslation;
  }

  var username = document.getElementById("usernameInput").value.trim();
  var userHighScoreRef = ref(
    database,
    `users/${username}/highScores/${currentLanguage}`
  );

  get(userHighScoreRef)
    .then((snapshot) => {
      var userHighScore = snapshot.exists() ? snapshot.val() : 0;
      scoreDisplay.textContent = score + " / " + userHighScore;
    })
    .catch((error) => {
      console.error("Error getting user high score:", error);
    });

  score = 0;
  playIncorrectSound();

  isCooldownActive = true;
  setTimeout(function () {
    isCooldownActive = false;
    displayRandomVerb();
  }, 2000);
}

volumeSlider.addEventListener("input", function () {
  var volume = volumeSlider.value / 100;
  correctSound.volume = volume;
  incorrectSound.volume = volume;
  highScoreSound.volume = volume;
  warningSound.volume = volume;
});

fetchVerbs();
displayRandomVerb();
