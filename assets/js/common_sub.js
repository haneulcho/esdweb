/* ================================================================
	* FILENAME: common_sub.js
	* PROJECT: 엘소드 2018 리뉴얼 서브 UI 공통 스크립트
	* UPDATE: 18.01.03
================================================================ */

// 공통 변수 캐싱
var $window = $(window), isModalOpen = false;

var Elsword = Elsword || (function () {
	var UI = {};
	UI.checkIE = function () {
		var ua = window.navigator.userAgent;
		var other = 999;
		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			// IE 10 or older
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}
		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			// IE 11
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}
		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			// Edge (IE 12+)
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}
		return other;
	}; // checkIE

	UI.init = function () {
		UI.pageLoader();
		UI.globalNavigation();
	}; // init

	UI.pageLoader = function () {
		if ($('.loader').length) {
			var $target = $('.loader'), targetSpeed = 700;
			$target.stop(true, true).fadeOut(targetSpeed);
		}
	}; // pageLoader

	UI.globalNavigation = function () {
		var $gnbWrapper = $('#header .nav'),
			$gnb = $gnbWrapper.find('.gnb');

		if ($gnb.length) {
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

			if ($('#contents').hasClass('character') || $('#contents').hasClass('feature')) {
				$gnbWrapper.addClass('white');
			}
		}
	}; // globalNavigation

	UI.setCarousel = function ($target, options) {
		if ($target.length) {
			$target.owlCarousel(options);
		}
	}; // setCarousel

	UI.inputControl = {
		setRadio: function ($target) {
			var $label = $target.find('label'),
				$input = $target.find('input');

			if ($label.length) {
				$label.on('click', function () {
					if ($(this).attr('for') != "") {
						var input = $(this).siblings('input');
						if (!input.prop('checked')) {
							input.prop('checked', true).trigger('change');
						}
					}
				});
			}
			if ($input.length) {
				$input.on('change', function () {
					$target.find('input[name="' + this.name + '"]').parent('li').removeClass('selected');
					$target.find('input[name="' + this.name + '"]:checked').parent('li').addClass('selected');
				});
			}
		}, // inputControl.setRadio

		setNiceSelect: function ($target) {
			if ($target.length) {
				$target.niceSelect();
			}
		} // inputControl.setNiceSelect
	}; // inputControl

	UI.layerControl = {
		setLayerSize: function (target) {
			var $target = $(target), minHeight = 200;
			var layerTop, layerLeft, scrollHeight;
			layerTop = ($window.height() - $target.outerHeight()) / 2;
			layerLeft = ($target.outerWidth() / 2) * -1;
			scrollHeight = ($window.scrollTop() + layerTop);

			if ($('#GNB_Wrapper').hasClass('gnbWrapperOpen')) {
				scrollHeight = scrollHeight - $('#GNB_Wrapper').outerHeight();
			}

			if (scrollHeight > minHeight) {
				$target.css({
					'top': scrollHeight,
					'margin-left': layerLeft
				});
			} else {
				$target.css({
					'top': minHeight,
					'margin-left': layerLeft
				});
			}
		}, // layerControl.setLayerSize

		openLayer: function (target) {
			if (!isModalOpen && $(target).length) {
				isModalOpen = true;
				var isVisible = $(target).is(':visible');
				if (!isVisible) {
					UI.layerControl.setLayerSize(target);
					if (!$('.modal_bg').length) {
						$('body').append('<div class="modal_bg"></div>');
					}
					$(target + ', .modal_bg').fadeIn(200);
				}
			}
		}, // layerControl.openLayer

		closeLayer: function (target) {
			if (isModalOpen && $(target).length) {
				$(target + ', .modal_bg').fadeOut(200, function () {
					$(this).remove();
					isModalOpen = false;
				});
			}
		} // layerControl.closeLayer
	}; // layerControl

	UI.popupControl = {
		openWindow: function (url, w, h) {
			var w = w || 620;
			var h = h || 560;
			var x = (screen.width / 2) - (w / 2);
			var y = (screen.height / 2) - (h / 2);
			window.open(url, '엘소드 :: 스타일리쉬 액션 RPG', 'width=' + w + ',height=' + h + ',left=' + x + ',top=' + y);
		} // popupControl.openWindow
	};

	return UI;
})(); // Elsword Module END

