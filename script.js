// Dropdown menu
function drop() {
    // Shows/hides dropdown content when icon is pressed
    if (document.getElementById("dropContent").style.display == "block") {
        document.getElementById("dropContent").style.display = "none";
    }
    else {
        document.getElementById("dropContent").style.display = "block";
    }
}

// Questions

let questions = [
    {category: "geography", question: "Vad heter Argentinas huvudstad?", answers: ["Oslo", "Lima", "Buenos Aires", "Stockholm"], correctIndex: "3", image: "images/buenos.jpg", categoryImg: "images/geography.png"},
    {category: "geography", question: "Vad heter Afrikas högsta berg?", answers: ["Kilimanjaro", "Kebenkaise", "Mount Kenya", "Mont Blanc"], correctIndex: "1", image: "images/kilimanjaro.jpg", categoryImg: "images/geography.png"},
    {category: "geography", question: "I vilket land är Zagreb huvudstad?", answers: ["Serbien", "Montenegro", "Grekland", "Kroatien"], correctIndex: "4", image: "images/genericGeography.jpg", categoryImg: "images/geography.png"},
    {category: "geography", question: "Vilket land gränsar inte till Frankrike?", answers: ["Tyskland", "Nederländerna", "Spanien", "Belgien"], correctIndex: "2", image: "images/genericGeography.jpg", categoryImg: "images/geography.png"},
    {category: "science", question: "Vad heter ämnet med den kemsika formeln CO?", answers: ["Koldioxid", "Kolmonoxid", "Koltrioxid", "Vatten"], correctIndex: "2", image: "images/genericScience.jpg", categoryImg: "images/science.png"},
    {category: "science", question: "Vilken av följande kolhydrater är en disackarid?", answers: ["Glukos", "Fruktos", "Stärkelse", "Laktos"], correctIndex: "4", image:"images/genericScience.jpg", categoryImg: "images/science.png"},
    {category: "science", question: "Vad säger Newtons andra lag?", answers: ["U=RI", "F=ma", "Det är samma", "E = cmT"], correctIndex: "2", image: "images/genericScience.jpg", categoryImg: "images/science.png"},
    {category: "science", question: "Vad heter den minsta planeten i solsystemet?", answers: ["Venus", "Solen", "Jorden", "Merkurius"], correctIndex: "4", image: "images/genericScience.jpg", categoryImg: "images/science.png"},
    {category: "civics", question: "Vad heter Sveriges statsminister?", answers: ["Magdalena Andersson", "Stefan Löfven", "Ove Stenmark", "Ulf Kristersson"], correctIndex: "4", image: "images/genericCivics.jpg", categoryImg: "images/civics.png"},
    {category: "civics", question: "Vilket ansvarsområde har regionerna?", answers: ["Sjukvård", "Skola", "Äldreomsorg", "Sköta NTI:s ekonomi",], correctIndex: "1", image: "images/genericCivics.jpg", categoryImg: "images/civics.png"},
    {category: "civics", question: "Hur stor del av jordens yta täckte det Brittiska imperiet 1922?", answers: ["1/2", "1/4", "1/6", "2/3",], correctIndex: "2", image: "images/genericCivics.jpg", categoryImg: "images/civics.png"},
    {category: "civics", question: "Vem är storbritanniens primärminister sedan 2022?", answers: ["Boris Johnson", "Donald Trump", "Rishi Sunak", "Narendra Modi"], correctIndex: "3", image: "images/genericCivics.jpg", categoryImg: "images/civics.png"},
    {category: "sport", question: "I vilken sport tävlar systrarna Hanna och Elvira Öberg?", answers: ["Längdskidor", "Längdhopp", "Skidskytte", "Fotboll"], correctIndex: "3", image: "images/genericSport.jpg", categoryImg: "images/sport.png"},
    {category: "sport", question: "Hur många slag är en birdie i golf?", answers: ["2 slag under par", "1 slag under par", "1 slag totalt", "1 slag över par"], correctIndex: "2", image: "images/genericSport.jpg", categoryImg: "images/sport.png"},
    {category: "sport", question: "Vilket år annordnades OS i Stockholm?", answers: ["1912", "1916", "2016", "2012"], correctIndex: "1", image: "images/genericSport.jpg", categoryImg: "images/sport.png"},
    {category: "sport", question: "Vilken stad kommer fotbollslaget BK Häcken ifrån?", answers: ["Stockholm", "Göteborg", "Sundsvall", "Malmö"], correctIndex: "2", image: "images/genericSport.jpg", categoryImg: "images/sport.png"}
]

