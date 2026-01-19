(function () {
  const BASE = "/rengli-piano/audio/";
  const EXT = "m4a";

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const list = document.querySelector("[data-audio-list]");
    if (!list) return;

    const count = parseInt(list.getAttribute("data-count") || "25", 10);
    const firstItem = list.querySelector(".audio-item");
    if (!firstItem) return;

    function configureItem(item, i) {
      const t = pad2(i);
      const label = `Audio ${t}`;

      const labelEl = item.querySelector("[data-label]");
      if (labelEl) labelEl.textContent = label;

      const audio = item.querySelector("audio");
      if (audio) {
        audio.innerHTML = `<source src="${BASE}audio-${t}.${EXT}" type="audio/mp4">`;
        audio.load();
      }
    }

    configureItem(firstItem, 1);

    for (let i = 2; i <= count; i++) {
      const clone = firstItem.cloneNode(true);
      configureItem(clone, i);
      list.appendChild(clone);
    }
  });
})();
