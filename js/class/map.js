class MapClass {
  constructor(mapID, latitute, logitude, zoom) {
    this.mapID = mapID;
    this.latitute = latitute;
    this.logitude = logitude;
    this.zoom = zoom;
    this.launcherMap();
  }

  launcherMap() {
    this.map = L.map(this.mapID).setView(
      [this.latitute, this.logitude],
      this.zoom
    );
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoiYXBvaWxsb3QiLCJhIjoiY2wxMWQyN2FkMDRzYTNkcnNiN2FoY3Y3ayJ9.fxyMi9iHMikOsclv9-x_vw",
      }
    ).addTo(this.map);
  }
}
