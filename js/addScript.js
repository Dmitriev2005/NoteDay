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

    setTimeout(()=>{el.style.display = "none"},3000);
}
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
document.querySelector(".btn").onclick = () =>{
   
    const date = (d = new Date(document.getElementById("date").value))>=new Date()?d:myGlobal.messageRespose("Дата не должна быть прошедшей!",true);
    const time = document.getElementById("time").value;
    const addEvent = new Object();

    addEvent.date = convertDate(date,time);
    addEvent.title = document.getElementById("filedTitle").value;
    addEvent.description = document.getElementById("fieldDescription").value;
    addEvent.user = getCookie("id");
    if(addEvent.date!=""&&addEvent.title!=""&&addEvent.description!="")  
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
                    myGlobal.messageRespose("Запись добавлена!",false);
                    setTimeout(function(){location.reload()},3000);
                }
                else{
                    myGlobal.messageRespose("Ошибка!",true);
                    setTimeout(function(){location.reload()},3000);
                }
            }
        )
    else
        messageRespose("Есть пустые поля!",true);
    
}