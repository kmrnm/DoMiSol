(function () {
  const BOOK_TITLE = "Rəngli Piano";
  const AUDIO_BASE = "/rengli-piano/audio/";

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

    const elTitle = document.getElementById("trackTitle");
    const elSub = document.getElementById("trackSub");
    if (elTitle) elTitle.textContent = label;
    if (elSub) elSub.textContent = label;

    const audio = document.getElementById("audioEl");
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    audio.innerHTML = `
      <source src="${AUDIO_BASE}audio-${t}.m4a" type="audio/mp4" />
    `;

    // If later we add mp3, we can do:
    // audio.innerHTML = `
    //   <source src="${AUDIO_BASE}audio-${t}.mp3" type="audio/mpeg" />
    //   <source src="${AUDIO_BASE}audio-${t}.m4a" type="audio/mp4" />
    // `;
    audio.load();
  }

  function currentFromHash() {
    return (location.hash || "#01").slice(1);
  }

  window.addEventListener("hashchange", () => setTrack(currentFromHash()));

  document.addEventListener("DOMContentLoaded", () => {
    setTrack(currentFromHash());
  });
})();
