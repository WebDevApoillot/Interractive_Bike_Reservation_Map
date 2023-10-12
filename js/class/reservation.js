class ReservationClass {
  constructor(formID) {
    this.formID = document.getElementById(formID);
    this.firstField = document.getElementById("name");
    this.secondField = document.getElementById("surname");
    this.validate = document.getElementById("Btnreserver");
    this.ClosePopup = document.getElementById("Close");
    this.eltStation = document.getElementById("nameStation");
    this.formVerify();
    this.closeSign();
    this.textCheck();
    this.getData();
  }

  closeSign() {
    this.ClosePopup.addEventListener("click", () => {
      document.getElementById("boxPopup").style.display = "none";
    });
  }
  setData() {
    console.log(this.firstField.value);
    localStorage.setItem("Nom", this.firstField.value);

    console.log(this.secondField.value);
    localStorage.setItem("Prenom", this.secondField.value);

    //Récupere la station
    sessionStorage.setItem("NomStation", this.eltStation.textContent);
    console.log(this.eltStation.textContent.replace("Nom:", ""));
  }

  getData() {
    this.firstField.value = localStorage.getItem("Nom");
    this.secondField.value = localStorage.getItem("Prenom");
  }

  formVerify() {
    this.validate.addEventListener("click", (e) => {
      e.preventDefault();
      this.setData();

      if (
        this.firstField.value.length < 1 &&
        this.secondField.value.length < 1
      ) {
        document.getElementById("ErrorAlert").style.display = "flex";
      } else if (!sessionStorage.getItem("NomStation")) {
        alert("Veuillez sélectionner une station pour pouvoir réserver.");
      } else {
        document.getElementById("ErrorAlert").style.display = "none";
        document.getElementById("boxPopup").style.display = "block";
      }
    });
  }

  // desactivation du bouton réserver
  textCheck() {
    this.firstField.addEventListener("change", () => {
      console.log(this.firstField.value, this.secondField.value);
      this.buttonStatus();
    });

    this.secondField.addEventListener("change", () => {
      console.log(this.secondField.value, this.secondField.value);
      this.buttonStatus();
    });
  }

  buttonStatus() {
    console.log("change");
    if (this.firstField.value.length < 1 || this.secondField.value.length < 1) {
      document.getElementById("Btnreserver").disabled = true;
    } else {
      document.getElementById("Btnreserver").disabled = false;
    }
  }
}
