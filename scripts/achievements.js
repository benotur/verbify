import {
  getDatabase,
  ref,
  get,
  update,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { app } from "./firebase.js";

const database = getDatabase(app);

const achievements = [
  {
    id: 1,
    name: "First Login",
    description: "Log in for the first time",
    icon: "images/achievements/first_login.png",
    completed: false,
    category: "normal",
  },
  {
    id: 2,
    name: "Daily Streak 5",
    description: "Achieve a 5-day login streak",
    icon: "images/achievements/daily_streak_5.png",
    completed: false,
    category: "normal",
  },
  {
    id: 3,
    name: "Daily Streak 10",
    description: "Achieve a 10-day login streak",
    icon: "images/achievements/daily_streak_10.png",
    completed: false,
    category: "normal",
  },
  {
    id: 4,
    name: "Daily Streak 25",
    description: "Achieve a 25-day login streak",
    icon: "images/achievements/daily_streak_25.png",
    completed: false,
    category: "normal",
  },
  {
    id: 5,
    name: "Daily Streak 50",
    description: "Achieve a 50-day login streak",
    icon: "images/achievements/daily_streak_50.png",
    completed: false,
    category: "normal",
  },
  {
    id: 6,
    name: "First Translation",
    description: "Complete your first translation",
    icon: "images/achievements/first_translation.png",
    completed: false,
    category: "normal",
  },
  {
    id: 7,
    name: "100 Translations",
    description: "Complete 100 translations",
    icon: "images/achievements/100_translations.png",
    completed: false,
    category: "normal",
  },
  {
    id: 8,
    name: "250 Translations",
    description: "Complete 250 translations",
    icon: "images/achievements/250_translations.png",
    completed: false,
    category: "normal",
  },
  {
    id: 9,
    name: "500 Translations",
    description: "Complete 500 translations",
    icon: "images/achievements/500_translations.png",
    completed: false,
    category: "normal",
  },
  {
    id: 10,
    name: "1000 Translations",
    description: "Complete 1000 translations",
    icon: "images/achievements/1000_translations.png",
    completed: false,
    category: "normal",
  },
  {
    id: 11,
    name: "2500 Translations",
    description: "Complete 2500 translations",
    icon: "images/achievements/2500_translations.png",
    completed: false,
    category: "normal",
  },
  {
    id: 12,
    name: "5000 Translations",
    description: "Complete 5000 translations",
    icon: "images/achievements/5000_translations.png",
    completed: false,
    category: "normal",
  },
  {
    id: 13,
    name: "10000 Translations",
    description: "Complete 10000 translations",
    icon: "images/achievements/10000_translations.png",
    completed: false,
    category: "normal",
  },
  {
    id: 14,
    name: "First High Score",
    description: "Achieve your first high score",
    icon: "images/achievements/first_high_score.png",
    completed: false,
    category: "normal",
  },
  {
    id: 15,
    name: "Leaderboard Top 10",
    description: "Reach the top 10 on the leaderboard",
    icon: "images/achievements/leaderboard_top_10.png",
    completed: false,
    category: "normal",
  },
  {
    id: 16,
    name: "Leaderboard Top 5",
    description: "Reach the top 5 on the leaderboard",
    icon: "images/achievements/leaderboard_top_5.png",
    completed: false,
    category: "normal",
  },
  {
    id: 17,
    name: "Leaderboard Top 3",
    description: "Reach the top 3 on the leaderboard",
    icon: "images/achievements/leaderboard_top_3.png",
    completed: false,
    category: "normal",
  },
  {
    id: 18,
    name: "Leaderboard Top 2",
    description: "Reach the top 2 on the leaderboard",
    icon: "images/achievements/leaderboard_top_2.png",
    completed: false,
    category: "normal",
  },
  {
    id: 19,
    name: "Leaderboard Top 1",
    description: "Reach the top 1 on the leaderboard",
    icon: "images/achievements/leaderboard_top_1.png",
    completed: false,
    category: "normal",
  },
  {
    id: 20,
    name: "Unranked",
    description: "Achieve the Unranked rank",
    icon: "images/ranks/unranked.png",
    completed: false,
    category: "rank",
  },
  {
    id: 21,
    name: "Bronze I",
    description: "Achieve the Bronze I rank",
    icon: "images/ranks/bronze1.png",
    completed: false,
    category: "rank",
  },
  {
    id: 22,
    name: "Bronze II",
    description: "Achieve the Bronze II rank",
    icon: "images/ranks/bronze2.png",
    completed: false,
    category: "rank",
  },
  {
    id: 23,
    name: "Bronze III",
    description: "Achieve the Bronze III rank",
    icon: "images/ranks/bronze3.png",
    completed: false,
    category: "rank",
  },
  {
    id: 24,
    name: "Silver I",
    description: "Achieve the Silver I rank",
    icon: "images/ranks/silver1.png",
    completed: false,
    category: "rank",
  },
  {
    id: 25,
    name: "Silver II",
    description: "Achieve the Silver II rank",
    icon: "images/ranks/silver2.png",
    completed: false,
    category: "rank",
  },
  {
    id: 26,
    name: "Silver III",
    description: "Achieve the Silver III rank",
    icon: "images/ranks/silver3.png",
    completed: false,
    category: "rank",
  },
  {
    id: 27,
    name: "Gold I",
    description: "Achieve the Gold I rank",
    icon: "images/ranks/gold1.png",
    completed: false,
    category: "rank",
  },
  {
    id: 28,
    name: "Gold II",
    description: "Achieve the Gold II rank",
    icon: "images/ranks/gold2.png",
    completed: false,
    category: "rank",
  },
  {
    id: 29,
    name: "Gold III",
    description: "Achieve the Gold III rank",
    icon: "images/ranks/gold3.png",
    completed: false,
    category: "rank",
  },
  {
    id: 30,
    name: "Platinum I",
    description: "Achieve the Platinum I rank",
    icon: "images/ranks/platinum1.png",
    completed: false,
    category: "rank",
  },
  {
    id: 31,
    name: "Platinum II",
    description: "Achieve the Platinum II rank",
    icon: "images/ranks/platinum2.png",
    completed: false,
    category: "rank",
  },
  {
    id: 32,
    name: "Platinum III",
    description: "Achieve the Platinum III rank",
    icon: "images/ranks/platinum3.png",
    completed: false,
    category: "rank",
  },
  {
    id: 33,
    name: "Diamond I",
    description: "Achieve the Diamond I rank",
    icon: "images/ranks/diamond1.png",
    completed: false,
    category: "rank",
  },
  {
    id: 34,
    name: "Diamond II",
    description: "Achieve the Diamond II rank",
    icon: "images/ranks/diamond2.png",
    completed: false,
    category: "rank",
  },
  {
    id: 35,
    name: "Diamond III",
    description: "Achieve the Diamond III rank",
    icon: "images/ranks/diamond3.png",
    completed: false,
    category: "rank",
  },
  {
    id: 36,
    name: "Immortal I",
    description: "Achieve the Immortal I rank",
    icon: "images/ranks/immortal1.png",
    completed: false,
    category: "rank",
  },
  {
    id: 37,
    name: "Immortal II",
    description: "Achieve the Immortal II rank",
    icon: "images/ranks/immortal2.png",
    completed: false,
    category: "rank",
  },
  {
    id: 38,
    name: "Immortal III",
    description: "Achieve the Immortal III rank",
    icon: "images/ranks/immortal3.png",
    completed: false,
    category: "rank",
  },
  {
    id: 39,
    name: "Master I",
    description: "Achieve the Master I rank",
    icon: "images/ranks/master1.png",
    completed: false,
    category: "rank",
  },
  {
    id: 40,
    name: "Master II",
    description: "Achieve the Master II rank",
    icon: "images/ranks/master2.png",
    completed: false,
    category: "rank",
  },
  {
    id: 41,
    name: "Master III",
    description: "Achieve the Master III rank",
    icon: "images/ranks/master3.png",
    completed: false,
    category: "rank",
  },
];

function checkAchievements(userData) {
  const rankOrder = [
    "Unranked",
    "Bronze I",
    "Bronze II",
    "Bronze III",
    "Silver I",
    "Silver II",
    "Silver III",
    "Gold I",
    "Gold II",
    "Gold III",
    "Platinum I",
    "Platinum II",
    "Platinum III",
    "Diamond I",
    "Diamond II",
    "Diamond III",
    "Immortal I",
    "Immortal II",
    "Immortal III",
    "Master I",
    "Master II",
    "Master III",
  ];

  const currentRankIndex = rankOrder.indexOf(userData.rank);

  achievements.forEach((achievement) => {
    switch (achievement.id) {
      case 1:
        if (userData.loginCount >= 1) achievement.completed = true;
        break;
      case 2:
        if (userData.dailyStreak >= 5) achievement.completed = true;
        break;
      case 3:
        if (userData.dailyStreak >= 10) achievement.completed = true;
        break;
      case 4:
        if (userData.dailyStreak >= 25) achievement.completed = true;
        break;
      case 5:
        if (userData.dailyStreak >= 50) achievement.completed = true;
        break;
      case 6:
        if (userData.correctTranslations >= 1) achievement.completed = true;
        break;
      case 7:
        if (userData.correctTranslations >= 100) achievement.completed = true;
        break;
      case 8:
        if (userData.correctTranslations >= 250) achievement.completed = true;
        break;
      case 9:
        if (userData.correctTranslations >= 500) achievement.completed = true;
        break;
      case 10:
        if (userData.correctTranslations >= 1000) achievement.completed = true;
        break;
      case 11:
        if (userData.correctTranslations >= 2500) achievement.completed = true;
        break;
      case 12:
        if (userData.correctTranslations >= 5000) achievement.completed = true;
        break;
      case 13:
        if (userData.correctTranslations >= 10000) achievement.completed = true;
        break;
      case 14:
        if (
          userData.highScores &&
          Object.values(userData.highScores).some((score) => score > 0)
        )
          achievement.completed = true;
        break;
      case 15:
        if (userData.leaderboardPosition <= 10) achievement.completed = true;
        break;
      case 16:
        if (userData.leaderboardPosition <= 5) achievement.completed = true;
        break;
      case 17:
        if (userData.leaderboardPosition <= 3) achievement.completed = true;
        break;
      case 18:
        if (userData.leaderboardPosition <= 2) achievement.completed = true;
        break;
      case 19:
        if (userData.leaderboardPosition <= 1) achievement.completed = true;
        break;
      default:
        if (achievement.category === "rank") {
          const rankIndex = rankOrder.indexOf(achievement.name);
          if (rankIndex !== -1 && rankIndex <= currentRankIndex) {
            achievement.completed = true;
          }
        }
        break;
    }
  });
}

function showAchievementAlert(achievement) {
  const alertContainer = document.getElementById("customAlertContainer");
  const alertMessage = document.getElementById("customAlertMessage");

  alertMessage.textContent = `Achievement Unlocked: ${achievement.name}`;
  alertContainer.style.display = "block";

  setTimeout(function () {
    alertContainer.style.display = "none";
  }, 3000);
}

function updateAchievementsInDatabase(username, achievements) {
  const userRef = ref(database, `users/${username}`);
  update(userRef, {
    achievements: achievements.filter((a) => a.completed).map((a) => a.id),
  });
}

function renderAchievements(userData) {
  const normalAchievementsContainer = document.getElementById(
    "normalAchievementsContainer"
  );
  const rankAchievementsContainer = document.getElementById(
    "rankAchievementsContainer"
  );
  normalAchievementsContainer.innerHTML = "";
  rankAchievementsContainer.innerHTML = "";

  achievements.forEach((achievement) => {
    const icon = document.createElement("div");
    icon.className = `achievement-icon ${
      achievement.completed ? "completed" : ""
    }`;
    icon.innerHTML = `<img src="${achievement.icon}" alt="${achievement.name}"><div class="tooltip">${achievement.name}: ${achievement.description}</div>`;

    if (achievement.category === "normal") {
      normalAchievementsContainer.appendChild(icon);
    } else if (achievement.category === "rank") {
      rankAchievementsContainer.appendChild(icon);
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

          if (userData.themeGradient) {
            document.documentElement.style.setProperty(
              "--background-gradient",
              userData.themeGradient
            );
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }

  const normalAchievementsBtn = document.getElementById("normalAchievementsBtn");
  const rankAchievementsBtn = document.getElementById("rankAchievementsBtn");
  const normalAchievementsContainer = document.getElementById("normalAchievementsContainer");
  const rankAchievementsContainer = document.getElementById("rankAchievementsContainer");

  normalAchievementsBtn.addEventListener("click", () => {
    normalAchievementsContainer.style.display = "flex";
    rankAchievementsContainer.style.display = "none";
  });

  rankAchievementsBtn.addEventListener("click", () => {
    normalAchievementsContainer.style.display = "none";
    rankAchievementsContainer.style.display = "flex";
  });
});

export {
  achievements,
  checkAchievements,
  showAchievementAlert,
  updateAchievementsInDatabase,
  renderAchievements,
};