import { app } from "./firebase.js";
import "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {
  getDatabase,
  ref,
  get,
  child,
  update,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const database = getDatabase(app);
const usersRef = ref(database, "users");

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

const gradients = [
  "linear-gradient(to right, #ed213a, #93291e)", // Red
  "linear-gradient(to right, #fdc830, #f37355)", // Orange
  "linear-gradient(to right, #00b4db, #0083b0)", // Blue
  "linear-gradient(to right, #56ab2f, #a8e063)", // Green
  "linear-gradient(to right, #8e2de2, #4a00e0)", // Purple
  "linear-gradient(to right, #f953c6, #b91d73)", // Pink
];

let currentGradientIndex = 0;

function showCustomAlert(message) {
  const alertContainer = document.getElementById("customAlertContainer");
  const alertMessage = document.getElementById("customAlertMessage");

  alertMessage.textContent = message;
  alertContainer.style.display = "block";

  setTimeout(function () {
    alertContainer.style.display = "none";
  }, 3000);
}

function getRankIcon(correctTranslations) {
  for (let i = rankIcons.length - 1; i >= 0; i--) {
    if (correctTranslations >= ranks[i].minTranslations) {
      return { icon: rankIcons[i].icon, name: ranks[i].name };
    }
  }
  return { icon: "images/ranks/unranked.png", name: "Unranked" };
}

document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("username");
  getUserProfile(username)
    .then((userData) => {
      if (userData.themeGradient) {
        document.documentElement.style.setProperty('--background-gradient', userData.themeGradient);
        currentGradientIndex = gradients.indexOf(userData.themeGradient);
      }

      const correctTranslationCounter = document.getElementById("correctTranslationCounter");
      if (correctTranslationCounter) {
        correctTranslationCounter.textContent = `Correct Translations: ${userData.correctTranslations || 0}`;
      }

      const rankDisplay = document.getElementById("rankDisplay");
      if (rankDisplay) {
        const rank = getRankIcon(userData.correctTranslations || 0);
        rankDisplay.innerHTML = `<img src="${rank.icon}" alt="Rank Icon" title="${rank.name}" style="width: 50px; height: 50px;">`;
      }

      const dailyStreakDisplay = document.getElementById("dailyStreakDisplay");
      if (dailyStreakDisplay) {
        dailyStreakDisplay.textContent = `Daily Streak: ${userData.dailyStreak || 0}`;
      }

      const progressChartElement = document.getElementById("progressChart");
      if (progressChartElement) {
        const progressChart = progressChartElement.getContext("2d");
        new Chart(progressChart, {
          type: "line",
          data: {
            labels: userData.progressDates || [],
            datasets: [
              {
                label: "Correct Translations Over Time",
                data: userData.progressValues || [],
                borderColor: "rgb(255, 255, 255)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
                borderWidth: 2,
                pointBackgroundColor: "rgb(255, 255, 255)",
                pointBorderColor: "#fff",
                pointBorderWidth: 2,
                pointRadius: 5,
              },
            ],
          },
          options: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Date",
                  color: "#ffffff",
                  font: {
                    size: 14,
                    weight: "bold",
                  },
                },
                grid: {
                  display: false,
                },
                ticks: {
                  color: "#ffffff",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Correct Translations",
                  color: "#ffffff",
                  font: {
                    size: 14,
                    weight: "bold",
                  },
                },
                beginAtZero: true,
                grid: {
                  color: "rgba(200, 200, 200, 0.2)",
                },
                ticks: {
                  color: "#ffffff",
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                titleColor: "#fff",
                bodyColor: "#fff",
                borderColor: "#333",
                borderWidth: 1,
              },
            },
          },
        });
      }

      if (userData.currentLanguage) {
        currentLanguage = userData.currentLanguage;
        document.getElementById("languageSelect").value = currentLanguage;
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });

  const profilePicBtn = document.getElementById("profilePicBtn");
  const profilePicMenu = document.getElementById("profilePicMenu");
  const profilePicOptions = document.getElementById("profilePicOptions");

  profilePicBtn.addEventListener("click", function () {
    profilePicMenu.style.display = profilePicMenu.style.display === "none" ? "block" : "none";
  });

  const profilePics = [
    "default.jpg",
    "cat.jpg",
    "bear.jpg",
    "frog.jpg",
    "goose.jpg"
  ];

  profilePics.forEach((pic) => {
    const img = document.createElement("img");
    img.src = `images/pfps/${pic}`;
    img.alt = pic;
    img.style.width = "50px";
    img.style.height = "50px";
    img.style.cursor = "pointer";
    img.addEventListener("click", function () {
      updateProfilePicture(username, pic)
        .then(() => {
          showCustomAlert("Profile picture updated successfully");
          profilePicMenu.style.display = "none";
        })
        .catch((error) => {
          console.error("Error updating profile picture:", error);
        });
    });
    profilePicOptions.appendChild(img);
  });
});

function getUserProfile(username) {
  return get(child(usersRef, username)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error("User not found");
    }
  });
}

function updateThemeGradient(username, gradient) {
  const userRef = ref(database, `users/${username}`);
  return update(userRef, { themeGradient: gradient });
}

function updateProfilePicture(username, profilePic) {
  const userRef = ref(database, `users/${username}`);
  return update(userRef, { profilePic: profilePic });
}

document.getElementById("cycleThemeBtn").addEventListener("click", function () {
  const username = localStorage.getItem("username");
  currentGradientIndex = (currentGradientIndex + 1) % gradients.length;
  const newGradient = gradients[currentGradientIndex];

  updateThemeGradient(username, newGradient)
    .then(() => {
      document.documentElement.style.setProperty('--background-gradient', newGradient);
      showCustomAlert("Theme updated successfully");
    })
    .catch((error) => {
      console.error("Error updating theme:", error);
    });
});

document
  .getElementById("changePasswordForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = localStorage.getItem("username");
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;

    changePassword(username, currentPassword, newPassword)
      .then(() => {
        showCustomAlert("Password changed successfully");
        document.getElementById("currentPassword").value = "";
        document.getElementById("newPassword").value = "";
      })
      .catch((error) => {
        showCustomAlert(error.message);
      });
  });

function changePassword(username, currentPassword, newPassword) {
  return get(child(usersRef, username)).then((snapshot) => {
    if (snapshot.exists()) {
      const userData = snapshot.val();
      if (userData.password === currentPassword) {
        return update(ref(database, `users/${username}`), {
          password: newPassword,
        });
      } else {
        throw new Error("Current password is incorrect");
      }
    } else {
      throw new Error("User not found");
    }
  });
}

function updateCurrentLanguage(username, language) {
  const userRef = ref(database, `users/${username}`);
  return update(userRef, { currentLanguage: language });
}

document
  .getElementById("languageSelect")
  .addEventListener("change", function (event) {
    const username = localStorage.getItem("username");
    const newLanguage = event.target.value;
    updateCurrentLanguage(username, newLanguage)
      .then(() => {
        currentLanguage = newLanguage;
        displayRandomVerb();
      })
      .catch((error) => {
        console.error("Error updating current language:", error);
      });
});

export { getUserProfile, changePassword, updateCurrentLanguage };