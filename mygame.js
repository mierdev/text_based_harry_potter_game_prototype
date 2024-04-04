// GLOBAL VARIABLES

// let declarations
let playerXP = 0;
let playerHealth = 100;
let maxPlayerHealth = 100;
let playerGold = 50;
let currentAmountOfHealthPotions = 0;
let maxAmountOfHealthPotions = 3;
let healthPotionPrice = 15;
let healthPotionStrength = 25;
let wizardsBag = ["Petrificus Totalus"];
let currentSpellIndex = 0;
let spellPrice = 30;
let duelingWith;
let evilWizardHealth;

// const declarations > hud
const hudPlayerXP = document.querySelector("#player-xp");
const hudPlayerHealth = document.querySelector("#player-health");
const hudPlayerGold = document.querySelector("#player-gold");
const hudPlayerAction1 = document.querySelector("#player-action-1");
const hudPlayerAction2 = document.querySelector("#player-action-2");
const hudPlayerAction3 = document.querySelector("#player-action-3");
const hudEvilWizardStats = document.querySelector("#evil-wizard-stats");
const hudEvilWizardName = document.querySelector("#evil-wizard-name");
const hudEvilWizardHealth = document.querySelector("#evil-wizard-health");
const hudStory = document.querySelector("#story");
const hudHiddenPanel1 = document.querySelector("#hidden-panel-1");
const hudHiddenPanel2 = document.querySelector("#hidden-panel-2");
const hudDetailsLabel3 = document.querySelector("#details-label-3");
const hudDetailsLabel4 = document.querySelector("#details-label-4");
const hudDetails1 = document.querySelector("#details-1");
const hudDetails2 = document.querySelector("#details-2");
const hudDetails3 = document.querySelector("#details-3");
const hudDetails4 = document.querySelector("#details-4");
const winEmoticon = document.querySelector("#win-emoticon");
const loseEmoticon = document.querySelector("#lose-emoticon");

// const declarations > game
const locations = {
  restart: {
    name: "Restart",
    buttonText: ["Go to Hogwarts", "Go to Hogsmeade", "Duel Lord Voldemort"],
    buttonFunctions: [goToHogwarts, goToHogsmeade, duelLordVoldemort],
    story: "Welcome to the Wizarding World! You must defeat the evil wizard Lord Voldemort, who threatens all Muggles and those who help them.\n\nYou are at the Train Station. Where do you want to go? Use the buttons above to start your adventure."
  },
  trainStation: {
    name: "Train Station",
    buttonText: ["Go to Hogwarts", "Go to Hogsmeade", "Duel Lord Voldemort"],
    buttonFunctions: [goToHogwarts, goToHogsmeade, duelLordVoldemort],
    story: "You're back at the Train Station. Where do you want to go?"
  },
  hogwarts: {
    name: "Hogwarts",
    buttonText: ["Duel Draco", "Duel Death Eater", "Go to Hogsmeade"],
    buttonFunctions: [duelDraco, duelDeathEater, goToHogsmeade],
    story: "Hogwarts is under attack, all protection spells are down! Everyone is looking at you to defend them."
  },
  hogsmeade: {
    name: "Hogsmeade",
    buttonText: ["Go to Wizard Shop", "Go to Hogwarts", "Duel Lord Voldemort"],
    buttonFunctions: [goToWizardShop, goToHogwarts, duelLordVoldemort],
    story: "You enter Hogsmeade, a small atmospheric wizards village. When looking around you spot a shop."
  },
  duel: {
    name: "Duel",
    buttonText: ["Use Spell (attack)", "Use Potion (heal)", "Apparate (run)"],
    buttonFunctions: [useSpell, usePotion, goToTrainStation],
    story: "You choose to defend Hogwarts, so you prepare yourself for a wizards duel."
  },
  wizardShop: {
    name: "Wizard Shop",
    buttonText: ["Buy New Spell (30 gold)", "Buy Healing Potion (15 gold)", "Go back to Hogsmeade"],
    buttonFunctions: [buySpell, buyPotion, goToHogsmeade],
    story: "You are in a shop with Wizard Supplies."
  },
  wonDuel: {
    name: "Won Duel",
    buttonText: ["Regroup at Hogsmeade", "Regroup at Hogsmeade", "Regroup at Hogsmeade"],
    buttonFunctions: [goToHogsmeade, easterEgg, goToHogsmeade],
    story: "You've defeated your enemy! You gain some XP and gold in return. Time to regroup at Hogsmeade."
  },
  easterEgg: {
    name: "Easter Egg",
    buttonText: ["Pick Three", "Pick Seven", "I don't like fortune tellers"],
    buttonFunctions: [pickThree, pickSeven, goToHogsmeade],
    story: "You find a secret game!\n\nA fortune teller will gaze into the future to foretell ten random numbers between 0 and 10.\n\nPick a number above.\n\nIf the number you choose matches one of the foretold numbers, you win. If not, well..."
  },
  winner: {
    name: "Winner",
    buttonText: ["Restart game?", "Restart game?", "Restart game?"],
    buttonFunctions: [restartGame, restartGame, restartGame],
    story: "You win!"
  },
  loser: {
    name: "Loser",
    buttonText: ["Restart game?", "Restart game?", "Restart game?"],
    buttonFunctions: [restartGame, restartGame, restartGame],
    story: "Game over..."
  }
};
const evilWizards = {
  draco: { name: "Draco Malfoy", health: 15, power: 2 },
  deathEater: { name: "a Death Eater", health: 75, power: 11 },
  voldemort: { name: "Lord Voldemort", health: 300, power: 20 }
};
const spells = [  
  { name: "Petrificus Totalus", power: 5 },  // spells[0]
  { name: "Stupefy", power: 30 },  // spells[1]
  { name: "Reducto", power: 50 },  // spells[2]
  { name: "Expelliarmus", power: 100 }  // spells[3]
];


