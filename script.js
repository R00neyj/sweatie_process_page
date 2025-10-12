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
document.addEventListener("DOMContentLoaded", () => {
  main_loading__init();
});
// text split
function textSplit__init() {
  const target = document.querySelectorAll(".font-name");
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
      spans.setAttribute("data-aos-once", "true");
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
