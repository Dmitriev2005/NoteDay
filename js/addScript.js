function convertDate(date,time){
    const day = String(date.getDate()).padStart(2,'0');
    const month = String(date.getMonth()+1).padStart(2,'0');
    const year = date.getFullYear();

    return `${year}-${month}-${day} ${time}:00`;
}
function messageRespose(message, isError){
    const el = document.querySelector(".responseSuccessfully");
    if(isError){
        el.style.backgroundColor = "#ed4a54";
        el.style.border = "2px solid #c2303a";
    }
    else{
        el.style.backgroundColor = "#36f790";
        el.style.border = "2px solid #0cc261";
    }
    el.innerHTML = message;
    el.style.display = "block";
}
function destroyMessage(){
    const el = document.querySelector(".responseSuccessfully");
    el.style.display = "none";
}
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

document.querySelector(".btn").onclick = () =>{
   
    const date = new Date(document.getElementById("date").value);
    const time = document.getElementById("time").value;
    const addEvent = new Object();

    addEvent.date = convertDate(date,time);
    addEvent.title = document.getElementById("filedTitle").value;
    addEvent.description = document.getElementById("fieldDescription").value;
    addEvent.user = getCookie("id");
    
    console.log(addEvent.date);
        fetch(
            "/php/addEvent.php",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(addEvent)
            }
        ).then(
            response => response.text()
        ).then(
            commits => {
                if(commits==="true"){
                    const container = document.querySelector(".note-container");
                    container.innerHTML+=`<div class="item"> <div class="event"><div class="note-date">${addEvent.date}</div><div class="note-title">${addEvent.title}</div><div class="note-content">${addEvent.description}</div></div><br><input type="button" value="Редактировать" class="btn-edit"><input type="button" value="Удалить" class="btn-delete"></div><br>`;
                }
                else{
                    messageRespose("Ошибка!",true);
                    setTimeout(function(){location.reload()},3000);
                }
            }
        )
    
}