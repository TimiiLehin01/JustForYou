const polaroidData = [
  {
    type: "image",
    src: "media/image1.jpg",
    caption: "Your Eyes ❤️",
    msg: "I could get lost in them forever.",
  },
  {
    type: "video",
    src: "media/vid1.mp4",
    caption: "FaceCard! 🔥",
    msg: "Literally a masterpiece. No notes.",
  },
  {
    type: "image",
    src: "media/image2.jpg",
    caption: "Takeaway Body",
    msg: "I'm taking you with me everywhere!",
  },
  {
    type: "video",
    src: "media/vid2.mp4",
    caption: "Party Time 🥳",
    msg: "You light up every room you walk into.",
  },
  {
    type: "image",
    src: "media/image3.jpg",
    caption: "Typical You 😹",
    msg: "Being silly with you is my favorite hobby.",
  },
  {
    type: "video",
    src: "media/vid3.mp4",
    caption: "The LIPS... 💋",
    msg: "I can't wait to kiss them again.",
  },
  {
    type: "image",
    src: "media/image4.jpg",
    caption: "1000/10 Always",
    msg: "My perfect girl, today and always.",
  },
  {
    type: "video",
    src: "media/vid4.mp4",
    caption: "Trench Bishh 😹",
    msg: "Stunning even when you're a menace!",
  },
  {
    type: "video",
    src: "media/vid5.mp4",
    caption: "💍",
    msg: "and ofc... US! 🥰",
  },
];

document.getElementById("mainCard").addEventListener("click", function () {
  this.classList.add("card-open");
  document
    .getElementById("bgMusic")
    ?.play()
    .catch(() => {});

  setTimeout(() => {
    const wrapper = document.getElementById("card-wrapper");
    wrapper.style.opacity = "0";
    setTimeout(() => {
      wrapper.style.display = "none";
      document.getElementById("main-content").classList.add("show-content");
      showSection("intro-section");
    }, 1000);
  }, 2000);
});

function showSection(id) {
  document.body.style.transition = "opacity 0.6s ease";
  document.body.style.opacity = "0";

  setTimeout(() => {
    document.querySelectorAll(".story-section").forEach((s) => {
      s.classList.remove("active");
      s.style.display = "none";
    });

    const target = document.getElementById(id);
    if (target) {
      target.style.display = "flex";

      setTimeout(() => {
        target.classList.add("active");
        document.body.style.opacity = "1";

        if (id === "polaroid-section") {
          cinematicReveal();
          createPolaroids();
        }
        if (id === "final-section") {
          setTimeout(startTypewriter, 500);
        }
      }, 50);
    }
  }, 600);
}

function createPolaroids() {
  const container = document.getElementById("polaroidContainer");
  const overlay = document.getElementById("polaroidOverlay");

  if (container.children.length > 0) return;

  polaroidData.forEach((data, i) => {
    const card = document.createElement("div");
    card.className = "polaroid";

    let mediaHtml =
      data.type === "video"
        ? `<video autoplay loop muted playsinline style="width:100%; height:140px; object-fit:cover;"><source src="${data.src}" type="video/mp4"></video>`
        : `<div style="width:100%; height:140px; background: url('${data.src}') center/cover"></div>`;

    card.innerHTML = `
      ${mediaHtml}
      <p style="margin-top:5px; font-weight:bold; font-size:0.8em;">${data.caption}</p>
      <p class="polaroid-msg">${data.msg}</p>
    `;

    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 12 + col * 28 + Math.random() * 5;
    const y = 5 + row * 28 + Math.random() * 5;
    const r = Math.random() * 20 - 10;

    card.style.left = `${x}%`;
    card.style.top = `${y}%`;
    card.style.transform = `rotate(${r}deg) scale(0.6)`;
    card.style.opacity = "0";
    card.style.transition = "all 0.6s ease";

    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = `rotate(${r}deg) scale(1)`;
    }, 150 * i);

    card.onclick = (e) => {
      e.stopPropagation();
      document
        .querySelectorAll(".polaroid")
        .forEach((p) => p.classList.remove("expanded"));
      card.classList.add("expanded");
      overlay.classList.add("active");
    };

    container.appendChild(card);
  });

  overlay.onclick = () => {
    document
      .querySelectorAll(".polaroid")
      .forEach((p) => p.classList.remove("expanded"));
    overlay.classList.remove("active");
  };
}

function startTypewriter() {
  const text =
    "Asake, you are the sunshine that brightens my days. Every laugh we share is a memory I'll keep forever. Happy Valentine's Day and hopefully this won't be the last! ❤️";
  const el = document.getElementById("letterText");

  if (!el) return;
  el.innerHTML = "";

  let i = 0;
  function type() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 55);
    }
  }
  type();
}

function replayJourney() {
  showSection("intro-section");
}

function createHearts() {
  const container = document.getElementById("floatingHearts");
  setInterval(() => {
    const el = document.createElement("div");
    const items = ["❤️", "💖", "✨", "Asake"];
    el.innerHTML = items[Math.floor(Math.random() * items.length)];
    el.style.position = "fixed";
    el.style.left = Math.random() * 100 + "vw";
    el.style.bottom = "-5vh";
    el.style.fontSize = Math.random() * 20 + 10 + "px";
    el.style.transition = "8s linear";
    el.style.opacity = "0.8";
    el.style.pointerEvents = "none";
    container.appendChild(el);

    setTimeout(() => {
      el.style.transform = `translateY(-110vh) rotate(${Math.random() * 360}deg)`;
      el.style.opacity = "0";
    }, 10);

    setTimeout(() => el.remove(), 8000);
  }, 700);
}

function cinematicReveal() {
  const container = document.getElementById("polaroid-section");
  container.style.opacity = "0";
  container.style.transform = "scale(1.05)";
  container.style.transition = "all 0.8s ease";
  setTimeout(() => {
    container.style.opacity = "1";
    container.style.transform = "scale(1)";
  }, 200);
}

createHearts();
