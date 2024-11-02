// Inizializza il wrapper SCORM
const scorm = pipwerks.SCORM;
scorm.version = "1.2";

// Eseguito quando la pagina è caricata
window.onload = function() {
    const success = scorm.init(); // Inizializza la connessione SCORM
    if (success) {
        // Imposta la posizione della lezione all'introduzione e lo stato a "incomplete"
        scorm.set("cmi.core.lesson_location", "intro");
        scorm.set("cmi.core.lesson_status", "incomplete");
    }
};

// Eseguito quando la pagina viene chiusa o ricaricata
window.onbeforeunload = function() {
    scorm.save(); // Salva i progressi
    scorm.quit(); // Chiude la connessione SCORM
    const confirmationMessage = 'Sei sicuro di voler lasciare questa pagina? I tuoi progressi potrebbero andare persi.';
    event.returnValue = confirmationMessage; // Messaggio di conferma per il browser
    return confirmationMessage;

};

// Funzione per avanzare alla prossima lezione (video HTML)
function goToNextLesson() {
    scorm.set("cmi.core.lesson_location", "video-html"); // Imposta la prossima lezione come video HTML
    scorm.save(); // Salva i progressi
    window.location.href = "video-html.html"; // Naviga alla pagina del video HTML
}
