const quizData = [
{
niveau:"1",
filiere:"",
titre:"Langage C - Bases",
motscles:"c programmation",
questions:[
{q:"Quel symbole termine une instruction en C ?", o:[".", ";", ":"], r:1},
{q:"Fonction principale en C ?", o:["start","main","init"], r:1},
{q:"Type d'une variable entière ?", o:["float","int","char"], r:1}
]
},
{
niveau:"2",
filiere:"",
titre:"Langage C - Conditions",
motscles:"c if condition",
questions:[
{q:"Instruction conditionnelle ?", o:["for","if","while"], r:1},
{q:"Opérateur égalité ?", o:["=","==","!="], r:1},
{q:"Début d’un bloc ?", o:["(","{","["], r:1}
]
},
{
niveau:"3",
filiere:"genie civil",
titre:"RDM - Bases",
motscles:"genie civil rdm",
questions:[
{q:"Unité de la force ?", o:["Watt","Newton","Volt"], r:1},
{q:"Moment = ?", o:["F×d","m×g","V×I"], r:0},
{q:"Charge uniforme ?", o:["Oui","Non","Variable"], r:0}
]
},
{
niveau:"3",
filiere:"genie informatique",
titre:"Algorithmique",
motscles:"informatique algo",
questions:[
{q:"Boucle répétitive ?", o:["if","while","switch"], r:1},
{q:"Index initial d’un tableau ?", o:["0","1","2"], r:0},
{q:"Complexité O(n) ?", o:["linéaire","quadratique","log"], r:0}
]
}
];

const niveau = document.getElementById("niveau");
const filiere = document.getElementById("filiere");
const search = document.getElementById("search");
const container = document.getElementById("quiz-container");

niveau.onchange = () => {
    filiere.style.display = niveau.value === "3" ? "inline" : "none";
    afficher();
};
filiere.onchange = afficher;
search.onkeyup = afficher;

function afficher() {
    container.innerHTML = "";
    quizData.forEach((quiz,i) => {
        if (
            (niveau.value === "" || quiz.niveau === niveau.value) &&
            (filiere.value === "" || quiz.filiere === filiere.value) &&
            (quiz.titre.toLowerCase().includes(search.value.toLowerCase()) ||
             quiz.motscles.includes(search.value.toLowerCase()))
        ) {
            let html = `<div class="quiz"><h3>${quiz.titre}</h3>`;
            quiz.questions.forEach((q,j) => {
                html += `<p>${q.q}</p>`;
                q.o.forEach((op,k) => {
                    html += `<label><input type="radio" name="q${i}_${j}" value="${k}"> ${op}</label><br>`;
                });
            });
            html += `<button onclick="corriger(${i})">Valider le quiz</button>
                     <div class="score" id="score${i}"></div></div>`;
            container.innerHTML += html;
        }
    });
}

function corriger(i) {
    let score = 0;
    quizData[i].questions.forEach((q,j) => {
        const radios = document.getElementsByName(`q${i}_${j}`);
        radios.forEach(r => {
            if (r.checked && parseInt(r.value) === q.r) score++;
        });
    });
    document.getElementById("score" + i).textContent =
        "Score : " + score + " / " + quizData[i].questions.length;
}

afficher();
