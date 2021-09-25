import "../scss/style.scss";
import recettes from "../../recette.json"

const Recettes = document.getElementById('les_recettes');

const tagBloc = document.getElementById('tag-bloc');

const tagIngredientsSelected = [];
const tagAppareilSelected = [];
const tagUstensilSelected = [];

let resultBanner = [];
let resultTag = [];

let exportData = [];

let listeIngredient = [];
let listeUstensils = [];
let listAppareil = [];

let dropdownIngredient = document.getElementById("list-ingredient");
let dropdownUstensils = document.getElementById("list-ustensils");
let dropdownAppareils = document.getElementById("list-appareil");

let allIncluded = [];

for (const recette of recettes) {
    let list = [];
    
    for (const ingredient of recette.ingredients) {
        list.push(ingredient.ingredient.toLocaleLowerCase())
    }
    list.push(recette.appliance.toLocaleLowerCase())
    for (const ustensil of recette.ustensils) {
        list.push(ustensil.toLocaleLowerCase());
    }
    list.push(recette.name.toLocaleLowerCase());
    allIncluded.push(list);
}

console.log(allIncluded)

// creation de chaque bloc recette
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
            let listeIngredientElement = document.createElement("p");

            blocRecette.append(listeIngredientElement);

            listeIngredientElement.innerHTML = ingredient.ingredient + ( ingredient.quantity ? ": " + ingredient.quantity + " "+( ingredient.unit ? ingredient.unit : "" ) : "");
        })
    });
}

affichageRecette(recettes)

// declenche la fonction searchBanner a partir de 3 lettres
const searchBannerElement = document.getElementById("searchBanner");
searchBannerElement.addEventListener('keyup', (e) => {
    console.log(resultTag);
    if(searchBannerElement.value.length >= 3) {
        const recettesFilter = resultTag.length > 0 ? resultTag : allIncluded;
        searchBanner(document.getElementById("searchBanner").value, recettesFilter);
    }else if(searchBannerElement.value.length < 3) {
        if (exportData.length > 0) {
            exportData.forEach(data => {
                affichageRecette(data);
                dropdownRecette(data);
            })
        }else {
            affichageRecette(recettes);
            dropdownRecette(recettes);
        }
        resultBanner = [];
    }
})

// permet d'ajouter les elements si il ne sont pas deja dans le dropdown
function dropdownRecette(recettes) {
    // réinitialisation des tableaux
    listeIngredient = [];
    listeUstensils = [];
    listAppareil = [];
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
})

document.querySelector(".search-appareil").addEventListener('keyup', (e) => {
    searchDropdown(document.querySelector(".search-appareil").value, "appareil");
})

document.querySelector(".search-ustensils").addEventListener('keyup', (e) => {
    searchDropdown(document.querySelector(".search-ustensils").value, "ustensils");
})

// actualise le dropdown en fonction de la valeur de l'input de recherche du dropdown
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

    if(type === "appareil") {
        document.getElementById("list-appareil").innerHTML = "";
        for (const appareil of listAppareil) {
            if(appareil.toLowerCase().includes(value.toLowerCase())) {
                result.push(appareil);
            }
        }
        dropdown(result, dropdownAppareils);
    }

    if(type === "ustensils") {
        document.getElementById("list-ustensils").innerHTML = "";
        for (const ustensils of listeUstensils) {
            if(ustensils.toLowerCase().includes(value.toLowerCase())) {
                result.push(ustensils);
            }
        }
        dropdown(result, dropdownUstensils);
    }
}

// permet de verifier si la valeur est egal a une des recettes
function searchBanner(value, recettesTag) {
    console.log(recettesTag)
    let result = [];
    for (let i = 0; i < recettesTag.length; i++) {
        if (recettesTag[i].find(s => s.includes(value.toLowerCase()))) {
            result.push(recettes[i])
        }
    }
    resultBanner = result;
    affichageRecette(result);
    dropdownRecette(result);
}

