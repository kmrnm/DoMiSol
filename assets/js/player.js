(function () {
    function fmt(sec) {
        if (!isFinite(sec)) return "00:00";
        sec = Math.max(0, Math.floor(sec));
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
    }

    function initPlayer(root) {
        const audio = root.querySelector("audio");
        const btn = root.querySelector("[data-play]");
        const bar = root.querySelector("[data-bar]");
        const fill = root.querySelector("[data-fill]");
        const tcur = root.querySelector("[data-tcur]");
        const tdur = root.querySelector("[data-tdur]");
        const iconPlay = root.querySelector("[data-icon='play']");
        const iconPause = root.querySelector("[data-icon='pause']");

        function setPlaying(isPlaying) {
            if (iconPlay && iconPause) {
                iconPlay.style.display = isPlaying ? "none" : "block";
                iconPause.style.display = isPlaying ? "block" : "none";
            }
        }

        function update() {
            const cur = audio.currentTime || 0;
            const dur = audio.duration || 0;
            const pct = dur ? (cur / dur) * 100 : 0;
            fill.style.width = pct + "%";
            tcur.textContent = fmt(cur);
            tdur.textContent = fmt(dur);
        }

        btn.addEventListener("click", async () => {
            if (audio.paused) {
                try {
                    await audio.play();
                    setPlaying(true);
                } catch (e) {
                    // If user gesture restrictions exist, this click is still a gesture.
                    // Some devices may still block if file can't be loaded.
                }
            } else {
                audio.pause();
                setPlaying(false);
            }
        });

        bar.addEventListener("click", (e) => {
            const rect = bar.getBoundingClientRect();
            const x = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
            const pct = rect.width ? x / rect.width : 0;
            if (isFinite(audio.duration)) audio.currentTime = pct * audio.duration;
        });

        audio.addEventListener("timeupdate", update);
        audio.addEventListener("durationchange", update);
        audio.addEventListener("loadedmetadata", update);
        audio.addEventListener("pause", () => setPlaying(false));
        audio.addEventListener("play", () => setPlaying(true));
        audio.addEventListener("ended", () => {
            setPlaying(false);
            audio.currentTime = 0;
            update();
        });

        setPlaying(false);
        update();
    }

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll("[data-player]").forEach(initPlayer);
    });
})();
