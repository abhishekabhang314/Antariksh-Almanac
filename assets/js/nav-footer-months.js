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
  loadPartial("navbar.html", "navbar", function () {
    initScrollTo(); // Initialize scroll functionality
    initMobileNav(); // Initialize mobile nav functionality
  });
  
  loadPartial("footer.html", "footer");
  
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
  
  function initMobileNav() {
    if ($(".nav-menu").length) {
      const $mobile_nav = $(".nav-menu").clone().prop({
        class: "mobile-nav d-lg-none",
      });
      $("body").append($mobile_nav);
  
      // Append overlay if not already present
      if (!$(".mobile-nav-overly").length) {
        $("body").append('<div class="mobile-nav-overly"></div>');
      }
  
      // Handle mobile nav toggle
      $(".mobile-nav-toggle").on("click", function () {
        $("body").toggleClass("mobile-nav-active");
        $(".mobile-nav-toggle i").toggleClass(
          "icofont-navigation-menu icofont-close"
        );
        $(".mobile-nav-overly").toggle();
      });
  
      // Dropdown functionality in mobile nav
      $(document).on("click", ".mobile-nav .drop-down > a", function (e) {
        e.preventDefault();
        $(this).next().slideToggle(300);
        $(this).parent().toggleClass("active");
      });
  
      // Close mobile nav when clicking outside
      $(document).on("click", function (e) {
        const container = $(".mobile-nav, .mobile-nav-toggle");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          if ($("body").hasClass("mobile-nav-active")) {
            $("body").removeClass("mobile-nav-active");
            $(".mobile-nav-toggle i").toggleClass(
              "icofont-navigation-menu icofont-close"
            );
            $(".mobile-nav-overly").fadeOut();
          }
        }
      });
    }
  }
  
  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  $(window).on("load", function () {
    aos_init();
  });
  