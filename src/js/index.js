import "../scss/style.scss";
import recettes from "../../recette.json"

const Recettes = document.getElementById('les_recettes');

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
    document.querySelectorAll(".dropdown-content").innerHTML = "";
    let listeIngredient = [];
    let listeUstensils = [];
    let listAppareil = [];
    let dropdownIngredient = document.getElementById("list-ingredient");
    let dropdownUstensils = document.getElementById("list-ustensils");
    let dropdownAppareils = document.getElementById("list-appareil");
    recettes.forEach(recette => {
        recette.ingredients.forEach(ingredient => {
            if(!listeIngredient.includes(ingredient.ingredient)) {
                listeIngredient.push(ingredient.ingredient);
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

// document.querySelector(".search-ingredient").addEventListener('keyup', (e) => {
//     searchDropdown(document.querySelector(".search").value, recettes);
// })

// function searchDropdown(value, recettes) {
//     const result = recettes.forEach(recette => {
//         recette.ingredients.forEach(ingredient => {
//             console.log(ingredient)
//             ingredient.filter(ingredient => console.log(ingredient.ingredient.toLowerCase().includes(value.toLowerCase())))})
//     })

//     // console.log(result)
//     // dropdownRecette(result)
// }


document.getElementById("searchBanner").addEventListener('keyup', (e) => {
    searchBanner(document.getElementById("searchBanner").value, recettes);
})

function searchBanner(value, recettes) {
    const result = recettes.filter(recette => recette.name.toLowerCase().includes(value.toLowerCase()))

    console.log(result)
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

