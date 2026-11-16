import sketches from '../data/sketches.json' with {type: 'json'};
import p5 from 'https://esm.sh/p5@2.3.4?bundle';
import {sketch as strangersSketch} from './p5js-sketches/strangers/sketch.js';
import {sketch as marsSketch} from './p5js-sketches/mars/sketch.js';
import {sketch as flocksSketch} from './p5js-sketches/flocks/sketch.js';

let currentPopup; 
let sketch;
let sketchMounted = false;

function createPortfolioGrid (dataset) {
    
    let gridContainer = document.querySelector(".scrolly-grid")

    let cards = new DocumentFragment();
    dataset.map(item => {

        // Preview 
        let previewContainer = document.createElement("div");
        previewContainer.classList.add("preview-image", "embedded-work");
        previewContainer.setAttribute("role", "button");
        previewContainer.addEventListener("click", event => showPopup(event, item));

        let preview = document.createElement("img")
        preview.setAttribute("src", `../assets/sketch-previews/${item.id}.gif`);

        previewContainer.append(preview);

        // Title
        let titleContainer = document.createElement("div");
        titleContainer.classList.add("card-title");

        let title = document.createElement("h3");
        title.textContent = item.title; 

        titleContainer.append(title);

        // Description
        let summaryContainer = document.createElement("div");
        summaryContainer.classList.add("card-description");

        let summary = document.createElement("p");
        summary.textContent = item.summary; 

        summaryContainer.append(summary);

        let newCard = document.createElement("div");
        newCard.classList.add("scrolly-card");

        newCard.append(previewContainer, titleContainer, summaryContainer);     
        cards.append(newCard);
    });

    let popup = document.createElement("dialog");
    popup.id = "pixelPopup";
    popup.classList.add("popup");
    popup.setAttribute("closedby", "any");
    popup.addEventListener("close", (event) => {
        // console.log("mee!");
        event.currentTarget.replaceChildren();
    });
    // console.log(popup);

    gridContainer.append(cards, popup);
    
}

function showPopup(event, gridItem) {

    let mat = document.createElement("div");
    mat.id = "popup-mat";

    let border = document.createElement("div");
    border.id = "popup-border";

    let art = document.createElement("div");
    art.id = "popup-art";

    mat.append(border);
    border.append(art);

    let descriptionContainer = document.createElement("div");
    descriptionContainer.id = "popup-description";

    let title = document.createElement("h3");
    title.textContent = `${gridItem.title},`; 

    let date = document.createElement("span");
    date.classList.add("date");
    date.textContent = ` ${gridItem.date}`;

    let materials = document.createElement("p");
    materials.classList.add("materials");
    materials.textContent = gridItem.materials;

    let description = document.createElement("p");
    description.classList.add("description");
    description.textContent = gridItem.description;

    descriptionContainer.append(title,date,materials,description);

    let content = document.createElement("div");
    content.id = "popup-content";
    content.append(mat, descriptionContainer);

    let popup = document.getElementById("pixelPopup")
    popup.append(content);

    console.log(popup);
    currentPopup = gridItem.id; 
    popup.showModal();

}

const observer = new MutationObserver((mutationList, observer) => {
    for (const mutation of mutationList) {
        let artContainer = document.getElementById("popup-art");
        if (mutation.attributeName == "open") {
            if(!sketchMounted){
                switch (currentPopup) {
                    case "strangers":
                        sketch = new p5(strangersSketch, artContainer);
                        break;
                    case "mars":
                        sketch = new p5(marsSketch, artContainer);
                        break;
                    case "flocks":
                        sketch = new p5(flocksSketch, artContainer);
                        break;
                }
                console.log("cowa");
                sketchMounted = true;
            }
            else {
                artContainer.replaceChildren();
                sketch.remove();
                sketch = null;
                console.log("bunga!");
                sketchMounted = false;
            }

        }

    }
})

createPortfolioGrid(sketches);
observer.observe(document.getElementById("pixelPopup"), { attributes: true});