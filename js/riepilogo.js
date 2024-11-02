const scorm = pipwerks.SCORM;
scorm.version = "1.2";

// Eseguito quando la pagina di riepilogo è caricata
window.onload = function() {
    const success = scorm.init(); // Inizializza la connessione SCORM
    if (success) {
        scorm.set("cmi.core.lesson_location", "riepilogo"); // Imposta la posizione della lezione su "riepilogo"
        scorm.set("cmi.core.lesson_status", "completed"); // Imposta lo stato della lezione su "completed"
        scorm.save(); // Salva i progressi finali
    }
};

// Funzione per terminare il corso
function endCourse() {
    scorm.set("cmi.core.exit", "logout"); // Imposta l'uscita su "logout" per indicare che l'utente ha terminato il corso
    scorm.save(); // Salva i dati finali
    scorm.quit(); // Chiude la connessione SCORM
    alert("Corso terminato. I tuoi progressi sono stati salvati."); // Messaggio di conferma
    window.close(); // Chiude la finestra del corso, se permesso dal browser
}

// Eseguito quando la pagina viene chiusa o ricaricata
window.onbeforeunload = function(event) {
    scorm.save(); // Salva i progressi
    scorm.quit(); // Chiude la connessione SCORM
    const confirmationMessage = 'Sei sicuro di voler lasciare questa pagina? I tuoi progressi potrebbero andare persi.';
    event.returnValue = confirmationMessage; // Messaggio di conferma per il browser
    return confirmationMessage;
};