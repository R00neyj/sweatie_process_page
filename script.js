gsap.registerPlugin(ScrollTrigger, ScrollSmoother, DrawSVGPlugin);

AOS.init();

function main_loading__init() {
  const loadingTime = 1800;
  const htmlEl = document.querySelector("html");
  const loadingEl = document.querySelector(".loading-screen");
  if (loadingEl === null) {
    return;
  }
  const numb = document.querySelector(".percentage .number");
  const video = document.querySelector("#main-video");
  const loadingScreenKey = "hasVisitedBefore";
  const isFirstVisit = sessionStorage.getItem(loadingScreenKey) === null;

  if (isFirstVisit) {
    sessionStorage.setItem(loadingScreenKey, "true");
    loading();
  } else {
    loaded();
  }

  function loading() {
    htmlEl.style.overflow = "hidden";
    let isVideoReady = false;
    loadingEl.style.setProperty("--loading-time", `${loadingTime}ms`);
    video.pause();

    video.addEventListener("canplaythrough", () => {
      isVideoReady = true;
    });

    for (let i = 0; i <= 100; i++) {
      setTimeout(() => {
        numb.textContent = i;
      }, (loadingTime / 100) * i);
    }
    setTimeout(loadCheck, loadingTime + 300);

    function loadCheck() {
      if (isVideoReady) {
        loaded();
      } else {
        console.log("video not loaded...");
        setTimeout(loadCheck, 300);
      }
    }
  }
  function loaded() {
    htmlEl.style.overflow = "auto";
    loadingEl.classList.remove("active");
    video.play();
  }
}

// text split
function textSplit__init() {
  const target = document.querySelectorAll("[data-split=true]");
  let charArr = [];

  target.forEach((el, index) => {
    char = el.textContent.split("");
    charArr.push(char);
    el.innerText = "";

    for (let i = 0; i < char.length; i++) {
      let spans = document.createElement("span");
      spans.textContent = charArr[index][i];
      spans.setAttribute("data-aos", "fade-in");
      spans.setAttribute("data-aos-duration", "1000");
      // spans.setAttribute("data-aos-once", "true");
      spans.setAttribute("data-aos-delay", (i + 1) * 100);
      el.append(spans);
    }
  });
}

textSplit__init();

function animationObserver__init() {
  const target = document.querySelectorAll(`.sec-6 .box-1, .sec-6 .box-2, .sec-6 .box-3`);

  target.forEach((el) => {
    el.classList.add("animate-init");
  });

  const colorGrowObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        let isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          entry.target.classList.remove("animate-init");
          entry.target.classList.add("animate");
        }
      });
    },
    {
      root: null,
      threshold: 0,
    }
  );

  target.forEach((el) => {
    colorGrowObserver.observe(el);
  });
}
animationObserver__init();

function svgAnimation__init() {
  const target = document.querySelector(`.sec-4 .img-container`);

  // 애니메이션 시작 전 라인 제거 css
  target.classList.add("animate-init");

  const lineAniObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        let isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          setTimeout(() => {
            target.classList.remove("animate-init");
            gaspDrawPath();
          }, 400);
          lineAniObserver.unobserve(target);
        }
      });
    },
    {
      root: null,
      threshold: 0.75,
    }
  );

  function gaspDrawPath() {
    gsap.from("#vertical_logo #lines > path", { duration: 2, drawSVG: 0 });
    gsap.from("#horizontal_logo #line > path", { duration: 2, drawSVG: 0 });
  }

  lineAniObserver.observe(target);

  const imgBox = target.querySelectorAll(".img-box");

  imgBox.forEach((el, index) => {
    el.addEventListener("click", function () {
      if (index === 0) {
        gsap.from("#horizontal_logo #line > path", { duration: 2, drawSVG: 0 });
      } else {
        gsap.from("#vertical_logo #lines > path", { duration: 2, drawSVG: 0 });
      }
    });
  });
}
svgAnimation__init();

ScrollSmoother.create({
  smooth: 1,
  effects: true,
});

const gsapAni__init = () => {
  const AniTarget = document.querySelectorAll(`
    [data-gsap="fade"],
    [data-gsap="popin"],
    [data-gsap="left"],
    [data-gsap="slideUp"]`);
  const Duration = 600;

  AniTarget.forEach((el) => {
    const AniName = el.getAttribute("data-gsap");
    const delay = Number(el.dataset.delay) || 0;

    gsap.set(el, { transformOrigin: "50% 50%" });

    if (AniName === "popin") {
      gsapAni__popIn(el, Duration, delay);
    } else if (AniName === "fade") {
      gsapAni__fade(el, Duration, delay);
    } else if (AniName === "left") {
      gsapAni__left(el, Duration, delay);
    } else if (AniName === "slideUp") {
      gsapAni__slideUp(el, Duration, delay);
    }
  });
};

