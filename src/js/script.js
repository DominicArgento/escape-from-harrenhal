document.addEventListener("DOMContentLoaded", () => {
    // UI Elements
    const startScreen = document.getElementById("start-screen");
    const gameContainer = document.getElementById("game-container");
    const gameLog = document.getElementById("game-log");
    const commandInput = document.getElementById("command-input");
    const submitCommand = document.getElementById("submit-command");
    const characterCreation = document.getElementById("character-creation");
    const createCharacterBtn = document.getElementById("create-character");

    // Character Creation Elements
    const nameInput = document.getElementById("character-name");
    const raceSelect = document.getElementById("character-race");
    const classSelect = document.getElementById("character-class");
    const backgroundSelect = document.getElementById("character-background");

    // Character Summary Elements
    const summaryName = document.getElementById("summary-name");
    const summaryRace = document.getElementById("summary-race");
    const summaryClass = document.getElementById("summary-class");
    const summaryBackground = document.getElementById("summary-background");

    // Sound effects
    const swordSound = new Audio("assets/sounds/sword-slash.mp3");

    // Game state management
    let currentScene = "awakening";
    const player = {
        name: "",
        race: "",
        class: "",
        background: ""
    };

    // Load saved game state if available
    if (localStorage.getItem("gameState")) {
        const savedState = JSON.parse(localStorage.getItem("gameState"));
        currentScene = savedState.currentScene;
        Object.assign(player, savedState.player);
        startScreen.classList.add("hidden");
        characterCreation.classList.add("hidden");
        gameContainer.classList.remove("hidden");
        changeScene(currentScene);
        logMessage(`Welcome back, ${player.name}.`);
    }

    // Save game state to localStorage
    function saveGameState() {
        const gameState = {
            currentScene,
            player
        };
        localStorage.setItem("gameState", JSON.stringify(gameState));
    }

    // Transition to the character creation screen
    document.querySelector(".enter-button").addEventListener("click", () => {
        swordSound.play();
        startScreen.classList.add("hidden");
        characterCreation.classList.remove("hidden");
    });

    // Start the game after character creation
    createCharacterBtn.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const race = raceSelect.value;
        const charClass = classSelect.value;
        const background = backgroundSelect.value;

        if (name) {
            player.name = name;
            player.race = race;
            player.class = charClass;
            player.background = background;

            logMessage(`Welcome, ${player.name}, the ${player.race} ${player.class} (${player.background}). Your journey begins.`);
            characterCreation.classList.add("hidden");
            gameContainer.classList.remove("hidden");
            changeScene(currentScene); // Start the first scene
            saveGameState();
        } else {
            logMessage("Please enter a valid name to proceed.");
        }
    });

    // Update character summary in real time
    nameInput.addEventListener("input", () => {
        summaryName.textContent = nameInput.value || "-";
    });
    raceSelect.addEventListener("change", () => {
        summaryRace.textContent = raceSelect.value;
    });
    classSelect.addEventListener("change", () => {
        summaryClass.textContent = classSelect.value;
    });
    backgroundSelect.addEventListener("change", () => {
        summaryBackground.textContent = backgroundSelect.value;
    });

    // Log messages to the game log
    function logMessage(message) {
        const paragraph = document.createElement("p");
        paragraph.textContent = message;
        gameLog.appendChild(paragraph);
        gameLog.scrollTop = gameLog.scrollHeight;
    }

    // Change the current scene and display the description
    function changeScene(sceneName) {
        const scene = scenes[sceneName];
        if (scene) {
            swordSound.play();
            logMessage(scene.description);
            currentScene = sceneName;
            saveGameState();
        } else {
            logMessage("You feel disoriented, unsure of what just happened.");
        }
    }

    // Handle player choices within a scene
    function handleChoice(command) {
        const scene = scenes[currentScene];
        if (scene && scene.choices[command]) {
            setTimeout(() => {
                logMessage(scene.choices[command]);

                // Special transitions for key scenes
                if (currentScene === "chaos" && command === "escape to saltpans") {
                    travelToSaltpans();
                } else if (currentScene === "saltpans" && command === "visit inn") {
                    changeScene("innRumors");
                } else if (currentScene === "saltpans" && command === "explore") {
                    changeScene("raiderEncounter");
                } else if (scene.nextScene) {
                    setTimeout(() => changeScene(scene.nextScene), 1000);
                }
            }, 500);
        } else {
            logMessage("You hesitate, unsure of what to do.");
        }
    }

    // Command to travel to Saltpans from the chaos scene
    function travelToSaltpans() {
        logMessage("After days of cautious travel, you finally reach Saltpans.");
        setTimeout(() => changeScene("saltpans"), 1500);
    }

    // Handle player commands
    function handleCommand(command) {
        logMessage(`> ${command}`);

        if (currentScene && scenes[currentScene]) {
            handleChoice(command);
            return;
        }

        switch (command.toLowerCase()) {
            case "help":
                logMessage("Commands: look, listen, shout, wait, hide, inspect cell door, prepare to fight, call for help, escape to saltpans");
                break;
            default:
                logMessage("That action doesn't make sense here. Try something else.");
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
