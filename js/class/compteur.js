class compteurClass {
  constructor(classCanva) {
    this.timer = document.getElementById("Timer");
    this.minutes = 20;
    this.secondes = 0;
    this.timerInterval = null;
    this.valider = document.getElementById("Valider");
    this.reservation();
    this.getSessionStorageTimer();
    this.CheckObjectFunction();
    this.classCanva = classCanva;
  }
  CheckObjectFunction() {
    window.onload = (e) => {
      if (!!this.CheckObject) {
        document.getElementById("Timer").style.display = "flex";
      }
    };
  }

  reservation() {
    this.valider.addEventListener("click", () => {
      if (!this.classCanva.CanvasChecker(this.classCanva.canvas)) {
        document.getElementById("Timer").style.display = "flex";
        document.getElementById("boxPopup").style.display = "none";
        this.timerStart();
      }

      // }
    });
  }
  initTime() {
    this.minutes = 20;
    this.secondes = 0;
  }
  timerStart() {
    this.timerInterval = setInterval(() => {
      this.countDown();
    }, 1000);
  }

  countDown() {
    this.secondes--; // Secondes vont en décroissant ?
    // Le compteur ne reset pas après 59 secondes il réduit d'une minute le total
    if (this.secondes === -1 && this.minutes > 0) {
      this.minutes--;
      this.secondes = 59;
    }

    if (this.secondes < 0 && this.minutes === 0) {
      //Clear
      clearInterval(this.timerInterval);
      this.deleteSessionStorageTimer();
      this.initTime();
      this.CheckObject = false;
    } else {
      this.showCounter();
      this.saveSessionStorageTimer();
    }
  }

  saveSessionStorageTimer() {
    this.CheckObject = true;
    sessionStorage.setItem("minutes", this.minutes);
    sessionStorage.setItem("secondes", this.secondes);
  }

  getSessionStorageTimer() {
    let minutes = sessionStorage.getItem("minutes");
    let secondes = sessionStorage.getItem("secondes");
    if (minutes && secondes) {
      this.secondes = parseInt(secondes);
      this.minutes = parseInt(minutes);
      this.timerStart();
    }
  }

  deleteSessionStorageTimer() {
    sessionStorage.clear();
  }

  showCounter() {
    let time = this.minutes + ":" + this.secondes; // Valeur de base du compte a rebours
    let StationElt = sessionStorage.getItem("NomStation");
    console.log(time);

    if (this.secondes === 0 && this.minutes === 0) {
      this.timesUp();
    } else {
      this.timer.textContent =
        "Votre vélo est réservé à la station : " +
        StationElt.replace("Nom:", "") +
        //valeur station name ? +
        " pour une durée de :" +
        time; // Timer montre message + temps
    }
  }
  timesUp() {
    document.getElementById("ErrorAlert").style.display = "block";
    this.timer.style.display = "none";
    document.getElementById("ErrorAlert").textContent =
      "Le temps imparti est écoulé, votre réservation est annulée";
  }
}
