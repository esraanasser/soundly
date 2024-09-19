import Song from "./song.js";
const songs = Song.list;
const playerImage = document.querySelector(".player .img img");
const playerAudio = document.querySelector(".player .img audio");
const cdCoverImage = document.querySelector(".player .img");

export default class Player {
  static currentSong;

  static getCurrentSong(data) {
    console.log("Data", data);
    const { img, src } = data;
    playerImage.src = img;
    playerAudio.src = src;
    cdCoverImage.style.rotate = "0";
    Player.currentSong = data;
    // console.log(Player.currentSong);
  }

  static play() {
    playerAudio.play();
  }

  static pause() {
    playerAudio.pause();
  }

  static bar() {
    const playerBar = document.querySelector(".player .controller .bar input");
    playerBar.addEventListener("input", e => {
      console.log(e.target.value);
      playerBar.setAttribute("value", e.target.value);
      playerAudio.currentTime = e.target.value;
    });
  }

  static next(songsList, currentSong) {
    const findSongIndex = songsList.findIndex(
      song => song.id === currentSong.id
    );
    let nexSong = songsList[findSongIndex + 1];
    if (!nexSong) {
      nexSong = songsList[0];
    }
    this.getCurrentSong(nexSong);
  }

  static autoNext(durationByMS, currentTime) {
    if (durationByMS === currentTime) {
      const currentIndex = songs.indexOf(Player.currentSong);
      const songDivs = document.querySelectorAll(".songs .container .song");
      let nextDiv = songDivs[currentIndex + 1];
      if (!nextDiv) {
        nextDiv = songDivs[0];
      }
      console.log(nextDiv);
      Song.activeSong(nextDiv);

      this.next(songs, this.currentSong);
      this.play();
    }
  }
  static prev(songsList, currentSong) {
    const findSongIndex = songsList.findIndex(
      song => song.id === currentSong.id
    );

    let nexSong = songsList[findSongIndex - 1];
    if (!nexSong) {
      // console.log(songsList[songsList.length]);
      nexSong = songsList[songsList.length - 1];
    }
    this.getCurrentSong(nexSong);
  }
}

// Player.play();
