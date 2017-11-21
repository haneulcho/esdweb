(function ($, window, document, undefined) {

  $(function () {
    if ($('#contents').hasClass('character')) {
      $('#header nav').addClass('white');
    }
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


    // 멀티미디어
    tabLoad();

    $(".calendar_y li .y_lst_btn").on("click", function(e) {
        $('#y_lst').toggleClass('on');
        e.preventDefault();
    });

    function tabLoad() {
        var idx = $('.tab_cont').index();
        $('.tab_cont').not(':eq('+idx+')').hide(); // tab_cont :: all hide

        $('.tab_lst').each(function() { // tab_lst li first :: on
            var $this = $(this);
            var $first_lst = $(this).children('li').eq(0);
            $first_lst.addClass('on');
        });

        $('.tab_container').each(function () { // tab_cont first :: on
            var $this = $(this);
            var $first_tab = $(this).children('.tab_cont').eq(0);
            $first_tab.show();
        });

        var $btn_tab = $('.tab_lst').find('li');
        $btn_tab.on('click', function (e) {
            e.preventDefault();

            var $this = $(this),
                $thisrel = $this.attr('rel'); // tab_lst li :: rel
                $thisClass = $('.'+ $thisrel); // tab_cont :: class
                target = $thisClass.parent('.tab_container').attr('id'); // tab_container :: id

                $('#' + target).find('.tab_cont').hide();
                $('#' + target + ' .' + $thisrel).fadeIn();

                $this.addClass('on').siblings().removeClass('on'); // tab_lst li :: on
        });
    }

  });

})(jQuery, window, document);
