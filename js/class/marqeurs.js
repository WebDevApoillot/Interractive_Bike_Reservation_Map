class Marqeurs {
  constructor(map, stations, errorEltID) {
    this.map = map;
    this.stations = stations;
    this.errorElt = document.getElementById(errorEltID);
    this.errorEmptyStation =
      "Il n'y a plus de vélos disponibles à cette station.";
    this.errorCloseStation =
      "Cette station est fermée, il est impossible d'y réserver un vélo.";
    this.formStationElt = document.getElementById("nameStation");
    this.adressStationElt = document.getElementById("adressStation");
    this.bikeNumberElt = document.getElementById("bikenumber");
    this.defaultInfoElt = document.getElementById("defaultInfo");
    this.showMarkers();
  }

  showMarkers() {
    /* console.log(this.map, this.stations); */
    this.stations.forEach((station) => {
      this.addMarker(
        station.position.latitude,
        station.position.longitude,
        station
      );
    });
  }
  addMarker(latitude, longitude, station) {
    this.createMarker(latitude, longitude);
    this.clickMarker(station);
  }
  createMarker(latitude, longitude) {
    this.marker = L.marker([latitude, longitude]).addTo(this.map);
  }

  clickMarker(station) {
    this.marker.addEventListener("click", (e) => {
      //console.log("click");
      // console.log(e.target, station);

      this.formStationElt.textContent = "Nom:" + station.name;

      this.adressStationElt.textContent = "Adresse:" + station.address;

      this.bikeNumberElt.textContent =
        "Vélos disponibles:" + station.totalStands.availabilities.bikes;

      if (station.status == "OPEN") {
        this.errorElt.style.display = "none";
        this.defaultInfoElt.style.display = "block";
      }
      if (station.status == "CLOSED") {
        //Non Error close
        this.errorElt.style.display = "block";
        this.defaultInfoElt.style.display = "none";
        this.errorElt.textContent = this.errorCloseStation;
      }
      //Vérifier si la station a des vélo ?
      if (station.totalStands.availabilities.bikes > 1) {
        this.errorElt.style.display = "none";
        this.defaultInfoElt.style.display = "block";
      }
      if (station.totalStands.availabilities.bikes < 1) {
        //Non - Error empty
        this.errorElt.style.display = "block";
        this.defaultInfoElt.style.display = "none";
        this.errorElt.textContent = this.errorEmptyStation;
      } else {
        // SINON
        this.defaultInfoElt.value = defaultInfo;
        this.errorElt.style.display = "none";
        this.defaultInfoElt.style.display = "block"; //Afficher information station
      }
    });
  }
}
