const music = document.querySelector("#audio");
const seekbar = document.querySelector(".seek-bar");
const volumn = document.querySelector(".volumn");
const songname = document.querySelector(".play-songname");
const currenttime = document.querySelector(".current-time");
const musictime = document.querySelector(".music-time");
const btnplay = document.querySelector(".btn-play");
const btnback = document.querySelector(".btnback");
const btnnext = document.querySelector(".btnnext");

const paragram = new URLSearchParams(location.search);
const detail = paragram.get("detail");
console.log(detail);
let danhSach;
if (detail <= 6) {
  danhSach = JSON.parse(localStorage.getItem("albums"));
} else if (detail > 6 && detail <= 12) {
  danhSach = JSON.parse(localStorage.getItem("artists"));
}

console.log(danhSach);
let find = danhSach.find((i) => {
  return i.id == detail;
});
console.log(find);
let albums_detail_list = JSON.parse(localStorage.getItem("albums-detail"));
let find_albums = albums_detail_list.filter((i) => {
  return i.idparent == detail;
});

document.querySelector(".Music-play img").src = find.src;
document.querySelector(".play-song img").src = find_albums[0].image;
document.querySelector(".Music-play h2").innerHTML = find.name;
document.querySelector(".play-song h5").innerHTML = find_albums[0].name;

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
      document.querySelector(".Music-play .describe").innerHTML = `${
        find.artist
      } . 2023. ${find_albums.length} songs, ${formatTime2(totalDuration)} `;
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
let likeAlbums = JSON.parse(localStorage.getItem("likeAlbums")) ?? [];
document
  .querySelector(".playlist-button .like-btn")
  .addEventListener("click", () => {
    if (likeAlbums.includes(detail)) {
      likeAlbums = likeAlbums.filter((i) => {
        return i != detail;
      });
    } else {
      likeAlbums.push(detail);
    }
    localStorage.setItem("likeAlbums", JSON.stringify(likeAlbums));
    location.reload();
  });

let liked = JSON.parse(localStorage.getItem("likeAlbums"));
console.log(likeAlbums);
console.log(liked);
console.log(danhSach);
let likedList = danhSach.filter((i) => {
  return liked.some((e) => {
    return e == i.id;
  });
});
console.log(likedList);

const doduLieu2 = () => {
  let html = "";
  html = likedList.map((i, e) => {
    return ` <a href="index4.html?detail=${i.id}" class="liked-item">
    <span>${e + 1}</span>
    <p>${i.name}. Album</p>
    <i class="fa-regular fa-heart"></i>
  </a>`;
  });
  document.querySelector(".liked-albums").innerHTML = html.join("");
  console.log(html);
};

doduLieu2();

//-------------------------------------------------------------------------------------------------
let likedSongs = JSON.parse(localStorage.getItem("likedSongs")) ?? [];
Array.from(document.querySelectorAll(".songItem .like-btn")).forEach((e, m) => {
  e.addEventListener("click", () => {
    let index = m; // Khai báo index trong phạm vi của hàm này
    console.log(index);
    find_albums.forEach((e, i) => {
      if (index == i) {
        if (likedSongs.includes(find_albums[i].id)) {
          likedSongs = likedSongs.filter((id) => id != find_albums[i].id);
        } else {
          likedSongs.push(find_albums[i].id);
        }
        localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
        // location.reload();
      }
    });
  });
});

let liked2 = JSON.parse(localStorage.getItem("likedSongs"));
console.log(liked2);
console.log(danhSach);
let likedSongList = albums_detail_list.filter((i) => {
  return liked2.some((e) => {
    return e == i.id;
  });
});
let uniqueArray = likedSongList.filter((item, index, self) => {
  return (
    index === self.findIndex((t) => t.id === item.id || t.name === item.name)
  );
});
console.log(uniqueArray);
console.log(likedSongList);
