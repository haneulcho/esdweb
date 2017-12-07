(function ($, window, document, undefined) {

  $(function () {
    // 보유 캐릭터 슬라이더 목록
    var owl_characterList = $('.owl-carousel.characterList');
    owl_characterList.owlCarousel({
      items: 4,
      nav: true,
      autoplay: false,
      slideBy: 4,
      rewind: false,
      dragEndSpeed: 350
    });
    
    // Ajax Success Function에 삽입 할 보유 캐릭터 슬라이더 목록 새로고침 메소드
    // owl_characterList.trigger('refresh.owl.carousel');

    // 라디오 버튼 클릭 시 selected 클래스 추가
    $('label').on('click', function () {
      if ($(this).attr('for') != "") {
        var input = $(this).siblings('input');
        if (!input.prop('checked')) {
          input.prop('checked', true).trigger('change');
        }
      }
    });
    $('.server_list input').on('change', function () {
      $('.server_list input[name="' + this.name + '"]').parent('li').removeClass('selected');
      $('.server_list input[name="' + this.name + '"]:checked').parent('li').addClass('selected');
    });
  });

})(jQuery, window, document);
