/* ================================================================
	* FILENAME: common.js
	* PROJECT: 엘소드 2018 리뉴얼 메인 UI 공통 스크립트
	* UPDATE: 19.05.30
================================================================ */

// 공통 변수 캐싱
var $window = $(window), isModalOpen = false;

var Elsword = Elsword || (function () {
	var UI = {};
	UI.checkIE = function () {
		var ua = window.navigator.userAgent, other = 999, msie = ua.indexOf('MSIE '), trident = ua.indexOf('Trident/'), edge = ua.indexOf('Edge/');
		if (msie > 0) {
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		} else if (trident > 0) {
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		} else if (edge > 0) {
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		} else {
			return other;
		}
	}; // checkIE

	UI.init = function () {
		UI.pageLoader();
		UI.globalNavigation();
		UI.floatingBanner();
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

	UI.floatingBanner = function () {
		var $snb = $('#aside .wrap_aside');

		if ($snb.length) {
			var initPos = 0, snbTopMargin = 60;

			function init () {
				initPos = $('#main').offset().top + 235;
				$snb.stop().animate({ top: initPos }, 800);
			}

			if ($('#GNB_BtBanner').length) {
				document.getElementById('GNB_BtBanner').addEventListener('click', function () {
					init();
				});
			}

			init();

			$window.on('scroll resize', function () {
				var top_value,
					wPos = $(window).scrollTop(),
					footerPos = $('#footer').offset().top;
				
				// 플로팅 배너가 footer에 닿거나 footer를 넘어갈 때
				if (wPos > (footerPos - $snb.height() - snbTopMargin)) {
					top_value = footerPos - $snb.height() - snbTopMargin - 20;

				// 일반적인 상황
				} else {
					// 브라우저 스크롤이 플로팅 배너의 첫 위치(initPos)를 스치면 스크롤 따라다님
					// 아니면, 첫 위치(initPos)로 되돌아감
					top_value = (wPos > (initPos - snbTopMargin)) ? wPos + snbTopMargin : initPos;
				}
				$snb.stop().animate({ top: top_value }, 800);
			});
		}
	}; // floatingBanner

	UI.setCarousel = function ($target, options) {
		if ($target.length) {
			$target.owlCarousel(options);
			if (options.autoplayTimeout != 'undefined' && options.autoplayTimeout != null) {
				$target.on('mouseleave', function () {
					$target.trigger('stop.owl.autoplay');
					$target.trigger('play.owl.autoplay', [options.autoplayTimeout]);
				});
			}
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
		getGnbHeight: function () {
			return $('#GNB_Wrapper').length ? ($('#GNB_Wrapper').hasClass('gnbWrapperOpen') ? 220 : 50) : ($('.gnbWrapper').length ? 63 : ($('.global_wrap').length ? 60 : 0));
		}, // layerControl.getGnbHeight

		setLayerSize: function (target, callBack) {
			if ($(target).length) {
				var $target = $(target),
					isSetCallBack = (callBack && $.isFunction(callBack)) ? true : false,
					timeLimit = (isSetCallBack) ? 270 : 0;

				setTimeout(function () {
					var wTop = $window.scrollTop(),
						gnbHeight = UI.layerControl.getGnbHeight(),
						targetHeight = parseInt($target.height()),
						promotionHeight = (!$target.hasClass('dcn_modal')) ? 0 : $('#promotion').height(),
						layerTopMargin = 0,
						layerLeftMargin = -($target.width() / 2),
						min = (!$target.hasClass('dcn_modal')) ? 150 : 100,
						max = $window.height() - gnbHeight;

					if (max < targetHeight + (min * 2)) {
						layerTopMargin = (gnbHeight < wTop) ? (wTop - gnbHeight) + min : min;
					} else {
						layerTopMargin = (gnbHeight < wTop) ? wTop + (($window.height() - targetHeight) / 2) - gnbHeight : (($window.height() - (gnbHeight - wTop)) - targetHeight) / 2;
					}

					layerTopMargin -= promotionHeight;

					if (isSetCallBack) {
						$target.css({ 'top': layerTopMargin, 'margin-left': layerLeftMargin });
						callBack();
					} else {
						$target.stop().animate({ top: layerTopMargin }, 700, 'easeInOutQuint');
					}
					
				}, timeLimit);
			}
		}, // layerControl.setLayerSize

		openLayer: function (target) {
			if (!isModalOpen && $(target).length) {
				isModalOpen = true;
				var $target = $(target),
					isVisible = $target.is(':visible');
				if (!isVisible) {
					if (!$('.modal_bg').length) {
						$('body').append('<div class="modal_bg"></div>');
					}
					$('.modal_bg').fadeIn(200);
					$target.css('display', 'block');
					UI.layerControl.setLayerSize(target, function () {
						$(target).stop().animate({ opacity: 1 }, 150);
					});
				}
			}
		}, // layerControl.openLayer

		closeLayer: function (target) {
			if (isModalOpen && $(target).length) {
				$(target + ', .modal_bg').fadeOut(200, function () {
					if (!$(target).hasClass('dcn_modal')) { $(this).remove(); }
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

// 네이버 ngwPopup function 호출
if (typeof ngwPopup == 'undefined' || ngwPopup == undefined) {
	function ngwPopup (url, w, h, s, name) {
		if (w==null) w = '100%';
		if (h==null) h = '100%';
		var l,t = '0';
		if (screen.width && screen.height)	{
			l = (screen.width-w)/2;
			t = (screen.height-h)/2;
		}
		if (s==null) s = '0';
		if (name==null) name = '';
		window.open(url, name, 'width='+w+',height='+h+',left='+l+',top='+t+',resizable=0,menubar=0,toolbar=0,scrollbars='+s+',status=0');
	}
}

$(document).ready(function () {
	isIE = Elsword.checkIE();

	// 상단 프로모션 슬라이더
	Elsword.setCarousel($('.owl-carousel.banner'), {
		items: 1,
		loop: true,
		margin: 0,
		nav: true,
		mouseDrag: false,
		pullDrag: false,
		dotsEach: true,
		autoplay: true,
		autoplaySpeed: 4000,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut'
	});

	// GM 메가폰 슬라이더
	Elsword.setCarousel($('.owl-carousel.megaphone'), {
		items: 1,
		loop: true,
		margin: 0,
		nav: false,
		autoplay: true,
		autoplaySpeed: 600,
		autoplayHoverPause: true
	});

	// 엘소드 UCC 슬라이더
	Elsword.setCarousel($('.owl-carousel.ucc'), {
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
	$('body').on('click', '.gf_btn_popupClose a', function (e) {
		e.preventDefault();
		var target = '#' + $(this).parents('.popup').attr('id');
		Elsword.layerControl.closeLayer(target);
	});
	$(document).on('click', '.modal_bg', function () {
		if ($(this).is(':visible')) {
			var target = '.popup';
			Elsword.layerControl.closeLayer(target);
		}
	});

	// 메인 공지사항 탭
	var $notice_tabLink = $('#main').find('.notice_tab_nav li > a');
	var $notice_tabCont = $('#main').find('.notice_tab_cont');
	$notice_tabLink.on('click', function (e) {
		var $this = $(this);
		if (!$this.hasClass('btn_issueMore')) {
			e.preventDefault();
			var $pLi = $this.parent('li');
			if (!$pLi.hasClass('active')) {
				$pLi.siblings().removeClass('active');
				$pLi.addClass('active');
				$notice_tabCont.removeClass('active');
				$($this.attr('href')).addClass('active');
			}
		}
	});

}); // @ready function END

// 기본 페이지 로더 호출
$window.load(function () {
	Elsword.init();
});

$window.on('resize', function () {
	if (isModalOpen) {
		Elsword.layerControl.setLayerSize($('.popup:visible'));
	}
});
