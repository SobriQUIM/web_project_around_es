//Datos iniciales
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

//Elementos del DOM
// Perfil
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Popups
const editPopup = document.querySelector("#edit-popup");
const newCardPopup = document.querySelector("#new-card-popup");
const imagePopup = document.querySelector("#image-popup");

// Formulario de perfil
const editProfileForm = document.querySelector("#edit-profile-form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

// Formulario de nueva tarjeta
const newCardForm = document.querySelector("#new-card-form");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");

// Popup de imagen
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

// Tarjetas
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

//Funciones reutilizables de popups
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

//Perfil
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editPopup);
}

//Tarjetas
function handleLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function handleDeleteCard(evt) {
  evt.target.closest(".card").remove();
}

function handleImageClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imagePopup);
}

function getCardElement({
  name = "Sin título",
  link = "./images/placeholder.jpg",
} = {}) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  likeButton.addEventListener("click", handleLikeButton);
  deleteButton.addEventListener("click", handleDeleteCard);
  cardImage.addEventListener("click", () => handleImageClick(name, link));

  return cardElement;
}

function renderCard(name, link, container) {
  container.prepend(getCardElement({ name, link }));
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(cardNameInput.value, cardLinkInput.value, cardsList);
  newCardForm.reset();
  closeModal(newCardPopup);
}

//Render inicial
initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsList);
});

// ===== Eventos =====
editButton.addEventListener("click", handleOpenEditModal);
addButton.addEventListener("click", () => openModal(newCardPopup));

editProfileForm.addEventListener("submit", handleProfileFormSubmit);
newCardForm.addEventListener("submit", handleCardFormSubmit);

// Un solo bloque para los botones de cierre de TODOS los popups
document.querySelectorAll(".popup__close").forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closeModal(popup));
});
