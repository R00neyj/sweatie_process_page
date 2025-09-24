console.clear();

// Header)dropdown mechnism //
function boxhide__init() {
  const targetSelector =
    ".top-section > .header > .header-box > .header-item > .drop-box";
  const boxSelector =
    ".top-section > .header > .header-box > .header-item > .dropdown-container";

  $(targetSelector).click(function (e) {
    e.stopPropagation();
    const $this = $(this);

    $this
      .closest(".header-item")
      .find("> .dropdown-container")
      .toggleClass("drop-kit");
  });

  $(document).click(function (e) {
    if (
      !$(e.target).closest(targetSelector).length &&
      !$(e.target).closest(boxSelector).length
    ) {
      $(boxSelector).removeClass("drop-kit");
    }
  });
}

function dropdown__init() {
  $(".top-section > .header > .header-box > .header-item > .drop-box").click(
    function () {
      $(this).parent().find("> .dropdown-container").addClass("drop-kit");
      $(this).toggleClass("rotate");
    }
  );
}
// activate codes //
boxhide__init();
dropdown__init();
