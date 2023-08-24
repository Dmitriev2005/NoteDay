fetch(
    "/php/loadEvent.php"
    
).then(
    response=>response.json()
).then(
    commits=>{
        const container = document.querySelector(".note-container");
        commits.forEach(element => {
               
            const item = document.createElement("div");
            item.classList = "item";

            const event = document.createElement("div");
            event.classList = "event";

            const noteId = document.createElement("div");
            noteId.classList = "note-id";
            
            const noteDate = document.createElement("div");
            noteDate.textContent = element.date_event;
            noteDate.classList = "note-date";

            const noteTitle = document.createElement("div");
            noteTitle.textContent = element.name_event;
            noteTitle.classList = "note-title"

            const noteContent = document.createElement("div");
            noteContent.textContent = element.description_event;
            noteContent.classList = "note-content";

            const btnEdit = document.createElement("input");
            
            btnEdit.type = "button";
            btnEdit.value = "Редактировать";
            btnEdit.classList = "btn-edit";
            btnEdit.addEventListener("click",function(){
                const date = document.querySelector("#date");
                const time = document.querySelector("#time");
                const title = document.querySelector("#filedTitle");
                const description = document.querySelector("#fieldDescription");

                date.value = element.date_event.match(/\d\d\d\d-\d\d-\d\d/);
                time.value = element.date_event.match(/\d\d:\d\d:\d\d/);
                title.value = element.name_event; 
                description.textContent = element.description_event;

                const btnOk = document.querySelector(".btn");
                btnOk.style.backgroundColor = "#e6e85d";
                btnOk.value = "Сохранить изменения";
                if(document.querySelector(".btnCancel")==null){
                    const btnCancel = document.createElement("input");
                    btnCancel.classList = "btnCancel";
                    btnCancel.type = "button";
                    btnCancel.value = "Отменить";
                    btnCancel.style.backgroundColor = "#c91010";
                
                    btnOk.parentElement.appendChild(btnCancel);

                    btnCancel.onclick = () =>{
                        location.reload();
                    }
                }
                

                btnOk.onclick = () =>{
                   element.date_event = date.value+" "+time.value;
                   element.name_event = title.value;
                   element.description_event = description.value;
                    fetch(
                        "/php/editEvent.php",
                        {
                            method:"POST",
                            headers:{
                                "Content-Type":"application/json"
                            },
                            body:JSON.stringify(element)
                        }
                    ).then(
                        response =>{
                            if(response.ok){
                                messageRespose("Запись отредактирована!",false);
                                setTimeout(()=>location.reload(),3000);
                            }
                            else{
                                messageRespose("Ошибка редактирования!",true);
                                setTimeout(()=>location.reload(),3000);
                            }

                        }
                    )
                }

            });

            const btnDelete = document.createElement("input");
            btnDelete.type = "button"
            btnDelete.value = "Удалить";
            btnDelete.classList = "btn-delete";
            btnDelete.addEventListener("click",function(){
                fetch(
                    "/php/deleteEvent.php",{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify(element)
                    }
                ).then(
                    response=>{
                        if(response.ok){
                            messageRespose("Запись удалена!",false);
                            setTimeout(()=>location.reload(),3000);
                        }
                        else{
                            messageRespose("Ошибка!",true);
                            setTimeout(()=>location.reload(),3000);
                        }
                            
                    }
                )
            });
            event.appendChild(noteId);
            event.appendChild(noteDate);
            event.appendChild(noteTitle);
            event.appendChild(noteContent);

            item.appendChild(event);
            item.appendChild(btnEdit);
            item.appendChild(btnDelete);

            
            container.appendChild(item);
        });
        
    }
);