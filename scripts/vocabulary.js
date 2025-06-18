import { app } from './firebase.js';
import "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const database = getDatabase(app);

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

const vocabularyList = document.getElementById("vocabularyList");
const languageSelect = document.getElementById("languageSelect");
const searchInput = document.getElementById("searchInput");

const gradients = [
    "linear-gradient(to right, #ed213a, #93291e)", // Red
    "linear-gradient(to right, #fdc830, #f37355)", // Orange
    "linear-gradient(to right, #00b4db, #0083b0)", // Blue
    "linear-gradient(to right, #56ab2f, #a8e063)", // Green
    "linear-gradient(to right, #8e2de2, #4a00e0)", // Purple
    "linear-gradient(to right, #f953c6, #b91d73)", // Pink
  ];

let currentGradientIndex = 0;
let currentLanguage = "spanish";

fetchVerbs();

languageSelect.addEventListener("change", function() {
    currentLanguage = languageSelect.value;
    vocabularyList.innerHTML = "";
    displayVerbs();
    updateUserLanguage();
});

searchInput.addEventListener("input", function() {
    displayVerbs();
});

function showCustomAlert(message) {
    const alertContainer = document.getElementById("customAlertContainer");
    const alertMessage = document.getElementById("customAlertMessage");
  
    alertMessage.textContent = message;
    alertContainer.style.display = "block";
  
    setTimeout(function () {
      alertContainer.style.display = "none";
    }, 3000);
}

function fetchVerbs() {
    const verbsRef = ref(database, 'verbs');
    get(verbsRef).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            verbsSpanish = data.spanish;
            verbsGerman = data.german;
            verbsFrench = data.french;
            verbsItalian = data.italian;
            verbsHungarian = data.hungarian;
            verbsJapanese = data.japanese;
            verbsKorean = data.korean;
            verbsTurkish = data.turkish;
            verbsSwahili = data.swahili;
            verbsSlovak = data.slovak;
            verbsCzech = data.czech;
            verbsRussian = data.russian;
            verbsPolish = data.polish;
            verbsSerboCroatian = data.serbocroatian;
            verbsSwedish = data.swedish;
            verbsNorwegian = data.norwegian;
            verbsDanish = data.danish;
            verbsFinnish = data.finnish;

            displayVerbs();
        } else {
            console.log("No verbs data available.");
        }
    }).catch((error) => {
        console.error("Error fetching verbs data:", error);
    });
}

function displayVerbs() {
    let verbsToDisplay = [];

    switch (currentLanguage) {
        case "spanish":
            verbsToDisplay = verbsSpanish;
            break;
        case "german":
            verbsToDisplay = verbsGerman;
            break;
        case "french":
            verbsToDisplay = verbsFrench;
            break;
        case "italian":
            verbsToDisplay = verbsItalian;
            break;
        case "hungarian":
            verbsToDisplay = verbsHungarian;
            break;
        case "japanese":
            verbsToDisplay = verbsJapanese;
            break;
        case "korean":
            verbsToDisplay = verbsKorean;
            break;
        case "turkish":
            verbsToDisplay = verbsTurkish;
            break;
        case "swahili":
            verbsToDisplay = verbsSwahili;
            break;
        case "slovak":
            verbsToDisplay = verbsSlovak;
            break;
        case "czech":
            verbsToDisplay = verbsCzech;
            break;
        case "russian":
            verbsToDisplay = verbsRussian;
            break;
        case "polish":
            verbsToDisplay = verbsPolish;
            break;
        case "serbocroatian":
            verbsToDisplay = verbsSerboCroatian;
            break;
        case "swedish":
            verbsToDisplay = verbsSwedish;
            break;
        case "norwegian":
            verbsToDisplay = verbsNorwegian;
            break;
        case "danish":
            verbsToDisplay = verbsDanish;
            break;
        case "finnish":
            verbsToDisplay = verbsFinnish;
            break;
        default:
            console.log("Language not supported.");
            return;
    }

    const searchQuery = searchInput.value.toLowerCase();
    const filteredVerbs = verbsToDisplay.filter(verb => verb[currentLanguage].toLowerCase().includes(searchQuery));

    vocabularyList.innerHTML = "";

    filteredVerbs.forEach((verb) => {
        const listItem = document.createElement("li");
        listItem.textContent = verb[currentLanguage];

        listItem.addEventListener("click", () => {
            showConjugationCard(verb); // Ukáže časovanie
        });

        vocabularyList.appendChild(listItem);
    });
}

function showConjugationCard(verb) {
    const conjugationCard = document.getElementById("conjugationCard");
    const verbName = document.getElementById("verbName");
    const conjugationList = document.getElementById("conjugationList");
    const translationDisplay = document.getElementById("translationDisplay");

    // Set the verb name
    verbName.textContent = verb[currentLanguage] || "Unknown Verb";

    // Clear previous content
    conjugationList.innerHTML = "";
    translationDisplay.innerHTML = "";

    // Retrieve conjugations for the current language
    const conjugations = verb.conjugations?.present;
    if (conjugations && typeof conjugations === "object") {
        // Define the order of pronouns
        const pronounOrder = ["yo", "tú", "él_ella_usted", "nosotros", "vosotros", "ellos_ellas_ustedes"];

        // Iterate over the pronouns in the defined order
        pronounOrder.forEach((pronoun) => {
            if (conjugations[pronoun]) {
                const listItem = document.createElement("li");
                listItem.textContent = `${pronoun.replace(/_/g, "/")}: ${conjugations[pronoun]}`;
                conjugationList.appendChild(listItem);
            }
        });
    } else {
        conjugationList.textContent = "No conjugations available.";
    }

    // Add translation
    translationDisplay.textContent = `Translation: ${verb.english || "No translation available"}`;

    // Show the card
    conjugationCard.style.display = "block";
    vocabularyList.style.display = "none";
}

function hideConjugationCard() {
    const conjugationCard = document.getElementById("conjugationCard");
    conjugationCard.style.display = "none";
    vocabularyList.style.display = "block";
}

window.hideConjugationCard = hideConjugationCard;

function updateUserLanguage() {
    var username = localStorage.getItem("username");
    if (username) {
        update(ref(database, `users/${username}`), { currentLanguage: currentLanguage })
            .then(() => {
                console.log("Current language updated successfully.");
            })
            .catch((error) => {
                console.error("Error updating current language:", error);
            });
    }
}

document.addEventListener("DOMContentLoaded", function () {
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
                        displayVerbs();
                    }
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
              document.documentElement.style.setProperty('--background-gradient', userData.themeGradient);
              currentGradientIndex = gradients.indexOf(userData.themeGradient);
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  });

export { fetchVerbs, displayVerbs, hideConjugationCard };