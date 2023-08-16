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

    fetch("http://noteday.com/php/autorisationBackend.php",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(sendData)
        }
    ).then(
       response=>response.json()

    ).then(
        commits =>{
            let answer = commits;
            if(answer.length!=0){
                document.cookie = "login=" + encodeURIComponent(answer.login);
                document.cookie = "password="+encodeURIComponent(answer.password);
                document.cookie = "id="+encodeURIComponent(String(answer.id));
                window.location.href = "html/general.html";
            }
                
        }
    );

}


