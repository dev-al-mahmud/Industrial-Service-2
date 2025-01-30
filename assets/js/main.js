(function($) {
    "use strict";
    /*=================================
    JS Index Here
    ==================================*/
    /*
    01. On Load Function
    02. Preloader
    03. Mobile Menu Active
    04. Sticky fix
    05. Scroll To Top
    06. Counter Up
    07. Global Slider
    08. Magnific Popup
    09. Filter
    10. Product Image Slide
    11. Modal
  */
    /*=================================
    JS Index End
    ==================================*/
    /*

    /*---------- 01 On Load Function ----------*/
    $(window).on("load", function() {
        $(".preloader").fadeOut(1000);
    });

    /*---------- 02 Preloader ----------*/
    if ($(".preloader").length > 0) {
        $(".preloaderCls").each(function() {
            $(this).on("click", function(e) {
                e.preventDefault();
                $(".loader").css("display", "none");
                $('.loader').delay(1000).fadeOut('6000');
            });
        });
    }

    /*----------------- 03 Mobile Menu Humbagur -------------*/
    $.fn.asmobilemenu = function(options) {
        var opt = $.extend({
                menuToggleBtn: ".vektor-menu-toggle",
                bodyToggleClass: "vektor-body-visible",
                subMenuClass: "vektor-submenu",
                subMenuParent: "vektor-item-has-children",
                subMenuParentToggle: "vektor-active",
                meanExpandClass: "vektor-mean-expand",
                appendElement: '<span class="vektor-mean-expand"></span>',
                subMenuToggleClass: "vektor-open",
                toggleSpeed: 400,
            },
            options
        );
        return this.each(function() {
            var menu = $(this); // Select menu
            // Menu Show & Hide
            function menuToggle() {
                menu.toggleClass(opt.bodyToggleClass);
                // collapse submenu on menu hide or show
                var subMenu = "." + opt.subMenuClass;
                $(subMenu).each(function() {
                    if ($(this).hasClass(opt.subMenuToggleClass)) {
                        $(this).removeClass(opt.subMenuToggleClass);
                        $(this).css("display", "none");
                        $(this).parent().removeClass(opt.subMenuParentToggle);
                    }
                });
            }
            // Class Set Up for every submenu
            menu.find("li").each(function() {
                var submenu = $(this).find("ul");
                submenu.addClass(opt.subMenuClass);
                submenu.css("display", "none");
                submenu.parent().addClass(opt.subMenuParent);
                submenu.prev("a").append(opt.appendElement);
                submenu.next("a").append(opt.appendElement);
            });
            // Toggle Submenu
            function toggleDropDown($element) {
                if ($($element).next("ul").length > 0) {
                    $($element).parent().toggleClass(opt.subMenuParentToggle);
                    $($element).next("ul").slideToggle(opt.toggleSpeed);
                    $($element).next("ul").toggleClass(opt.subMenuToggleClass);
                } else if ($($element).prev("ul").length > 0) {
                    $($element).parent().toggleClass(opt.subMenuParentToggle);
                    $($element).prev("ul").slideToggle(opt.toggleSpeed);
                    $($element).prev("ul").toggleClass(opt.subMenuToggleClass);
                }
            }
            // Submenu toggle Button
            var expandToggler = "." + opt.meanExpandClass;
            $(expandToggler).each(function() {
                $(this).on("click", function(e) {
                    e.preventDefault();
                    toggleDropDown($(this).parent());
                });
            });
            // Menu Show & Hide On Toggle Btn click
            $(opt.menuToggleBtn).each(function() {
                $(this).on("click", function() {
                    menuToggle();
                });
            });
            // Hide Menu On out side click
            menu.on("click", function(e) {
                e.stopPropagation();
                menuToggle();
            });
            // Stop Hide full menu on menu click
            menu.find("div").on("click", function(e) {
                e.stopPropagation();
            });
        });
    };
    $(".vektor-menu-wrapper").asmobilemenu();

    if ($(".side-box-bar").length) {
        $(".side-box-bar").on("click", function(e) {
            e.preventDefault();
            $(".canvas-wrapper").toggleClass("active");
            $("body").toggleClass("locked");
        });
    }

    //----------------- 04 Sticky Menu -------------------------/////
    var num = 400;
    $(window).bind('scroll', function() {
        if ($(window).scrollTop() > num) {
            $('.stickey-wrapper').addClass('fixed');
        } else {
            $('.stickey-wrapper').removeClass('fixed');
        }
    });

    ///----------------------------- 05 Scroll To Top---------------------------------------/
    $(window).scroll(function() {
        if ($(this).scrollTop()) {
            $('.to-top').fadeIn(2000);
        } else {
            $('.to-top').fadeOut(1000);
        }
    });
    $(".to-top").click(function() {
        $("html, body").animate({
            scrollTop: 500
        }, 200);
    });


    // ------------------------------------------- 06 Counter JS ------------------------------//
    $('.counter').counterUp({
        delay: 10,
        time: 5000
    });

    // ------------------------- 07 Global Slider ------------------------- //
    $('.project-slider-wrap').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 2,
        margin: 20,
        dots: false,
        arrows: false,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                },
                breakpoint: 1140,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 776,
                settings: {
                    centerMode: false,
                    slidesToShow: 1
                }
            },

        ]
    });

    // Slick Slider 2 //////////////////////////////////
    $('.home-one-hero-wrapper').slick({
        slidesToShow: 1,
        dots: true,
        arrows: false,
        fade: true,
        autoplay: true,
        speed: 1500,
    });

    // ------------------------- 08 Magnific Popup ------------------------- //
    if ($(".image-link").length) {
        $(document).ready(function() {
            $('.image-link').magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true,
                }
            });

        });
    }

    // ---------------------------- 09  Fillter ------------------------------------////
    $('.filter-active').imagesLoaded(function() {
        var $filter = '.filter-active',
            $filterItem = '.filter-item',
            $filterMenu = '.filter-menu-active';

        if ($($filter).length > 0) {
            var $grid = $($filter).isotope({
                itemSelector: $filterItem,
                filter: '.cat1',
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: 1
                }
            });

            // filter items on button click
            $($filterMenu).on('click', 'button', function() {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({
                    filter: filterValue
                });
            });

            // Menu Active Class
            $($filterMenu).on('click', 'button', function(event) {
                event.preventDefault();
                $(this).addClass('active');
                $(this).siblings('.active').removeClass('active');
            });
        };
    });

    // ------------------------- 10 Product Image Slide ------------------------- //
    document.addEventListener('DOMContentLoaded', () => {
        const imgBtns = Array.from(document.querySelectorAll('.product-small-img a'));
        const productImgContainer = document.querySelector('.product-img');
        let imgId = 1;

        imgBtns.forEach(imgItem => {
            imgItem.addEventListener('click', event => {
                event.preventDefault();
                imgId = parseInt(imgItem.dataset.id, 10);
                slideImage();
            });
        });

        function slideImage() {
            if (!productImgContainer) return;

            const imgs = productImgContainer.querySelectorAll('img');
            const displayWidth = imgs.length > 0 ? imgs[0].clientWidth : 0;

            productImgContainer.style.transform = `translate(${- (imgId - 1) * displayWidth}px)`;
        }

        // Debounce function to limit the rate of resize events
        function debounce(func, wait) {
            let timeout;
            return function(...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
        }

        window.addEventListener('resize', debounce(slideImage, 100));
    });

    //----------------- 11 Modal --------------------///
    var myModal = document.getElementById('myModal')
    var myInput = document.getElementById('myInput')



})(jQuery);