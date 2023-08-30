function deleteAllCookie(){
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}
const userCurrent = document.querySelector(".userCurrent");
const userCurrentLogin = getCookie("login");
userCurrent.innerHTML += "<div style='color:blue; display:inline-block'>"+userCurrentLogin+"<div/>";

document.querySelector(".userChange").onclick = ()=>{
    location.href = "/index.html";
    deleteAllCookie();
}