function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;
}

$(document).ready(function () {
	isIE = Elsword.checkIE();

	// 서브 페이지 슬라이더
	Elsword.setCarousel($('.owl-carousel.banner'), {
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
	});

	// 게시판 제목, 검색, 랭킹 등 Nice Select
	Elsword.inputControl.setNiceSelect($('.ipt_select'));
	Elsword.inputControl.setNiceSelect($('#writeCategory'));

	// 설문조사 Radio 버튼
	Elsword.inputControl.setRadio($('#pollView .vote_list'));

	// 레이어 팝업 열기
	$('body').on('click', '.gf_btn_popup, .gf_btn_ytb', function (e) {
		e.preventDefault();
		if (!isModalOpen) {
			var $this = $(this), target;
			var popup_str = '';

			// CASE: 이미지
			if ($this.hasClass('pop_img')) {
				var imgSrc = $this.attr('href');
				popup_str += '<div id="pop_img" class="popup">';
				popup_str += '<div class="gf_btn_popupClose"><a href="#pop_img"><span class="ir">팝업 닫기</span></a></div>';
				popup_str += '	<div class="modal_body">';
				popup_str += '		<img src="' + imgSrc + '">';
				popup_str += '	</div>';
				popup_str += '</div>';

				target = '#pop_img';

			// CASE: 유튜브 동영상
			} else if ($this.hasClass('pop_ytb') || $this.hasClass('gf_btn_ytb')) {
				var youtubeSrc = $this.attr('data-ytb-src'),
					youtubeWidth = 1100,
					youtubeHeight = 620;

				popup_str += '<div id="pop_ytb" class="popup">';
				popup_str += '<div class="gf_btn_popupClose"><a href="#pop_ytb"><span class="ir">팝업 닫기</span></a></div>';
				popup_str += '	<div class="modal_body">';
				popup_str += '		<div class="modal_ytb">';
				popup_str += '			<iframe width="' + youtubeWidth + '" height="' + youtubeHeight + '" src="https://www.youtube.com/embed/' + youtubeSrc + '?rel=0&showinfo=0&autoplay=0" frameborder="0" allowfullscreen=""></iframe>';
				popup_str += '		</div>';
				popup_str += '	</div>';
				popup_str += '</div>';

				target = '#pop_ytb';

			// CASE: 일반
			} else {
				target = $(this).attr('href');
			}

			if (popup_str != '') {
				$('#footer').before(popup_str);
			}

			// UI 공통 모듈 호출
			Elsword.layerControl.openLayer(target);
		}
	});

	// 레이어 팝업 닫기
	$('body').on('click', '.gf_btn_popupClose', function (e) {
		e.preventDefault();
		var target = '#' + $(this).parents('.popup').attr('id');
		Elsword.layerControl.closeLayer(target);
	});

	// 비매너/버그 신고 게시판 파일명 표시
	if ($('body').find('.bw_file').length) {
		$(document).on('change', '.ipt_file', function () {
			$(this).next('.ipt_fileName').val($(this).val().replace(/C:\\fakepath\\/i, ''));
		});
	}

	// 멀티미디어 탭 기능
	if ($('body').find('.multimedia').length) {
		$(document).on('click', '#tab_year .media_calendar .btn.all_year', function (e) {
			e.preventDefault();
			$('#mediaYearList').toggleClass('active');
		});
		$(document).on('click', '#mediaList .media_tab_nav li a', function (e) {
			e.preventDefault();
			var $this = $(this);
			var $pLi = $this.parent('li');
			var $target = $($this.attr('href'));
			if (!$pLi.hasClass('active') && !$target.hasClass('active')) {
				$('.media_tab_cont.active').hide().removeClass('active');
				$('.media_tab_nav li.active').removeClass('active');
				$target.fadeIn(250, function () {
					$(this).addClass('active');
				});
				$pLi.addClass('active');
			}
		});
	}

}); // @ready function END

// 기본 페이지 로더 호출
$window.load(function () {
	Elsword.init();
});
