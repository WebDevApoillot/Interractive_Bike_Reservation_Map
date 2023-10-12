class diapoClass {
  constructor(imgElem, images, idArrowLeft, idArrowRight) {
    this.timer = null;
    this.imgElem = imgElem;
    this.images = images;
    this.position = 0;
    this.ArrowLeft = document.getElementById(idArrowLeft);
    this.ArrowRight = document.getElementById(idArrowRight);
    this.PauseButton = document.getElementById("stop");
    this.StartButton = document.getElementById("start");
    this.start();
  }

  autoPlay() {
    this.timer = setInterval(() => {
      this.slideRight();
    }, 3000);
  }

  stopSlide() {
    clearInterval(this.timer);
    this.timer = null;
  }

  addEvents() {
    this.ArrowLeft.addEventListener("click", (e) => {
      this.slideLeft();
    });
    this.ArrowRight.addEventListener("click", (e) => {
      this.slideRight();
    });
    this.PauseButton.addEventListener("click", (e) => {
      this.stopSlide();
    });
    this.StartButton.addEventListener("click", (e) => {
      this.autoPlay();
    });
  }
  slideLeft() {
    if (this.position <= 0) {
      this.position = this.images.length - 1;
    } else {
      this.position--;
    }

    this.imgElem.src = this.images[this.position];
  }
  slideRight() {
    if (this.position >= this.images.length - 1) {
      this.position = 0;
    } else {
      this.position++;
    }

    this.imgElem.src = this.images[this.position];
  }
  start() {
    this.imgElem.src = this.images[this.position];
    this.addEvents();
    this.autoPlay();
  }
}
