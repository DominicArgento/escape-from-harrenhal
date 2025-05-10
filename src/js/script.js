document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("start-screen");
    const gameContainer = document.getElementById("game-container");
    const gameLog = document.getElementById("game-log");
    const commandInput = document.getElementById("command-input");
    const submitCommand = document.getElementById("submit-command");

    // Sound effect for entering the realm
    const swordSound = new Audio("assets/sounds/sword-slash.mp3");

    // Game state management
    let currentScene = "awakening";

    // Transition to the game screen
    document.querySelector(".enter-button").addEventListener("click", () => {
        swordSound.play();
        startScreen.classList.add("hidden");
        gameContainer.classList.remove("hidden");
        changeScene(currentScene); // Start the first scene
    });

    // Log messages to the game log
    function logMessage(message) {
        const paragraph = document.createElement("p");
        paragraph.textContent = message;
        gameLog.appendChild(paragraph);
        gameLog.scrollTop = gameLog.scrollHeight; // Auto-scroll
    }

    // Change the current scene and display the description
    function changeScene(sceneName) {
        const scene = scenes[sceneName];
        if (scene) {
            swordSound.play();
            logMessage(scene.description);
            currentScene = sceneName;
        } else {
            logMessage("You feel disoriented, unsure of what just happened.");
        }
    }

    // Handle player choices within a scene
    function handleChoice(command) {
        const scene = scenes[currentScene];
        if (scene && scene.choices[command]) {
            logMessage(scene.choices[command]);

            // Move to the next scene if defined
            if (scene.nextScene) {
                setTimeout(() => changeScene(scene.nextScene), 1000);
            }
        } else {
            logMessage("You hesitate, unsure of what to do.");
        }
    }

    // Handle player commands
    function handleCommand(command) {
        logMessage(`> ${command}`);

        // Try to handle as a scene-specific command
        if (currentScene && scenes[currentScene]) {
            handleChoice(command);
            return;
        }

        // General commands if not in a scene
        switch (command.toLowerCase()) {
            case "help":
                logMessage("Commands: look, listen, shout, wait, hide, inspect cell door, prepare to fight, call for help");
                break;
            default:
                logMessage("Your thoughts are scattered. Try something else.");
        }
        commandInput.value = "";
    }

    // Submit command on button click or Enter key
    function submit() {
        const command = commandInput.value.trim();
        if (command) handleCommand(command);
        commandInput.value = "";
    }

    submitCommand.addEventListener("click", submit);
    commandInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") submit();
    });
});
