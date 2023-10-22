let nIntervalID;

//LANCEMENT DIAPO
var images = [
  "images/etape_une.jpg",
  "images/etape_deux.jpg",
  "images/etape_trois.jpg",
];
var imgElem = window.document.getElementById("carousel").querySelector("img");

const carousel = new diapoClass(imgElem, images, "gauche", "droite");

//LANCEMENT MAP
const map = new MapClass("myMap", 43.60426, 1.44367, 14);

// LANCEMENT CANVAS

const NewCanvas = new CanvasClass("Signature", "Valider", "Effacer");

//LANCEMENT FORMULAIRE

const formulaire = new ReservationClass(
  "Reservation",
  "Btnreserver",
  "name",
  "surname",
  "Close"
);

const compteur = new compteurClass(NewCanvas);

let urlApi =
  "https://api.jcdecaux.com/vls/v3/stations?contractName=toulouse&apiKey=15d06d3ae02e1bc50229f94dc7a3ed8b8117b122";

//RECUPERE NOS DONNEES
fetch(urlApi)
  .then((data) => {
    return data.json();
  })
  .then((stations) => {
    //LANCEMENT MARKEUR
    const markers = new Marqeurs(map.map, stations, "error");
  });

/* ------------ Formulaire --------------- */
let name = document.getElementById("name");
let surname = document.getElementById("surname");

// Erreur de saisie

let errorAlert = document.getElementById("ErrorAlert");
let errorAlertText = "Un ou plusieurs champs obligatoires sont manquants";
errorAlert.textContent = errorAlertText;

let NameField = document.getElementById("name");
let SurnameField = document.getElementById("surname");
let btnValidate = document.getElementById("Valider");
