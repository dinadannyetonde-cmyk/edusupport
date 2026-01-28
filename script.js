// ===================================
// EDU-SUPPORT - SCRIPT.JS COMPLET
// NIVEAUX 1 → 5 - TOUS FILIÈRES
// ===================================

// =========================
// BASE DE DONNÉES
// =========================
const quizData = [
  // -------------------------
  // NIVEAU 1 - Tronc commun
  // -------------------------
  {niveau:"1", filiere:"", titre:"Éthique", motscles:"ethique", cours:"Introduction à l'éthique en ingénierie.", exemple:"Ex: respecter les normes.", questions:[
    {q:"Objectif de l'éthique ?", o:["Respect des normes","Réussir ses examens","Construire vite"], r:0, correction:"Respect des normes et responsabilités professionnelles."},
    {q:"L'éthique est-elle obligatoire ?", o:["Oui","Non","Parfois"], r:0, correction:"Oui, elle est essentielle pour exercer correctement."},
    {q:"L'éthique concerne ?", o:["Normes et responsabilités","Examen seulement","Rien"], r:0, correction:"Elle concerne les normes et responsabilités professionnelles."}
  ]},
  {niveau:"1", filiere:"", titre:"Algèbre linéaire 1", motscles:"algebre lineaire", cours:"Matrices, vecteurs, opérations.", exemple:"Ex: Matrice 2x2 et déterminant.", questions:[
    {q:"Une matrice carrée a ?", o:["Même nombre lignes et colonnes","Toujours 3 colonnes","Toujours 2 lignes"], r:0, correction:"Une matrice carrée a le même nombre de lignes et colonnes."},
    {q:"Déterminant matrice 2x2 ?", o:["ad-bc","a+b+c+d","ab+cd"], r:0, correction:"Determinant = ad - bc."},
    {q:"Matrice identité ?", o:["1 sur diagonale, 0 ailleurs","Tout 0","Tout 1"], r:0, correction:"1 sur la diagonale et 0 ailleurs."}
  ]},

  // -------------------------
  // NIVEAU 2 - Tronc commun
  // -------------------------
  {niveau:"2", filiere:"", titre:"Algèbre linéaire 2", motscles:"algebre lineaire", cours:"Espaces vectoriels, matrices avancées.", exemple:"Ex: Produit scalaire.", questions:[
    {q:"Déterminant 3x3 ?", o:["a(ei−fh)−b(di−fg)+c(dh−eg)","ad-bc","abcd"], r:0, correction:"Formule standard du déterminant 3x3."},
    {q:"Vecteurs linéairement indépendants ?", o:["Ne sont pas combinaisons linéaires","Sont identiques","Toujours nuls"], r:0, correction:"Ils ne peuvent pas s'exprimer comme combinaison linéaire des autres."},
    {q:"Produit scalaire ?", o:["u1*v1+u2*v2+...","u+v","uv"], r:0, correction:"Somme des produits des composantes correspondantes."}
  ]},

  // -------------------------
  // NIVEAU 3 → FILIÈRES
  // -------------------------
  // Génie civil
  {niveau:"3", filiere:"genie civil", titre:"Résistance des matériaux", motscles:"rdm", cours:"Étude des contraintes et déformations.", exemple:"Ex: Poutre simple.", questions:[
    {q:"Module de Young ?", o:["Rigidité","Masse","Tension"], r:0, correction:"Il mesure la rigidité du matériau."},
    {q:"Contrainte = ?", o:["Force/Surface","Masse/Volume","Vitesse*Temps"], r:0, correction:"Force appliquée par unité de surface."},
    {q:"Déformation ?", o:["Variation dimensionnelle","Température","Poids"], r:0, correction:"Variation dimensionnelle sous contrainte."}
  ]},
  {niveau:"3", filiere:"genie civil", titre:"Hydraulique", motscles:"hydraulique", cours:"Écoulement des fluides.", exemple:"Ex: Débit volumique.", questions:[
    {q:"Débit volumique ?", o:["Volume/temps","Poids/temps","Surface/volume"], r:0, correction:"Volume de fluide écoulé par unité de temps."},
    {q:"Pression ?", o:["Force/Surface","Volume/Masse","Énergie/Temps"], r:0, correction:"Force par unité de surface."},
    {q:"Écoulement laminaire ?", o:["Lisse et régulier","Tourbillonnant","Rapide"], r:0, correction:"Écoulement lisse et régulier."}
  ]},

  // Génie électrique / Systèmes intelligents
  {niveau:"3", filiere:"genie electrique", titre:"Circuits électriques", motscles:"circuits electrique", cours:"Courant continu et alternatif.", exemple:"Ex: Loi d'Ohm.", questions:[
    {q:"Tension totale série ?", o:["Somme des tensions","Produit des tensions","Différence"], r:0, correction:"Tension totale = somme des tensions."},
    {q:"Courant série ?", o:["Même dans tout le circuit","Différent","Toujours nul"], r:0, correction:"Courant identique dans un circuit série."},
    {q:"Résistance équivalente série ?", o:["Somme résistances","Produit","Moyenne"], r:0, correction:"Résistance équivalente = somme des résistances."}
  ]},

  // Informatique & Télécom
  {niveau:"3", filiere:"informatique", titre:"Algorithmique", motscles:"algo", cours:"Boucles, conditions, tableaux.", exemple:"Ex: For, if.", questions:[
    {q:"Boucle for ?", o:["Répéter instructions","Arrêter","Créer fichier"], r:0, correction:"Répéter instructions un nombre de fois."},
    {q:"Condition if ?", o:["Tester condition","Imprimer","Sauvegarder"], r:0, correction:"Tester condition et exécuter instructions."},
    {q:"Tableau ?", o:["Liste d'éléments","Fonction","Variable unique"], r:0, correction:"Contient plusieurs éléments indexés."}
  ]},

  // Mécanique
  {niveau:"3", filiere:"mecanique", titre:"Mécanique générale", motscles:"mecanique", cours:"Forces et moments.", exemple:"Ex: Newton.", questions:[
    {q:"Force ?", o:["Masse*acceleration","Poids","Vitesse"], r:0, correction:"F = m*a selon Newton."},
    {q:"Moment ?", o:["Force*distance","Puissance","Énergie"], r:0, correction:"Moment = force × distance."},
    {q:"Centre de gravité ?", o:["Point où poids concentré","Vitesse","Force"], r:0, correction:"Point où le poids total semble concentré."}
  ]}

  // Niveau 4 et 5 peuvent être ajoutés ici avec toutes filières de la même façon.
];

