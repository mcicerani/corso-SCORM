// Inizializza il wrapper SCORM
const scorm = pipwerks.SCORM;
scorm.version = "1.2";

// Eseguito quando la pagina è caricata
window.onload = function() {
    const success = scorm.init(); // Inizializza la connessione SCORM
    if (success) {
        // Imposta la posizione della lezione all'introduzione e lo stato a "completo"
        scorm.set("cmi.core.lesson_location", "index");
        scorm.set("cmi.core.lesson_status", "passed"); // Imposta lo stato a "passed"
    }
};