// INITIALIZE GAME

// initialize buttons
hudPlayerAction1.onclick = goToHogwarts;
hudPlayerAction2.onclick = goToHogsmeade;
hudPlayerAction3.onclick = duelLordVoldemort;

// restart game after winning/losing
function restartGame() {  
  playerXP = 0;
  hudPlayerXP.innerText = playerXP;
  playerHealth = 100;
  hudPlayerHealth.innerText = playerHealth
  playerGold = 50;
  hudPlayerGold.innerText = playerGold;
  currentAmountOfHealthPotions = 0;
  hudDetails2.innerText = currentAmountOfHealthPotions;
  wizardsBag = ["Petrificus Totalus"];
  currentSpellIndex = 0;
  hudDetails1.innerText = spells[0].name;
  update(locations.restart);
}


// UPDATE GAME

// update hud
function update(currentLocation) {
  showHiddenPanels(false, false);
  hudPlayerAction1.innerText = currentLocation.buttonText[0];
  hudPlayerAction2.innerText = currentLocation.buttonText[1];
  hudPlayerAction3.innerText = currentLocation.buttonText[2];
  hudPlayerAction1.onclick = currentLocation.buttonFunctions[0];
  hudPlayerAction2.onclick = currentLocation.buttonFunctions[1];
  hudPlayerAction3.onclick = currentLocation.buttonFunctions[2];
  hudStory.innerText = currentLocation.story; 
}

// show hidden details panels and evil wizard stats
function showHiddenPanels(showEvilWizardStats, showDetailsPanels) {
  // show evil wizard stats
  if (showEvilWizardStats === true) {
    hudEvilWizardStats.style.display = "block";
  } else {
    hudEvilWizardStats.style.display = "none";
  }

  // show details panels
  if (showDetailsPanels === true) {
    hudHiddenPanel1.style.display = "block";
    hudHiddenPanel2.style.display = "block";
  } else {
    hudHiddenPanel1.style.display = "none";
    hudHiddenPanel2.style.display = "none";
  }
}


// TRAVEL

// go to train station
function goToTrainStation() {
  update(locations.trainStation);
}

// go to hogwarts school for wizards
function goToHogwarts() {
  update(locations.hogwarts);
}

// go to hogsmeade village
function goToHogsmeade() {
  update(locations.hogsmeade);
}

// go to wizard shop
function goToWizardShop() {
  update(locations.wizardShop);
}


// SHOPPING

// buy a stronger spell
function buySpell() {
  // check if you can still learn a new spell
  if (currentSpellIndex < spells.length - 1) {
    // check if player has enough gold
    if (playerGold >= spellPrice) {
      // if yes pay gold and learn a new spell
      currentSpellIndex++;
      playerGold -= spellPrice;
      hudPlayerGold.innerText = playerGold;
      hudStory.innerText = "You pay " + spellPrice + " gold to learn a new spell." + "\n\n"
      let newSpell = spells[currentSpellIndex].name;
      wizardsBag.push(newSpell);
      hudStory.innerText += " In your wizards bag you have:" + "\n" + wizardsBag.join(", ") + " and " + currentAmountOfHealthPotions + " health potion(s)."
      hudDetails1.innerText = spells[currentSpellIndex].name;
    } else {
      // if no inform player that they need more gold
      hudStory.innerText = "You don't have enough gold to buy a new spell."
    }
  } else {
      // if no inform player that they already have the strongest spell
      hudStory.innerText = "You already know the strongest spell. But you could sell a weaker one...";
      hudPlayerAction1.innerText = "Sell Spell (15 gold)";
      hudPlayerAction1.onclick = sellSpell;
  }
}

