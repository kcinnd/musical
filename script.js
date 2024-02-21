document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('overlay');
    const ctx = canvas.getContext('2d');
    const notesData = []; // Array to hold data for each note
    const litAreas = []; // Array to track lit areas
    const beamRadius = 50; // Radius of the flashlight beam

    const beamColors = [
    ['rgba(255, 7, 58, 1)', 'rgba(255, 7, 58, 0)'],
    ['rgba(189, 0, 255, 1)', 'rgba(189, 0, 255, 0)'],
    ['rgba(0, 145, 255, 1)', 'rgba(0, 145, 255, 0)'],
    ['rgba(0, 255, 25, 1)', 'rgba(0, 255, 25, 0)'],
    ['rgba(255, 0, 110, 1)', 'rgba(255, 0, 110, 0)'],
    ['rgba(255, 255, 0, 1)', 'rgba(255, 255, 0, 0)'],
    ['rgba(0, 255, 255, 1)', 'rgba(0, 255, 255, 0)'],
    ['rgba(255, 165, 0, 1)', 'rgba(255, 165, 0, 0)'],
    ['rgba(204, 51, 255, 1)', 'rgba(204, 51, 255, 0)'],
    ['rgba(191, 255, 0, 1)', 'rgba(191, 255, 0, 0)'],
    ['rgba(64, 224, 208, 1)', 'rgba(64, 224, 208, 0)'],
    ['rgba(255, 0, 255, 1)', 'rgba(255, 0, 255, 0)'],
    ['rgba(255, 215, 0, 1)', 'rgba(255, 215, 0, 0)'],
    ['rgba(148, 0, 211, 1)', 'rgba(148, 0, 211, 0)'],
    ['rgba(135, 206, 235, 1)', 'rgba(135, 206, 235, 0)'],
    ['rgba(255, 111, 97, 1)', 'rgba(255, 111, 97, 0)'],
    ['rgba(75, 0, 130, 1)', 'rgba(75, 0, 130, 0)'],
    ['rgba(252, 142, 172, 1)', 'rgba(252, 142, 172, 0)'],
    ['rgba(0, 255, 195, 1)', 'rgba(0, 255, 195, 0)']
    ];

    const noteImages = [
    "https://i.imgur.com/CJ09TQq.png",
    "https://i.imgur.com/b5fsfMv.png",
    "https://i.imgur.com/iAKvZfs.png",
    "https://i.imgur.com/qBMF0fz.png",
    "https://i.imgur.com/OGFu1Le.png",
    "https://i.imgur.com/iEUHvIc.png",
    "https://i.imgur.com/14w5V4V.png",
    "https://i.imgur.com/U0aP5pi.png",
    "https://i.imgur.com/ZbZ7sqd.png",
    "https://i.imgur.com/Y6GtKc3.png",
    "https://i.imgur.com/vxsTh2E.png",
    "https://i.imgur.com/nttMAYw.png",
    "https://i.imgur.com/lkUVei7.png",
    "https://i.imgur.com/MENQtiW.png",
    "https://i.imgur.com/GXPMynI.png",
    "https://i.imgur.com/Mlj0CoI.png",
    "https://i.imgur.com/NmYfUe8.png",
    "https://i.imgur.com/Mz5cEJR.png",
    "https://i.imgur.com/IVHM0uZ.png"
    ];

    const audioClips = [
    "https://audio.jukehost.co.uk/aOz6KfillnraJHw8E38nj0c8T4uJk3uG.mp3",
    "https://audio.jukehost.co.uk/gVJZ29CcDLHA2eu5N2ZRthH68jtWW6Gw.mp3",
    "https://audio.jukehost.co.uk/kuI9Js3hy2kiVgojRv2yiaORL7tYYlAX.mp3",
    "https://audio.jukehost.co.uk/hkfgqlNOAxj1LgWDOBQhRTbzxq0a3xBV.mp3",
    "https://audio.jukehost.co.uk/lXCaYbwjVyRzckOilvVZxdg9MJOwy9xN.mp3",
    "https://audio.jukehost.co.uk/84b4xaUM74UJaRWCbVVeUCF822yTximk.mp3",
    "https://audio.jukehost.co.uk/e0cf53pFpqlBHa3mWIe9EFoZKNKUzjo3.mp3",
    "https://audio.jukehost.co.uk/XTKnG2oLrq1UxCHq5yHa2hp71kkaLHAY.mp3",
    "https://audio.jukehost.co.uk/xk3OfU1NDtUeRUQPlbcGmt8uNG3Hyr0m.mp3",
    "https://audio.jukehost.co.uk/hB9tnsYoYcOTi70O0oi5auIU3ZL6BEJx.mp3",
    "https://audio.jukehost.co.uk/WBe5RCJJP1vMfuaewKp1T39qm8Bm0auc.mp3",
    "https://audio.jukehost.co.uk/Zs2Ef5WCCqJswEUHc18CjbezfCl9gseq.mp3",
    "https://audio.jukehost.co.uk/26mQRqqYvPTbYVxegWXphWfYzPvlitOA.mp3",
    "https://audio.jukehost.co.uk/3rJtM3HgdQKHPj6NVcsANgc39sPIlwfR.mp3",
    "https://audio.jukehost.co.uk/vAVSRkgnD3jff7jYigFHdZlV4gxkdUfQ.mp3",
    "https://audio.jukehost.co.uk/xHRDRPYmIWURW5h4YTpgP3zZhl24NHBn.mp3",
    "https://audio.jukehost.co.uk/Pkce3RxLuRVE31dMiSiUqeSQt4FaamBB.mp3",
    "https://audio.jukehost.co.uk/2gRP6adaDph5ZaHRDaBZNhiggfhPhmGa.mp3",
    "https://audio.jukehost.co.uk/sSUTAJ1O3JYJ8nNfuV5LC55avoRySwAZ.mp3"
    ];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        redrawCanvas(); // Redraw the canvas with existing lit areas and notes
    }

    function preloadNotes() {
        noteImages.forEach((src, index) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                let x, y, overlaps;
                let attempts = 0;
                const maxAttempts = 100;

                do {
                    x = Math.random() * (canvas.width - img.width);
                    y = Math.random() * (canvas.height - img.height);
                    overlaps = notesData.some(note => {
                        const dx = note.x - x;
                        const dy = note.y - y;
                        return Math.sqrt(dx * dx + dy * dy) < beamRadius;
                    });

                    attempts++;
                    if (attempts > maxAttempts) {
                        console.warn('Maximum placement attempts reached for a note. Consider adjusting the spacing or canvas size.');
                        break;
                    }
                } while (overlaps);

                notesData.push({
                    img: img,
                    x: x,
                    y: y,
                    width: img.width,
                    height: img.height,
                    revealed: false,
                    revealProgress: 0,
                    audio: new Audio(audioClips[index]) // Assign the corresponding audio clip
                });
            };
        });
    }

    function redrawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        litAreas.forEach(area => {
            const gradient = ctx.createRadialGradient(area.x, area.y, 0, area.x, area.y, beamRadius);
            gradient.addColorStop(0, area.color[0]);
            gradient.addColorStop(1, area.color[1]);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(area.x, area.y, beamRadius, 0, Math.PI * 2);
            ctx.fill();
        });

        notesData.forEach(note => {
            if (note.revealed || note.revealProgress > 0) {
                const opacity = note.revealProgress / 100;
                ctx.globalAlpha = opacity;
                ctx.drawImage(note.img, note.x, note.y, note.width, note.height);
                ctx.globalAlpha = 1.0;
            }
        });
    }

    function createGlow(x, y) {
        const selectedColor = beamColors[Math.floor(Math.random() * beamColors.length)];
        litAreas.push({ x, y, color: selectedColor });

        notesData.forEach(note => {
            const distance = Math.hypot(x - (note.x + note.width / 2), y - (note.y + note.height / 2));
            if (distance <= beamRadius) {
                note.revealProgress = Math.min(note.revealProgress + 20, 100);
                if (note.revealProgress >= 100) {
                    note.revealed = true;
                }
            }
        });

        redrawCanvas();
    }

    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        createGlow(x, y);

        notesData.forEach(note => {
            if (note.revealed) {
                const noteRect = { left: note.x, right: note.x + note.width, top: note.y, bottom: note.y + note.height };
                if (x >= noteRect.left && x <= noteRect.right && y >= noteRect.top && y <= noteRect.bottom) {
                    if (note.audio.paused) {
                        note.audio.play();
                    } else {
                        note.audio.pause();
                    }
                }
            }
        });
    });

    window.addEventListener('resize', resizeCanvas);
    preloadNotes(); // Make sure to call this function to start loading the notes
});
