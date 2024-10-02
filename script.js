const columns = document.querySelectorAll(".column__cards");
const cards = document.querySelectorAll(".card")

let draggedCard;

const dragStart = (event) =>{
    draggedCard = event.target;
    console.log(draggedCard);
    event.dataTransfer.effectAllowed = 'move';
}
    const dragOver = (event) =>{
        event.preventDefault()
    }

    const dragEnter = ({target}) =>{
        if(target.classList.contains("column__cards")){
            target.classList.add("column__highlight")
        }
    }

    const dragLeave = ({target}) =>{
        target.classList.remove("column_highlight")
    }

    const drop = ({target}) =>{
        if( target.classList.contains("column__cards")){
            target.classList.remove("column_highlight")
            target.append(draggedCard)
        }
    }

    const createCard = ({target}) =>{
        if(!target.classList.contains("column__cards")) return;
        const card= document.createElement("section")

        card.className = "card";
        card.draggable= "true";
        card.contentEditable = "true";

        card.addEventListener("focusout",()=>{
            card.contentEditable= "false";
            if(!card.textContent) card.remove();
        })

        card.addEventListener("dragstart", dragStart);
        target.append(card);
        card.focus();

    }

    cards.forEach((card)=> {
        card.addEventListener("dragstart", dragStart);
    });

    columns.forEach((columns) =>{
    
        columns.addEventListener("dragover", dragOver)
        columns.addEventListener("dragenter", dragEnter)
        columns.addEventListener("dragleave", dragLeave)
        columns.addEventListener("drop", drop )
        columns.addEventListener("dblclick",createCard)
    });