let kittens = []
loadKittens()

let defaultAffection = 5
let defaultMood = "tolerant"



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

let kitten = {
  id: generateId(),
  name: form.kitten.value,
  mood: defaultMood,
  affection: defaultAffection
}

// kitten = kittens.find(kitten => kitten?.name == kitten)

if(!kitten) {
  kitten = {
    id: generateId(),
    name: form.kitten.value,
    mood: defaultMood,
    affection: defaultAffection}
}

for (let index = 0; index < kittens.length; index++) {
  const kitten = kittens[index];
  if (form.kitten.value == kitten.name){
    throw Error ("You can't have 2 Cats with the same name!")
  } 
}




kittens.push(kitten)
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
  
  if (storedKittens) {
    kittens = storedKittens
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittensElement = document.getElementById("kittens")
  let kittensTemplate = ""
  kittens.forEach(kitten => {
    kittensTemplate += `
    <div>
      <button class="m-1" onclick="pet('${kitten.id}')">Pet</button>
      <button class="d-flex m-1" onclick="catnip('${kitten.id}')">Catnip</button>
    </div>
      </div>
        <div id="kitten-color" class="kitten ${kitten.mood}">
          <img src="https://placekitten.com/100/100">
            <div>
              <span>Name:</span>
              <span id="kitten">"${kitten.name}"</span>
            </div>
            <div>
              <span>Mood:</span>
              <span id="mood">"${kitten.mood}"</span>
            </div>
            <div>
            <span>Affection:${kitten.affection}</span>
            <span id="affection"></span>
            </div>
        </div>
        <div>
        <button class="btn-cancel m-2" type="button" onclick="removeKitten('${kitten.id}')">remove</button>
        </div>
    `
  })
  kittensElement.innerHTML = kittensTemplate

  // let kittenElement = document.getElementById("kitten")
  // let moodElement = document.getElementById("mood")
  // let affectionElement = document.getElementById("affection")
  // let kittenColorElement = document.getElementById("kitten-color")

  // kittenElement.innerText = currentKitten.toString()
  // moodElement.innerText = currentKitten.mood.toString()
  // affectionElement.innerText = currentKitten.affection.toString()

  
// if(  > 5){
//   kittenColorElement?.classList.remove("tolerant", "angry")
//   kittenColorElement?.classList.add("happy")
// }

// if(kitten.affection < 5){
//   kittenColorElement?.classList.remove("tolerant", "happy")
//   kittenColorElement?.classList.add("angry")
// }

// if(kitten.affection <= 0){
//   kittenColorElement?.classList.remove("tolerant", "happy", "angry")
//   kittenColorElement?.classList.add("gone")
//   let daButton = document.getElementById("pet-button")
// }

}


function removeKitten(kittenId){
  let index = kittens.findIndex(kittens => kittens.id == kittenId)
  if (index == -1) {
    throw new Error("Invalid Kitten")
  }
  kittens.splice(index, 1)
  saveKittens()
}

/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(kittens => kittens.id == id)
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
  let kitten = findKittenById(id)
  
  let i = Math.random()
  
  if(i > .5) {
    kitten.affection ++
  } else {
    kitten.affection --
  }

  if(kitten.affection > 5){
    kitten.mood = "happy"
  } 

  if(kitten.affection < 5){
    kitten.mood = "angry"
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
  let kitten = findKittenById(id)
  let kittenColorElement = document.getElementById("kitten-color")
  for (let index = 0; index < kittens.length; index++) {
    const kitten = kittens[index];
    if (kitten.name === kitten.name){
      kitten.mood = "tolerant"
      kitten.affection = 5
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
  
  if(kitten.affection = 5){
    kitten.mood= "tolerant"
  } else if (kitten.affection < 5){
    kitten.mood= "angry"
  } else if (kitten.affection > 5){
    kitten.mood= "happy"
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
