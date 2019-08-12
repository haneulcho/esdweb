/* ================================================================
	* FILENAME: common_sub.js
	* PROJECT: 엘소드 2018 리뉴얼 서브 UI 공통 스크립트
	* UPDATE: 19.08.12
================================================================ */

// 네이버 아이프레임 분기 변수 정의
var isNaver = (document.domain.indexOf('naver.com') != -1) ? true : false;
var cachedDomain = document.domain;

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
			return $('#GNB_Wrapper').length ? ($('#GNB_Wrapper').hasClass('gnbWrapperOpen') ? 220 : 50) : ($('.gnbWrapper').length ? 63 : (isNaver ? 60 : 0));
		}, // layerControl.getGnbHeight

		setLayerSize: function (target, callBack) {
			if ($(target).length) {
				var $target = $(target),
					isSetCallBack = (callBack && $.isFunction(callBack)) ? true : false,
					timeLimit = (isSetCallBack) ? 270 : 0;

				setTimeout(function () {
					// 네이버용 변수 재정의
					document.domain = (isNaver) ? 'game.naver.com' : document.domain;
					var $pDocument = (isNaver) ? $(parent.document.documentElement) || $(parent.document.body) : $window,
						pDocumentViewPortHeight = (isNaver) ? parent.document.documentElement.clientHeight : $window.height();
	
					var wTop = $pDocument.scrollTop(),
						gnbHeight = UI.layerControl.getGnbHeight(),
						targetHeight = parseInt($target.height()),
						promotionHeight = (!$target.hasClass('dcn_modal')) ? 0 : $('#promotion').height(),
						layerTopMargin = 0,
						layerLeftMargin = -($target.width() / 2),
						min = (!$target.hasClass('dcn_modal')) ? 150 + gnbHeight : 100,
						max = pDocumentViewPortHeight - gnbHeight;

					if (max < targetHeight + (min * 2)) {
						layerTopMargin = (gnbHeight < wTop) ? (wTop - gnbHeight) + min : min;
					} else {
						layerTopMargin = (gnbHeight < wTop) ? wTop + ((pDocumentViewPortHeight - targetHeight) / 2) - gnbHeight : ((pDocumentViewPortHeight - (gnbHeight - wTop)) - targetHeight) / 2;
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
				$('.modal_bg').fadeOut(200);
				$(target).fadeOut(200, function () {
					if (!$(target).hasClass('dcn_modal') && !$(target).hasClass('cv_system')) { $(this).remove(); }
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

	UI.fixGamestartPos = function () {
		if ($('#gameStart').length) {
			var wWidth = parseInt($window.width());
			var fixPos = (wWidth % 2 != 0) ? 445.5 : 445;
			$('#gameStart').css('left', fixPos + 'px');
		}
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
		autoplaySpeed: 4000,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut'
	});

	// 게시판 제목, 검색, 랭킹 등 Nice Select
	Elsword.inputControl.setNiceSelect($('.ipt_select'));
	Elsword.inputControl.setNiceSelect($('#writeCategory'));

	// 설문조사 Radio 버튼
	Elsword.inputControl.setRadio($('#pollView .vote_list'));

	// 밸런스 토론장 Radio 버튼
	Elsword.inputControl.setRadio($('#boardList .blo_list'));

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
			var target = ($('.cv_system:visible').length) ? '.cv_system' : '.popup';
			Elsword.layerControl.closeLayer(target);
		}
	});

	// 비매너/버그 신고, 밸런스 토론장 게시글 팝업 열기
	if ($('body').find('#contents.declare').length || $('body').find('#contents.balance').length) {
		$('body').on('click', '.gf_btn_declare, .gf_btn_declareView, .gf_btn_declareWrite, .gf_btn_balanceWrite', function (e) {
			e.preventDefault();
			var $this = $(this), target = null;
			if ($this.hasClass('gf_btn_declare')) {
				target = '#declareNoticePopup';
			} else if ($this.hasClass('gf_btn_declareView')) {
				target = '#declareViewPopup';
			} else if ($this.hasClass('gf_btn_declareWrite')) {
				target = '#declareWritePopup';
			} else if ($this.hasClass('gf_btn_balanceWrite')) {
				target = '#balanceWritePopup';
			} else {
				target = null;
			}

			// 팝업 안에 시스템 내용 들어가는 경우 스크롤바 처리
			if (target != null && $(target).length) {
				// UI 공통 모듈 호출
				Elsword.layerControl.openLayer(target);
				$(target).find('.scroll_wrap').addClass('scrollbar-macosx').scrollbar({
					'disableBodyScroll': true
				});
				setTimeout(function () {
					$(target).find('.scroll-content').scrollTop(0);
				}, 0);
			}
		});
		// 비매너/버그 신고 최근 버그 현황 안내 디자인 스크롤 삽입
		if ($('#contents.declare').find('.dc_txt').length) {
			$('#contents.declare').find('.dc_box .dc_latest .dc_txt').addClass('scrollbar-macosx').scrollbar();
		}
	}

	// 비매너/버그 신고 게시판 파일명 표시
	if ($('body').find('.bw_file').length) {
		$(document).on('change', '.ipt_file', function () {
			$(this).next('.ipt_fileName').val($(this).val().replace(/C:\\fakepath\\/i, ''));
		});
	}

	// 블라인드 내용 보기
	$('body').on('click', '.bc_contents_blind button', function (e) {
		e.preventDefault();
		var $this = $(this),
			$parent = $this.parent('.bc_contents_blind');
		if ($parent.hasClass('opened')) {
			$parent.removeClass('opened');
			$this.text('[내용보기]');
		} else {
			$parent.addClass('opened');
			$this.text('[내용감추기]');
		}
	});

	// 게임스타트 버튼 IE 위치 수정
	Elsword.fixGamestartPos();

}); // @ready function END

// 기본 페이지 로더 호출
$window.load(function () {
	Elsword.init();
});

$window.on('resize', function () {
	Elsword.fixGamestartPos();
	if (isModalOpen) {
		Elsword.layerControl.setLayerSize($('.popup:visible'));
	}
});
