/* ================================================================
	* FILENAME: common_sub.js
	* PROJECT: 엘소드 2018 리뉴얼 서브 UI 공통 스크립트
	* UPDATE: 17.12.15
================================================================ */

(function ($, window, document, undefined) {
	$(function () {
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

					if ($('#contents').hasClass('character')) {
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
					var layerTop, scrollHeight;
					layerTop = ($window.height() - $target.outerHeight()) / 2;
					scrollHeight = ($window.scrollTop() + layerTop);
	  
					if ($('#GNB_Wrapper').hasClass('gnbWrapperOpen')) {
						scrollHeight = scrollHeight - $('#GNB_Wrapper').outerHeight();
					}
	
					if (scrollHeight > minHeight) {
						$target.css('top', scrollHeight);
					} else {
						$target.css('top', minHeight);
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
							$(target + ', .modal_bg').fadeIn(250);
						}
					}
				}, // layerControl.openLayer

				closeLayer: function (target) {
					if (isModalOpen && $(target).length) {
						$(target + ', .modal_bg').fadeOut(250, function () {
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

		function preventDefault (e) {
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

			// 레이어 팝업 열기
			$('body').on('click', '.gf_btn_popup, .gf_btn_system', function (e) {
				alert('test');
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
					} else if ($this.hasClass('pop_ytb')) {
						var youtubeSrc = $this.attr('data-ytb-src'),
							youtubeWidth = 1100,
							youtubeHeight = 620;
	
						popup_str += '<div id="pop_ytb" class="popup">';
						popup_str += '<div class="gf_btn_popupClose"><a href="#pop_ytb"><span class="ir">팝업 닫기</span></a></div>';
						popup_str += '	<div class="modal_body">';
						popup_str += '		<div class="modal_ytb">';
						popup_str += '			<iframe width="' + youtubeWidth +'" height="' + youtubeHeight + '" src="https://www.youtube.com/embed/' + youtubeSrc + '?rel=0&showinfo=0&autoplay=0" frameborder="0" allowfullscreen=""></iframe>';
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

			// 멀티미디어
			tabLoad();

			$(".calendar_y li .y_lst_btn").on("click", function (e) {
				$('#y_lst').toggleClass('on');
				e.preventDefault();
			});

			function tabLoad () {
				var idx = $('.tab_cont').index();
				$('.tab_cont').not(':eq(' + idx + ')').hide(); // tab_cont :: all hide

				$('.tab_lst').each(function () { // tab_lst li first :: on
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
					$thisClass = $('.' + $thisrel); // tab_cont :: class
					target = $thisClass.parent('.tab_container').attr('id'); // tab_container :: id

					$('#' + target).find('.tab_cont').hide();
					$('#' + target + ' .' + $thisrel).fadeIn();

					$this.addClass('on').siblings().removeClass('on'); // tab_lst li :: on
				});
			}

		}); // @ready function END

		// 기본 페이지 로더 호출
		$window.load(function () {
			Elsword.init();
		});

	});
})(jQuery, window, document);	


































	// var owl_promotionBanner = $('.owl-carousel.banner');
	// owl_promotionBanner.owlCarousel({
	//   items: 1,
	//   loop: true,
	//   margin: 0,
	//   nav: false,
	//   mouseDrag: false,
	//   pullDrag: false,
	//   dotsEach: true,
	//   autoplay: true,
	//   autoplayHoverPause: true,
	//   animateIn: 'fadeIn',
	//   animateOut: 'fadeOut'
	// });

//   $(function () {
//     if ($('#contents').hasClass('character')) {
//       $('#header nav').addClass('white');
//     }
//     var owl_promotionBanner = $('.owl-carousel.banner');
//     owl_promotionBanner.owlCarousel({
//       items: 1,
//       loop: true,
//       margin: 0,
//       nav: false,
//       mouseDrag: false,
//       pullDrag: false,
//       dotsEach: true,
//       autoplay: true,
//       autoplayHoverPause: true,
//       animateIn: 'fadeIn',
//       animateOut: 'fadeOut'
//     });

//     // 상단 네비게이션
//     var $gnbWrapper = $('#header .nav'),
//         $gnb = $gnbWrapper.find('.gnb'),
//         $gnbLi = $gnb.children('li');
//     $gnb.on({
//       'mouseenter': function () {
//         if (!$gnbWrapper.hasClass('on')) {
//           $gnbWrapper.addClass('on');
//         }
//       },
//       'mouseleave': function () {
//         if ($gnbWrapper.hasClass('on')) {
//           $gnbWrapper.removeClass('on');
//         }
//       }
//     });

//     // 게시판 제목, 검색 Nice Select
//     if ($('.ipt_select').length) {
//       $('.ipt_select').niceSelect();
//     } else if ($('#pBoardWrite').length) {
//       $('#writeCategory').niceSelect();
//     }


//     // 멀티미디어
//     tabLoad();

//     $(".calendar_y li .y_lst_btn").on("click", function(e) {
//         $('#y_lst').toggleClass('on');
//         e.preventDefault();
//     });

//     function tabLoad() {
//         var idx = $('.tab_cont').index();
//         $('.tab_cont').not(':eq('+idx+')').hide(); // tab_cont :: all hide

//         $('.tab_lst').each(function() { // tab_lst li first :: on
//             var $this = $(this);
//             var $first_lst = $(this).children('li').eq(0);
//             $first_lst.addClass('on');
//         });

//         $('.tab_container').each(function () { // tab_cont first :: on
//             var $this = $(this);
//             var $first_tab = $(this).children('.tab_cont').eq(0);
//             $first_tab.show();
//         });

//         var $btn_tab = $('.tab_lst').find('li');
//         $btn_tab.on('click', function (e) {
//             e.preventDefault();

//             var $this = $(this),
//                 $thisrel = $this.attr('rel'); // tab_lst li :: rel
//                 $thisClass = $('.'+ $thisrel); // tab_cont :: class
//                 target = $thisClass.parent('.tab_container').attr('id'); // tab_container :: id

//                 $('#' + target).find('.tab_cont').hide();
//                 $('#' + target + ' .' + $thisrel).fadeIn();

//                 $this.addClass('on').siblings().removeClass('on'); // tab_lst li :: on
//         });
//     }

//     // 설문조사 라디오 버튼 클릭 시 selected 클래스 추가
//     if ($('#pollView').length) {
//       var $pollView = $('#pollView'),
//           $voteList = $pollView.find('.vote_list'),
//           $voteLabel = $voteList.find('label'),
//           $voteInput = $voteList.find('input');

//       $voteLabel.on('click', function () {
//         if ($(this).attr('for') != "") {
//           var input = $(this).siblings('input');
//           if (!input.prop('checked')) {
//             input.prop('checked', true).trigger('change');
//           }
//         }
//       });

//       $voteInput.on('change', function () {
//         $('.vote_list input[name="' + this.name + '"]').parent('li').removeClass('selected');
//         $('.vote_list input[name="' + this.name + '"]:checked').parent('li').addClass('selected');
//       }); 
//     }

//     // 비매너/버그 신고 게시판 파일명 표시
//     if ($('body').find('.bw_file').length) {
//       $(document).on('change', '.ipt_file', function () {
//         $(this).next('.ipt_fileName').val($(this).val().replace(/C:\\fakepath\\/i, ''));
//       });
//     }



//   });
