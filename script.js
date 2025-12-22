// Tab navigation
function showtab(tabName) {
  document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));
  document.getElementById(tabName).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Letter open/close animation
const letter = document.getElementById('letter');
const letterBtn = letter.querySelector('h2');
const letterContent = letter.querySelector('p');

letterBtn.addEventListener('click', () => {
  if (!letter.classList.contains('open')) {
    letter.classList.add('opening');
    setTimeout(() => {
      letter.classList.remove('opening');
      letter.classList.add('open');
    }, 700);
  } else {
    letter.classList.remove('open');
  }
});


function createLove() {
  const wrapper = document.createElement('div');
wrapper.className = 'fly-wrapper';

  if (Math.random() < 0.25) {
    const img = document.createElement('img');
    img.src = 'public/img/snoopy-pilot.png';
    img.className = 'snoopy-fly';
    img.style.left = Math.random() * 100 + 'vw';
    img.style.animationDuration = 6 + Math.random() * 4 + 's';
    img.onload = () => console.log('PNG OK');
    img.onerror = () => console.log('PNG ERROR');
    wrapper.appendChild(img);
  } else {
    wrapper.className = 'love';
    wrapper.innerHTML = '❤';
    wrapper.style.left = Math.random() * 100 + 'vw';
    wrapper.style.fontSize = Math.random() * 20 + 10 + 'px';
  }

  

  document.body.appendChild(wrapper);
  setTimeout(() => wrapper.remove(), 9000);
}

setInterval(createLove, 400);

// Form submit animation + status message
const form = document.querySelector("form");
const statusMsg = document.createElement("div");
statusMsg.className = "status-msg";
document.body.appendChild(statusMsg);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusMsg.textContent = "Sending...";
  statusMsg.classList.remove("success", "error");
  statusMsg.classList.add("show");

  const data = new FormData(form);

  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      statusMsg.textContent = "✅ Message sent successfully!";
      statusMsg.classList.add("success");
      form.reset();
    } else {
      let msg = "❌ Failed to send message. Try again!";
      try {
        const j = await res.json();
        if (j && j.errors && j.errors[0]?.message) msg = `❌ ${j.errors[0].message}`;
      } catch {}
      statusMsg.textContent = msg;
      statusMsg.classList.add("error");
    }
  } catch {
    statusMsg.textContent = "⚠️ Network error. Please try again!";
    statusMsg.classList.add("error");
  } finally {
    setTimeout(() => {
      statusMsg.classList.remove("show");
    }, 4000);
  }
});

const snoopyCorner = document.querySelector('.snoopy-corner');

if (snoopyCorner) {
  snoopyCorner.addEventListener('click', () => {
    snoopyCorner.style.transform = 'scale(1.1)';
    setTimeout(() => {
      snoopyCorner.style.transform = 'scale(1)';
    }, 200);
  });
}

// Music click play/pause + add 🎵 icon
document.querySelectorAll('.music-item').forEach(item => {
  const audio = item.querySelector('audio');
  const title = item.querySelector('p');

  // Tambah ikon 🎵 di depan judul jika belum ada
  if (!title.textContent.startsWith('🎵')) {
    title.textContent = '🎵 ' + title.textContent;
  }

  item.addEventListener('click', () => {
    if (audio.paused) {
      document.querySelectorAll('audio').forEach(a => a.pause());
      audio.play();
      item.classList.add('playing');
    } else {
      audio.pause();
      item.classList.remove('playing');
    }
  });
});