// Variables
var questionList = [];
var count = 0;
var correctCount = 0;

// Selects all categories
function checkAll() {
    boxes = document.querySelectorAll(".checked");
    boxes.forEach(box => {
        if (box.checked == false) {
            box.checked = true;
        }
        else {
            box.checked = false
        }
    }
    )
}


function getQuizInfo() {
    let quizLen = document.getElementById("numbers").value;
    let catList = [];
    categorys = document.querySelectorAll(".checked");

    // Adds selected categories to list
    categorys.forEach(cat => {
        if (cat.checked == true) {
            catList.push(cat.getAttribute("id"));
        }
    }
    )

    if (catList.length > 0) {
        // Saves in local storage
        localStorage.setItem("catList", JSON.stringify(catList));
        localStorage.setItem("quizLen", quizLen);
        // Starts game
        window.open("question.html", "_self");
    }
    else {
        document.getElementById("error").style.display = "block";
    }
}

// Creates quiz
function quizConstructor() {
    // Gets data from local storage
    let quantity = localStorage.getItem("quizLen");
    let catList = JSON.parse(localStorage.getItem("catList"));
    let sortedQuestions = [];
    let length = questions.length;

    // Sorts list depending on chosen categories
    for (let i = 0; i < length; i++) {
        if (catList.includes(questions[i].category)) {
            sortedQuestions.push(questions[i])
        }
    }
    questions = sortedQuestions;

    // Makes random list with questions
    for (let i = 0; i < parseInt(quantity); i++) {
        let num = Math.floor((Math.random() * questions.length));
        if (!(questions[num]) == "") {
            questionList.push(questions[num]);
            questions.splice(num, 1);
        }
    }
}

// Loads question
function questionLoader() {

    if (count == questionList.length) { // Checks if game should end
        localStorage.setItem("result", correctCount.toString())
        localStorage.setItem("quizLen", count.toString())
        window.open("result.html", "_self") // Opens result page

    }

    // Changes html
    document.getElementById("questionNum").textContent = "Fråga " + (count + 1).toString();
    console.log(questionList[count])
    document.getElementById("question").textContent = questionList[count].question;
    document.getElementById("questionImg").src = questionList[count].image;
    document.getElementById("categoryImg").src = questionList[count].categoryImg

    document.getElementById("answer1").textContent = questionList[count].answers[0];
    document.getElementById("answer2").textContent = questionList[count].answers[1];
    document.getElementById("answer3").textContent = questionList[count].answers[2];
    document.getElementById("answer4").textContent = questionList[count].answers[3];

    document.getElementById("right").disabled = false;
}

// Runs when going to next question
async function correct() {
    console.log("Disabled")
    document.getElementById("right").disabled = true;

    //Checks if player has answered
    radios = document.querySelectorAll(".radio");
    answered = false;
    radios.forEach(radio => {
        if (radio.checked == true) {
            checkedIndex = radio.getAttribute("id");
            answered = true;
        }
    })

    // Corrects answer
    if (answered) {
        correctAnswer = document.getElementById("answer" + questionList[count].correctIndex)
        correctAnswer.style.color = "green"; // Makrs correct answer with green
        if (checkedIndex !== questionList[count].correctIndex) {
            console.log(checkedIndex + " " + correctAnswer);
            document.getElementById("answer" + checkedIndex).style.color = "red"; // Marks with red if incorrect answer
        }
        else {
            correctCount ++;
        }
        await sleep(2000); // Waits for 2 sec
        correctAnswer.style.color = "white";
        document.getElementById("answer" + checkedIndex).style.color = "white";
        count ++;
        document.getElementById(checkedIndex).checked = false;
        questionLoader(); //Loads next question
    }
    else {
        document.getElementById("error").style.display = "block";
    }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// Shows quiz results
function showResults() {
    correctCount = localStorage.getItem("result");
    quizLen = localStorage.getItem("quizLen")
    document.getElementById("result").textContent = correctCount + "/" + quizLen + " rätt";
    testedCategories = document.querySelectorAll(".testedCat");
    console.log(localStorage)

    // Tested categories
    catList = JSON.parse(localStorage.getItem("catList"));
    testedCategories.forEach(category => {
        if (catList.includes(category.id)) {
            category.style.display = "block";
        }
        else {
            category.style.display = "none";
        }
    })
}