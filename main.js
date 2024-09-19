import Song from "./utils/song.js";
import Player from "./utils/player.js";

// Fetch the list of songs
const songs = Song.list;

// DOM Elements
const playBtn = document.querySelector(".player .controller .btns .play");
const playerAudio = document.querySelector(".player .img audio");
const playerBar = document.querySelector(".player .controller .bar input");

// Initialize with a random song when the page loads
window.addEventListener("DOMContentLoaded", () => {
  const randomIndex = Math.floor(Math.random() * songs.length);
  const randomSong = songs[randomIndex];

  // Set the randomly chosen song as the current song
  Player.getCurrentSong(randomSong);

  // Update the active song class for the random song
  const songDivs = document.querySelectorAll(".songs .container .song");
  const selectedDiv = songDivs[randomIndex];
  Song.activeSong(selectedDiv);
});

// Main functions
renderAsideSongs(); // Renders the list of songs in the sidebar
playerController(); // Sets up the player controls and event listeners

/**
 * Renders the songs in the sidebar and sets up click event listeners for each song.
 */
function renderAsideSongs() {
  // Parent div that holds all song elements
  const songsContainer = document.querySelector(".songs .container");

  // Loop through each song in the Song list and create its corresponding HTML
  songs.forEach(song => {
    const { id, img, title, singer, duration } = song;
    const songDiv = document.createElement("div");

    songDiv.classList = "song";
    songDiv.innerHTML = `
      <div class="img">
        <img src=${img} alt=${title} />
      </div>
      <div class="info">
        <h4>${title}</h4>
        <p>${duration}</p>
        <p>${singer}</p>
      </div>
    `;

    // Click event for each song to make it the current song and mark it as active
    songDiv.addEventListener("click", () => {
      Player.getCurrentSong(song);
      Song.activeSong(songDiv);

      // If the play button is already active, play the new song immediately
      if (playBtn.classList.contains("on")) {
        Player.play();
      }
    });

    songsContainer.append(songDiv);
  });
}

/**
 * Sets up the player controls: play, pause, next, and previous actions.
 */
function playerController() {
  const playBtnIcon = document.querySelector(
    ".player .controller .btns .play img"
  );
  const cdCoverImage = document.querySelector(".player .img");
  const nextBtn = document.querySelector(".player .controller .btns .next");
  const prevBtn = document.querySelector(".player .controller .btns .prev");

  // Toggle play/pause on play button click
  playBtn.addEventListener("click", () => {
    playBtn.classList.toggle("on");
    if (!playBtn.classList.contains("on")) {
      playBtnIcon.src = "./assets/icons/play-solid.svg";
      cdCoverImage.style.animationPlayState = "paused";
      Player.pause();
    } else {
      playBtnIcon.src = "./assets/icons/pause-solid.svg";
      cdCoverImage.style.animationPlayState = "running";
      Player.play();
    }
  });

  // Move to the next song
  nextBtn.addEventListener("click", () => {
    Player.next(songs, Player.currentSong);
    Player.play();
    updateActiveSong();
  });

  // Move to the previous song
  prevBtn.addEventListener("click", () => {
    Player.prev(songs, Player.currentSong);
    Player.play();
    updateActiveSong();
  });

  // Update progress bar and check for auto-next when song time updates
  playerAudio.addEventListener("timeupdate", () => {
    const { duration, durationByMS } = getCurrentSongDuration();
    const currentTime = playerAudio.currentTime;
    playerBar.value = currentTime;
    playerBar.setAttribute("min", 0);
    playerBar.setAttribute("max", Math.floor(durationByMS) || 0);
    Player.autoNext(durationByMS, currentTime);
  });

  // Control range bar
  Player.bar();
}

/**
 * Gets the current duration of the song in minutes and seconds.
 * @returns {Object} Contains the duration in milliseconds and formatted as MM:SS.
 */
function getCurrentSongDuration() {
  const durationByMS = playerAudio.duration;
  const durationMIN = Math.floor(durationByMS / 60);
  const durationSEC = Math.floor(durationByMS % 60);
  const duration = `${durationMIN}:${durationSEC}`;
  return { durationByMS, duration };
}

/**
 * Updates the active song visually in the sidebar.
 */
function updateActiveSong() {
  const currentIndex = songs.indexOf(Player.currentSong);
  const songDivs = document.querySelectorAll(".songs .container .song");
  Song.activeSong(songDivs[currentIndex]);
}
