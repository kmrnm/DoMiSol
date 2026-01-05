(function () {
    const BOOK_TITLE = "Rəngli Piano";
    const AUDIO_BASE = "/rengli-piano/tracks/";

    function normalizeTrack(raw) {
        const n = String(raw || "").replace("#", "").trim();
        if (!n) return "01";
        if (!/^\d+$/.test(n)) return "01";
        const num = parseInt(n, 10);
        if (!Number.isFinite(num) || num < 1) return "01";
        return String(num).padStart(2, "0");
    }

    function setTrack(track) {
        const t = normalizeTrack(track);
        const label = `Audio ${t}`;

        document.title = `${BOOK_TITLE} • ${label}`;

        const audioEl = document.getElementById("audioEl");
        if (!audioEl) return;

        audioEl.pause();
        audioEl.currentTime = 0;

        audioEl.innerHTML = `
        <source src="${AUDIO_BASE}audio-${t}.m4a" type="audio/mp4" />
        `;

        audioEl.load();
    }


    function currentFromHash() {
        return (location.hash || "#01").slice(1);
    }

    window.addEventListener("hashchange", () => setTrack(currentFromHash()));

    document.addEventListener("DOMContentLoaded", () => {
        setTrack(currentFromHash());
    });
})();
