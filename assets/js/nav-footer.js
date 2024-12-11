function loadPartial(filePath, elementId, callback) {
  fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Could not load ${filePath}: ${response.statusText}`);
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById(elementId).innerHTML = html;
      if (callback) callback(); // Execute callback after loading
    })
    .catch((error) => console.error("Error loading partial:", error));
}

// Load navbar and footer, then initialize scroll functionality
loadPartial("assets/navbar.html", "navbar", initScrollTo);
loadPartial("assets/footer.html", "footer");


function initScrollTo() {
  const scrolltoOffset = $("#header").outerHeight() - 1;

  // Smooth scroll for navigation links
  $(document).on(
    "click",
    ".nav-menu a, .mobile-nav a, .scrollto",
    function (e) {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        const target = $(this.hash);
        if (target.length) {
          e.preventDefault();

          let scrollto = target.offset().top - scrolltoOffset;
          if ($(this).attr("href") == "#header") {
            scrollto = 0;
          }

          $("html, body").animate(
            {
              scrollTop: scrollto,
            },
            1500,
            "easeInOutExpo"
          );

          if ($(this).parents(".nav-menu, .mobile-nav").length) {
            $(".nav-menu .active, .mobile-nav .active").removeClass("active");
            $(this).closest("li").addClass("active");
          }

          if ($("body").hasClass("mobile-nav-active")) {
            $("body").removeClass("mobile-nav-active");
            $(".mobile-nav-toggle i").toggleClass(
              "icofont-navigation-menu icofont-close"
            );
            $(".mobile-nav-overly").fadeOut();
          }
          return false;
        }
      }
    }
  );

  // Add scroll behavior for navbar background
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 100) {
      $("#header").addClass("header-scrolled");
    } else {
      $("#header").removeClass("header-scrolled");
    }
  });

  // Apply background if page is reloaded at scroll position
  if ($(window).scrollTop() > 100) {
    $("#header").addClass("header-scrolled");
  }
}
