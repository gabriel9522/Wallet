IMask(document.querySelector("#cc-cvv"), {
  mask: "0000"
})
IMask(document.querySelector("#cc-number"), {
  mask: "0000 0000 0000 0000"
})
IMask(document.querySelector("#cc-validity"), {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2)
    }
  }
})

const cards = document.querySelector(".cards")
const form = document.querySelector("form")
const nav = document.querySelector("nav")
const cardList = []

const menuBtn = document
  .querySelector(".icon-menu")
  .addEventListener("click", function (ev) {
    ev.preventDefault()
    if (nav.style.display === "flex") {
      nav.style.display = "none"
    } else {
      nav.style.display = "flex"
    }
    cards.style.display = "none"
    form.style.display = "none"
  })

const addNewCard = document.querySelector("#add-new-card")
addNewCard.addEventListener("click", function (ev) {
  ev.preventDefault()
  form.style.display = "block"
  nav.style.display = "none"
})

const addCard = document.querySelector("#add-card")
addCard.addEventListener("click", function (ev) {
  ev.preventDefault()
  const ccNumber = document.querySelector("#cc-number").value
  const ccHolder = document.querySelector("#cc-holder").value
  const ccName = document.querySelector("#cc-name").value

  class CreditCard {
    constructor(ccNumber, ccHolder, ccName) {
      this.ccNumber = ccNumber
      this.ccHolder = ccHolder
      this.ccName = ccName
    }
  }

  const newCC = new CreditCard(ccNumber, ccHolder, ccName)
  cardList.push(newCC)

  localStorage.setItem("cardList", JSON.stringify(cardList))

  document.querySelector("#cc-number").value = ""
  document.querySelector("#cc-holder").value = ""
  document.querySelector("#cc-validity").value = ""
  document.querySelector("#cc-cvv").value = ""
  document.querySelector("#cc-name").value = ""

  form.style.display = "none"
})

const myCards = document.querySelector("#my-cards")
myCards.addEventListener("click", function (ev) {
  ev.preventDefault()
  nav.style.display = "none"
  cards.style.display = "flex"

  const cardList = JSON.parse(localStorage.getItem("cardList"))

  cards.innerHTML = ""

  for (let i = 0; i < cardList.length; i++) {
    const newCard = document.createElement("div")
    newCard.classList.add("card")

    if (cardList[i].ccName !== "") {
      const cardName = document.createElement("h3")
      cardName.textContent = cardList[i].ccName
      newCard.appendChild(cardName)
    }

    const cardNumber = document.createElement("p")
    cardNumber.textContent = `**** **** **** ${cardList[i].ccNumber.slice(-4)}`
    newCard.appendChild(cardNumber)

    const cardHolder = document.createElement("p")
    cardHolder.textContent = cardList[i].ccHolder
    newCard.appendChild(cardHolder)

    cards.appendChild(newCard)
  }
})

const removeCard = document.querySelector("#remove-card")
removeCard.addEventListener("click", function (ev) {
  ev.preventDefault()
  nav.style.display = "none"
  cards.style.display = "flex"

  const cardList = JSON.parse(localStorage.getItem("cardList"))

  cards.innerHTML = ""

  for (let i = 0; i < cardList.length; i++) {
    const newCard = document.createElement("div")
    newCard.classList.add("card")

    if (cardList[i].ccName !== "") {
      const cardName = document.createElement("h3")
      cardName.textContent = cardList[i].ccName
      newCard.appendChild(cardName)
    }

    const cardNumber = document.createElement("p")
    cardNumber.textContent = `**** **** **** ${cardList[i].ccNumber.slice(-4)}`
    newCard.appendChild(cardNumber)

    const cardHolder = document.createElement("p")
    cardHolder.textContent = cardList[i].ccHolder
    newCard.appendChild(cardHolder)

    cards.appendChild(newCard)
  }

  cards.addEventListener("click", function removeCardHandler(event) {
    if (event.target.classList.contains("card")) {
      const index = cardList.findIndex(
        card =>
          card.ccNumber.slice(-4) ===
          event.target.querySelector("p").textContent.slice(-4)
      )
      if (index !== -1) {
        cardList.splice(index, 1)
      }
      event.target.remove()
      localStorage.setItem("cardList", JSON.stringify(cardList))
      cards.removeEventListener("click", removeCardHandler)
    }
  })
})
