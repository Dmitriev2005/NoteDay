fetch(
    "/php/loadEvent.php"
    
).then(
    response=>response.json()
).then(
    commits=>{
        const container = document.querySelector(".note-container");
        commits.forEach(element => {
            container.innerHTML+=`<div class="item"> <div class="event"><div class="note-date">${element.date_event}</div><div class="note-title">${element.name_event}</div><div class="note-content">${element.description_event}</div></div><br><input type="button" value="Редактировать" class="btn-edit"><input type="button" value="Удалить" class="btn-delete"></div><br>`;

        });
        
    }
);