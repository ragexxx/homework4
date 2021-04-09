// Declare variables
var timeElapsed = document.querySelector(".time");
var but1 = document.querySelector(".but1");
var but2 = document.querySelector(".check");
var item = document.querySelector(".answer")
but2.style.display = "none";
var secondsUsed = 60;
var currentQuestion = 0;
var askingQuestion = true;
var timerInterval;
var userResult = document.querySelector(".savedValue");
var userResult2 = document.querySelector(".savedTime");

renderLastRegistered();
showResults();

var quiz =
    [
        {
            "question": "Inside which HTML element do we put the JavaScript?",
            "choices": [
                "js",
                "script",
                "javascript",
                "scripting"
            ],
            "correct": "script",
        },
        {
            "question": "What is the correct syntax for referring to an external script called 'xxx.js'?",
            "choices": [
                "script src",
                "script href",
                "script name",
                "script font"
            ],
            "correct": "script src",
        },
        {
            "question": "Where is the correct place to insert a JavaScript?",
            "choices": [
                "Both the HEAD section and the BODY section are correct",
                "The head section",
                "The body section",
                "The inner.html section"
            ],
            "correct": "Both the HEAD section and the BODY section are correct",
        },
    ];

function setTime() {
    // Sets interval in variable
    timerInterval = setInterval(function () {
        if (secondsUsed>0){
            secondsUsed--;
        }
        else if(secondsUsed == 0){
            var item = document.querySelector(".content")
            while (item.firstChild) {
                item.removeChild(item.firstChild)
            }
            location.reload();
            alert("Sorry time is over, start again....")
        }
        timeElapsed.textContent = secondsUsed + " seconds";

    }, 1000);
}

function stopTime() {
    // Sets interval in variable
    clearTimeout(timerInterval);
}

function loadQuestion() {
    //set temporary variable for creating radio buttons
    var radioButton;

    //clear out radio buttons from previous question
    var item = document.querySelector(".content")
    while (item.firstChild) {
        item.removeChild(item.firstChild)
    }

    but2.style.display = "inline";
    //loop through choices, and create radio buttons
    for (var i = 0; i < quiz[currentQuestion]["choices"].length; i++) {

        radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.name = 'quiz';
        radioButton.id = 'choice' + (i + 1);
        radioButton.value = quiz[currentQuestion]["choices"][i];

        //create label tag, which hold the actual text of the choices
        var label = document.createElement('label');
        label.setAttribute('for', 'choice' + (i + 1));
        label.innerHTML = quiz[currentQuestion]["choices"][i];

        //create a <br> tag to separate options
        var br = document.createElement('br');

        //attach them to content. Attach br tag, then label, then radio button
        document.querySelector(".content").insertBefore(br, null);
        document.querySelector(".content").insertBefore(label, br);
        document.querySelector(".content").insertBefore(radioButton, label);
    }

    //load the question
    document.querySelector(".question").innerHTML = quiz[currentQuestion]["question"];
}

function checkAnswer() {
    if (askingQuestion) {

        var userpick;
        var radios = document.getElementsByName('quiz');

        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) { //if this radio button is checked
                userpick = radios[i].value;
            }
        }			//get index of correct answer
        if (userpick == quiz[currentQuestion]["correct"]) {
            item.innerHTML = "Correct Answer";
        }
        else {
            item.innerHTML = "Incorrect Answer";
            secondsUsed = secondsUsed - 10;
            clearInterval(secondsUsed);
        }

        if (currentQuestion < 2) {
            currentQuestion++;
            radioButton = '';     
            loadQuestion();
        }
        else {
            but2.style.display = "none";
            showResults();
            stopTime();
            askingQuestion = false;
        }    
    }
}

function showResults() {
    var x = document.querySelector(".result")
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function renderLastRegistered() {
    var input = localStorage.getItem("savedValue");
    var input2 = localStorage.getItem("savedTime");

    if (!input && input2) {
        return;
    }
    console.log("Initials: " + input + " Time: " + input2);
    userResult.textContent = input;
    userResult2.textContent = input2;
}

function saveData(e) {
    var input = document.querySelector(".initials").value;

    if (input == "") {
        alert("Please put your initials....");
        e.preventDefault();
        return false;
    }
    else {
        localStorage.setItem("savedValue", input);
        localStorage.setItem("savedTime", secondsUsed);
        renderLastRegistered();
        return true;
    }
}

function startQuiz() {
    but1.style.display = "none";
    setTime();
    loadQuestion();
}




