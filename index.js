// IMPORT FROM FIREBASE DATABASE 
import { initializeApp } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

 import { getDatabase, ref, push, onValue, remove } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-8ad13-default-rtdb.europe-west1.firebasedatabase.app/"
}


// FIREBASE INITIALIZATION
const app = initializeApp(appSettings)

const database = getDatabase(app)

const shopplingListInDB = ref(database, "shoppingList")


// INITITALIZATION
const inputEl = document.getElementById("input-el")

const addBtn = document.getElementById("add-btn")

const UlEl = document.getElementById("ul-list")




// ADD BTN CLICK EVENTLISTENER
addBtn.addEventListener("click", function() {
    let inputValue = inputEl.value

    if (inputValue != "") {
        // PUSH INPUT VALUE INTO REFERENCE DATABASE WITH PUSH FIREBASE FUNCTION
        push(shopplingListInDB, inputValue)
    
    
        // CLEARING INPUT TEXT
        clearInputText()
    }
})


// INPUT ELEMENT ENTER KEYPRESS EVENTLISTENER
inputEl.addEventListener("keypress", function(event) {
    if (event.key === "Enter"){
        let inputValue = inputEl.value

        if (inputValue != "") {
            // PUSH INPUT VALUE INTO REFERENCE DATABASE WITH PUSH FIREBASE FUNCTION
            push(shopplingListInDB, inputValue)
        
        
            // CLEARING INPUT TEXT
            clearInputText()
        }
    }
})



// FIREBASE ON VALUE THAT RUNS ANYTIME THERE IS CHANGES IN THE DATABASE
onValue(shopplingListInDB, function(snapshot) {
    if (snapshot.exists()) {
         // TURNING DATABSE OBJECT INTO AN ARRAY
        let shoppingListArr = Object.entries(snapshot.val())

        // CLEARING UL ELEMENTS TO DISPLAY LATEST ITEMS IN DATABASE
        ClearUlElement()

        // LOOPING THROUGH SHOPPING LIST ARRAY TO DISPLAY ITEMS FROM DATABASE IN UL ELEMENT
        for ( let i = 0; i < shoppingListArr.length; i++) {
            let shoppingList = shoppingListArr[i]

        appendInputValueToUlElement(shoppingList)
    }
    } else {
        UlEl.innerHTML = `No Items added yet!`
    }
})



// FUNCTION TO APPEND INPUT VALUE TO UL ELEMET
function appendInputValueToUlElement(inputItem) {
    let inputItemID = inputItem[0]
    let inputItemValue = inputItem[1]


    // CREATING NEW LI ELEMENT AND APPENDING TO UL ELEMENT
    let newEl = document.createElement("li")

    newEl.textContent = inputItemValue

    UlEl.append(newEl)

    // NEW LI ELEMENT CLICK EVENTLISTENER TO REMOVE ITEM FROM REFERENCE DATABASE
    newEl.addEventListener("click", function() {
        // GETTING EXACT LOCATION AND ITEM ID IN REFERENCE DATABASE 
        let exactLocationInDB = ref(database, `shoppingList/${inputItemID}`)

        // CALLING FIREBASE REMOVE FUNCTION TO REMOVE ITEM FROM DATABASE
        remove(exactLocationInDB)
    })
}



// FUNCTION TO CLEAR INPUT TEXT
function clearInputText () {
    inputEl.value = ""
}


// FUNCTION TO CLEAR UL ELEMENT 
function ClearUlElement() {
    UlEl.innerHTML = ""
}


