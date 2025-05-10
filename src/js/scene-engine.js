// Scene Engine to manage story progression
const scenes = {
    // Act I: The Escape - Awakening in the Dark Cell
    "awakening": {
        description: "You awaken in a dark, cold cell. Chains rattle in the distance. You hear muffled screams and the distant roar of flames.",
        choices: {
            "look": "The stone walls are damp and cracked. A single torch flickers just beyond the bars.",
            "listen": "You hear footsteps approaching, followed by a guard’s gruff voice.",
            "shout": "Your voice echoes but quickly fades. A prisoner down the hall curses at you.",
            "wait": "You sit still, feeling your heartbeat quicken as chaos brews outside."
        },
        nextScene: "chaos"
    },

    // Act I: Chaos and Breakout
    "chaos": {
        description: "Suddenly, the sound of clashing steel and screaming prisoners erupts. A fire breaks out down the hall.",
        choices: {
            "hide": "You crawl into the darkest corner, trying to remain unseen.",
            "call for help": "You shout, but your voice is drowned by the chaos.",
            "inspect cell door": "The rusted iron door rattles but remains firmly locked.",
            "prepare to fight": "You grab a loose chain from the wall, ready for whoever comes.",
            "escape to saltpans": "You find an unguarded exit and slip into the night, heading southeast."
        },
        nextScene: "saltpans"
    },

    // Act II: Saltpans - A Hub of Survival
    "saltpans": {
        description: "You arrive at Saltpans, a coastal town struggling to rebuild. The air smells of salt and ash. Villagers eye you warily.",
        choices: {
            "explore": "You walk through the muddy streets, seeing makeshift shelters and fishermen mending nets.",
            "talk to guard": "A weary guard tells you that raiders still plague the outskirts, and the townsfolk are divided over how to rebuild.",
            "visit inn": "The inn is bustling with chatter. You hear rumors of pirates and strange lights near the sept.",
            "help rebuild": "A group of villagers gratefully accept your assistance in reinforcing the town's defenses.",
            "search for supplies": "You find a few usable tools and some spoiled food in a burned-out house.",
            "talk to elder": "The village elder warns you of the ghostly flames seen at Harrenhal.",
            "visit market": "Stalls are set up with basic supplies. A merchant tries to sell you rusty tools.",
            "rest at camp": "You find a makeshift camp where travelers share stories of distant lands."
        },
        nextScene: null
    },

    // Act II: Saltpans - Raider Encounter
    "raiderEncounter": {
        description: "A group of raiders blocks the road, brandishing crude weapons.",
        choices: {
            "fight": "You draw your weapon, ready to defend yourself.",
            "negotiate": "You raise your hands and try to reason with them.",
            "hide": "You quickly take cover behind a stack of crates.",
            "flee": "You dart down a side alley, hoping to lose them."
        },
        nextScene: "saltpans"
    },

    // Act II: Saltpans - Inn Rumors
    "innRumors": {
        description: "You overhear a drunk sailor mumbling about fire cultists gathering near the sept.",
        choices: {
            "confront sailor": "You approach him, but he shrugs and mutters something unintelligible.",
            "ask the innkeeper": "The innkeeper warns you to stay away from the sept at night.",
            "listen quietly": "You stay in the shadows, gathering information.",
            "ignore": "You decide not to get involved."
        },
        nextScene: "saltpans"
    },

    // Act III: Return to Harrenhal (Setup for Final Act)
    "returnToHarrenhal": {
        description: "With new allies and strength, you journey back to Harrenhal. The once-ruined castle now burns with eerie flames, and wraiths haunt its halls.",
        choices: {
            "enter castle": "You push open the scorched gates, ready to confront the darkness.",
            "scout area": "You circle around, looking for a less guarded entry.",
            "call out": "Your voice echoes, but only the wind responds.",
            "wait": "You steel yourself, gathering your courage."
        },
        nextScene: "finalConfrontation"
    },

    // Act III: Final Confrontation - Ghost of Harrenhal
    "finalConfrontation": {
        description: "In the throne room of ash, the Ghost of Harrenhal awaits. A skeletal, flaming shadow looms, bound in broken Valyrian armor.",
        choices: {
            "attack": "You charge forward, weapon in hand.",
            "speak": "You attempt to communicate with the spectral figure.",
            "use magic item": "You draw forth the amulet found in the sept.",
            "retreat": "The oppressive presence makes you hesitate, reconsidering your plan."
        },
        nextScene: null
    }
};

// Manage scene changes and player inputs
function changeScene(sceneName) {
    const scene = scenes[sceneName];
    if (scene) {
        logMessage(scene.description);
        currentScene = sceneName;
        saveGameState(); // Save game state after every scene change
    } else {
        logMessage("You feel disoriented, unsure of what just happened.");
    }
}

// Handle player's choices within the current scene
function handleChoice(command) {
    const scene = scenes[currentScene];
    if (scene && scene.choices[command]) {
        setTimeout(() => {
            logMessage(scene.choices[command]);

            // Special transitions or conditions
            if (currentScene === "saltpans" && command === "visit inn") {
                changeScene("innRumors");
            } else if (currentScene === "saltpans" && command === "explore") {
                changeScene("raiderEncounter");
            }

            // Transition to the next scene if defined
            if (scene.nextScene) {
                setTimeout(() => changeScene(scene.nextScene), 1000);
            }
        }, 500); // Small delay for realism
    } else {
        logMessage("You hesitate, unsure of what to do.");
    }
}
