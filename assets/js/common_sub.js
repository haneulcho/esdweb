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

    // 상단 네비게이션
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

    // 설문조사 라디오 버튼 클릭 시 selected 클래스 추가
    if ($('#pollView').length) {
      var $pollView = $('#pollView'),
          $voteList = $pollView.find('.vote_list'),
          $voteLabel = $voteList.find('label'),
          $voteInput = $voteList.find('input');

      $voteLabel.on('click', function () {
        if ($(this).attr('for') != "") {
          var input = $(this).siblings('input');
          if (!input.prop('checked')) {
            input.prop('checked', true).trigger('change');
          }
        }
      });

      $voteInput.on('change', function () {
        $('.vote_list input[name="' + this.name + '"]').parent('li').removeClass('selected');
        $('.vote_list input[name="' + this.name + '"]:checked').parent('li').addClass('selected');
      }); 
    }

    // 비매너/버그 신고 게시판 파일명 표시
    if ($('body').find('.bw_file').length) {
      $(document).on('change', '.ipt_file', function () {
        $(this).next('.ipt_fileName').val($(this).val().replace(/C:\\fakepath\\/i, ''));
      });
    }
  });

})(jQuery, window, document);
