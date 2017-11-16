(function ($, window, document, undefined) {

  $(function () {
    var owl_promotionBanner = $('.owl-carousel.banner');
    owl_promotionBanner.owlCarousel({
      items: 1,
      loop: true,
      margin: 0,
      nav: true,
      mouseDrag: false,
      pullDrag: false,
      dotsEach: true,
      autoplay: true,
      autoplayHoverPause: true,
      animateIn: 'fadeIn',
      animateOut: 'fadeOut'
      // onInitialized: onInitialized,
      // onTranslate: onTranslate
    });

    var owl_uccBanner = $('.owl-carousel.ucc');
    owl_uccBanner.owlCarousel({
      items: 1,
      loop: true,
      margin: 20,
      nav: false,
      dotsEach: true,
      autoplay: true,
      autoplayHoverPause: true,
      dragEndSpeed: 350,
      animateIn: 'fadeInDown',
      animateOut: 'fadeOutDown'
    });

    var owl_megaphnoeBanner = $('.owl-carousel.megaphone');
    owl_megaphnoeBanner.owlCarousel({
      items: 1,
      loop: true,
      margin: 0,
      nav: false,
      autoplay: true,
      autoplaySpeed: 600,
      autoplayHoverPause: true
    });

    var $gnbWrapper = $('#header .nav'),
        $gnb = $gnbWrapper.find('.gnb'),
        $gnbLi = $gnb.children('li');
    $gnb.on({
      'mouseenter': function () {
        if (!$gnbWrapper.hasClass('on')) {
          $gnbWrapper.addClass('on');
        }
      },
      'mouseleave': function () {
        if ($gnbWrapper.hasClass('on')) {
          $gnbWrapper.removeClass('on');
        }
      }
    })


  });

})(jQuery, window, document);