// sell a weaker spell
function sellSpell () {
  if (wizardsBag.length > 1) {
    playerGold += 15;
    hudPlayerGold.innerText = playerGold;
    let spellSold = wizardsBag.shift();  // removes first item from array, and returns it
    hudStory.innerText = " You sold the " + spellSold + " spell." + "\n\n";
    hudStory.innerText += " In your wizards bag you have:" + "\n" + wizardsBag.join(", ") + " and " + currentAmountOfHealthPotions + " health potion(s)."
  } else {
    hudStory.innerText = " Don't sell your only spell!"
  }
}

// buy a health potion
function buyPotion() {
  // check if player can carry more potions
  if (currentAmountOfHealthPotions < maxAmountOfHealthPotions) {
    // check if player has enough gold
    if (playerGold >= healthPotionPrice) {
      // if yes pay gold and add 1 more potion
      currentAmountOfHealthPotions++;
      playerGold -= healthPotionPrice;
      hudPlayerGold.innerText = playerGold;
      hudStory.innerText = "You pay " + healthPotionPrice + " gold to buy a healing potion." + "\n\n";
      hudStory.innerText += " In your wizards bag you have:" + "\n" + wizardsBag.join(", ") + " and " + currentAmountOfHealthPotions + " health potions."
      hudDetails2.innerText = currentAmountOfHealthPotions;
    } else {
      // if no inform player they need more gold
      hudStory.innerText = "You don't have enough gold to buy a potion.";
    }
  } else {
    // if no inform player that they have the max amount of potions
    hudStory.innerText = "You can't carry more than " + maxAmountOfHealthPotions + " potions.";
  }
}


// DUELS

// duel draco
function duelDraco() {
  duelingWith = evilWizards.draco;
  goDuel();
}

// duel death eater
function duelDeathEater() {
  duelingWith = evilWizards.deathEater;
  goDuel();
}

// duel lord voldemort
function duelLordVoldemort() {
  duelingWith = evilWizards.voldemort;
  goDuel();
}

// dueling functionality
function goDuel() {
  update(locations.duel);
  showHiddenPanels(true, false);
  hudEvilWizardName.innerText = duelingWith.name;
  hudEvilWizardHealth.innerText = duelingWith.health;
  evilWizardHealth = duelingWith.health
  hudStory.innerText += "\n\n" + "You turn to face " + duelingWith.name + ". What will you do?";
}


// DUELING ACTIONS

// use offensive spell
function useSpell() {
  showHiddenPanels(true, true);
  hudDetailsLabel3.innerText = "Hit:";
  hudDetailsLabel4.innerText = "Damage:";
  doDamage();
  receiveDamage();
  winOrLoseOrContinue();
}

// do damage
function doDamage() {
  if (didSpellHit()) {
    let hit = spells[currentSpellIndex].power + Math.floor(1 + (Math.random() * playerXP));
    evilWizardHealth -= hit;
    hudEvilWizardHealth.innerText -= spells[currentSpellIndex].power;
    hudDetails3.innerText = "Your spell hits your enemy with " + hit + " power.";
  } else {
    hudDetails3.innerText = "Your spell missed.";
  }
}

// check if spell hits
function didSpellHit() {
  return Math.random() > .2 || playerHealth < 20;
}

// receive damage
function receiveDamage() {
  if (evilWizardHealth > 0) {
    playerHealth -= getSpellDamageValue(duelingWith.power);
    hudPlayerHealth.innerText = playerHealth;
  }
}

// get spell damage value for evil wizard
function getSpellDamageValue(power) {
  const hit = Math.floor((power * (1 + (Math.random() * 3.5))) - (Math.random() * playerXP));
  hudDetails4.innerText = "You've taken " + hit + " damage points in return.";
  return hit > 0 ? hit : 0;  // if hit > 0 then return hit, else return 0
}

