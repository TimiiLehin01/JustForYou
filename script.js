function createFloatingElements() {
  const container = document.getElementById("floatingHearts");
  const elements = ["❤️", "💕", "💖", "💗", "💝", "💋", "😘", "💓"];

  setInterval(() => {
    const element = document.createElement("div");
    element.className = Math.random() > 0.5 ? "heart" : "kiss";
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * 100 + "%";
    element.style.animationDuration = Math.random() * 4 + 6 + "s";
    element.style.animationDelay = Math.random() * 2 + "s";
    element.style.fontSize = Math.random() * 15 + 15 + "px";

    container.appendChild(element);

    setTimeout(() => {
      element.remove();
    }, 10000);
  }, 300);
}

document.getElementById("bottle").addEventListener("click", function () {
  releaseParticles();
  setTimeout(() => {
    showSection("gift-section");
  }, 2000);
});

document.getElementById("openGift").addEventListener("click", function () {
  const giftBox = document.getElementById("giftBox");

  giftBox.style.transform = "scale(1.2)";
  giftBox.style.opacity = "0";

  setTimeout(() => {
    releaseParticles();
  }, 300);

  setTimeout(() => {
    showSection("polaroid-section");
  }, 2000);
});

document.getElementById("giftBox").addEventListener("click", function () {
  document.getElementById("openGift").click();
});

function releaseParticles() {
  const particlesContainer = document.getElementById("particles");

  const bottle = document.getElementById("bottle");
  let centerX, centerY;

  if (bottle) {
    const bottleRect = bottle.getBoundingClientRect();
    centerX = bottleRect.left + bottleRect.width / 2;
    centerY = bottleRect.top + bottleRect.height / 2;
  } else {
    centerX = window.innerWidth / 2;
    centerY = window.innerHeight / 2;
  }

  for (let i = 0; i < 60; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = centerX + "px";
    particle.style.top = centerY + "px";

    particlesContainer.appendChild(particle);

    const angle = (Math.PI * 2 * i) / 60;
    const velocity = Math.random() * 250 + 150;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity - 300;

    particle.animate(
      [
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
        { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 },
      ],
      {
        duration: 2000,
        easing: "cubic-bezier(0, .9, .57, 1)",
      },
    );

    setTimeout(() => particle.remove(), 2000);
  }
}

const polaroidData = [
  {
    type: "image",
    img: "media/image1.jpg",
    caption: "Your Beautiful Eyes",
    message:
      "This set of eyes is the reason I wake up happy every single day. You light up my entire world.",
  },
  {
    type: "video",
    video: "media/vid1.mp4",
    caption: "Top-Notch FaceCard",
    message: "Don't think I have seen a more prettier face than this",
  },
  {
    type: "image",
    img: "media/image2.jpg",
    caption: "Takeaway Body",
    message:
      "Calling this a takeaway body becaue I want to take you with me everywhere I go. You're a walking masterpiece.",
  },
  {
    type: "video",
    video: "media/vid2.mp4",
    caption: "Party Time",
    message:
      "This was a fun night for you! You know how to light up any party and make it unforgettable with your face.",
  },
  {
    type: "image",
    img: "media/image3.jpg",
    caption: "Typical You 😹",
    message:
      "Goofy and adorable - You can be silly and still be the most beautiful person in the room.",
  },
  {
    type: "video",
    video: "media/vid3.mp4",
    caption: "The LIPS...",
    message:
      "I could write a whole poem about these lips. They're the sweetest thing I've ever kissed, and I can't wait to kiss them again and again.",
  },
  {
    type: "image",
    img: "media/image4.jpg",
    caption: "1000/10",
    message:
      "Every time I look at you, I'm reminded of how lucky I am to have you in my life. You're a 1000/10 in every way, and I love you more than words can express.",
  },
  {
    type: "video",
    video: "media/vid4.mp4",
    caption: "Trench Bishh 😹",
    message: "You still look effortlessly stunning despite your shenanigans😹",
  },
];

