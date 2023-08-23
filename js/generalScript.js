const userCurrent = document.querySelector(".userCurrent");
const userCurrentLogin = getCookie("login");
userCurrent.innerHTML += "<div style='color:blue; display:inline-block'>"+userCurrentLogin+"<div/>";