// win? lose? continue?
function winOrLoseOrContinue() {
  // check if the player still has health
  if (playerHealth <= 0) {
    // if true then game over
    hudDetails3.innerText = "You tried your very best, but sadly..."
    hudDetails4.innerText = "...their attack zapped all your remaining strength!"
    loseGame();
  // check if player has beaten the final boss
  } else if (duelingWith === evilWizards.voldemort && evilWizardHealth <= 0) {
    // if yes then player wins game
    showHiddenPanels(false, false);
    winGame();
  // check if player has defeated a normal evil wizard
  } else if (evilWizardHealth <= 0) {
    // if yes then go to won duel state
    update(locations.wonDuel);
    showHiddenPanels(false, true);
    // xp gained
    let xpGained = duelingWith.power + Math.floor(Math.random() * duelingWith.power);
    hudDetailsLabel3.innerText = "XP gained:";
    hudDetails3.innerText = "You gain " + xpGained + " experience points for winning.";
    playerXP += xpGained;
    hudPlayerXP.innerText = playerXP;
    // gold gained
    let goldGained = duelingWith.power + Math.floor(Math.random() * (duelingWith.power * 2));
    hudDetailsLabel4.innerText = "Gold stolen:";
    hudDetails4.innerText = " You also robbed your enemy of " + goldGained + " gold!";
    playerGold += goldGained;
    hudPlayerGold.innerText = playerGold;
  } else {
  // if player is still dueling 
    hudStory.innerText = "Spells are flying around! The duel is becoming intense."
    // if random number is 0.1 or below, and player knows more than 1 spell
    if (Math.random() <= .075 && wizardsBag.length !== 1) {
      // player forgets their most powerfull spell
      hudStory.innerText += "\n\nYou get confused and forget your " + wizardsBag.pop() + " spell...";
      currentSpellIndex--;
      hudDetails1.innerText = spells[currentSpellIndex].name;
    }
  }
}

// use health potion
function usePotion() {
  showHiddenPanels(true, false);
  //check if you have a potion
  if (currentAmountOfHealthPotions > 0) {
    // check if you're health is lower than the maximum
    if (playerHealth < maxPlayerHealth) {
      // check if adding a potion would pass the maximum health
      if (playerHealth > maxPlayerHealth - healthPotionStrength) {
        // if yes then set player health to maximum
        playerHealth = maxPlayerHealth;
        hudPlayerHealth.innerText = playerHealth;
        currentAmountOfHealthPotions--;
        hudDetails2.innerText = currentAmountOfHealthPotions;
        hudStory.innerText = " You're health has been restored to the maximum of 100.";
      } else {
        // otherwise add the potion strength to the current health number
        playerHealth = playerHealth + healthPotionStrength;
        hudPlayerHealth.innerText = playerHealth;
        currentAmountOfHealthPotions--;
        hudDetails2.innerText = currentAmountOfHealthPotions;
        hudStory.innerText = " You're health has increased with " + healthPotionStrength + ". It is now " + playerHealth + ".";
      }
    } else {
      // if no inform player that the potion won't do anything
      hudStory.innerText = "You're trying to use a potion, but it won't have any effect. Please save the potion for later!";
    }
  } else {
    // if no inform player that they don't have any potions
    hudStory.innerText = "You're trying to use a potion, but you don't have any...";
  }
}


// EASTER EGG

// setup easter egg screen (a game within a game)
function easterEgg() {
  update(locations.easterEgg);
}

// guess number 3
function pickThree() {
  pick(3);
}

// guess number 7
function pickSeven() {
  pick(7);
}

// number guessing game
function pick(guess) {
  // setup buttons to return to hogsmeade
  hudPlayerAction1.innerText = "Return to Hogsmeade";
  hudPlayerAction2.innerText = "Return to Hogsmeade";
  hudPlayerAction3.innerText = "Return to Hogsmeade";
  hudPlayerAction1.onclick = goToHogsmeade;
  hudPlayerAction2.onclick = goToHogsmeade;
  hudPlayerAction3.onclick = goToHogsmeade;
  // create empty array to store random numbers
  const randomNumbers = [];
  // generate 10 random numbers
  while (randomNumbers.length < 10) {
    // pick a number between 0 and 10 and push it into array
    randomNumbers.push(Math.floor(Math.random() * 11));
  }
  // give player an overview of the random numbers that were picked
  hudStory.innerText = "You guessed " + guess + ".\n\nYour lucky numbers are (drumroll please):" + "\n";
  // go through array one by one and print the number to the screen
  for (let luckyNumber = 0; luckyNumber < 10; luckyNumber++) {
    hudStory.innerText += randomNumbers[luckyNumber] + "\n";
  }
  // if player guessed right
  if (randomNumbers.includes(guess)) {
    // win 20 gold
    hudStory.innerText += "\nRIGHT! You win 20 gold!";
    playerGold += 20;
    hudPlayerGold.innerText = playerGold;
  // if player guessed wrong
  } else {
    // lose 10 health
    hudStory.innerText += "\nWRONG! You lose 10 health!";
    playerHealth -= 10;
    hudPlayerHealth.innerText = playerHealth;
  }
  // in health player health becomes 0 or less
  if (playerHealth <= 0) {
    // lose the game
    loseGame();
  }
}



// END OF GAME

// win game
function winGame() {
  update(locations.winner);
  story.innerText += winEmoticon.innerText;
  showHiddenPanels(true, true);
}

// lose game
function loseGame() {
  playerHealth = 0;
  hudPlayerHealth.innerText = playerHealth;
  update(locations.loser);
  story.innerText += loseEmoticon.innerText;
  showHiddenPanels(true, true);
}
