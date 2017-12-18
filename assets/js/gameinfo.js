(function(k){for(var d,f,l=document.getElementsByTagName("head")[0].style,h=["transformProperty","WebkitTransform","OTransform","msTransform","MozTransform"],g=0;g<h.length;g++)void 0!==l[h[g]]&&(d=h[g]);d&&(f=d.replace(/[tT]ransform/,"TransformOrigin"),"T"==f[0]&&(f[0]="t"));eval('IE = "v"=="\v"');jQuery.fn.extend({rotate:function(a){if(0!==this.length&&"undefined"!=typeof a){"number"==typeof a&&(a={angle:a});for(var b=[],c=0,d=this.length;c<d;c++){var e=this.get(c);if(e.Wilq32&&e.Wilq32.PhotoEffect)e.Wilq32.PhotoEffect._handleRotation(a);else{var f=k.extend(!0,{},a),e=(new Wilq32.PhotoEffect(e,f))._rootObj;b.push(k(e))}}return b}},getRotateAngle:function(){for(var a=[],b=0,c=this.length;b<c;b++){var d=this.get(b);d.Wilq32&&d.Wilq32.PhotoEffect&&(a[b]=d.Wilq32.PhotoEffect._angle)}return a},stopRotate:function(){for(var a=0,b=this.length;a<b;a++){var c=this.get(a);c.Wilq32&&c.Wilq32.PhotoEffect&&clearTimeout(c.Wilq32.PhotoEffect._timer)}}});Wilq32=window.Wilq32||{};Wilq32.PhotoEffect=function(){return d?function(a,b){a.Wilq32={PhotoEffect:this};this._img=this._rootObj=this._eventObj=a;this._handleRotation(b)}:function(a,b){this._img=a;this._onLoadDelegate=[b];this._rootObj=document.createElement("span");this._rootObj.style.display="inline-block";this._rootObj.Wilq32={PhotoEffect:this};a.parentNode.insertBefore(this._rootObj,a);if(a.complete)this._Loader();else{var c=this;jQuery(this._img).bind("load",function(){c._Loader()})}}}();Wilq32.PhotoEffect.prototype={_setupParameters:function(a){this._parameters=this._parameters||{};"number"!==typeof this._angle&&(this._angle=0);"number"===typeof a.angle&&(this._angle=a.angle);this._parameters.animateTo="number"===typeof a.animateTo?a.animateTo:this._angle;this._parameters.step=a.step||this._parameters.step||null;this._parameters.easing=a.easing||this._parameters.easing||this._defaultEasing;this._parameters.duration="duration"in a?a.duration:a.duration||this._parameters.duration||1E3;this._parameters.callback=a.callback||this._parameters.callback||this._emptyFunction;this._parameters.center=a.center||this._parameters.center||["50%","50%"];this._rotationCenterX="string"==typeof this._parameters.center[0]?parseInt(this._parameters.center[0],10)/100*this._imgWidth*this._aspectW:this._parameters.center[0];this._rotationCenterY="string"==typeof this._parameters.center[1]?parseInt(this._parameters.center[1],10)/100*this._imgHeight*this._aspectH:this._parameters.center[1];a.bind&&a.bind!=this._parameters.bind&&this._BindEvents(a.bind)},_emptyFunction:function(){},_defaultEasing:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},_handleRotation:function(a,b){d||this._img.complete||b?(this._setupParameters(a),this._angle==this._parameters.animateTo?this._rotate(this._angle):this._animateStart()):this._onLoadDelegate.push(a)},_BindEvents:function(a){if(a&&this._eventObj){if(this._parameters.bind){var b=this._parameters.bind,c;for(c in b)b.hasOwnProperty(c)&&jQuery(this._eventObj).unbind(c,b[c])}this._parameters.bind=a;for(c in a)a.hasOwnProperty(c)&&jQuery(this._eventObj).bind(c,a[c])}},_Loader:function(){return IE?function(){var a=this._img.width,b=this._img.height;this._imgWidth=a;this._imgHeight=b;this._img.parentNode.removeChild(this._img);this._vimage=this.createVMLNode("image");this._vimage.src=this._img.src;this._vimage.style.height=b+"px";this._vimage.style.width=a+"px";this._vimage.style.position="absolute";this._vimage.style.top="0px";this._vimage.style.left="0px";this._aspectW=this._aspectH=1;this._container=this.createVMLNode("group");this._container.style.width=a;this._container.style.height=b;this._container.style.position="absolute";this._container.style.top="0px";this._container.style.left="0px";this._container.setAttribute("coordsize",a-1+","+(b-1));this._container.appendChild(this._vimage);this._rootObj.appendChild(this._container);this._rootObj.style.position="relative";this._rootObj.style.width=a+"px";this._rootObj.style.height=b+"px";this._rootObj.setAttribute("id",this._img.getAttribute("id"));this._rootObj.className=this._img.className;for(this._eventObj=this._rootObj;a=this._onLoadDelegate.shift();)this._handleRotation(a,!0)}:function(){this._rootObj.setAttribute("id",this._img.getAttribute("id"));this._rootObj.className=this._img.className;this._imgWidth=this._img.naturalWidth;this._imgHeight=this._img.naturalHeight;var a=Math.sqrt(this._imgHeight*this._imgHeight+this._imgWidth*this._imgWidth);this._width=3*a;this._height=3*a;this._aspectW=this._img.offsetWidth/this._img.naturalWidth;this._aspectH=this._img.offsetHeight/this._img.naturalHeight;this._img.parentNode.removeChild(this._img);this._canvas=document.createElement("canvas");this._canvas.setAttribute("width",this._width);this._canvas.style.position="relative";this._canvas.style.left=-this._img.height*this._aspectW+"px";this._canvas.style.top=-this._img.width*this._aspectH+"px";this._canvas.Wilq32=this._rootObj.Wilq32;this._rootObj.appendChild(this._canvas);this._rootObj.style.width=this._img.width*this._aspectW+"px";this._rootObj.style.height=this._img.height*this._aspectH+"px";this._eventObj=this._canvas;for(this._cnv=this._canvas.getContext("2d");a=this._onLoadDelegate.shift();)this._handleRotation(a,!0)}}(),_animateStart:function(){this._timer&&clearTimeout(this._timer);this._animateStartTime=+new Date;this._animateStartAngle=this._angle;this._animate()},_animate:function(){var a=+new Date,b=a-this._animateStartTime>this._parameters.duration;if(b&&!this._parameters.animatedGif)clearTimeout(this._timer);else{if(this._canvas||this._vimage||this._img)a=this._parameters.easing(0,a-this._animateStartTime,this._animateStartAngle,this._parameters.animateTo-this._animateStartAngle,this._parameters.duration),this._rotate(~~(10*a)/10);this._parameters.step&&this._parameters.step(this._angle);var c=this;this._timer=setTimeout(function(){c._animate.call(c)},10)}this._parameters.callback&&b&&(this._angle=this._parameters.animateTo,this._rotate(this._angle),this._parameters.callback.call(this._rootObj))},_rotate:function(){var a=Math.PI/180;return IE?function(a){this._angle=a;this._container.style.rotation=a%360+"deg";this._vimage.style.top=-(this._rotationCenterY-this._imgHeight/2)+"px";this._vimage.style.left=-(this._rotationCenterX-this._imgWidth/2)+"px";this._container.style.top=this._rotationCenterY-this._imgHeight/2+"px";this._container.style.left=this._rotationCenterX-this._imgWidth/2+"px"}:d?function(a){this._angle=a;this._img.style[d]="rotate("+a%360+"deg)";this._img.style[f]=this._parameters.center.join(" ")}:function(b){this._angle=b;b=b%360*a;this._canvas.width=this._width;this._canvas.height=this._height;this._cnv.translate(this._imgWidth*this._aspectW,this._imgHeight*this._aspectH);this._cnv.translate(this._rotationCenterX,this._rotationCenterY);this._cnv.rotate(b);this._cnv.translate(-this._rotationCenterX,-this._rotationCenterY);this._cnv.scale(this._aspectW,this._aspectH);this._cnv.drawImage(this._img,0,0)}}()};IE&&(Wilq32.PhotoEffect.prototype.createVMLNode=function(){document.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{return!document.namespaces.rvml&&document.namespaces.add("rvml","urn:schemas-microsoft-com:vml"),function(a){return document.createElement("<rvml:"+a+' class="rvml">')}}catch(a){return function(a){return document.createElement("<"+a+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')}}}())})(jQuery);

$(function() {
	var $gameinfo = $("#gameinfo");
	if ($gameinfo.length > 0) $gameinfo.setting();
});
(function($) {
	$.fn.extend({
		setting: function() {
			/* old browser check */
			function getInternetExplorerVersion() {
				var rv = -1;
				if (navigator.appName == "Microsoft Internet Explorer") {
					var ua = navigator.userAgent;
					var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
					if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
				} else if (navigator.appName == "Netscape") {
					var ua = navigator.userAgent;
					var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
					if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
				}
				return rv;
			}
			var old = getInternetExplorerVersion();
			/* defaults setting */
			window.requestAnimationFrame = function() {
				return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
					window.setTimeout(callback, 1E3 / 60)
				}
			}();
			window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
			var $this = $(this).find(".wrapper"),
				$loader = $this.find(".loader"),
				$navigation = $this.find(".navigation"),
				$paging = $this.find(".paging a"),
				$content = $this.find(".content"),
				$feature = $this.find(".feature .inner"),
				$featureText = $feature.find(".text"),
				$worldview = $this.find(".worldview .story"),
				$elios = $worldview.find(".elios"),
				$canvas = $worldview.find(".canvas"),
				$continent = $this.find(".continent .inner"),
				$continentBackground = $continent.find(".background"),
				$continentText = $continent.find(".text"),
				$continentCompass = $continent.find(".compass #compass"),
				$prolog = $this.find(".prolog"),
				$prologText = $prolog.find(".text");
			var rainbowFrame, fireFrame, smokeFrame, fountainFrame, meteorFrame, starFrame;
			var iframeSetting = parent.document.getElementById("GameWeb");
			/* resize setting */
			if (iframeSetting) {
				$(iframeSetting).on("load", function() {
					naverResize();
					$(parent.window).on("resize", function() {
						naverResize();
					});
				});
			} else {
				resize();
				$(window).on("resize", function() {
					resize();
				});
			}

			function resize() {
				var ww = $(window).width(),
					wh = $(window).height();
				$this.height(wh - 114);
				$loader.height(wh - 114);
				$content.height(wh - 114);
			}

			function naverResize() {
				if ($(parent.window).height() >= 880) {
					iframeSetting.height = (($(parent.window).height() - 60) + "px");
					$this.height($(parent.window).height() - 134);
					$loader.height($(parent.window).height() - 134);
					$content.height($(parent.window).height() - 134);
				} else {
					iframeSetting.height = "880px";
					$this.height(880);
					$loader.height(880);
					$content.height(880);
				}
			}
			/* navigation setting */
			$navigation.find("ul li").on("click", function() {
				var PrevOn = $navigation.find("ul li.on").index(),
					nextOn = $(this).index();
				if (!$this.hasClass("animated")) {
					if (nextOn != PrevOn) {
						animationStart();
						$(this).addClass("on").siblings().removeClass("on");
						arrow(PrevOn, nextOn);
						if (old > 8 || old == -1) {
							$(this).find("a .c").stop(true, true).animate({
								width: 240
							}, 400, "easeInOutExpo");
							$navigation.find("ul li").eq(PrevOn).find("a .c").stop(true, true).animate({
								width: 160
							}, 800, "easeInOutExpo");
							var delay = 200;
							$(this).find("a .c dl dd").each(function() {
								delay += 100;
								$(this).stop(true, true).animate({
									opacity: 1,
									marginTop: 0
								}, delay, "easeInOutExpo");
							});
						} else {
							$(this).find("a .c").css({
								width: 240
							});
							$navigation.find("ul li").eq(PrevOn).find("a .c").css({
								width: 160
							});
							$(this).find("a .c dl dd").each(function() {
								$(this).css({
									opacity: 1,
									marginTop: 0
								});
							});
						}
						nextPage(PrevOn, nextOn);
					} else {
						animationStart();
						
						var direction = "next";
						subSetting(PrevOn ,nextOn, direction);
					}
				}
			});

			function arrow(PrevOn, nextOn) {
				var prevArrow = $navigation.find("ul li").eq(PrevOn).find(".arrow");
				var nextArrow = $navigation.find("ul li").eq(nextOn).find(".arrow");
				if(!nextArrow.is(":animated")){
					prevArrow.stop().attr("style", "");
					if (nextOn != 3) {
						$(function arrow1() {
							nextArrow.stop(true, true).animate({
								opacity: 1,
								top: -44
							}, 600, "easeInOutExpo", function() {
								nextArrow.stop(true, true).animate({
									opacity: 0,
									top: -64
								}, 1000, "easeInCubic", arrow1);
							});
						});
					}
				}
			}

			function arrowSub(PrevOn, nextOn, subSize, nextSub) {
				if ((subSize - 1) == nextSub) {
					$navigation.find("ul li.on .arrow").stop().attr("style", "");
				} else {
					arrow(PrevOn, nextOn);
				}
			}
			
			function subSetting(PrevOn, nextOn, direction){
				var sub = $navigation.find("ul li.on a .c dl dd"),
					subOn = $navigation.find("ul li.on a .c dl .on");
				
				switch (direction) {
					case "next":
						if (sub.size() != subOn.index()) {
							subOn.next("dd").addClass("on")
							.siblings("dd").removeClass("on");
						} else {
							sub.eq(0).addClass("on")
							.siblings().removeClass("on");
						}
						break;
					case "prev":
						if ((subOn.index()-1) != 0) {
							
							subOn.prev("dd").addClass("on")
							.siblings().removeClass("on");
						} else {
							sub.eq((sub.size()-1)).addClass("on")
							.siblings().removeClass("on");
						}
						break;
				}
				
				var prevSub = subOn.index() - 1,
					nextSub = $navigation.find("ul li.on a .c dl .on").index() - 1;
				arrowSub(PrevOn, nextOn, sub.size(), nextSub);
				switch (nextOn) {
					case 0:
						featureTextSet(prevSub, nextSub);
						break;
					case 1:
						worldviewTextSet(prevSub, nextSub);
						break;
					case 2:
						continentTextSet(prevSub, nextSub);
						break;
					case 3:
						prologTextSet(prevSub, nextSub);
						break;
				}
			}
			
			/* paging setting */
			$paging.on("click", function(){
				if (!$this.hasClass("animated")) {
					animationStart();
					
					var PrevOn = $navigation.find("ul li.on").index(),
						nextOn = PrevOn;
					
					if($(this).hasClass("prev")){
						var direction = "prev";
					}else if($(this).hasClass("next")){
						var direction = "next";
					}
					
					subSetting(PrevOn, nextOn, direction);
				}
			});
			
			function pagingSet(){
				console.log("set")
				$paging.parent().find(".prev").stop(true, true).animate({
					opacity: 1,
					left: 40
				}, 400, function(){
					$(this).attr("style" ,"");
				});
				
				$paging.parent().find(".next").stop(true, true).animate({
					opacity: 1,
					right: 40
				}, 400, function(){
					$(this).attr("style" ,"");
				});
			}
			
			function pagingReset(){
				console.log("reset")
				$paging.parent().find(".prev").stop(true, true).animate({
					opacity: 0,
					left: 0
				}, 400);
				
				$paging.parent().find(".next").stop(true, true).animate({
					opacity: 0,
					right: 0
				}, 400);
			}
			
			/* page setting */
			function prevPage(PrevOn, nextOn) {
				$navigation.find("ul li").eq(PrevOn)
				.find("a .c dl dd").eq(0).attr("style", "").addClass("on")
				.siblings().removeClass("on").attr("style", "");
				$content.eq(PrevOn).css({
					"z-index": ""
				}).stop(true, true).fadeOut(400, function() {
					/* animation reset */
					switch (PrevOn) {
						case 0:
							video(0);
							featureTextReset();
							break;
						case 1:
							canvasRetset();
							worldviewTextRetset();
							break;
						case 2:
							continentTextReset();
							break;
						case 3:
							prologTextReset();
							break;
					}
				});
			}

			function nextPage(PrevOn, nextOn) {
				$content.eq(nextOn).css({
					"z-index": "4"
				}).stop(true, true).fadeIn(400, function() {
					if (PrevOn != -1) prevPage(PrevOn, nextOn);
				});
				/* animation set */
				switch (nextOn) {
					case 0:
						video(1);
						featureTextSet(-1, 0);
						break;
					case 1:
						worldviewTextSet(-1, 0);
						break;
					case 2:
						continentTextSet(-1, 0);
						break;
					case 3:
						prologTextSet(-1, 0);
						break;
				}
			};

			function featureTextSet(prevSub, nextSub) {
				if (prevSub != -1) {
					$featureText.eq(prevSub).fadeOut(400, function() {
						$(this).find("dt img, dd img").attr("style", "");
					});
				}
				$featureText.eq(nextSub).show(function() {
					$featureText.eq(nextSub).find("dt img").stop(true, true).animate({
						opacity: 1,
						marginTop: 0
					}, 400);
					$featureText.eq(nextSub).find("dd img").stop(true, true).animate({
						opacity: 1,
						marginTop: 0
					}, 600, function() {
						animationEnd();
					});
				});
			}

			function featureTextReset() {
				$featureText.attr("style", "").find("dt img, dd img").attr("style", "");
			}

			function worldviewTextSet(prevSub, nextSub) {
				if (prevSub != -1) {
					$worldview.eq(prevSub).css({
						"z-index": "6"
					}).stop(true, true).fadeOut(400, function() {
						$(this).css({
							"z-index": "4"
						}).find(".inner .text dt img, .inner .text dd img").attr("style", "");
						$elios.find(".flash").stopRotate();
						$elios.attr("style", "").find(".flash").attr("style", "");
						$("#moon").attr("style", "");
					});
				}
				$worldview.eq(nextSub).css({
					"z-index": "8"
				}).stop(true, true).fadeIn(400);
				$worldview.eq(nextSub).find(".inner .text").show(function() {
					$(this).find("dt img").stop(true, true).animate({
						opacity: 1,
						marginTop: 0
					}, 400);
					$(this).find("dd img").stop(true, true).animate({
						opacity: 1,
						marginTop: 0
					}, 600, function() {
						animationEnd();
					});
				});
				if (old > 8 || old == -1) {
					if (nextSub == 0) {
						$elios.stop(true, true).delay(400).fadeIn(600, "easeInOutExpo", function() {
							$(this).find(".flash._01").stop(true, true).animate({
								opacity: 0.8
							}, 800, "easeInOutExpo");
							$(this).find(".flash._02").stop(true, true).animate({
								opacity: 0.8
							}, 1200, "easeInOutExpo");
							$(this).find(".flash._03").stop(true, true).animate({
								opacity: 0.6
							}, 1600, "easeInOutExpo");
							$(this).find(".flash._04").stop(true, true).animate({
								opacity: 0.4
							}, 2000, "easeInOutExpo");
							$(this).find(".flash").rotate({
								angle: 0,
								center: ["50%", "50%"],
								animateTo: 360,
								duration: 8000,
								callback: function() {
									$(this).stopRotate();
								}
							});
						});
					}
				}
				setTimeout(function() {
					canvasRetset();
					canvasPlay(nextSub);
				}, 400);
			}

			function worldviewTextRetset() {
				$worldview.attr("style", "").find(".inner .text dt img, .inner .text dd img").attr("style", "");
				$elios.find(".flash").stopRotate();
				$elios.attr("style", "").find(".flash").attr("style", "");
				$("#moon").attr("style", "");
			}

			function continentTextSet(prevSub, nextSub) {
				if (prevSub != -1) {
					$continentText.eq(prevSub).fadeOut(400, function() {
						$(this).find("dt img, dd img").attr("style", "");
					});
				} else {
					$continentBackground.stop(true, true).fadeIn(600);
				}
				$continentText.eq(nextSub).show(function() {
					if (old >= 9 || old == -1) {
						var animateTo = 0;
						if ($(this).hasClass("_01")) {
							animateTo = -360;
							$(this).find("dt img").stop(true, true).animate({
								opacity: 1,
								marginTop: 2,
								marginLeft: 2
							}, 800, "easeInOutExpo");
						} else if ($(this).hasClass("_02")) {
							animateTo = 360;
							$(this).find("dt img").stop(true, true).animate({
								opacity: 1,
								marginTop: -2,
								marginRight: 2
							}, 800, "easeInOutExpo");
						}
						compass(animateTo);
					} else {
						if ($(this).hasClass("_01")) {
							$(this).find("dt img").stop(true, true).animate({
								opacity: 1
							}, 0);
						} else if ($(this).hasClass("_02")) {
							$(this).find("dt img").stop(true, true).animate({
								opacity: 1
							}, 0);
						}
					}
					$(this).find("dd").eq(0).find("img").stop(true, true).animate({
						opacity: 1
					}, 400);
					$(this).find("dd").eq(1).find("img").stop(true, true).animate({
						opacity: 1
					}, 800, function() {
						animationEnd();
					});
				});
			}

			function continentTextReset() {
				$continentBackground.attr("style", "");
				$continentText.attr("style", "").find("dt img, dd img").attr("style", "");
				$continentCompass.attr("style", "").stopRotate();
			}

			function prologTextSet(prevSub, nextSub) {
				if (prevSub != -1) {
					$prologText.eq(prevSub).fadeOut(400, function() {
						$(this).find("dt img, dd img").attr("style", "");
					});
				}
				$prologText.eq(nextSub).show(function() {
					$(this).find("dt img").stop(true, true).animate({
						opacity: 1,
						marginTop: 0
					}, 400);
					$(this).find("dd img").stop(true, true).animate({
						opacity: 1,
						marginTop: 0
					}, 600, function() {
						$(this).siblings(".flash").eq(0).stop(true, true).animate({
							opacity: 1,
							left: -80
						}, 1000, "easeInOutBack");
						$(this).siblings(".flash").eq(1).stop(true, true).animate({
							opacity: 0.6,
							left: 340
						}, 1600, "easeInOutBack");
						$(this).siblings(".flash").eq(2).stop(true, true).animate({
							opacity: 1,
							right: -80
						}, 1000, "easeInOutBack");
						$(this).siblings(".flash").eq(3).stop(true, true).animate({
							opacity: 0.2,
							right: 400
						}, 1600, "easeInOutBack");
						$(this).siblings(".flash").eq(4).stop(true, true).animate({
							opacity: 0.8
						}, 1600, "");
						$(this).siblings(".flash").eq(5).stop(true, true).animate({
							opacity: 1
						}, 1600, "");
						animationEnd();
					});
				});
				
				pagingReset();
			}

			function prologTextReset() {
				$prologText.attr("style", "").find("dt img, dd img, dd .flash").stop(true, true).attr("style", "");
				
				pagingSet();
			}
			/* animation check */
			function animationStart() {
				$this.addClass("animated");
			}

			function animationEnd() {
				$this.removeClass("animated");
			}
			/* video setting */
			function video(swfCheck) {
				if (old > 8 || old == -1) {
					var $video = document.getElementById("video");
					$video.currentTime = 0;
					if ($video.paused) $video.play();
					else $video.pause();
				}
			}
			/* compass setting */
			function compass(animateTo) {
				if (old >= 9 || old == -1) {
					$continentCompass.rotate({
						angle: 0,
						center: ["50%", "94px"],
						animateTo: animateTo,
						duration: 2000,
						callback: function() {
							$continentCompass.stopRotate();
						}
					});
				}
			}
			/* window load complete */
			$(window).on("load", function() {
				$loader.stop(true, true).fadeOut(800, function() {
					$navigation.find("ul li").eq(0).trigger("click");
				});
			});
			/* effect setting */
			function canvasRetset() {
				$canvas.each(function() {
					if ($(this).find("canvas").length > 0) {
						var canvasCheck = $(this).attr("id");
						switch (canvasCheck) {
							case "rainbow":
								window.cancelAnimationFrame(rainbowFrame);
								break;
							case "fire":
								window.cancelAnimationFrame(fireFrame);
								break;
							case "smoke":
								window.cancelAnimationFrame(smokeFrame);
								break;
							case "fountain":
								window.cancelAnimationFrame(fountainFrame);
								break;
							case "meteor":
								window.cancelAnimationFrame(meteorFrame);
								break;
							case "star":
								window.cancelAnimationFrame(starFrame);
								break;
						}
					}
					$(this).attr("style", "");
				});
			}
			
			function canvasPlay(nextSub) {
				if (old > 9 || old == -1) {
					if (nextSub == 0) {
						rainbow();
					} else if (nextSub == 1) {
						fire();
					} else if (nextSub == 2) {
						smoke();
					} else if (nextSub == 3) {
						fountain();
					} else if (nextSub == 4) {
						meteor();
					} else if (nextSub == 5) {
						star();
					}
				}
			}
			
			function rainbow() {
				var canv = document.createElement("canvas");
				canv.id = "rainbowCanvas";
				document.getElementById("rainbow").appendChild(canv);
				
				this.Element&&Element.prototype.attachEvent&&!Element.prototype.addEventListener&&function(){function t(t,n){Window.prototype[t]=HTMLDocument.prototype[t]=Element.prototype[t]=n}function n(){n.interval&&document.body&&(n.interval=clearInterval(n.interval),document.dispatchEvent(new CustomEvent("DOMContentLoaded")))}t("addEventListener",function(t,n){var e=this,r=e.addEventListener.listeners=e.addEventListener.listeners||{},a=r[t]=r[t]||[];a.length||e.attachEvent("on"+t,a.event=function(t){var n=e.document&&
				e.document.documentElement||e.documentElement||{scrollLeft:0,scrollTop:0};t.currentTarget=e,t.pageX=t.clientX+n.scrollLeft,t.pageY=t.clientY+n.scrollTop,t.preventDefault=function(){t.returnValue=!1},t.relatedTarget=t.fromElement||null,t.stopImmediatePropagation=function(){u=!1,t.cancelBubble=!0},t.stopPropagation=function(){t.cancelBubble=!0},t.target=t.srcElement||e,t.timeStamp=+new Date;for(var r,o=0,i=[].concat(a),u=!0;u&&(r=i[o]);++o)for(var c,s=0;c=a[s];++s)if(c==r){c.call(e,t);break}}),a.push(n)}),
				t("removeEventListener",function(t,n){for(var e,r=this,a=r.addEventListener.listeners=r.addEventListener.listeners||{},o=a[t]=a[t]||[],i=o.length-1;e=o[i];--i)if(e==n){o.splice(i,1);break}!o.length&&o.event&&r.detachEvent("on"+t,o.event)}),t("dispatchEvent",function(t){var n=this,e=t.type,r=n.addEventListener.listeners=n.addEventListener.listeners||{},a=r[e]=r[e]||[];try{return n.fireEvent("on"+e,t)}catch(o){return void(a.event&&a.event(t))}}),Object.defineProperty(Window.prototype,"CustomEvent",
				{get:function(){var t=this;return function(n,e){var r,a=t.document.createEventObject();a.type=n;for(r in e)"cancelable"==r?a.returnValue=!e.cancelable:"bubbles"==r?a.cancelBubble=!e.bubbles:"detail"==r&&(a.detail=e.detail);return a}}}),n.interval=setInterval(n,1),window.addEventListener("load",n)}(),!this.CustomEvent&&function(){window.CustomEvent=function(t,n){var e;n=n||{bubbles:!1,cancelable:!1,detail:void 0};try{e=document.createEvent("CustomEvent"),e.initCustomEvent(t,n.bubbles,n.cancelable,
				n.detail)}catch(r){e=document.createEvent("Event"),e.initEvent(t,n.bubbles,n.cancelable),e.detail=n.detail}return e}}(),function(){"create"in Object&&"function"==typeof Object.create||(Object.create=function(){var t=function(){};return function(n){if(arguments.length>
				1)throw Error("Second argument not supported");if("object"!=typeof n)throw TypeError("Argument must be an object");t.prototype=n;var e=new t;return t.prototype=null,e}}())}(),function(){function t(t,n){return n.prototype=Object.create(t.prototype),n.parent=t,n.prototype.constructor=n,n}"extend"in Function.prototype&&"function"==typeof Function.prototype.extend||(Function.prototype.extend=function(n){return t(this,n)})}(),function(t){t.Easing={linear:function(t){return t},easeInQuad:function(t){return t*
				t},easeOutQuad:function(t){return t*(2-t)},easeInOutQuad:function(t){return.5>t?2*t*t:-1+(4-2*t)*t},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return--t*t*t+1},easeInOutCubic:function(t){return.5>t?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return 1- --t*t*t*t},easeInOutQuart:function(t){return.5>t?8*t*t*t*t:1-8*--t*t*t*t},easeInQuint:function(t){return t*t*t*t*t},easeOutQuint:function(t){return 1+--t*t*t*t*t},easeInOutQuint:function(t){return.5>
				t?16*t*t*t*t*t:1+16*--t*t*t*t*t}}}(window),function(t){"Math"in t||(t.Math={}),"Util"in t||(t.Util={});var n=t.Math,e=t.Util;n.Tau=2*n.PI,n.map=function(t,n,e,r,a){return(t-n)*(a-r)/(e-n)+r},n.dist=function(t,n,e,r){var a=t-e,o=n-r;return Math.sqrt(a*a+o*o)},n.lineIntersect=function(t,n,e,r,a,o,i,u){if(!(that instanceof PointLine))return null;var c,s,l,d,f,m;return c=e-t,s=r-n,l=i-a,d=u-o,f=(-s*(t-a)+c*(n-o))/(-l*s+c*d),m=(l*(n-o)-d*(t-a))/(-l*s+c*d),f>=0&&1>=f&&m>=0&&1>=m?{x:Math.floor(t+m*c),y:Math.floor(n+
				m*s)}:null},n.rad=function(t){return t*(Math.PI/180)},n.deg=function(t){return t*(180/Math.PI)},n.pointOnCircle=function(t,e,r,a){var o=t+r*Math.cos(n.rad(a)),i=e+r*Math.sin(n.rad(a));return{x:o,y:i}},n.lineProgress=function(t,n,e,r,a){return{x:t+(e-t)*a,y:n+(r-n)*a}},n.randInt=function(t,n){return Math.floor(Math.random()*(n-t+1))+t},n.mrandInt=function(t){return Math.floor(Math.random()*t)},n.randFloat=function(t,n){return Math.random()*(n-t+1)+t},n.mrandFloat=function(t){return Math.random()*t},
				n.randSign=function(){return Math.random()>.5?-1:1},n.scale=function(t,n,e,r){var a,o,i;return t>e&&(a=e/t,o=e,i=a*n),n>r&&(a=r/n,o=a*t,i=r),{w:Math.floor(o),h:Math.floor(i)}},e.easer=function(t,n,e){var r=Date.now()-n,a=r/e,o=t(a);return r>=e&&(o=1),o}}(window),function(t){var n=function(t){return 2!==t.length?t+t:t},e=/\#([0-9a-f]{1,2})([0-9a-f]{1,2})([0-9a-f]{1,2})/i,r=function(t,n,e,r){r=r||1,this.r=t,this.g=n,this.b=e,this.a=r};r.prototype.toString=function(){return"rgba("+this.r+", "+this.g+
				", "+this.b+", "+this.a+")"},r.fromHex=function(t){if("string"!=typeof t)throw new TypeError("hexadecimal color must be a string");if(4!==t.length&&7!==t.length)throw new TypeError("invalid hexadecimal format");var a=new r,o=t.match(e);if(!o)throw new TypeError("invalid hexadecimal format");return a.r=parseInt(n(o[1]),16),a.g=parseInt(n(o[2]),16),a.b=parseInt(n(o[3]),16),a.a=1,a},r.random=function(t,n){return new r(Math.randInt(t,n),Math.randInt(t,n),Math.randInt(t,n),1)},r.randomEx=function(t){return new r(Math.randInt(t.rmin,
				t.rmax),Math.randInt(t.gmin,t.gmax),Math.randInt(t.bmin,t.bmax),1)};var a=function(t,n,e){this.r=t,this.g=n,this.b=e};a.prototype.toString=function(){return"rgb("+this.r+", "+this.g+", "+this.b+")"},a.fromHex=function(t){if("string"!=typeof t)throw new TypeError("hexadecimal color must be a string");if(4!==t.length&&7!==t.length)throw new TypeError("invalid hexadecimal format");var r=new a,o=t.match(e);if(!o)throw new TypeError("invalid hexadecimal format");return r.r=parseInt(n(o[1]),16),r.g=parseInt(n(o[2]),
				16),r.b=parseInt(n(o[3]),16),r},a.random=function(t,n){return new a(Math.randInt(t,n),Math.randInt(t,n),Math.randInt(t,n))},a.randomEx=function(t){return new a(Math.randInt(t.rmin,t.rmax),Math.randInt(t.gmin,t.gmax),Math.randInt(t.bmin,t.bmax))},t.RGBA=r,t.RGB=a}(window);
				+function(root){var v2=function v2(x,y){this.x=x;this.y=y},v2p=v2.prototype;v2p.set=function(x,y){this.x=x;this.y=y;return this};v2p.add=function(other){if(typeof other==="number"){this.x+=other,this.y+=other;return this}this.x+=other.x,this.y+=other.y;return this};v2p.sub=function(other){if(typeof other==="number"){this.x-=other,this.y-=other;return this}this.x-=other.x,this.y-=other.y;return this};v2p.mul=function(other){if(typeof other==="number"){this.x*=other,this.y*=other;return this}this.x*=
				other.x,this.y*=other.y;return this};v2p.div=function(other){if(typeof other==="number"){this.x/=other,this.y/=other;return this}this.x/=other.x,this.y/=other.y;return this};v2p.clone=function(){return new v2(this.x,this.y)};v2p.move=function(other){other.x=this.x;other.y=this.y;return this};v2p.within2d=function(bounds){return this.x>=0&&this.x<bounds.x&&this.y>=0&&this.y<bounds.y};v2p.within2db=function(bounds){return this.x<bounds.x&&this.y<bounds.y};root.v2=v2}(window);
				(function(root){var MouseMonitor=function(element){this.position=new v2(0,0);this.state={left:false,middle:false,right:false};this.element=element;var that=this;element.addEventListener("mousemove",function(event){var dot,eventDoc,doc,body,pageX,pageY;event=event||window.event;if(event.pageX==null&&event.clientX!=null){eventDoc=event.target&&event.target.ownerDocument||document;doc=eventDoc.documentElement;body=eventDoc.body;event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-
				(doc&&doc.clientLeft||body&&body.clientLeft||0);event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0)}that.position.x=event.pageX;that.position.y=event.pageY});element.addEventListener("contextmenu",function(event){return event.preventDefault()});element.addEventListener("mousedown",function(event){if(event.which===1)that.state.left=true;if(event.which===2)that.state.middle=true;if(event.which===3)that.state.right=true;return event.preventDefault()});
				element.addEventListener("mouseup",function(event){that.state.left=that.state.middle=that.state.right=false;return event.preventDefault()})};root.MouseMonitor=MouseMonitor})(window);
				+function(root){var Canvas=function Canvas(element){this.el=element;this.ctx=element.getContext("2d");this.w=element.width;this.h=element.height},cp=Canvas.prototype;cp.clear=function(opacity){if(typeof opacity==="number"&&opacity!==1)this.ctx.fillStyle="rgba(0, 0, 0, "+opacity+")";else this.ctx.fillStyle="rgb(0, 0, 0, 0)";this.ctx.fillRect(0,0,this.w,this.h)};cp.resize=function(width,height){this.w=this.el.width=1920;this.h=this.el.height=1280;this.ctx.fillStyle="rgba(0, 0, 0, 0)";this.ctx.fillRect(0,
				0,width,height)};root.Canvas=Canvas}(window);
				+function(root){var Particle=function Particle(b,m){this.p=new v2;this.l=new v2;this.v=new v2;this.g=new v2;this.b=b;this.m=m;this.reset()},pp=Particle.prototype;pp.reset=function(){this.l.set(-300+Math.floor(Math.random()*(this.b.x+300)),0).move(this.p);this.v=new v2(5.5,13.5);this.g=new v2(0,.6+Math.random()*.2)};pp.step=function(){this.p.move(this.l).add(this.v);this.v.add(this.g).mul(.998);if(this.m.state.left){var mf=.5-(1-this.m.position.x/this.b.x);this.v.x-=mf}if(!this.p.within2db(this.b))this.reset()};
				pp.render=function(ctx){ctx.moveTo(this.l.x,this.l.y);ctx.lineTo(this.p.x,this.p.y)};root.Particle=Particle}(window);
				$(function(){var c=new Canvas(document.getElementById("rainbowCanvas")),resize,strokeGradient,mm=new MouseMonitor(c.el),ctx=c.ctx,particles=[],bounds=new v2(window.innerWidth,window.innerHeight);+function particleFactory(){particles.push(new Particle(bounds,mm));if(particles.length<30)setTimeout(particleFactory,50)}();+function render(){rainbowFrame=requestAnimationFrame(render);c.clear(.2);for(var i=0;i<particles.length;i+=1)particles[i].step();ctx.beginPath();for(var i=0;i<particles.length;i+=1)particles[i].render(ctx);
				ctx.strokeStyle=strokeGradient;ctx.stroke()}();resize=function resize(){c.resize(1920,1280);bounds.set(1920,1280);strokeGradient=ctx.createLinearGradient(0,0,c.w,0);strokeGradient.addColorStop(0,"hsla(0, 75%, 50%, .85)");strokeGradient.addColorStop(.2,"hsla(72, 75%, 50%, .85)");strokeGradient.addColorStop(.4,"hsla(144, 75%, 50%, .85)");strokeGradient.addColorStop(.6,"hsla(216, 75%, 50%, .85)");strokeGradient.addColorStop(.8,"hsla(288, 75%, 50%, .85)");strokeGradient.addColorStop(1,"hsla(360, 75%, 50%, .85)")};
				resize();window.addEventListener("resize",resize)});
				
				$("#rainbow").stop(true, true).fadeIn(800);
			}
			
			function fire() {
				var canv = document.createElement("canvas");
				canv.id = "fireCanvas";
				document.getElementById("fire").appendChild(canv);
				
				var jmParticleEngine=function(){var canvas=null;var ctx=null;var emitters=[];function Particle(x,y,w,h,rot,xVel,yVel,life,s,r,g,b,i){this.x=x;this.y=y;this.width=w;this.height=h;this.rotation=rot;this.xVelocity=xVel;this.yVelocity=yVel;this.maxLife=life;this.life=life;this.growthType=s;this.r=r;this.g=g;this.b=b;this.image=i}function Emitter(x,y,m,p){this.x=x;this.y=y;this.maxParticles=m||500;this.particles=[];this.generateParticle=p;this.emit=false;this.images=[]}Emitter.prototype.start=function(){this.emit=
				true};Emitter.prototype.stop=function(){this.emit=false};Emitter.prototype.preloadImage=function(url){var img=new Image;var that=this;var id=this.images.length;that.images.push({"image":img,"loaded":false});this.attachHandler(img,"load",function(){that.images[id].loaded=true});img.crossOrigin="";img.src=url;return id};Emitter.prototype.attachHandler=attachHandler_;function attachHandler_(elementId,event,functionName){var element={};if(typeof elementId==="string")element=document.getElementById(elementId);
				else element=elementId;if(element.addEventListener)element.addEventListener(event,functionName,false);else if(element.attachEvent)element.attachEvent("on"+event,functionName);else element["on"+event]=functionName}function randomNumber_(n,s,r){if(n===undefined)n=1;if(s===undefined)s=0;if(r===undefined)r=true;if(r)return Math.round(Math.random()*n-s);else return Math.random()*n-s}function renderParticle(particle,width,height,image){if(particle.rotation!==0){ctx.save();ctx.translate(particle.x,particle.y);
				ctx.rotate(particle.rotation);if(image!==undefined)ctx.drawImage(image,-width/2,-height/2,width,height);else ctx.fillRect(-width/2,-height/2,width,height);ctx.restore()}else if(image!==undefined)ctx.drawImage(image,particle.x,particle.y,width,height);else ctx.fillRect(particle.x,particle.y,width,height)}function particleLoop(time){ctx.clearRect(0,0,canvas.width,canvas.height);var n=emitters.length;var width=0;var height=0;while(n--){if(emitters[n].particles.length===emitters[n].maxParticles)emitters[n].particles.shift();
				if(emitters[n].emit){var diff=emitters[n].maxParticles-emitters[n].particles.length;var wanted=Math.ceil(diff*.01);if(diff>0){var j=0;while(j<wanted){emitters[n].particles.push(emitters[n].generateParticle());j++}}}var i=emitters[n].particles.length;while(i--)if(emitters[n].particles[i].life>0){if(emitters[n].particles[i].growthType===1){width=emitters[n].particles[i].life/emitters[n].particles[i].maxLife*emitters[n].particles[i].width;height=emitters[n].particles[i].life/emitters[n].particles[i].maxLife*
				emitters[n].particles[i].height}else if(emitters[n].particles[i].growthType===2){width=(1-emitters[n].particles[i].life/emitters[n].particles[i].maxLife)*emitters[n].particles[i].width;height=(1-emitters[n].particles[i].life/emitters[n].particles[i].maxLife)*emitters[n].particles[i].height}else{width=emitters[n].particles[i].width;height=emitters[n].particles[i].height}if(emitters[n].particles[i].image===undefined){ctx.fillStyle="rgba("+emitters[n].particles[i].r+","+emitters[n].particles[i].g+","+
				emitters[n].particles[i].b+", 1)";ctx.globalAlpha=emitters[n].particles[i].life/emitters[n].particles[i].maxLife;renderParticle(emitters[n].particles[i],width,height)}else if(emitters[n].images[emitters[n].particles[i].image]!==undefined)if(emitters[n].images[emitters[n].particles[i].image].loaded){ctx.globalAlpha=emitters[n].particles[i].life/emitters[n].particles[i].maxLife;renderParticle(emitters[n].particles[i],width,height,emitters[n].images[emitters[n].particles[i].image].image)}emitters[n].particles[i].x+=
				emitters[n].particles[i].xVelocity;emitters[n].particles[i].y+=emitters[n].particles[i].yVelocity;emitters[n].particles[i].life--}else emitters[n].particles.splice(i,1)}fireFrame=requestAnimationFrame(particleLoop,canvas)}return{init:function(canvasId,width,height){canvas=document.getElementById(canvasId);canvas.width=width;canvas.height=height;ctx=canvas.getContext("2d");particleLoop()},generateEmitter:function(x,y,m,p){return new Emitter(958,180,m,p)},generateParticle:function(x,y,w,h,rot,xVel,yVel,life,
				s,r,g,b,i){return new Particle(x,y,w,h,rot,xVel,yVel,life,s,r,g,b,i)},addEmitter:function(e,s){if(s!==undefined&&s)e.start();emitters.push(e)},randomNumber:randomNumber_,attachHandler:attachHandler_}}();jmParticleEngine.init("fireCanvas",1920,1280);
				function particleGenerator1(){var size=jmParticleEngine.randomNumber(2,undefined,true);return jmParticleEngine.generateParticle(this.x,this.y,size,size,0,jmParticleEngine.randomNumber(15,7.5,false),jmParticleEngine.randomNumber(15,7.5,false),120,0,jmParticleEngine.randomNumber(191,-64,true),jmParticleEngine.randomNumber(191,-64,true),jmParticleEngine.randomNumber(191,-64,true))}
				function particleGenerator2(){var size=jmParticleEngine.randomNumber(20,undefined,true);return jmParticleEngine.generateParticle(this.x,this.y,size,size,0,jmParticleEngine.randomNumber(15,7.5,false),jmParticleEngine.randomNumber(15,7.5,false),64,0,jmParticleEngine.randomNumber(255,0,true),jmParticleEngine.randomNumber(64,0,true),jmParticleEngine.randomNumber(32,0,true))}
				function particleGenerator3(){var size1=jmParticleEngine.randomNumber(3,undefined,true);var size2=jmParticleEngine.randomNumber(100,undefined,true);return jmParticleEngine.generateParticle(this.x+jmParticleEngine.randomNumber(1E3,500,false),this.y,size1,size2,0,jmParticleEngine.randomNumber(1,1,false),jmParticleEngine.randomNumber(30,0,false),60,1,jmParticleEngine.randomNumber(32,0,true),jmParticleEngine.randomNumber(50,0,true),jmParticleEngine.randomNumber(255,0,true))}
				function particleGenerator4(){var size=jmParticleEngine.randomNumber(128,undefined,true);var grey=jmParticleEngine.randomNumber(255,0,true);return jmParticleEngine.generateParticle(this.x,this.y,size,size,0,jmParticleEngine.randomNumber(15,7.5,false),jmParticleEngine.randomNumber(15,7.5,false),42,0,grey,grey,grey)}
				function particleGenerator5(){var size=jmParticleEngine.randomNumber(128,-64,true);return jmParticleEngine.generateParticle(this.x,this.y,size,size,jmParticleEngine.randomNumber(Math.PI*2,0,false),jmParticleEngine.randomNumber(18,9,false),jmParticleEngine.randomNumber(18,9,false),64,0,0,0,0,0)}var emit1=jmParticleEngine.generateEmitter(Math.ceil(window.innerWidth/4),Math.ceil(window.innerHeight/2),1500,particleGenerator5);emit1.preloadImage("http://s.nx.com/S2/Game/Elsword/2016/gameinfo/img_fire.png");
				var emit2=jmParticleEngine.generateEmitter(Math.ceil(window.innerWidth/4),Math.ceil(window.innerHeight/2),5E3,particleGenerator2);var emit3=jmParticleEngine.generateEmitter(Math.ceil(window.innerWidth/4),Math.ceil(window.innerHeight/2),5E3,particleGenerator3);var emit4=jmParticleEngine.generateEmitter(Math.ceil(window.innerWidth/4),Math.ceil(window.innerHeight/2),5E3,particleGenerator4);var emit5=jmParticleEngine.generateEmitter(Math.ceil(window.innerWidth/4),Math.ceil(window.innerHeight/2),5E3,particleGenerator1);
				var emitTmp=jmParticleEngine.generateEmitter(Math.ceil(window.innerWidth/4*3),Math.ceil(window.innerHeight/2),750,particleGenerator1);jmParticleEngine.addEmitter(emit1,true);jmParticleEngine.addEmitter(emit2);jmParticleEngine.addEmitter(emit3);jmParticleEngine.addEmitter(emit4);jmParticleEngine.addEmitter(emit5);jmParticleEngine.addEmitter(emitTmp,true);
				
				$("#fire").stop(true, true).fadeIn(800);
			}
			
			function smoke() {
				var canv = document.createElement("canvas");
				canv.id = "smokeCanvas";
				document.getElementById("smoke").appendChild(canv);
				
				(function(){var Blip,blips,c,ch,clear,ctx,cw,divider,globalTick,initialBlips,pi2,rand,run;c=document.getElementById("smokeCanvas");ctx=c.getContext("2d");divider=4;cw=c.width=1920/divider;ch=c.height=1280/divider;pi2=Math.PI*2;blips=[];initialBlips=30;globalTick=0;rand=function(min,max){return Math.floor(Math.random()*(max-min+1)+min)};Blip=function(x,y){this.x=x;this.y=y;this.r=.1;this.rGrowthBase=1;this.rGrowth=this.rGrowthBase;this.rMax=(cw+ch)/7;return this.alpha=.4};Blip.prototype.update=function(i){var percent;
				percent=(this.rMax-this.r)/this.rMax;this.rGrowth=.1+this.rGrowthBase*percent;this.r+=this.rGrowth;this.alpha=percent;if(this.r>this.rMax)return blips.splice(i,1)};Blip.prototype.render=function(i){ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,pi2,false);ctx.fillStyle="hsla("+rand(globalTick-80,globalTick+80)+", 50%, 1%, "+this.alpha+")";return ctx.fill()};clear=function(){ctx.globalCompositeOperation="destination-out";ctx.fillStyle="hsla(0, 0%, 0%, 0.05)";ctx.fillRect(0,0,cw,ch);return ctx.globalCompositeOperation=
				"lighter"};run=function(){var i;smokeFrame=window.requestAnimationFrame(run,c);clear();i=blips.length;while(i--)blips[i].update(i);i=blips.length;while(i--)blips[i].render(i);blips.push(new Blip(rand(0,cw),rand(0,ch)));return globalTick++};run()}).call(this);
				
				$("#smoke").stop(true, true).fadeIn(800);
			}
			
			function fountain() {
				var canv = document.createElement("canvas");
				canv.id = "fountainCanvas";
				document.getElementById("fountain").appendChild(canv);
				
				var c=document.getElementById("fountainCanvas"),ctx=c.getContext("2d");c.width=1920;c.height=1280;var arr=[];
				var go=function(){ctx.fillStyle="hsla(0,0%,10%,.8)";ctx.fillRect(0,0,c.width,c.height);var p=new Part(c.width/2,c.height);p.vx=Math.random()*10-5;arr.push(p);for(var i in arr){var p=arr[i];p.disp(ctx);p.upd()}if(arr.length>400)arr.shift()};var rnd=function(min,max){return Math.random()*(max-min)+min};
				var Part=function(px,py){this.px=px;this.py=py;this.vy=rnd(1.1,2)*-8*1.1;this.vx=rnd(1.1,2)*5*1.1;this.grav=.1;this.col=0;this.rad=rnd(4,16);this.disp=function(ctx){ctx.fillStyle="hsla("+this.col+", 95%, 60%, .4)";ctx.beginPath();ctx.arc(this.px,this.py,this.rad,0,Math.PI*2);ctx.fill()};this.upd=function(){this.vy+=this.grav;this.py+=this.vy*1.1;this.px+=this.vx*1.1;this.col+=2}};var run=function(){fountainFrame=window.requestAnimationFrame(run);go()};run();
				
				$("#fountain").stop(true, true).fadeIn(800);
			}
			
			function meteor() {
				var canv = document.createElement("canvas");
				canv.id = "meteorCanvas";
				document.getElementById("meteor").appendChild(canv);
				
				setTimeout(start,400);
				function start(){function lineToAngle(x1,y1,length,radians){var x2=x1+length*Math.cos(radians),y2=y1+length*Math.sin(radians);return{x:x2,y:y2}}function randomRange(min,max){return min+Math.random()*(max-min)}function degreesToRads(degrees){return degrees/180*Math.PI}var particle={x:0,y:0,vx:0,vy:0,radius:0,create:function(x,y,speed,direction){var obj=Object.create(this);obj.x=x;obj.y=y;obj.vx=Math.cos(direction)*speed;obj.vy=Math.sin(direction)*speed;return obj},getSpeed:function(){return Math.sqrt(this.vx*this.vx+
				this.vy*this.vy)},setSpeed:function(speed){var heading=this.getHeading();this.vx=Math.cos(heading)*speed;this.vy=Math.sin(heading)*speed},getHeading:function(){return Math.atan2(this.vy,this.vx)},setHeading:function(heading){var speed=this.getSpeed();this.vx=Math.cos(heading)*speed;this.vy=Math.sin(heading)*speed},update:function(){this.x+=this.vx;this.y+=this.vy}};var canvas=document.getElementById("meteorCanvas"),context=canvas.getContext("2d"),width=canvas.width=1920,height=canvas.height=1280,
				stars=[],shootingStars=[],layers=[{speed:.4,scale:.2,count:80},{speed:.6,scale:.4,count:80},{speed:.8,scale:.6,count:80},{speed:.1,scale:.8,count:80},{speed:.12,scale:.1,count:80}],starsAngle=145,shootingStarSpeed={min:10,max:20},shootingStarOpacityDelta=.01,trailLengthDelta=.01,shootingStarEmittingInterval=4E3,shootingStarLifeTime=800,maxTrailLength=400,starBaseRadius=2,shootingStarRadius=4,paused=false;for(var j=0;j<layers.length;j+=1){var layer=layers[j];for(var i=0;i<layer.count;i+=1){var star=
				particle.create(randomRange(0,width),randomRange(0,height),0,0);star.radius=starBaseRadius*layer.scale;star.setSpeed(layer.speed);star.setHeading(degreesToRads(starsAngle));stars.push(star)}}function createShootingStar(){var shootingStar=particle.create(randomRange(width/2,width),randomRange(0,height/2),0,0);shootingStar.setSpeed(randomRange(shootingStarSpeed.min,shootingStarSpeed.max));shootingStar.setHeading(degreesToRads(starsAngle));shootingStar.radius=shootingStarRadius;shootingStar.opacity=
				0;shootingStar.trailLengthDelta=0;shootingStar.isSpawning=true;shootingStar.isDying=false;shootingStars.push(shootingStar)}function killShootingStar(shootingStar){setTimeout(function(){shootingStar.isDying=true},shootingStarLifeTime)}function update(){if(!paused){context.clearRect(0,0,width,height);context.fillStyle="rgba(0, 0, 0, 0)";context.fillRect(0,0,width,height);context.fill();for(var i=0;i<stars.length;i+=1){var star=stars[i];star.update();drawStar(star);if(star.x>width)star.x=0;if(star.x<
				0)star.x=width;if(star.y>height)star.y=0;if(star.y<0)star.y=height}for(i=0;i<shootingStars.length;i+=1){var shootingStar=shootingStars[i];if(shootingStar.isSpawning){shootingStar.opacity+=shootingStarOpacityDelta;if(shootingStar.opacity>=1){shootingStar.isSpawning=false;killShootingStar(shootingStar)}}if(shootingStar.isDying){shootingStar.opacity-=shootingStarOpacityDelta;if(shootingStar.opacity<=0){shootingStar.isDying=false;shootingStar.isDead=true}}shootingStar.trailLengthDelta+=trailLengthDelta;
				shootingStar.update();if(shootingStar.opacity>0)drawShootingStar(shootingStar)}for(i=shootingStars.length-1;i>=0;i--)if(shootingStars[i].isDead)shootingStars.splice(i,1)}meteorFrame=requestAnimationFrame(update)}function drawStar(star){context.fillStyle="rgba(255, 255, 255, 0.8)";context.beginPath();context.arc(star.x,star.y,star.radius,0,Math.PI*2,false);context.fill()}function drawShootingStar(p){var x=p.x,y=p.y,currentTrailLength=maxTrailLength*p.trailLengthDelta,pos=lineToAngle(x,y,-currentTrailLength,
				p.getHeading());context.fillStyle="rgba(255, 255, 255, "+p.opacity+")";var starLength=5;context.beginPath();context.moveTo(x-1,y+1);context.lineTo(x,y+starLength);context.lineTo(x+1,y+1);context.lineTo(x+starLength,y);context.lineTo(x+1,y-1);context.lineTo(x,y+1);context.lineTo(x,y-starLength);context.lineTo(x-1,y-1);context.lineTo(x-starLength,y);context.lineTo(x-1,y+1);context.lineTo(x-starLength,y);context.closePath();context.fill();context.fillStyle="rgba(255, 255, 255, "+p.opacity+")";context.beginPath();
				context.moveTo(x-1,y-1);context.lineTo(pos.x,pos.y);context.lineTo(x+1,y+1);context.closePath();context.fill()}update();setInterval(function(){if(paused)return;createShootingStar()},shootingStarEmittingInterval);window.onfocus=function(){paused=false};window.onblur=function(){paused=true}};
				
				$("#meteor").stop(true, true).fadeIn(800);
				$("#moon").stop(true, true).animate({
					opacity: 0.8,
					top: 0
				}, 800);
			}
			
			function star() {
				var canv = document.createElement("canvas");
				canv.id = "starCanvas";
				document.getElementById("star").appendChild(canv);
				
				var canvas=document.getElementById("starCanvas"),ctx=canvas.getContext("2d"),w=canvas.width=1920,h=canvas.height=1280,hue=244,stars=[],count=0,maxStars=400;var canvas2=document.createElement("canvas"),ctx2=canvas2.getContext("2d");canvas2.width=100;canvas2.height=100;var half=canvas2.width/2,gradient2=ctx2.createRadialGradient(half,half,0,half,half,half);gradient2.addColorStop(.025,"#fff");gradient2.addColorStop(.1,"hsl("+hue+", 60%, 88%)");gradient2.addColorStop(.25,"hsl("+hue+", 64%, 8%)");
				gradient2.addColorStop(1,"transparent");ctx2.fillStyle=gradient2;ctx2.beginPath();ctx2.arc(half,half,half,0,Math.PI*2);ctx2.fill();function random(min,max){if(arguments.length<2){max=min;min=0}if(min>max){var hold=max;max=min;min=hold}return Math.floor(Math.random()*(max-min+1))+min}function maxOrbit(x,y){var max=Math.max(x,y),diameter=Math.round(Math.sqrt(max*max+max*max));return diameter/2}
				var Star=function(){this.orbitRadius=random(maxOrbit(w,h));this.radius=random(60,this.orbitRadius)/12;this.orbitX=w/2;this.orbitY=h/2;this.timePassed=random(0,maxStars);this.speed=random(this.orbitRadius)/16E4;this.alpha=random(2,10)/10;count++;stars[count]=this};
				Star.prototype.draw=function(){var x=Math.sin(this.timePassed)*this.orbitRadius+this.orbitX,y=Math.cos(this.timePassed)*this.orbitRadius+this.orbitY,twinkle=random(10);if(twinkle===1&&this.alpha>0)this.alpha-=.05;else if(twinkle===2&&this.alpha<1)this.alpha+=.05;ctx.globalAlpha=this.alpha;ctx.drawImage(canvas2,x-this.radius/2,y-this.radius/2,this.radius,this.radius);this.timePassed+=this.speed};for(var i=0;i<maxStars;i++)new Star;
				function animation(){ctx.globalCompositeOperation="source-over";ctx.globalAlpha=.6;ctx.fillStyle="hsla("+hue+", 64%, 6%, 0.8)";ctx.fillRect(0,0,w,h);ctx.globalCompositeOperation="lighter";for(var i=1,l=stars.length;i<l;i++)stars[i].draw();starFrame=window.requestAnimationFrame(animation)}animation();
				
				$("#star").stop(true, true).fadeIn(800);
			}
		}
	});
})(jQuery);