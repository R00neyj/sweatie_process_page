AOS.init();

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

function colorGrow__init() {
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
colorGrow__init();