function createPolaroids() {
  const container = document.getElementById("polaroidContainer");

  const overlay = document.createElement("div");
  overlay.className = "polaroid-overlay";
  overlay.id = "polaroidOverlay";
  document.body.appendChild(overlay);

  polaroidData.forEach((photo, index) => {
    const polaroid = document.createElement("div");
    polaroid.className = "polaroid";

    let imageContent = "";

    if (
      photo.type === "video" &&
      photo.video &&
      photo.video !== "YOUR_VIDEO_URL_HERE"
    ) {
      imageContent = `
                <div class="polaroid-image video-container">
                    <video class="polaroid-video" playsinline muted loop autoplay>
                        <source src="${photo.video}" type="video/mp4">
                        Your browser does not support video.
                    </video>
                    <div class="video-play-icon">▶</div>
                </div>
            `;
    } else if (photo.img) {
      imageContent = `
                <div class="polaroid-image" style="background-image: url('${photo.img}'); background-size: cover; background-position: center;">
                </div>
            `;
    } else {
      imageContent = `
                <div class="polaroid-image">${photo.emoji || "📷"}</div>
            `;
    }

    polaroid.innerHTML = `
            <div class="polaroid-front">
                ${imageContent}
                <div class="polaroid-caption">${photo.caption}</div>
            </div>
            <div class="polaroid-back">
                <div class="polaroid-message">${photo.message}</div>
            </div>
        `;

    polaroid.addEventListener("click", function (e) {
      e.stopPropagation();

      const video = this.querySelector(".polaroid-video");

      document.querySelectorAll(".polaroid.expanded").forEach((p) => {
        if (p !== this) {
          p.classList.remove("expanded");

          const otherVid = p.querySelector(".polaroid-video");
          if (otherVid) {
            otherVid.muted = true;
            otherVid.currentTime = 0;
          }
        }
      });

      const wasExpanded = this.classList.contains("expanded");
      this.classList.toggle("expanded");
      overlay.classList.toggle("active");

      if (video) {
        if (!wasExpanded) {
          video.currentTime = 0;
          video.muted = false;
          video.play();
        } else {
          video.muted = true;
          video.currentTime = 0;
          video.play();
        }
      }
    });

    setTimeout(() => {
      container.appendChild(polaroid);
    }, index * 150);
  });

  overlay.addEventListener("click", function () {
    document.querySelectorAll(".polaroid.expanded").forEach((p) => {
      p.classList.remove("expanded");

      const vid = p.querySelector(".polaroid-video");
      if (vid) {
        vid.muted = true;
        vid.currentTime = 0;
        vid.play();
      }
    });
    this.classList.remove("active");
  });
}

const balloonsData = [
  "Your kindness that touches everyone around you",
  "The way you make me laugh even on tough days",
  "Your beautiful eyes that I could get lost in forever",
  "How you always know exactly what I need",
  "Your strength and courage that inspire me daily",
  "The little things you do that mean so much",
  "Your passion and the way you chase your dreams",
  "How you make ordinary moments extraordinary",
  "Your loving heart that makes mine complete",
];

const balloonColors = ["🎈", "🎈", "🎈", "🟠", "🟡", "🟢", "🔵", "🟣", "🟤"];

let balloonInterval;

function createBalloons() {
  const container = document.getElementById("balloonsContainer");

  balloonInterval = setInterval(() => {
    const balloon = document.createElement("div");
    balloon.className = "balloon";

    const randomIndex = Math.floor(Math.random() * balloonsData.length);
    const message = balloonsData[randomIndex];
    const color = balloonColors[randomIndex];

    balloon.textContent = color;
    balloon.style.left = Math.random() * 90 + 5 + "%";
    balloon.style.setProperty("--drift", Math.random() * 200 - 100 + "px");
    balloon.style.setProperty("--rotation", Math.random() * 720 - 360 + "deg");
    balloon.style.animationDuration = Math.random() * 4 + 10 + "s";
    balloon.style.animationDelay = Math.random() * 2 + "s";

    balloon.addEventListener("click", function () {
      showBalloonMessage(message);

      this.style.animation = "none";
      this.style.transform = "scale(0)";
      setTimeout(() => this.remove(), 300);
    });

    container.appendChild(balloon);

    setTimeout(() => {
      balloon.remove();
    }, 15000);
  }, 1500);
}

