// Inizializza il wrapper SCORM
const scorm = pipwerks.SCORM;
scorm.version = "1.2";

let videoWatchedSeconds = 0; // Variabile per tracciare il tempo visualizzato in secondi
const video = document.getElementById("myVideoHTML"); // Seleziona il video con l'id 'myVideoHTML'
const nextLessonBtn = document.getElementById("nextLessonBtn"); // Seleziona il pulsante "Prossima Lezione"

// Eseguito quando la pagina è caricata
window.onload = function() {
    const success = scorm.init(); // Inizializza la connessione SCORM
    if (success) {
        scorm.set("cmi.core.lesson_location", "video-html"); // Imposta la posizione della lezione come video HTML
    }
};

// Traccia il tempo di visualizzazione del video e aggiorna il progresso
video.addEventListener("timeupdate", function() {
    videoWatchedSeconds = Math.floor(video.currentTime); // Aggiorna i secondi visualizzati
    const videoDuration = video.duration; // Durata totale del video
    const progress = (videoWatchedSeconds / videoDuration) * 100; // Calcola la percentuale di progresso
    
    // Salva il progresso in SCORM in percentuale
    scorm.set("cmi.suspend_data.video-html", progress.toFixed(2)); 
    
    // Mostra il pulsante "Prossima Lezione" e aggiorna lo stato a "completed" quando il video è terminato
    if (video.currentTime === video.duration) {
        scorm.set("cmi.core.lesson_status", "completed");
        nextLessonBtn.style.display = "block";
    }
});

// Eseguito quando la pagina viene chiusa o ricaricata
window.onbeforeunload = function() {
    scorm.set("cmi.core.session_time", videoWatchedSeconds); // Salva il tempo visualizzato in sessione
    scorm.save(); // Salva i progressi
    scorm.quit(); // Chiude la connessione SCORM
    const confirmationMessage = 'Sei sicuro di voler lasciare questa pagina? I tuoi progressi potrebbero andare persi.';
    event.returnValue = confirmationMessage; // Messaggio di conferma per il browser
    return confirmationMessage;
};

// Funzione per avanzare alla prossima lezione (video CSS)
function goToNextLesson() {
    scorm.set("cmi.core.lesson_location", "video-css"); // Imposta la prossima lezione come video CSS
    scorm.save(); // Salva i progressi
    window.location.href = "video-css.html"; // Naviga alla pagina del video CSS
}
