import { baseVehiculesDisponibles } from "./base-vehicules-disponibles.js";

// Au demarrage, tri par ordre croissant de prix

let sortOrder = 0;  // 0 -> Tri croissant
// 1 -> Tri decroissant

let sortAvailCars = baseVehiculesDisponibles;
sortAvailCars.sort((a, b) => (a.prix - b.prix));

/* Elements du DOM */

const articlesContainer = document.getElementById('articles-container');
const nombreResultats = document.getElementById('nombre-resultats');

/*
 * Mise a jour de l'affichage des vehicules disponibles
 */
function updateAvailableCars() {
    nombreResultats.innerText = baseVehiculesDisponibles.length.toString();

    articlesContainer.innerText = '';

    baseVehiculesDisponibles.forEach((vehicule) => {
        const article = document.createElement('article');

        /*
         * Creation de la zone d'affichage du vehicule
         */

        const photosVehicule = document.createElement('div');
        photosVehicule.classList.add('photos-vehicule')

        /* Creation de la fleche de gauche */
        const div1 = document.createElement('div');
        div1.classList.add('prev');
        const img1 = document.createElement('img');
        img1.src = "./assets/icon/arrow_left.svg";
        div1.append(img1);
        photosVehicule.append(div1);

        /* Creation de l'image du vehicule */
        const div2 = document.createElement('div');
        const img2 = document.createElement('img');
        img2.src = vehicule.urls[0];
        div2.append(img2);
        photosVehicule.append(div2);

        /* Creation de la fleche de droite */
        const div3 = document.createElement('div');
        div3.classList.add('next');
        const img3 = document.createElement('img');
        img3.src = "./assets/icon/arrow_right.svg";
        div3.append(img3);
        photosVehicule.append(div3);

        /*
         * Creation de la zone d'informations sur le vehicule
         */

        //  Ajout du modele 
        const divInfos = document.createElement('div');
        const modele = document.createElement('div');
        modele.classList.add('modele');
        modele.innerText = vehicule.modele;
        divInfos.append(modele);

        // Ajout de la description
        const description = document.createElement('div');
        description.classList.add('description');
        description.innerText = vehicule.description;
        divInfos.append(description);

        // Ajout du prix et de l'agence
        const prixAgence = document.createElement('div');
        // Ajout du prix
        prixAgence.classList.add('prix-agence');
        const prix = document.createElement('div');
        prix.classList.add('prix');
        prix.innerText = vehicule.prix.toString() + '€';
        prixAgence.append(prix);
        const divIntercalaire = document.createElement('div');
        divIntercalaire.innerText = '-';
        prixAgence.append(divIntercalaire);
        const agence = document.createElement('agence');
        agence.classList.add('agence');
        agence.innerText = vehicule.agence;
        prixAgence.append(agence);
        divInfos.append(prixAgence);

        // Ajout du bouton reserver
        const button = document.createElement('button');
        button.classList.add('reserver');
        button.innerText = 'Réserver et Payer';
        divInfos.append(button);

        // Ajout des éléments dans l'article

        article.append(photosVehicule);
        article.append(divInfos);

        // Ajout de l'article dans la page
        articlesContainer.append(article);

        let currentVehicule = 0;

        div1.addEventListener('click', () => {
            currentVehicule++;
            if (currentVehicule >= vehicule.urls.length)
                currentVehicule = 0;

            img2.src = vehicule.urls[currentVehicule];
        });

        div3.addEventListener('click', () => {
            currentVehicule--;
            if (currentVehicule < 0)
                currentVehicule = vehicule.urls.length - 1;

            img2.src = vehicule.urls[currentVehicule];
        });

    });
};


updateAvailableCars(sortAvailCars);


// Surveillance de la modification du sens de tri des vehicules
const sortSelector = document.getElementById('sort-select');
sortSelector.addEventListener('change', () => {
    var selected = sortSelector.selectedIndex;

    if (selected === sortOrder)
        return;

    sortOrder = selected;

    if (sortOrder === 0) // Par ordre croissant de prix
        sortAvailCars.sort((a, b) => (a.prix - b.prix));
    else
        sortAvailCars.sort((a, b) => (b.prix - a.prix));

    updateAvailableCars(sortAvailCars);
});


/* Gestion du changement du background du hero toutes les 15 secondes */

const backgroundUrls = [
    './assets/img/background.jpg',
    './assets/img/background1.jpg',
    './assets/img/background2.jpg'
]

let currentBackgroundIndex = 0;

setInterval(() => {
    currentBackgroundIndex++;
    if (currentBackgroundIndex >= backgroundUrls.length)
        currentBackgroundIndex = 0;

    const backgroundimg = document.getElementById('hero');
    backgroundimg.style.backgroundImage = `url("${backgroundUrls[currentBackgroundIndex]}")`;
}, 15000);

/* Gestion de l'affichage du menu */

const menuItems = ["Louer une voiture", "Louer un utilitaire", "Réserver un chauffeur", "Découvrez nos agences", "Mon Compte", "Contact"];

const hamburgerMenu = document.getElementById('hamburger-menu');
let hamburgerMenuShown = false;

hamburgerMenu.addEventListener('click', () => {
    const hamburgerMenuContent = document.getElementById('hambuger-menu-content');

    hamburgerMenuShown = !hamburgerMenuShown;

    if (hamburgerMenuShown) {
        hamburgerMenu.classList.add('hamburger-active');
        hamburgerMenu.classList.remove('hamburger-inactive');

        menuItems.forEach(item => {
            const li = document.createElement('li');
            li.innerText = item;
            hamburgerMenuContent.append(li);
        });
    } else {
        hamburgerMenuContent.innerText = '';
        hamburgerMenu.classList.add('hamburger-inactive')
        hamburgerMenu.classList.remove('hamburger-active');
    }
});
