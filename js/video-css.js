// Inizializza il wrapper SCORM
const scorm = pipwerks.SCORM;
scorm.version = "1.2";

let videoWatchedSeconds = 0; // Variabile per tracciare il tempo visualizzato in secondi
const video = document.getElementById("myVideoCSS"); // Seleziona il video con l'id 'myVideoCSS'
const nextLessonBtn = document.getElementById("nextLessonBtn"); // Seleziona il pulsante "Prossima Lezione"

// Eseguito quando la pagina è caricata
window.onload = function() {
    const success = scorm.init(); // Inizializza la connessione SCORM
    if (success) {
        scorm.set("cmi.core.lesson_location", "video-css"); // Imposta la posizione della lezione come video CSS
    }
};

// Traccia il tempo di visualizzazione del video e aggiorna il progresso
video.addEventListener("timeupdate", function() {
    videoWatchedSeconds = Math.floor(video.currentTime); // Aggiorna i secondi visualizzati
    const videoDuration = video.duration; // Durata totale del video
    const progress = (videoWatchedSeconds / videoDuration) * 100; // Calcola la percentuale di progresso
    
    // Salva il progresso in SCORM in percentuale
    scorm.set("cmi.suspend_data.video-css", progress.toFixed(2)); 
    
    // Mostra il pulsante "Prossima Lezione" e aggiorna lo stato a "completed" quando il video è terminato
    if (video.currentTime === video.duration) {
        scorm.set("cmi.core.lesson_status", "completed");
    }
});

// Eseguito quando la pagina viene chiusa o ricaricata
window.onbeforeunload = function() {
    scorm.set("cmi.core.session_time", videoWatchedSeconds); // Salva il tempo visualizzato in sessione
    scorm.save(); // Salva i progressi
    scorm.quit(); // Chiude la connessione SCORM
    };

