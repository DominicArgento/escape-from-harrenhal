document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("start-screen");
    const gameContainer = document.getElementById("game-container");
    const gameLog = document.getElementById("game-log");
    const commandInput = document.getElementById("command-input");
    const submitCommand = document.getElementById("submit-command");

    // Sound effect for entering the realm
    const swordSound = new Audio("assets/sounds/sword-slash.mp3");

    // Transition to the game screen
    document.querySelector(".enter-button").addEventListener("click", () => {
        swordSound.play();
        startScreen.classList.add("hidden");
        gameContainer.classList.remove("hidden");
        logMessage("You awaken in a dark cell. The air is heavy with dread...");
    });

    // Log messages to the game log
    function logMessage(message) {
        const paragraph = document.createElement("p");
        paragraph.textContent = message;
        gameLog.appendChild(paragraph);
        gameLog.scrollTop = gameLog.scrollHeight; // Auto-scroll
    }

    // Handle player commands
    function handleCommand(command) {
        logMessage(`> ${command}`);

        // Basic command handling
        switch (command.toLowerCase()) {
            case "look":
                logMessage("You see cold stone walls and a flickering torch outside your cell.");
                break;
            case "shout":
                logMessage("Your voice echoes, but no one responds.");
                break;
            case "help":
                logMessage("Commands: look, shout, help");
                break;
            default:
                logMessage("You mutter to yourself, unsure of what to do.");
        }
        commandInput.value = "";
    }

    // Submit command on button click or Enter key
    function submit() {
        const command = commandInput.value.trim();
        if (command) handleCommand(command);
    }

    submitCommand.addEventListener("click", submit);
    commandInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") submit();
    });
});
