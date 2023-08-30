const btnAutoris = document.querySelector(".btnAutoris");
const btnRegistration = document.querySelector(".btnRegistration");
const initialisationData = () =>{
    const autorisData = new Object();
    autorisData.login = document.querySelector(".login").value;
    autorisData.password = document.querySelector(".password").value;
    return autorisData;
};
btnRegistration.onclick = () =>{
    window.location.href = "html/registration.html";
}
btnAutoris.onclick = () =>{
    const sendData = initialisationData();

    fetch("/php/autorisationBackend.php",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(sendData)
        }
    ).then(
       response=>response.ok?response.json():()=>{
            messageRespose("Такого пользователя нет!",true);
            setTimeout(()=>location.reload,3000);
        }

    ).then(
        commits =>{
            let answer = commits;
            if(answer.length!=0){
                document.cookie = "login=" + encodeURIComponent(answer.login);
                document.cookie = "password="+encodeURIComponent(answer.password);
                document.cookie = "id="+encodeURIComponent(String(answer.id));
                window.location.href = "html/general.html";
            }
            else{
                messageRespose("Такого пользователя нет!",true);
                setTimeout(()=>location.reload,3000);
            }
                
        }
    );

}


