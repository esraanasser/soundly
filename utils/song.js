/**
 * @class
 * song class
 */

export default class Song {
  /**
   * list of all songs in Song Class
   * @type {Song[]}
   * @static
   */
  static list = [];

  /**
   *@param {string} src - song src
   * @param {string} title - song title.
   * @param {string} singer - singer name.
   * @param {thumb} img - singer image.
   */

  constructor(src, title, singer, img, duration) {
    this.id = Song.list.length + 1;
    this.title = title;
    this.singer = singer;
    this.img = img;
    this.src = src;
    this.duration = duration || 0;
    Song.list.push(this);
  }

  static activeSong(element) {
    const parent = element.parentElement;
    const allSongs = parent.children;
    [...allSongs].forEach(SongDiv => {
      SongDiv.classList.remove("active-song");
    });
    // console.log(allSongs);
    // console.log(parent);
    // console.log(element);
    element.classList.add("active-song");
  }
}

new Song(
  "./assets/sounds/tol-mana-shayfk.mp3",
  "Tol Mana Shayfak",
  "Amr Diab",
  "./assets/imgs/diab.jpg",
  "3:28"
);

new Song(
  "./assets/sounds/antika.mp3",
  "Antika",
  "West El-Balad",
  "./assets/imgs/west_elbalad.webp",
  "5:19"
);
new Song(
  "./assets/sounds/awkat.mp3",
  "Awkat",
  "Asala Nasrey",
  "./assets/imgs/asala.jpg",
  "4:22"
);
// new Song(
//   "./assets/sounds/Ba7ebak.wma",
//   "Bahbak",
//   "Janat",
//   "./assets/imgs/janat.jpg"
// );
new Song(
  "./assets/sounds/da-kalam.mp3",
  "Dah Kalam",
  "Muhammed Hamaki",
  "./assets/imgs/hamaki.jpg",
  "4:53"
);
new Song(
  "./assets/sounds/dameroh.mp3",
  "Dameroh",
  "Muhammed Adwia",
  "./assets/imgs/adwia.jpg",
  "3:54"
);
new Song(
  "./assets/sounds/eza-nawy-tro7.mp3",
  "Eza Nawy Troh",
  "Abdullah Salem",
  "./assets/imgs/salem.JPG",
  "4:43"
);
new Song(
  "./assets/sounds/insan.mp3",
  "Insan",
  "Hamza Namira",
  "./assets/imgs/namira.webp",
  "3:33"
);
new Song(
  "./assets/sounds/sotek.mp3",
  "Sotek",
  "Muhammed Mounir",
  "./assets/imgs/mounir.webp",
  "6:09"
);
