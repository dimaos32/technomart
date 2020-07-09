let promoSlides = document.querySelectorAll(".promo-slide");
let promoSliderPreview = document.querySelector(".promo-slider-controls-arrows .btn-preview");
let promoSliderNext = document.querySelector(".promo-slider-controls-arrows .btn-next");
let promoSliderBubbles = document.querySelectorAll(".promo-slider-controls-buttons button");
let promoSlideCurrent = 0;
let promoSlidesQuantity =2;

let servicesSlides = document.querySelectorAll(".services-slide");
let servicesSliderControls = document.querySelectorAll(".services-slider-controls button");
let servicesSlideCurrent = 0;
let servicesSlidesQuantity =3;

let isStorageSupport = true;
let storage = "";

let feedbackLink = document.querySelector(".feedback-link");
let feedbackPopup = document.querySelector(".modal-feedback");
let feedbackClose = document.querySelector(".modal-feedback .btn-modal-close");
let feedbackForm = document.querySelector(".modal-feedback-form");
let feedbackName = document.querySelector("#modal-feedback-name");
let feedbackEmail = document.querySelector("#modal-feedback-email");
let feedbackMessage = document.querySelector("#modal-feedback-message");

let mapLink = document.querySelector(".map-link");
let mapPopup = document.querySelector(".modal-map");
let mapClose = document.querySelector(".modal-map .btn-modal-close");

let buyActionLinks = document.querySelectorAll(".btn-buy-action");
let buyActionPopup = document.querySelector(".modal-cart-add");
let buyActionClose = document.querySelector(".modal-cart-add .btn-modal-close");
let buyActionCloseAlt = document.querySelector(".modal-cart-add .btn-continue-shopping");

if (promoSlides.length > 0) {
  promoSliderPreview.addEventListener("click", function() {
    promoSlides[promoSlideCurrent].classList.remove("promo-slide-current");
    promoSliderBubbles[promoSlideCurrent].classList.remove("current");
    promoSliderBubbles[promoSlideCurrent].removeAttribute("disabled");
    promoSlideCurrent = (promoSlideCurrent + promoSlidesQuantity - 1) % promoSlidesQuantity;
    promoSlides[promoSlideCurrent].classList.add("promo-slide-current");
    promoSliderBubbles[promoSlideCurrent].classList.add("current");
    promoSliderBubbles[promoSlideCurrent].setAttribute("disabled", true);
  });

  promoSliderNext.addEventListener("click", function() {
    promoSlides[promoSlideCurrent].classList.remove("promo-slide-current");
    promoSliderBubbles[promoSlideCurrent].classList.remove("current");
    promoSliderBubbles[promoSlideCurrent].removeAttribute("disabled");
    promoSlideCurrent = (promoSlideCurrent + 1) % promoSlidesQuantity;
    promoSlides[promoSlideCurrent].classList.add("promo-slide-current");
    promoSliderBubbles[promoSlideCurrent].classList.add("current");
    promoSliderBubbles[promoSlideCurrent].setAttribute("disabled", true);
  });

  for (let i = 0; i < promoSliderBubbles.length; i++) {
    promoSliderBubbles[i].addEventListener("click", function() {
      promoSlides[promoSlideCurrent].classList.remove("promo-slide-current");
      promoSliderBubbles[promoSlideCurrent].classList.remove("current");
      promoSliderBubbles[promoSlideCurrent].removeAttribute("disabled");
      promoSlideCurrent = i;
      promoSlides[promoSlideCurrent].classList.add("promo-slide-current");
      promoSliderBubbles[promoSlideCurrent].classList.add("current");
      promoSliderBubbles[promoSlideCurrent].setAttribute("disabled", true);
    });
  }
}

if (servicesSlides.length > 0) {
  for (let i = 0; i < servicesSliderControls.length; i++) {
    servicesSliderControls[i].addEventListener("click", function() {
      servicesSlides[servicesSlideCurrent].classList.remove("services-slide-current");
      servicesSliderControls[servicesSlideCurrent].removeAttribute("disabled");
      servicesSlideCurrent = i;
      servicesSlides[servicesSlideCurrent].classList.add("services-slide-current");
      servicesSliderControls[servicesSlideCurrent].setAttribute("disabled", true);
    });
  }
}

if (feedbackLink) {
  try {
    storage = localStorage.getItem("name");
  } catch (err) {
    isStorageSupport = false;
  }

  feedbackLink.addEventListener("click", function(evt) {
    evt.preventDefault();
    feedbackPopup.classList.add("modal-show");

    if (storage) {
      feedbackName.value = storage;
      feedbackEmail.value = localStorage.getItem("email");
      feedbackMessage.focus();
    } else {
      feedbackName.focus();
    }
  });

  feedbackClose.addEventListener("click", function(evt) {
    evt.preventDefault();
    feedbackPopup.classList.remove("modal-show");
    feedbackPopup.classList.remove("modal-error");
  });

  feedbackForm.addEventListener("submit", function(evt) {
    if (!feedbackName.value || !feedbackEmail.value || !feedbackMessage.value) {
      evt.preventDefault();
      feedbackPopup.classList.remove("modal-error");
      feedbackPopup.offsetWidth = feedbackPopup.offsetWidth;
      feedbackPopup.classList.add("modal-error");
      feedbackMessage.focus();
    } else {
      if (isStorageSupport) {
        localStorage.setItem("name", feedbackName.value);
        localStorage.setItem("email", feedbackEmail.value);
      }
    }
  });

  window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
      if (feedbackPopup.classList.contains("modal-show")) {
        evt.preventDefault;
        feedbackPopup.classList.remove("modal-show");
        feedbackPopup.classList.remove("modal-error");
      }
    }
  });
}

if (mapLink) {
  mapLink.addEventListener("click", function(evt) {
    evt.preventDefault();
    mapPopup.classList.add("modal-show");
  });

  mapClose.addEventListener("click", function(evt) {
    evt.preventDefault();
    mapPopup.classList.remove("modal-show");
  });

  window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
      if (mapPopup.classList.contains("modal-show")) {
        evt.preventDefault;
        mapPopup.classList.remove("modal-show");
      }
    }
  });
}

if (buyActionLinks.length > 0) {
  for (buyActionLink of buyActionLinks) {
    buyActionLink.addEventListener("click", function(evt) {
      evt.preventDefault();
      buyActionPopup.classList.add("modal-show");
    });

    buyActionClose.addEventListener("click", function(evt) {
      evt.preventDefault();
      buyActionPopup.classList.remove("modal-show");
    });

    buyActionCloseAlt.addEventListener("click", function(evt) {
      evt.preventDefault();
      buyActionPopup.classList.remove("modal-show");
    });
  }

  window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
      for (buyActionLink of buyActionLinks) {
        if (buyActionPopup.classList.contains("modal-show")) {
          evt.preventDefault;
          buyActionPopup.classList.remove("modal-show");
        }
      }
    }
  });
}
