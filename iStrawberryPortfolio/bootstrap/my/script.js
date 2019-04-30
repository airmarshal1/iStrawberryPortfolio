$(document).ready(function () {

    (function () {
        var link, toggleScrollToToplink = function () {
            if ($("body").scrollTop() > 0 || $("html").scrollTop() > 0) {
                link.fadeIn(400);
            }
            else {
                link.fadeOut(400);
            }
        };
        $(document).ready(function () {

            $("#owl-demo").owlCarousel({
                autoPlay: 3000,
                stopOnHover: true,
                navigation: true,
                paginationSpeed: 1000,
                goToFirstSpeed: 2000,
                singleItem: true,
                autoHeight: true,
                transitionStyle: "fade"
            });


            link = $(".scroll-to-top-link");
            $(window).scroll(toggleScrollToToplink);
            toggleScrollToToplink();
            link.on("click", function () {
                $("body").animate({ scrollTop: 0 });
                $("html").animate({ scrollTop: 0 });
            });

            resizeCarousel();
            function resizeCarousel() {
                $(window).resize(function () {
                    var i = $(window).width();
                    if (i <= 768) {
                        $("#divide").css({
                            'margin-top': '45%',
                            'margin-bottom': '5%'
                        });
                        //alert('Hello world');
                    } else {
                        $("#divide").css({
                            'margin-top': '0',
                            'margin-bottom': '0'
                        });
                    }
                });
            };
        });
    })();

    

    var fixHeight = function () {
        $(".navbar-nav").css("max-height", document.documentElement.clientHeight - 150);
    };
    fixHeight();
    $(window).resize(function () {
        fixHeight();
    });
    $(".navbar-nav, .navbar-toggler").on("click", function () {
        fixHeight();
    });
    $(".navbar-toggler, .overlay").on('click', function () {
        $(".mobileMenu, .overlay").toggleClass("open");
    });
});