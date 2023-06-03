isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};
//===============CONSTS===================================================//
const usdCoefficient = 1;
const euroCoefficient = 0.9;
const uahCoefficient = 38;
const buttonsOrderBurger = document.querySelectorAll(".burger__order-button");
const namesOfBurgers = document.querySelectorAll(".burger__name");
const totalPrice = document.querySelector(".order-form__total-sum");
const prices = document.querySelectorAll(".burger__price");
const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".header__menu");
const menuLinks = document.querySelectorAll("a[data-goto]");
const mainPageButtons = document.querySelectorAll(".text-main__button");
const currency = document.querySelector(".header__button");
const phoneInput = document.querySelector("input[type=tel]");

//==========Поправка для корректного добавления в корзину==========================//
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".menu__items_1").classList.remove("_closed");
});

//==============Burger menu=================================================//

if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("_lock");
    iconMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
  });
}

//===========прокрутка при клике в header============================//

if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;

      if (iconMenu.classList.contains("_active")) {
        document.body.classList.remove("_lock");
        iconMenu.classList.remove("_active");
        menuBody.classList.remove("_active");
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
}
//==========переход по клику по кнопке============================//

if (mainPageButtons.length > 0) {
  mainPageButtons.forEach((mainPageButton) => {
    mainPageButton.addEventListener("click", onMainPageButtonClick);
  });

  function onMainPageButtonClick(e) {
    const mainPageButton = e.target;
    if (
      mainPageButton.dataset.goto &&
      document.querySelector(mainPageButton.dataset.goto)
    ) {
      const gotoPage = document.querySelector(mainPageButton.dataset.goto);
      const gotoPageValue = gotoPage.getBoundingClientRect().top + scrollY;

      window.scrollTo({
        top: gotoPageValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
}
//===============Change Currency=========================================================================================//
currency.addEventListener("click", function (e) {
  const currentCurrency = currency.innerText;
  if (currentCurrency === "$") {
    currency.textContent = "€";
  } else if (currentCurrency === "€") {
    currency.textContent = "₴";
  } else {
    currency.textContent = "$";
  }
  document.querySelector(".order-form__actual-currency").textContent =
    currency.innerText;

  //==========Change of total price currency=====================================================//

  const totalPrice = document.querySelector(".order-form__total-sum");
  if (currency.innerText === "$") {
    totalPrice.textContent = ` ${(
      (totalPrice.textContent * usdCoefficient) /
      uahCoefficient
    ).toFixed(0)}`;
  } else if (currency.innerText === "€") {
    totalPrice.textContent = ` ${(
      (totalPrice.textContent * euroCoefficient) /
      usdCoefficient
    ).toFixed(1)}`;
  } else if (currency.innerText === "₴") {
    totalPrice.textContent = ` ${(
      (totalPrice.textContent * uahCoefficient) /
      euroCoefficient
    ).toFixed(0)}`;
  }
});

//=================CHANGE PRICES============================================//

for (let i = 0; i < prices.length; i++) {
  const price = prices[i];
  const usdPrice = price.textContent * usdCoefficient;
  const euroPrice = price.textContent * euroCoefficient;
  const uahPrice = price.textContent * uahCoefficient;
  const buttonOrderBurger = buttonsOrderBurger[i];
  buttonOrderBurger.addEventListener("click", onOrderBurgerButtonClick);
  function onOrderBurgerButtonClick() {
    if (currency.innerText === "$") {
      totalPrice.textContent = ` ${(
        totalPrice.textContent * 1 +
        usdPrice
      ).toFixed(0)}`;
    } else if (currency.innerText === "€") {
      totalPrice.textContent = ` ${(
        totalPrice.textContent * 1 +
        euroPrice
      ).toFixed(1)}`;
    } else if (currency.innerText === "₴") {
      totalPrice.textContent = ` ${(
        totalPrice.textContent * 1 +
        uahPrice
      ).toFixed(0)}`;
    }
  }
  //============Burger Price===================================================//
  price.textContent = `${price.textContent} ${currency.innerText}`;
  currency.addEventListener("click", function (e) {
    if (currency.innerText === "$") {
      if (Number.isInteger(usdPrice) === true) {
        price.textContent = `${usdPrice} $`;
      } else {
        price.textContent = `${usdPrice.toFixed(0)} $`;
      }
    } else if (currency.innerText === "€") {
      if (Number.isInteger(euroPrice) === true) {
        price.textContent = `${euroPrice} €`;
      } else {
        price.textContent = `${euroPrice.toFixed(1)} €`;
      }
    } else if (currency.innerText === "₴") {
      if (Number.isInteger(uahPrice) === true) {
        price.textContent = `${uahPrice} ₴`;
      } else {
        price.textContent = `${uahPrice.toFixed(1)} ₴`;
      }
    }
  });
}
//=====================Add to cart===============================================================//

for (let i = 0; i < buttonsOrderBurger.length; i++) {
  const buttonOrderBurger = buttonsOrderBurger[i];
  const nameOfBurger = namesOfBurgers[i].innerText;

  let j = 0;
  buttonOrderBurger.addEventListener("click", onOrderBurgerButtonClick);
  function onOrderBurgerButtonClick() {
    //==========Reset cart button=====================//

    const resetCartButton = document.querySelector(
      ".order-form__your-order-cancel-button"
    );
    resetCartButton.addEventListener("click", function (e) {
      j = 0;
      const removedInputs = document.querySelectorAll(
        ".order-form__your-order-items"
      );
      for (let i = 0; i < removedInputs.length; i++) {
        removedInputs[i].outerHTML = "";
      }
      totalPrice.textContent = 0;

      e.preventDefault();
    });
    //------------------------------------------//
    const removedInputs = document.querySelectorAll(
      ".order-form__your-order-items"
    );
    if (removedInputs.length === 0) {
      j = 0;
    }
    if (j === 0) {
      const input = document.createElement("input");
      input.type = "text";
      input.className = "order-form__your-order-items";
      input.readOnly = true;
      input.name = "order";
      document
        .querySelector(".order-form__your-order-text-block")
        .append(input);
      input.value = `${nameOfBurger}  X 1`;
      const emptyCart = document.querySelector(".order-form__empty-cart");
      emptyCart.textContent = "";
    } else {
      const inputs = document.querySelectorAll(".order-form__your-order-items");
      for (let k = 0; inputs.length > k; k++) {
        const repeatedInput = inputs[k];
        if (repeatedInput.value.includes(nameOfBurger)) {
          repeatedInput.value = `${nameOfBurger}  X ${j + 1}`;
        }
      }
    }
    j++;

    //====================ADD Burger Name Copy When Order=========================================================//
    if (document.querySelector("._addedBurger")) {
      document
        .getElementById("temporaryCartLink")
        .addEventListener("click", (event) => {
          event.preventDefault();
        });

      document.querySelector("._addedBurger").remove();
    }
    const addedBurger = document.createElement("div");
    addedBurger.className = "_addedBurger";
    addedBurger.innerHTML = `<span>${nameOfBurger}</span> добавлен в <a href="" data-goto=".order-form" id="temporaryCartLink">корзину</a>`;
    document.querySelector("body").append(addedBurger);

    setTimeout(() => {
      addedBurger.remove();
    }, 3000);
    //===================Go To Cart By Temporary Link=======================================//

    const temporaryCartLink = document.getElementById("temporaryCartLink");
    temporaryCartLink.addEventListener("click", onTemporaryLinkClick);
    function onTemporaryLinkClick(e) {
      const gotoBlock = document.querySelector(temporaryCartLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
}

//=================ONLY DIGITS TO INPUT======================================================//
phoneInput.addEventListener("keyup", function (event) {
  this.value = this.value.replace(/[^\w.-]|[a-zA-Z]|^[.-]/g, "");
});
//==================FORM VALIDATION=========================================================//
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".order-form__form");
  form.addEventListener("submit", formSend);
  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    //    let formData = new formData(form);

    if (error === 0) {
      const removedInputs = document.querySelectorAll(
        ".order-form__your-order-items"
      );
      for (let i = 0; i < removedInputs.length; i++) {
        removedInputs[i].outerHTML = "";
      }
      totalPrice.textContent = "0";

      successfulOrder();
      form.reset();
      /*      let response = await fetch("sendmail.php", {
        method: "POST",
        body: FormData,
      });
      if (response.ok) {
        form.classList.add("_sending");
        let result = await response.json();
        alert(result.message);
        formPreview.innerHTML = "";
        form.reset();
        form.classList.remove("_sending");
      } else {
        alert("Error");
        form.classList.remove("_sending");
      }*/
    } else {
      emptyInputsError();
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll("._req");
    document
      .querySelector(".order-form__your-order-text-block")
      .classList.remove("_error");
    for (let i = 0; i < formReq.length; i++) {
      const inputForValidation = formReq[i];
      formRemoveError(inputForValidation);

      if (inputForValidation.classList.contains("_email")) {
        if (emailTest(inputForValidation)) {
          formAddError(inputForValidation);
          error++;
        }
      } else {
        if (inputForValidation.value === "") {
          formAddError(inputForValidation);
          error++;
        }
      }
    }
    if (!document.querySelector(".order-form__your-order-items")) {
      document
        .querySelector(".order-form__your-order-text-block")
        .classList.add("_error");
      emptyCartError();
      error++;
    }
    return error;
  }
  function formAddError(inputForValidation) {
    inputForValidation.parentElement.classList.add("_error");
    inputForValidation.classList.add("_error");
  }
  function formRemoveError(inputForValidation) {
    inputForValidation.parentElement.classList.remove("_error");
    inputForValidation.classList.remove("_error");
  }
  //-----test of email-------------//
  function emailTest(inputForValidation) {
    return !/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(
      inputForValidation.value
    );
  }
});

//====================Next Menu Page============================================================================//

const nextPageMenuButton = document.querySelector(
  ".pages-menu__next-page-button"
);
nextPageMenuButton.addEventListener("click", function (e) {
  const menuPages = document.querySelectorAll(".menu__items");
  for (let i = 0; i < menuPages.length - 1; i++) {
    if (!menuPages[i].classList.contains("_closed")) {
      const nextPage = menuPages[i].nextElementSibling;
      menuPages[i].classList.toggle("_closed");
      nextPage.classList.toggle("_closed");

      //----------Box Shadow for Open Page----------------------------//

      const allDigitsPages = document.querySelectorAll(".pages-menu__button");
      for (let j = 0; j < allDigitsPages.length; j++) {
        if (allDigitsPages[j].classList.contains("_open")) {
          allDigitsPages[j].classList.remove("_open");
        }
        if (!menuPages[j].classList.contains("_closed")) {
          allDigitsPages[j].classList.add("_open");
        }
      }
      //--------------------------//
      break;
    }
  }
  e.preventDefault;
});
//=============Previous Menu Page===========================================================================================================================//
const previousPageMenuButton = document.querySelector(
  ".pages-menu__previous-page-button"
);
previousPageMenuButton.addEventListener("click", function (e) {
  const menuPages = document.querySelectorAll(".menu__items");
  for (let i = 1; i < menuPages.length; i++) {
    if (!menuPages[i].classList.contains("_closed")) {
      const previousPage = menuPages[i].previousElementSibling;
      menuPages[i].classList.toggle("_closed");
      previousPage.classList.toggle("_closed");
      //----------Box Shadow for Open Page----------------------------//

      const allDigitsPages = document.querySelectorAll(".pages-menu__button");
      for (let j = 0; j < allDigitsPages.length; j++) {
        if (allDigitsPages[j].classList.contains("_open")) {
          allDigitsPages[j].classList.remove("_open");
        }
        if (!menuPages[j].classList.contains("_closed")) {
          allDigitsPages[j].classList.add("_open");
        }
      }
      //--------------------------------//
      break;
    }
  }
  e.preventDefault;
});

//====================Go To Choosed Page Of Burger Menu================================================================//
//----------PAGE1----------------------------//
const page1Button = document.getElementById("pageMenuButton1");
page1Button.addEventListener("click", function (e) {
  const allMenuPages = document.querySelectorAll(".menu__items");
  for (let i = 0; i < allMenuPages.length; i++) {
    if (!allMenuPages[i].classList.contains("_closed")) {
      allMenuPages[i].classList.add("_closed");
    }
  }
  const menuPage1 = document.querySelector(".menu__items_1");
  menuPage1.classList.remove("_closed");

  const allDigitsPages = document.querySelectorAll(".pages-menu__button");
  for (let i = 0; i < allDigitsPages.length; i++) {
    if (allDigitsPages[i].classList.contains("_open")) {
      allDigitsPages[i].classList.remove("_open");
    }
  }
  page1Button.classList.add("_open");
});
//----------PAGE1----------------------------//
const page2Button = document.getElementById("pageMenuButton2");
page2Button.addEventListener("click", function (e) {
  const allMenuPages = document.querySelectorAll(".menu__items");
  for (let i = 0; i < allMenuPages.length; i++) {
    if (!allMenuPages[i].classList.contains("_closed")) {
      allMenuPages[i].classList.add("_closed");
    }
  }
  const menuPage2 = document.querySelector(".menu__items_2");
  menuPage2.classList.remove("_closed");

  const allDigitsPages = document.querySelectorAll(".pages-menu__button");
  for (let i = 0; i < allDigitsPages.length; i++) {
    if (allDigitsPages[i].classList.contains("_open")) {
      allDigitsPages[i].classList.remove("_open");
    }
  }
  page2Button.classList.add("_open");
});
//----------PAGE1----------------------------//
const page3Button = document.getElementById("pageMenuButton3");
page3Button.addEventListener("click", function (e) {
  const allMenuPages = document.querySelectorAll(".menu__items");
  for (let i = 0; i < allMenuPages.length; i++) {
    if (!allMenuPages[i].classList.contains("_closed")) {
      allMenuPages[i].classList.add("_closed");
    }
  }
  const menuPage3 = document.querySelector(".menu__items_3");
  menuPage3.classList.remove("_closed");

  const allDigitsPages = document.querySelectorAll(".pages-menu__button");
  for (let i = 0; i < allDigitsPages.length; i++) {
    if (allDigitsPages[i].classList.contains("_open")) {
      allDigitsPages[i].classList.remove("_open");
    }
  }
  page3Button.classList.add("_open");
});

//=========Всплывающее окно при успешном заказе====================================//
function successfulOrder() {
  const orderSuccess = document.createElement("div");
  orderSuccess.className = "order__success";
  orderSuccess.textContent =
    "Спасибо за заказ! Наш менеджер скоро свяжется с Вами";
  document.querySelector("body").append(orderSuccess);
  setTimeout(() => {
    orderSuccess.remove();
  }, 5000);
}

//==================Error Empty Cart====================================//
function emptyCartError() {
  const emptyCartPopap = document.createElement("div");
  emptyCartPopap.className = "emptyCartError";
  emptyCartPopap.textContent = "Ваша корзина пуста :(";
  document.querySelector("body").append(emptyCartPopap);
  setTimeout(() => {
    emptyCartPopap.remove();
  }, 4000);
}

//====================Error Empty Inputs==================================//
function emptyInputsError() {
  const emptyInputsPopap = document.createElement("div");
  emptyInputsPopap.className = "emptyInputsError";
  emptyInputsPopap.textContent = "Заполните все обязательные поля";
  document.querySelector("body").append(emptyInputsPopap);
  setTimeout(() => {
    emptyInputsPopap.remove();
  }, 4000);
}
//====================================================================================================//
const menuBurgerCards = document.querySelectorAll(".menu__item");
for (let i = 1; i < menuBurgerCards.length; i++) {
  if (menuBurgerCards[i].clientHeight < menuBurgerCards[i - 1].clientHeight) {
    menuBurgerCards[i].style.height = menuBurgerCards[i - 1].clientHeight;
  } else if (
    menuBurgerCards[i].clientHeight > menuBurgerCards[i - 1].clientHeight
  ) {
    menuBurgerCards[i - 1].style.height = menuBurgerCards[i].clientHeight;
  } else {
    menuBurgerCards[i].style.height = menuBurgerCards[i].clientHeight;
  }
}
