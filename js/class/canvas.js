class CanvasClass {
  constructor() {
    this.canvas = document.getElementById("Signature");
    this.clearBtn = document.getElementById("Effacer");
    this.submitBtn = document.getElementById("Valider");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.strokeStyle = "#222222";
    this.ctx.lineWidth = 4;
    this.drawing = false;
    this.mousePos = { x: 0, y: 0 };
    this.lastPos = this.mousePos;
    this.CanvasButtonStatus();
    this.CanvasChecker();
    this.Events();
  }
  //Désactiver le bouton Valider si le canvas est vide
  CanvasButtonStatus() {
    if (this.CanvasChecker(this.canvas)) {
      document.getElementById("Valider").disabled = true;
    } else {
      document.getElementById("Valider").disabled = false;
    }
  }
  CanvasChecker() {
    let blank = document.createElement("canvas");

    blank.width = this.canvas.width;
    blank.height = this.canvas.height;

    return this.canvas.toDataURL() === blank.toDataURL();
  }
  Events() {
    let self = this;
    //Souris
    this.canvas.addEventListener("mousedown", function (e) {
      self.draw = true;
      self.lastPosition = self.getMposition(e);
    });

    this.canvas.addEventListener("mousemove", function (e) {
      self.mousePosition = self.getMposition(e);
      self.canvasResult();
    });

    this.canvas.addEventListener("mouseup", function (e) {
      self.draw = false;
    });
    document.addEventListener("mouseup", function (e) {
      self.draw = false;
    });

    // Stop scrolling (touch)
    document.body.addEventListener("touchstart", function (e) {
      if (e.target == self.canvas) {
        e.preventDefault();
      }
    });

    document.body.addEventListener("touchend", function (e) {
      if (e.target == self.canvas) {
        e.preventDefault();
      }
    });

    document.body.addEventListener("touchmove", function (e) {
      if (e.target == self.canvas) {
        e.preventDefault();
      }
    });

    // Touchpad
    this.canvas.addEventListener("touchstart", function (e) {
      self.mousePosition = self.getTposition(e);
      let touch = e.touches[0];
      let mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      self.canvas.dispatchEvent(mouseEvent);
    });

    this.canvas.addEventListener("touchmove", function (e) {
      var touch = e.touches[0];
      var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      self.canvas.dispatchEvent(mouseEvent);
    });

    this.canvas.addEventListener("touchend", function (e) {
      var mouseEvent = new MouseEvent("mouseup", {});
      self.canvas.dispatchEvent(mouseEvent);
    });

    // Effacer le Dessin
    this.clearBtn.addEventListener("click", function (e) {
      self.clearCanvas();
    });
  }

  // Renvoi des coordonnées de la souris
  getMposition(mouseEvent) {
    if (this.draw) {
      var oRect = this.canvas.getBoundingClientRect();
      return {
        x: mouseEvent.clientX - oRect.left,
        y: mouseEvent.clientY - oRect.top,
      };
    }
  }

  // Renvoi des coordonnées du pad
  getTposition(touchEvent) {
    var oRect = this.canvas.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - oRect.left,
      y: touchEvent.touches[0].clientY - oRect.top,
    };
  }

  // Dessin du canvas
  canvasResult() {
    if (this.draw) {
      this.CanvasButtonStatus();
      this.ctx.beginPath();
      this.ctx.moveTo(this.lastPosition.x, this.lastPosition.y);
      this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
      this.ctx.stroke();
      this.lastPosition = this.mousePosition;
    }
  }
  clearCanvas() {
    this.canvas.width = this.canvas.width;
    this.ctx.lineWidth = 4;
    this.CanvasButtonStatus();
  }
}
