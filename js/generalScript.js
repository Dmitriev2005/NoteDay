function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
document.addEventListener("DOMContentLoaded",function(){
  const userCurrent = document.querySelector(".userCurrent");
  const userCurrentLogin = getCookie("login");
  userCurrent.innerHTML += "<div style='color:blue; display:inline-block'>"+userCurrentLogin+"<div/>";

  const btnNewNote = document.querySelector(".newNote");
  btnNewNote.onclick = () => window.location.href = "addOrEdit.html";
});