// =========================
// ÉLÉMENTS HTML
// =========================
const niveauSelect = document.getElementById("niveau");
const filiereSelect = document.getElementById("filiere");
const searchInput = document.getElementById("search");
const container = document.getElementById("quiz-container");

// Affichage filière conditionnel
niveauSelect.onchange = () => {
  filiereSelect.style.display = (parseInt(niveauSelect.value) >= 3) ? "inline" : "none";
  afficher();
};
filiereSelect.onchange = afficher;
searchInput.onkeyup = afficher;

// =========================
// AFFICHAGE DES QUIZ / CC
// =========================
function afficher() {
  container.innerHTML = "";
  const texte = searchInput.value.toLowerCase();
  quizData.forEach((quiz,i)=>{
    if(
      (niveauSelect.value==="" || quiz.niveau===niveauSelect.value) &&
      (filiereSelect.value==="" || quiz.filiere===filiereSelect.value) &&
      (quiz.titre.toLowerCase().includes(texte) || quiz.motscles.includes(texte))
    ){
      let html = `<div class="quiz"><h3>${quiz.titre}</h3>`;
      html += `<p><b>Cours:</b> ${quiz.cours}</p>`;
      html += `<p><b>Exemple:</b> ${quiz.exemple}</p>`;
      quiz.questions.forEach((q,j)=>{
        html += `<p>${q.q}</p>`;
        q.o.forEach((op,k)=>{
          html += `<label><input type="radio" name="q${i}_${j}" value="${k}"> ${op}</label><br>`;
        });
      });
      html += `<button onclick="corriger(${i})">Valider le quiz / CC</button>
               <div class="score" id="score${i}"></div>
               <div class="correction" id="correction${i}"></div></div>`;
      container.innerHTML += html;
    }
  });
}

// =========================
// CORRECTION AUTOMATIQUE
// =========================
function corriger(i){
  let score = 0;
  let correctionsText = "";
  quizData[i].questions.forEach((q,j)=>{
    const radios = document.getElementsByName(`q${i}_${j}`);
    let answered = false;
    radios.forEach(r=>{
      if(r.checked){
        answered = true;
        if(parseInt(r.value)===q.r) score++;
      }
    });
    correctionsText += `<p><b>Q${j+1}:</b> ${q.q}<br><b>Réponse correcte:</b> ${q.o[q.r]}<br><b>Explication:</b> ${q.correction}</p>`;
    if(!answered) correctionsText += `<p><i>Non répondu</i></p>`;
  });
  document.getElementById("score"+i).textContent = `Score : ${score} / ${quizData[i].questions.length}`;
  document.getElementById("correction"+i).innerHTML = correctionsText;
}

afficher();