// creation de la liste pour chaque dropdown et au clic sur un li la valeur est ajouté dans un tableau sauf si elle y est deja pour ensuite apl la fonction pour créer les tags avec la valeur presente dans ce tableau
function dropdown(list, dropdown) {
    dropdown.innerHTML = "";
    let ul;
    for(let i = 0; i < list.length; i++) {
        if(i%3 === 0) {
            ul = document.createElement("ul");
            dropdown.appendChild(ul);
        }
        const li = document.createElement("li");
        
        li.innerHTML = list[i].toLowerCase();
        ul.appendChild(li);
        li.addEventListener("click", (e) => {
            const value = e.target.innerHTML;
            if(dropdown.id === "list-ingredient") {
                if(!tagIngredientsSelected.includes(value)) {
                    tagIngredientsSelected.push(value);
                    tagIngredients(value);
                }
            }
            if(dropdown.id === "list-appareil") {
                if(!tagAppareilSelected.includes(value)) {
                    tagAppareilSelected.push(value);
                    tagAppareil(value)
                }
            }

            if(dropdown.id === "list-ustensils") {
                if(!tagUstensilSelected.includes(value)) {
                    tagUstensilSelected.push(value);
                    tagUstensils(value)
                }
            }

            refreshTag()
        })
    }
}

// creation des tags par couleur selon le dropdown
function tagIngredients(value) {
    const bloc = document.createElement("div");
    const tag = document.createElement("p");
    const close = document.createElement("i");

    tagBloc.append(bloc);
    bloc.append(tag);
    bloc.append(close);

    tag.innerHTML = value;
    close.classList.add("far", "fa-times-circle");
    bloc.setAttribute("class", "bloc-tag ingredient");

    close.addEventListener("click", () => {
        bloc.setAttribute("class", "d-none");
        let position = tagIngredientsSelected.indexOf(value);
        tagIngredientsSelected.splice(position)
        refreshTag()
    })
}

function tagAppareil(value) {
    const bloc = document.createElement("div");
    const tag = document.createElement("p");
    const close = document.createElement("i");

    tagBloc.append(bloc);
    bloc.append(tag);
    bloc.append(close);

    tag.innerHTML = value;
    close.classList.add("far", "fa-times-circle");
    bloc.setAttribute("class", "bloc-tag appareil");

    close.addEventListener("click", () => {
        bloc.setAttribute("class", "d-none");
        let position = tagAppareilSelected.indexOf(value);
        tagAppareilSelected.splice(position)
        refreshTag()
    })
}

function tagUstensils(value) {
    const bloc = document.createElement("div");
    const tag = document.createElement("p");
    const close = document.createElement("i");

    tagBloc.append(bloc);
    bloc.append(tag);
    bloc.append(close);

    tag.innerHTML = value;
    close.classList.add("far", "fa-times-circle");
    bloc.setAttribute("class", "bloc-tag ustensil");

    close.addEventListener("click", () => {
        bloc.setAttribute("class", "d-none");
        let position = tagUstensilSelected.indexOf(value);
        tagUstensilSelected.splice(position)
        refreshTag()
    })
}

// permet d'actualiser les recettes et le contenu des dropdowns selon les tags selectioné
function refreshTag() {
    const data = [];
    const recetteFilter = resultBanner.length > 0 ? resultBanner : recettes;
    for (let j = 0; j < recetteFilter.length; j++) {
        let tagInclude = true;
        tagIngredientsSelected.forEach(tag => {
            const recetteIngredients = []
            recetteFilter[j].ingredients.forEach(ingredient => {
                recetteIngredients.push(ingredient.ingredient.toLowerCase());
            })
            if(!recetteIngredients.includes(tag)) {
                tagInclude = false;
            }
        })
        tagUstensilSelected.forEach(tag => {
            const recetteUstensils = []
            recetteFilter[j].ustensils.forEach(ustensils => {
                recetteUstensils.push(ustensils.toLowerCase());
            })
            if(!recetteUstensils.includes(tag)) {
                tagInclude = false;
            }
        })
        tagAppareilSelected.forEach(tag => {
            if(recetteFilter[j].appliance.toLowerCase() !== tag) {
                tagInclude = false;
            }
        })
        
        if(tagInclude) {
            data.push(recetteFilter[j]);
        }
    }
    if (tagIngredientsSelected.length === 0 && tagUstensilSelected.length === 0 && tagAppareilSelected.length === 0) {
        resultTag = [];
    }else {
        let recetteFilterTag = [];
        if (resultTag) {
            resultTag = [];
        }
        for (const donnee of data) {
            recetteFilterTag.push(donnee.name.toLocaleLowerCase());
            recetteFilterTag.push(donnee.appliance.toLocaleLowerCase());
            for (const ingredient of donnee.ingredients) {
                recetteFilterTag.push(ingredient.ingredient.toLocaleLowerCase())
            }
            for (const ustensil of donnee.ustensils) {
                recetteFilterTag.push(ustensil.toLocaleLowerCase());
            }
        }
        resultTag.push(recetteFilterTag)
    }
    affichageRecette(data)
    dropdownRecette(data);
    exportData.push(data)
}