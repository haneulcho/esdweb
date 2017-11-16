(function ($, window, document, undefined) {

  $(function () {
    var owl_promotionBanner = $('.owl-carousel.banner');
    owl_promotionBanner.owlCarousel({
      items: 1,
      loop: true,
      margin: 0,
      nav: false,
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

    // 게시판 제목, 검색 Nice Select
    if ($('.ipt_select').length) {
      $('.ipt_select').niceSelect();
    } else if ($('#pBoardWrite').length) {
      $('#writeCategory').niceSelect();
    }


  });

})(jQuery, window, document);
