const btnRegistration = document.querySelector(".btnRegistration");
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
const initialisationData = () =>{
    const autorisData = new Object();
    autorisData.login = document.querySelector(".login").value;
    autorisData.password = document.querySelector(".password").value;
    return autorisData;
};
btnRegistration.onclick = () =>{
    const sendData = initialisationData();
    
    if(sendData.password!=""&&sendData.password!="")
        if(document.querySelector(".respeatPassword").value===sendData.password){
            fetch("http://noteday.com/php/registrationBackend.php",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(sendData)
            }
            ).then(
                response => response.text()
            ).then(
                commits => {
                    let responseServer = commits;
                    if(responseServer==="true")
                    messageRespose("Вы зарегистрированны!",false);
                    else if(responseServer==="This dublicate user!")
                        messageRespose("Такой польвзователь уже есть!",true);
                }
            )
        }
        else
            messageRespose("Пароли не совпадают!",true)
    else
        messageRespose("Есть пустые поля!",true);
    

   
}