const gsapAni__popIn = (target, duration, delay) => {
  const tl = gsap.timeline();
  tl.from(target, { delay: delay / 1000 });
  tl.from(target, { scale: 0.75, opacity: 0, duration: duration / 1000, ease: "none" });
  gaspAni__creatST(target, tl, 1);
};

const gsapAni__slideUp = (target, duration, delay) => {
  const tl = gsap.timeline();
  tl.from(target, { delay: delay / 1000 });
  tl.from(target, { y: 100, opacity: 0, duration: duration / 1000, ease: "power1.out" });
  gaspAni__creatST(target, tl, false);
};

const gsapAni__fade = (target, duration, delay) => {
  const tl = gsap.timeline();
  tl.from(target, { delay: delay / 1000 });
  tl.from(target, { opacity: 0, duration: duration / 1000, ease: "none" });
  gaspAni__creatST(target, tl, 1);
};

const gsapAni__left = (target, duration, delay) => {
  const tl = gsap.timeline();
  tl.from(target, { delay: delay / 1000 });
  tl.from(target, { opacity: 0, x: "-25%", duration: duration / 1000, ease: "none" });
  gaspAni__creatST(target, tl, 1);
};

const gaspAni__creatST = (targetEl, timeline, scrub) => {
  const st = ScrollTrigger.create({
    trigger: targetEl,
    animation: timeline,
    scrub: scrub,
    start: "top bottom",
    end: "bottom +=75%",
    toggleActions: "play none none reverse",
  });
};

function secSolutionGsap() {
  const target = document.querySelector(".sec-solution");
  const svgBox = target.querySelector(".svg-box");
  const text = target.querySelectorAll("p");
  const mouse = document.querySelector(".mouse");

  const tl = gsap.timeline({ defaults: { ease: "none" } });

  tl.add("start");
  // tl.from(target, { opacity: 0 });
  tl.from(target, { backgroundColor: "#2c2c2c", color: "#2c2c2c" });
  tl.from(svgBox, { opacity: 0 }, "+=0.2");
  tl.from(text[0], { opacity: 0 }, "+=0.3");
  tl.from(text[1], { opacity: 0 }, "+=0.4");

  const st = ScrollTrigger.create({
    trigger: target,
    pin: true,
    scrub: 1,
    animation: tl,
    start: "top top",
    end: "+=200% top",

    onEnter: () => mouse.classList.add("invert"),
    onEnterBack: () => mouse.classList.add("invert"),
    onLeave: () => {
      AOS.refresh();
      mouse.classList.remove("invert");
    },
    onLeaveBack: () => mouse.classList.remove("invert"),
  });
}
function gsapSticky(elements) {
  const pinTarget = document.querySelector(elements);
  const pinContainer = pinTarget.parentElement;

  const st = ScrollTrigger.create({
    trigger: pinContainer,
    pin: pinTarget,
    scrub: 0,
    pinSpacing: false,
    start: "top top",
    end: `bottom top+=${pinTarget.offsetHeight}`,
  });
}

function hoverAni() {
  const targetAll = document.querySelectorAll(`[data-hover="up"]`);
  targetAll.forEach((el) => {
    el.addEventListener("pointerenter", () => {
      gsap.to(el, { y: -10, duration: 0.3, ease: "power1.out" });
    });
    el.addEventListener("pointerleave", () => {
      gsap.to(el, { y: 0, duration: 0.3, ease: "power1.out" });
    });
  });
}

const mouseAni = () => {
  const mouseEl = document.querySelector(".mouse");

  window.addEventListener("mousemove", (e) => {
    mouseEl.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
  });

  const sec5_mouseColorChange = ScrollTrigger.create({
    trigger: ".sec-5",
    start: "top center",
    end: "bottom center",

    onEnter: () => mouseEl.classList.add("invert"),
    onEnterBack: () => mouseEl.classList.add("invert"),
    onLeave: () => mouseEl.classList.remove("invert"),
    onLeaveBack: () => mouseEl.classList.remove("invert"),
  });
};

document.addEventListener("DOMContentLoaded", () => {
  gsapAni__init();
  main_loading__init();
  secSolutionGsap();
  gsapSticky(".sec-info-arch .grid-box.table");
  hoverAni();
  mouseAni();
});
