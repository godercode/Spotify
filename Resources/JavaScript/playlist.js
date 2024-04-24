const music = document.querySelector("#audio");
const seekbar = document.querySelector(".seek-bar");
const volumn = document.querySelector(".volumn");
const songname = document.querySelector(".play-songname");
const currenttime = document.querySelector(".current-time");
const musictime = document.querySelector(".music-time");
const btnplay = document.querySelector(".btn-play");
const btnback = document.querySelector(".btnback");
const btnnext = document.querySelector(".btnnext");

const likedSongs = JSON.parse(localStorage.getItem("likedSongs"));
const listAllSong = JSON.parse(localStorage.getItem("albums-detail"));
console.log(likedSongs);
console.log(listAllSong);

let find_albums = listAllSong.filter((i) => {
  return likedSongs.some((e) => {
    return e == i.id;
  });
});
console.log(find_albums);

document
  .querySelector(".playlist-button .play-btn")
  .addEventListener("click", () => {
    setSong(0);
  });

const doduLieu = () => {
  console.log(find_albums);
  let html = "";
  html = find_albums.map((i, e) => {
    return ` <li class="songItem">
    <span class="playListPlay soTT" id="1">${e + 1}</span>
    <img src="${i.image}">
    <h5 class="songname">
     ${i.name}
    </h5>
    <p class="artist">${i.artist}</p>
    <div class="like-btn"><i class="fa-regular fa-heart"></i></div>
    <span class="songtime">2:14</span>
  </li>`;
  });
  document.querySelector(".playlist-song").innerHTML =
    `<li style="margin-bottom:-20px; color:#a7a7a7; font-size:120%">
  <span>#</span>
  <h5 >
    Title
    <br >
  </h5>
  <p class="artist">Artist</p>
  <div style="opacity:1" class="like-btn">Like</i></div>
  <span class="songtime">Time</span>
</li>
<hr>` + html.join("");
  console.log(html);
};
doduLieu();

const likeIcon = document.querySelector(".like-btn i");
likeIcon.addEventListener("click", () => {
  likeIcon.style.color = "white";
  likeIcon.style.opacity = 1;
});

btnplay.addEventListener("click", () => {
  if (btnplay.className.includes("pause")) {
    music.play();
  } else {
    music.pause();
  }
  btnplay.classList.toggle("pause");
});

let index = 0;
let currentSong = 0;
Array.from(document.querySelectorAll(".songItem .songname")).forEach((e, i) => {
  e.addEventListener("click", () => {
    index = i;
    console.log(index);
    find_albums.forEach((e, i) => {
      if (index == i) {
        setSong(i);
        currentSong = i;
      }
    });
  });
});

let loadedCount = 0;
let totalDuration = 0;
// Lặp qua mỗi phần tử trong mảng .songItem
Array.from(document.querySelectorAll(".songItem")).forEach((e, i) => {
  const music = new Audio(find_albums[i].path); // Tạo một audio element mới cho mỗi bài hát
  music.addEventListener("loadedmetadata", () => {
    totalDuration += music.duration;
    // Sự kiện xảy ra khi metadata của audio đã được tải xong
    e.getElementsByClassName("songtime")[0].innerHTML = formatTime(
      music.duration
    ); // Lấy thời lượng của audio và cập nhật UI
    loadedCount++; // Tăng biến đếm
    if (loadedCount === find_albums.length) {
      document.querySelector(
        ".Music-play .describe"
      ).innerHTML = `Phạm Đình Tân .  ${
        find_albums.length
      } songs, ${formatTime2(totalDuration)} `;
    }
  });
});
const setSong = (i) => {
  document.querySelector(".play-song img").src = find_albums[i].image;
  songname.innerHTML =
    find_albums[i].name +
    `<br>
  <p class="subtitle">${find_albums[i].artist}</p>`;
  music.src = find_albums[i].path;
  music.play();
  volumn.value = 100;
  setTimeout(() => {
    musictime.innerHTML = formatTime(music.duration);
    seekbar.max = music.duration; // Đặt giá trị max của seekbar
  }, 300);
  setInterval(() => {
    seekbar.value = music.currentTime; // Cập nhật giá trị của seekbar theo thời gian hiện tại của bài hát
    currenttime.innerHTML = formatTime(music.currentTime);
    if (Math.floor(music.currentTime) == Math.floor(seekbar.max)) {
      btnnext.click();
    }
  }, 500);
  seekbar.addEventListener("input", () => {
    music.currentTime = seekbar.value; // Đặt thời gian hiện tại của bài hát theo giá trị của seekbar khi người dùng kéo
  });
};

const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
};
const formatTime2 = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min} min ${sec} sec`;
};
btnnext.addEventListener("click", () => {
  if (currentSong >= find_albums.length - 1) {
    currentSong = 0;
  } else {
    currentSong++;
  }
  setSong(currentSong);
});

btnback.addEventListener("click", () => {
  if (currentSong <= 0) {
    currentSong = find_albums.length - 1;
  } else {
    currentSong--;
  }
  setSong(currentSong);
});

volumn.addEventListener("change", () => {
  if (volumn.value == 0) {
    document.getElementById("vol-icon").classList.remove("fa-volume-low");
    document.getElementById("vol-icon").classList.remove("fa-volume-high");
    document.getElementById("vol-icon").classList.add("fa-volume-off");
  }
  if (volumn.value > 0) {
    document.getElementById("vol-icon").classList.add("fa-volume-low");
    document.getElementById("vol-icon").classList.remove("fa-volume-high");
    document.getElementById("vol-icon").classList.remove("fa-volume-off");
  }
  if (volumn.value > 50) {
    document.getElementById("vol-icon").classList.remove("fa-volume-low");
    document.getElementById("vol-icon").classList.add("fa-volume-high");
    document.getElementById("vol-icon").classList.remove("fa-volume-off");
  }
  music.volume = volumn.value / 100;
});
