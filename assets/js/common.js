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
    });

    var $notice_tabLink = $('#main').find('.notice_tab_nav li > a');
    var $notice_tabCont = $('#main').find('.notice_tab_cont');
    $notice_tabLink.on('click', function (e) {
      e.preventDefault();
      var $this = $(this);
      var $pLi = $this.parent('li');
      if (!$pLi.hasClass('active')) {
        $pLi.siblings().removeClass('active');
        $pLi.addClass('active');
        $notice_tabCont.removeClass('active');
        $($this.attr('href')).addClass('active');
      }
    });

  });

})(jQuery, window, document);
