const scorm = pipwerks.SCORM; // Inizializza il wrapper SCORM
scorm.version = "1.2";

const quizData = [
    {
        question: "Cos'è l'HTML?",
        options: {
            A: "Un linguaggio di programmazione",
            B: "Un linguaggio di markup",
            C: "Un sistema operativo",
            D: "Un editor di testo"
        },
        correct: "B"
    },
    {
        question: "Quale delle seguenti affermazioni è vera riguardo ai tag HTML?",
        options: {
            A: "I tag HTML non possono essere annidati.",
            B: "I tag HTML non hanno un'apertura e una chiusura.",
            C: "I tag HTML definiscono gli elementi della pagina.",
            D: "I tag HTML sono usati solo per la formattazione del testo."
        },
        correct: "C"
    },
    {
        question: "Quale tag HTML è utilizzato per i titoli?",
        options: {
            A: "<p>",
            B: "<img>",
            C: "<a>",
            D: "<h1>"
        },
        correct: "D"
    },
    {
        question: "Come si scrive la struttura base di un file HTML?",
        options: {
            A: "<html><head><body></body></head></html>",
            B: "<DOCTYPE html><html><head><body></body></head></html>",
            C: "<!DOCTYPE html><html><head><body></body></head></html>",
            D: "<html><body><head></head></body></html>"
        },
        correct: "C"
    },
    {
        question: "Cos'è il CSS?",
        options: {
            A: "Un linguaggio di markup",
            B: "Un linguaggio di programmazione",
            C: "Un linguaggio per definire stili e layout",
            D: "Un tipo di database"
        },
        correct: "C"
    },
    {
        question: "Quale delle seguenti è una modalità per aggiungere CSS a una pagina web?",
        options: {
            A: "Solo inline",
            B: "Solo interno",
            C: "Solo esterno",
            D: "Inline, interno e esterno"
        },
        correct: "D"
    },
    {
        question: "Qual è la sintassi corretta per un selettore CSS che cambia il colore di un <h1> in blu?",
        options: {
            A: "h1 { color: blue; }",
            B: "h1 { blue: color; }",
            C: "h1 { color: \"blue\"; }",
            D: "h1: color: blue;"
        },
        correct: "A"
    },
    {
        question: "Cosa fa la seguente riga di codice JavaScript? document.getElementById(\"demo\").innerHTML = \"Ciao, mondo!\";",
        options: {
            A: "Crea un nuovo elemento HTML",
            B: "Cambia il contenuto dell'elemento con id \"demo\" a \"Ciao, mondo!\"",
            C: "Elimina l'elemento con id \"demo\"",
            D: "Aggiunge un nuovo id all'elemento"
        },
        correct: "B"
    },
    {
        question: "Quale tag HTML viene utilizzato per inserire JavaScript direttamente nella pagina?",
        options: {
            A: "<script>",
            B: "<js>",
            C: "<style>",
            D: "<code>"
        },
        correct: "A"
    },
    {
        question: "Cosa permette di fare JavaScript nelle pagine web?",
        options: {
            A: "Solo formattazione del testo",
            B: "Aggiungere interattività e dinamismo",
            C: "Solo collegamenti ipertestuali",
            D: "Solo visualizzazione di immagini"
        },
        correct: "B"
    }
];

let currentQuestion = 0;
let score = 0;

window.onload = function() {
    const success = scorm.init(); // Inizializza la connessione SCORM
    if (success) {
        scorm.set("cmi.core.lesson_location", "quiz");
    }
    loadQuestion();
};

window.onbeforeunload = function() {
    scorm.save();
    scorm.quit(); // Chiudi la connessione SCORM
};

function loadQuestion() {
    const questionData = quizData[currentQuestion];
    document.getElementById('question').innerText = questionData.question;
    document.getElementById('optionA').innerText = questionData.options.A;
    document.getElementById('optionB').innerText = questionData.options.B;
    document.getElementById('optionC').innerText = questionData.options.C;
    document.getElementById('optionD').innerText = questionData.options.D;
    document.getElementById('feedback').innerText = "";
    document.getElementById('nextBtn').style.display = "none";

    // Riabilita le opzioni
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.disabled = false;
    });
}

function checkAnswer(answer) {
    const questionData = quizData[currentQuestion];
    const feedback = document.getElementById('feedback');

    // Disabilita le opzioni dopo che è stata data una risposta
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.disabled = true;
    });

    if (answer === questionData.correct) {
        feedback.innerText = "Corretto!";
        feedback.style.color = "#27ae60";
        score += 10; // Incrementa il punteggio
    } else {
        feedback.innerText = `Risposta sbagliata. La risposta corretta era: ${questionData.correct}`;
        feedback.style.color = "#e74c3c";
    }

    document.getElementById('nextBtn').style.display = "block";
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        const totalQuestions = quizData.length;
        const finalScore = (score / (totalQuestions * 10)) * 100;

        scorm.set("cmi.core.score.raw", finalScore);
        scorm.set("cmi.core.score.min", 0);
        scorm.set("cmi.core.score.max", 100);
        
        // Imposta il lesson_status in base al punteggio finale
        if (finalScore >= 70) {
            scorm.set("cmi.core.lesson_status", "passed");
        } else {
            scorm.set("cmi.core.lesson_status", "failed");
        }
        
        scorm.set("cmi.completion_status", "completed");

        // Invia dati di completamento
        scorm.set("cmi.suspend_data", score);
        scorm.save(); // Salva le informazioni SCORM

        // Mostra il messaggio finale
        document.getElementById('quiz').innerHTML = `<h2>Quiz completato! Hai ottenuto: ${finalScore}%</h2>`;
    }
}
