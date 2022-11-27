//form handle
let form = document.getElementById("my-form");
let readBtn = document.getElementById("read-btn");
let closeBtn = document.getElementById("close-btn");
let modalContainer = document.getElementById("modal-container");
let hamburgerCloseBtn = document.getElementById("hamburger-close-btn");
let hamburgerOpenBtn = document.getElementById("hamburger-open-btn");
let navLinks = document.getElementById("nav-links");
//open modal
readBtn.addEventListener("click", () => {
  modalContainer.style.display = "block";
});
closeBtn.addEventListener("click", () => {
  modalContainer.style.display = "none";
});

//open hamburger menu
hamburgerOpenBtn.addEventListener("click", () => {
  navLinks.classList.add("active");
});
//close hamburger menu
hamburgerCloseBtn.addEventListener("click", () => {
  navLinks.classList.remove("active");
});
//form submit handler
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.classList.add("success");
        status.innerHTML = "Success! Thanks for your submission!";
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.classList.add("error");
            status.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form";
          }
        });
      }
    })
    .catch((error) => {
      status.innerHTML = "Oops! There was a problem submitting your form";
    });
}
form.addEventListener("submit", handleSubmit);