function showBalloonMessage(message) {
  const popup = document.getElementById("balloonPopup");
  const overlay = document.getElementById("balloonOverlay");
  const messageText = document.getElementById("balloonMessageText");

  messageText.textContent = message;

  overlay.classList.add("show");
  popup.classList.add("show");
}

function closeBalloonMessage() {
  const popup = document.getElementById("balloonPopup");
  const overlay = document.getElementById("balloonOverlay");

  overlay.classList.remove("show");
  popup.classList.remove("show");
}

function stopBalloons() {
  if (balloonInterval) {
    clearInterval(balloonInterval);
  }

  const container = document.getElementById("balloonsContainer");
  if (container) {
    container.innerHTML = "";
  }
}

const notesData = [
  "You are my today and all of my tomorrows.",
  "In a sea of people, my eyes will always search for you.",
  "I choose you. And I'll choose you over and over again.",
  "You're my favorite notification.",
  "Every love story is beautiful, but ours is my favorite.",
  "You are my sunshine on a cloudy day.",
  "Home is wherever I'm with you.",
  "You're the best thing that's ever been mine.",
  "I love you more than I have ever found a way to say to you.",
  "You make my heart smile.",
  "Forever isn't long enough with you.",
  "You are my happy place.",
];

function createNotes() {
  const container = document.getElementById("notesContainer");
  notesData.forEach((note, index) => {
    const noteEl = document.createElement("div");
    noteEl.className = "love-note";
    noteEl.innerHTML = `<div class="note-content">${note}</div>`;

    setTimeout(() => {
      container.appendChild(noteEl);
    }, index * 100);
  });
}

document.getElementById("finalHeart").addEventListener("click", function () {
  document.getElementById("finalMessage").classList.add("show");
});

function showSection(sectionId) {
  stopBalloons();

  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.style.display = "none";
    section.classList.remove("active");
  });

  const targetSection = document.getElementById(sectionId);
  targetSection.style.display = "flex";

  setTimeout(() => {
    targetSection.classList.add("active");

    if (sectionId === "gift-section") {
      const giftBox = document.getElementById("giftBox");
      if (giftBox) {
        giftBox.style.transform = "";
        giftBox.style.opacity = "";
      }
    } else if (sectionId === "polaroid-section") {
      createPolaroids();
    } else if (sectionId === "hearts-section") {
      createBalloons();
    } else if (sectionId === "notes-section") {
      createNotes();
    } else if (sectionId === "final-section") {
      setTimeout(() => {
        document.getElementById("finalMessage").classList.add("show");
      }, 2000);

      createFinalFloatingElements();
    }
  }, 50);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function createFinalFloatingElements() {
  const finalSection = document.getElementById("final-section");

  let container = finalSection.querySelector(".final-floating-elements");
  if (!container) {
    container = document.createElement("div");
    container.className = "final-floating-elements";
    finalSection.insertBefore(container, finalSection.firstChild);
  }

  const elements = ["🎈", "🌹", "💐", "🎀", "💝", "🌺", "🎈", "🌹"];

  setInterval(() => {
    const element = document.createElement("div");
    element.className = Math.random() > 0.5 ? "balloon" : "rose";
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * 100 + "%";
    element.style.setProperty("--drift", Math.random() * 100 - 50 + "px");
    element.style.animationDuration = Math.random() * 5 + 8 + "s";
    element.style.animationDelay = Math.random() * 2 + "s";
    element.style.fontSize = Math.random() * 20 + 25 + "px";

    container.appendChild(element);

    setTimeout(() => {
      element.remove();
    }, 12000);
  }, 400);
}

createFloatingElements();
