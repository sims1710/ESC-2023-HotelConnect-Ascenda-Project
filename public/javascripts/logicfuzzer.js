//FUZZER FUNCTION to test feature 1 autocomplete destination feature 

// Function to generate random search text
function generateRandomSearchText(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result.trim(); // Trim to remove leading/trailing spaces
}
  
// Fuzzer function for searchDest
function searchDestFuzzer() {
    let randomSearchText;
    var probability = [0, 1];
    var random_prob = probability[Math.round(Math.random())];
    if (random_prob===0){
        randomSearchText = generateRandomSearchText(2); // Adjust length 
    }
    else{
        var probability = [0, 1];
        var random_prob = probability[Math.round(Math.random())];
        if(random_prob===0){
            randomSearchText = " "; //send empty string
        }
        else{
            randomSearchText = generateRandomSearchText(10); //change to random length
        }
    }
    console.log(`Fuzzing searchDest with input: "${randomSearchText}"`);
    searchDest(randomSearchText);
}
  
//fuzzer function testing with actualy destination values
/*function generateRandomStates(){
    var states = [
        'Bali, Indonesia',
        'Paris, France',
        'Stratford, United Kingdom',
        'Barcelona, Spain',
        'Istanbul, Turkey',
        'Alicante, Spain',
        'Paris, France (ORY-Orly)',
        'Denpasar, Indonesia (DPS-Ngurah Rai Intl.)',
        'Paris, France (CDG-Roissy-Charles de Gaulle)'
    ]
    var random_state = states[Math.floor(Math.random() * states.length)];
    return random_state;
}

function searchDestFuzzerWithActualData(){
    const state = generateRandomStates();
    console.log(`Fuzzing searchDest with input: "${state}"`);
    searchDest(state);
}*/

// Call the fuzzer multiple times

for (let i = 0; i < 20; i++) {
    //searchDestFuzzerWithActualData();
    searchDestFuzzer();
    console.log(`Done: ${i}`);
}