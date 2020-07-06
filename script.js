//Selecting & Creating elements

const main = document.querySelector(".main")
const lists = document.querySelectorAll(".list");
const items = document.querySelectorAll(".item");
const backDiv = document.createElement("div");
let dragged = null

// Creating my popover

const popOver = () => {
    backDiv.id = "bg-overlay"
    main.appendChild(backDiv)

}

//Creating the drag&drop and click events on items and lists

//On the items

for (let i = 0; i <items.length; i++) {
    let item = items[i]

    //Click event to open the popover

    item.onclick = () => {
        popOver();
    }

    item.ondragstart = () => {
        dragged = item
        content = item.innerHTML
        parent = item.parentNode
        setTimeout(()=> {
            item.style.backgroundColor = "rgba(0,0,0,0)";
            item.innerHTML = ""
            
        },0)
    }
    item.ondragend = () => {
        setTimeout( () => {
            item.style.display = "block";
            item.style.backgroundColor = "gainsboro"
            item.innerHTML = content
            dragged = null;

        },0)
    }

    item.ondragover = (e) => {
        e.preventDefault()
        let bounding = item.getBoundingClientRect();
        let coord = bounding.y + (bounding.height*0.5)
        if (e.clientY - coord > 0) {
            item.parentNode.insertBefore(dragged, item.nextSibling);
        } else {
            item.parentNode.insertBefore(dragged, item);
        }
    }

    item.ondrop = () => {
        item.parentNode.insertBefore(dragged, item.nextSibling);
        item.style.borderBottom = "none";
        if (e.clientY - coord > 0) {
            item.parentNode.insertBefore(dragged, item.nextSibling);
        } else {
            item.parentNode.insertBefore(dragged, item);
        }
    }

}

//On the lists

for (let j = 0; j<lists.length; j++) {
    let list = lists[j]
    list.ondragover = (e) => {
        e.preventDefault()
        list.style.backgroundColor = "rgba(0,0,0,0.2)";
    };
    list.ondrop = (e) => {
        
        if (list.childElementCount == 0) {  
            list.append(dragged);
            list.style.backgroundColor = "rgba(0,0,0,0.1)";
        } else {
            listBottom = list.lastElementChild.getBoundingClientRect()
            if (e.clientY - listBottom.y > 0) {
                list.append(dragged);
                list.style.backgroundColor = "rgba(0,0,0,0.1)";
            }
        }
    }
    list.ondragleave = () => {
        list.style.backgroundColor = "rgba(0,0,0,0.1)";
    }
}

//Creating the click events on the background Div

backDiv.onclick = () => {
    backDiv.remove()
}



