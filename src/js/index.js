import "../scss/style.scss";
import recettes from "../../recette.json"

const Recettes = document.getElementById('les_recettes');

let listeIngredient = [];
let listeUstensils = [];
let listAppareil = [];

let dropdownIngredient = document.getElementById("list-ingredient");
let dropdownUstensils = document.getElementById("list-ustensils");
let dropdownAppareils = document.getElementById("list-appareil");

function affichageRecette(recettes) {
    document.getElementById("les_recettes").innerHTML = "";
    recettes.forEach(recette => {
        let blocrecette = document.createElement("div");
        let recetteInfo = document.createElement("div");
        let recetteImg = document.createElement("div");
        let header = document.createElement("div");
        let recetteName = document.createElement("p");
        let bloctime = document.createElement("div");
        let description = document.createElement("p");
        let blocInfo = document.createElement("div");
        let blocRecette = document.createElement("div");
        let logo = document.createElement("i");
        let min = document.createElement("p");
        let time = document.createElement("p")

        Recettes.append(blocrecette);
        blocrecette.append(recetteImg);
        blocrecette.append(recetteInfo);
        recetteInfo.append(header);
        header.append(recetteName);
        header.append(logo);
        header.append(bloctime);
        bloctime.append(time);
        bloctime.append(logo);
        recetteInfo.append(blocInfo);
        blocInfo.append(description);
        blocInfo.append(blocRecette);

        blocrecette.setAttribute("class", "blocrecette");
        recetteInfo.setAttribute("class", "recetteInfo");
        recetteImg.setAttribute("class", "recetteImg");
        recetteName.setAttribute("class", "recetteName");
        header.setAttribute("class", "header");
        bloctime.setAttribute("class", "time");
        description.setAttribute("class", "description");
        blocRecette.setAttribute("class", "blocRecette");
        blocInfo.setAttribute("class", "blocInfo");
        logo.classList.add("far", "fa-clock");

        recetteName.innerHTML = recette.name;
        description.innerHTML = recette.description;
        time.innerHTML = recette.time + " min";
    
        recette.ingredients.forEach(ingredient => {
            let listeIngredient = document.createElement("p");

            blocRecette.append(listeIngredient);

            listeIngredient.innerHTML = ingredient.ingredient + ( ingredient.quantity ? ": " + ingredient.quantity + " "+( ingredient.unit ? ingredient.unit : "" ) : "");
        })
    });
}

affichageRecette(recettes)

function dropdownRecette(recettes) {
    recettes.forEach(recette => {
        recette.ingredients.forEach(ingredient => {
            if(!listeIngredient.includes(ingredient.ingredient.toLowerCase())) {
                listeIngredient.push(ingredient.ingredient.toLowerCase());
            }
        })
        recette.ustensils.forEach(ustensil => {
            if(!listeUstensils.includes(ustensil)) {
                listeUstensils.push(ustensil);
            }
        })
        if(!listAppareil.includes(recette.appliance)) {
            listAppareil.push(recette.appliance);
        }
    })
    dropdown(listeIngredient, dropdownIngredient);
    dropdown(listeUstensils, dropdownUstensils);
    dropdown(listAppareil, dropdownAppareils);
}

dropdownRecette(recettes)

document.querySelector(".search-ingredient").addEventListener('keyup', (e) => {
    searchDropdown(document.querySelector(".search-ingredient").value, "ingredient");
    console.log(document.querySelector(".search-ingredient").value)
})

function searchDropdown(value, type) {
    const result = [];
    if(type === "ingredient") {
        document.getElementById("list-ingredient").innerHTML = "";
        for (const ingredient of listeIngredient) {
            if(ingredient.toLowerCase().includes(value.toLowerCase())) {
                result.push(ingredient);
            }
        }
        dropdown(result, dropdownIngredient);
    }

    // console.log(result)
    // dropdownRecette(result)
}

const searchBannerElement = document.getElementById("searchBanner");

searchBannerElement.addEventListener('keyup', (e) => {
    if(searchBannerElement.value.length >= 3) {
        searchBanner(document.getElementById("searchBanner").value, recettes);
    }else if(searchBannerElement.value.length < 3) {
        affichageRecette(recettes)
    }
})

console.log(recettes);

function searchBanner(value, recettes) {
    // let result = recettes.filter(recette => recette.name.toLowerCase().includes(value.toLowerCase()))
    let result = [];
    for (const recette of recettes) {
        if(recette.name.toLowerCase().includes(value.toLowerCase())) {
            result.push(recette);
        }
        if(recette.appliance.toLowerCase().includes(value.toLowerCase())) {
            result.push(recette);
        }
        for (const ingredient of recette.ingredients) {
            if(ingredient.ingredient.toLowerCase().includes(value.toLowerCase())) {
                result.push(recette);
            }
        }
    
        for (const ustensil of recette.ustensils) {
            if(ustensil.toLowerCase().includes(value.toLowerCase())) {
                result.push(recette);
            }
        }
    }

    affichageRecette(result)
}


function dropdown(list, dropdown) {
    let ul;
    for(let i = 0; i < list.length; i++) {
        if(i%3 === 0) {
            ul = document.createElement("ul");
            dropdown.appendChild(ul);
        }
        const li = document.createElement("li");
        
        li.innerHTML = list[i];
        ul.appendChild(li);
    }
}

