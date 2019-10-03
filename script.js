$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})

// Open a modal to prompt the chooser to pick at least one criteria.
function openModal() {
    $(document).ready(function() {
        $("#myModal").modal();
    });
}

var passLength;
document.getElementById("submit").addEventListener("click", validateForm);

// Validate user form for making sure password length fits criteria and that at least one character type criteria is selected.
function validateForm() {
    passLength = document.getElementById("passLength").value;
    var invalidLength = document.getElementById("invalid-length");
    var invalidCheck = document.getElementById("invalid-check");
    var checkbox = document.getElementsByClassName("form-check-input");
    var check = false;
    var bothValidated = 0;
    event.preventDefault();

    // Loop through checkboxes to see if they are checked or not.
    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            check = true;
        }
    }

    // Validate that the user has inputted a password length between 8 and 128.
    if (isNaN(passLength) || passLength < 8 || passLength > 128) {
        invalidLength.textContent = "Please enter a number 8 through 128.";
    } else {
        invalidLength.textContent = "";
        bothValidated++;
    }

    // Validate that the user has checked at least one character type.
    if (check === false) {
        invalidCheck.textContent = "Please select at least one character type.";
    } else {
        invalidCheck.textContent = "";
        bothValidated++;
    }

    // Generate the password if both length and character type have been validated.
    if (bothValidated === 2) {
        generatePassword();
        bothValidated = 0;
    }
    
}
    
// Creates an array of special characters.
var specialCharacters = ["@", "%", "+", "\\", "/", "'", "!", "#", "$", "^", "?", ":", ",", "(", ")", "{", "}", "[", "]", "~", "`", "-", "_", "."];
// Creates an array of single-digit numbers.
var numericalCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
// Creates an array of lowercase characters.
var lowercaseCharacters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
// Creates an array of uppercase characters.
var uppercaseCharacters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

// Creates an array for password characters equal to the user-inputted length, which will later be randomly sorted to create a more random password.
var password = [];
function createPassArray() {
    for (var i = 0; i < passLength; i++) {
        password.push("");
    }
}

// Generates the password
var textarea = document.getElementById("password");

var specCharsChecked = document.getElementById("specChars");
var numCharsChecked = document.getElementById("numChars");
var lowCharsChecked = document.getElementById("lowChars");
var uppCharsChecked = document.getElementById("uppChars");
var arrayOfCharsChosen = [];
var arrayOfRandomPassword = [];
var numberOfCriteriaChecked = 0;

function generatePassword() {
    event.preventDefault();
    $('#myModal').modal('hide');
    createPassArray();

    // Create an array out of all the characters chosen through the checkbox criteria.
    // arrayOfRandomPassword.push(array of characters [Math.floor(Math.random() * array of characters.length)]) is to ensure that at least one of each character is in the password if selected.
    if (specCharsChecked.checked) {
        for (var i = 0; i < specialCharacters.length; i++) {
            arrayOfCharsChosen.push(specialCharacters[i]);
        }
        arrayOfRandomPassword.push(specialCharacters[Math.floor(Math.random() * specialCharacters.length)]);
        numberOfCriteriaChecked++;
    }

    if (numCharsChecked.checked) {
        for (var i = 0; i < numericalCharacters.length; i++) {
            arrayOfCharsChosen.push(numericalCharacters[i]);
        }
        arrayOfRandomPassword.push(Math.floor(Math.random() * 10))
        numberOfCriteriaChecked++;
    }

    if (lowCharsChecked.checked) {
        for (var i = 0; i < lowercaseCharacters.length; i++) {
            arrayOfCharsChosen.push(lowercaseCharacters[i]);
        }
        arrayOfRandomPassword.push(lowercaseCharacters[Math.floor(Math.random() * lowercaseCharacters.length)]);
        numberOfCriteriaChecked++;
    }

    if (uppCharsChecked.checked) {
        for (var i = 0; i < uppercaseCharacters.length; i++) {
            arrayOfCharsChosen.push(uppercaseCharacters[i]);
        }
        arrayOfRandomPassword.push(uppercaseCharacters[Math.floor(Math.random() * uppercaseCharacters.length)]);
        numberOfCriteriaChecked++;
    }

    // Pick passLength number of random characters from the arrayOfCharsChosen.
    for (var i = 0; i < passLength - numberOfCriteriaChecked; i++) {
        var random = Math.floor(Math.random() * arrayOfCharsChosen.length) + 1;
        arrayOfRandomPassword.push(arrayOfCharsChosen[random]);
    }

    shuffle(arrayOfRandomPassword);

    // Make the arrayOfRandomPassword into a stringOfRandomPassword.
    var stringOfRandomPassword = arrayOfRandomPassword.join("");

    // Change the textarea to be the newly created password.
    textarea.textContent = stringOfRandomPassword;
}

// Shuffle the array, randomPassword, since first couple are guaranteed to match whatever has been checked.
// Use Fisher-Yates shuffle.
function shuffle(array) {
    var currentIndex;
    var tempChar;
    var randomIndex;

    for (var currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        tempChar = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempChar;
    }

    return array;
}

// Make the button copy the password to clipboard.
function copyToClipboard() {
    var copiedText = document.getElementById("password");
    copiedText.focus();
    copiedText.select();
    document.execCommand("copy");
}