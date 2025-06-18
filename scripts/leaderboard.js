import { app } from "./firebase.js";
import "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {
  getDatabase,
  ref,
  get,
  update,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const database = getDatabase(app);
const usersRef = ref(database, "users");

const gradients = [
  "linear-gradient(to right, #ed213a, #93291e)", // Red
  "linear-gradient(to right, #fdc830, #f37355)", // Orange
  "linear-gradient(to right, #00b4db, #0083b0)", // Blue
  "linear-gradient(to right, #56ab2f, #a8e063)", // Green
  "linear-gradient(to right, #8e2de2, #4a00e0)", // Purple
  "linear-gradient(to right, #f953c6, #b91d73)", // Pink
];

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

let currentGradientIndex = 0;
let currentLanguage = "spanish";

function getRankIcon(correctTranslations) {
  for (let i = rankIcons.length - 1; i >= 0; i--) {
    if (correctTranslations >= ranks[i].minTranslations) {
      return { icon: rankIcons[i].icon, name: ranks[i].name };
    }
  }
  return { icon: "images/ranks/unranked.png", name: "Unranked" };
}

function updateLeaderboard(currentLanguage) {
  const leaderboardContainer = document.getElementById("leaderboardContainer");
  if (!leaderboardContainer) {
    return;
  }
  leaderboardContainer.innerHTML = "";

  get(usersRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val();

        const usersArray = Object.entries(users).map(
          ([username, userData]) => ({
            username,
            highScores: userData.highScores,
            correctTranslations: userData.correctTranslations || 0,
            profilePic: userData.profilePic || "default.jpg"
          })
        );
        
        const sortedUsers = usersArray.sort((a, b) => {
          const userAScore =
            a.highScores && a.highScores[currentLanguage]
              ? a.highScores[currentLanguage]
              : 0;
          const userBScore =
            b.highScores && b.highScores[currentLanguage]
              ? b.highScores[currentLanguage]
              : 0;
          return userBScore - userAScore;
        });

        const hasScores = sortedUsers.some(
          (userData) => userData.highScores[currentLanguage]
        );

        if (!hasScores) {
          console.log("No scores available for " + currentLanguage);
          return;
        }

        sortedUsers.forEach((userData, index) => {
          const score = userData.highScores[currentLanguage] || 0;
          if (score === 0) {
            return;
          }
          const leaderboardItem = document.createElement("li");

          let positionColor = "";
          if (index === 0) {
            positionColor = "#ffd700";
          } else if (index === 1) {
            positionColor = "#c0c0c0";
          } else if (index === 2) {
            positionColor = "#cd7f32";
          }

          const rank = getRankIcon(userData.correctTranslations);

          leaderboardItem.innerHTML = `
            <div class="lcard" style="color: ${positionColor};">
              <div class="limg">
                <img src="images/pfps/${userData.profilePic}" alt="${userData.username}">
              </div>
              <div class="linfo">
                <div class="lname-rank">
                  <strong>${index + 1}. ${userData.username}</strong>
                  <img src="${rank.icon}" alt="Rank Icon" title="${rank.name}">
                </div>
                <div class="lscore">Score: ${score}</div>
              </div>
            </div>
          `;
          leaderboardContainer.appendChild(leaderboardItem);

          if (userData.username === localStorage.getItem("username")) {
            const userRef = ref(database, `users/${userData.username}`);
            update(userRef, { leaderboardPosition: index + 1 });
          }
        });
      } else {
        console.log("No user data available.");
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
}

const languageSelect = document.getElementById("languageSelect");
const leaderboardTitle = document.getElementById("leaderboardTitle");

languageSelect.addEventListener("change", function () {
  const selectedLanguage = languageSelect.value;

  leaderboardTitle.textContent =
    "Leaderboard (" +
    selectedLanguage.charAt(0).toUpperCase() +
    selectedLanguage.slice(1) +
    ")";

  updateLeaderboard(selectedLanguage);

  const username = localStorage.getItem("username");
  update(ref(database, `users/${username}`), { currentLanguage: selectedLanguage })
    .then(() => {
      console.log("Current language updated successfully.");
    })
    .catch((error) => {
      console.error("Error updating current language:", error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("username");
  if (username) {
    const userRef = ref(database, `users/${username}`);
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          if (userData.currentLanguage) {
            currentLanguage = userData.currentLanguage;
            languageSelect.value = currentLanguage;
            updateLeaderboard(currentLanguage);
          }
          if (userData.themeGradient) {
            document.documentElement.style.setProperty('--background-gradient', userData.themeGradient);
            currentGradientIndex = gradients.indexOf(userData.themeGradient);
          }
        }
      })
      .catch((error) => {
        console.error("Error loading user data:", error);
      });
  }
});

updateLeaderboard(currentLanguage);

export { updateLeaderboard };