let kittens = []
loadKittens()

const defaultAffection = 5
const defaultMood = "tolerant"
let currentKitten = {}



/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target

let kitten = form.kitten.value

currentKitten = kittens.find(kitten => kitten?.name == kitten)

if(!currentKitten) {
  currentKitten = {name: kitten, mood: defaultMood, affection: defaultAffection}
}

console.log(currentKitten)

kittens.push(currentKitten)
saveKittens()
form.reset()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  //ANCHOR - Ask Thomas if this is an issue
  if (storedKittens) {
    kittens = storedKittens
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittenElement = document.getElementById("kitten")
  let moodElement = document.getElementById("mood")
  let affectionElement = document.getElementById("affection")
  let kittenColorElement = document.getElementById("kitten-color")

  kittenElement.innerText = currentKitten.name.toString()
  moodElement.innerText = currentKitten.mood.toString()
  affectionElement.innerText = currentKitten.affection.toString()

if(currentKitten.affection > 5){
  kittenColorElement?.classList.remove("tolerant", "angry")
  kittenColorElement?.classList.add("happy")
}

if(currentKitten.affection < 5){
  kittenColorElement?.classList.remove("tolerant", "happy")
  kittenColorElement?.classList.add("angry")
}

if(currentKitten.affection <= 0){
  kittenColorElement?.classList.remove("tolerant", "happy", "angry")
  kittenColorElement?.classList.add("gone")
  let daButton = document.getElementById("pet-button")
  
}

}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  
  let i = Math.random()
  
  if(i > .5) {
    currentKitten.affection ++
  } else {
    currentKitten.affection --
  }

  if(currentKitten.affection > 5){
    currentKitten.mood = "happy"
  } 

  if(currentKitten.affection < 5){
    currentKitten.mood = "angry"
  }

  saveKittens()
  drawKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let kittenColorElement = document.getElementById("kitten-color")
  for (let index = 0; index < kittens.length; index++) {
    const kitten = kittens[index];
    if (kitten.name === currentKitten.name){
      currentKitten.mood = "tolerant"
      currentKitten.affection = 5
      kittenColorElement?.classList.remove("tolerant", "happy", "angry", "gone")
  kittenColorElement?.classList.add("tolerant")
    }
  }
  
  saveKittens()
  drawKittens()
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  if(currentKitten.affection = 5){
    currentKitten.mood= "tolerant"
  } else if (currentKitten.affection < 5){
    currentKitten.mood= "angry"
  } else if (currentKitten.affection > 5){
    currentKitten.mood= "happy"
  }
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens()
}



// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
