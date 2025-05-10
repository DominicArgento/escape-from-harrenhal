document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".enter-button");

    // Sound effect
    const swordSound = new Audio("assets/sounds/sword-slash.mp3");

    button.addEventListener("click", () => {
        swordSound.play();
        alert("Entering the Realm...");
    });
});
