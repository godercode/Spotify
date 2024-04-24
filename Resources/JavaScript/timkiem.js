let search_song = document.getElementById("search-text");
let search_btn = document.getElementById("search-btn");
let search_box = document.getElementById("search-box");
const albums_detail = JSON.parse(localStorage.getItem("albums-detail"));
console.log(albums_detail);
search_box.addEventListener("submit", (e) => {
  e.preventDefault();
  location.href = "index2.html?name=" + search_song.value;
});
const paragram = new URLSearchParams(location.search);
const name = paragram.get("name");
console.log(name);
let search_song_list = albums_detail.filter((i) => {
  const nameUpper = name.toUpperCase();
  return i.name.toUpperCase().includes(nameUpper);
});
console.log(search_song_list);
let uniqueArray = search_song_list.filter((item, index, self) => {
  return (
    index === self.findIndex((t) => t.id === item.id || t.name === item.name)
  );
});
const doduLieu3 = () => {
  let html = "";
  html = uniqueArray.map((i, e) => {
    return `<li class="item">
      <img src="${i.image}" alt="${i.name}">
      <h2>${i.name}</h2>
      <p>${i.artist}</p>
    </li>`;
  });
  document.querySelector(".spotify ").innerHTML = html.join("");
  console.log(html);
};

doduLieu3();
