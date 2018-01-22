//구글 트래킹 코드 Start(2013-11-12)
(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
  m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-87682703-1', 'nexon.com');
ga('set', 'dimension1', ga_oid);
ga('set', 'dimension2',document.domain);
ga('send', 'pageview');
//구글 트래킹 코드 End

var elsword_common = {

    isNotEmpty: function (_str) {

        obj = String(_str);

        if (obj == null || obj == undefined || obj == 'null' || obj == 'undefined' || obj == '') return false;

        else return true;

    },
    //빈값 확인
    isEmpty: function (_str) {

        return !elsword_common.isNotEmpty(_str);

    },

    CheckStrLen: function (textval, maxlen) {
        var temp;
        var msglen;
        var isCheckStrLen = true;
        msglen = maxlen * 2;

        l = textval.value.length;
        tmpstr = "";

        if (l == 0) { }
        else {
            for (k = 0; k < l; k++) {
                temp = textval.value.charAt(k);

                if (escape(temp).length > 4) {
                    msglen -= 2;
                } else {
                    msglen--;
                }

                if (msglen < 0) {
                    alert("영문 " + (maxlen * 2) + "자 한글 " + maxlen + "자 까지 작성하실 수 있습니다.");
                    textval.value = tmpstr;
                    isCheckStrLen = false;
                    break;
                } else {
                    tmpstr += temp;
                }
            }
        }

        return isCheckStrLen;
    },


    CheckStrLen2: function (textval, maxlen) {
        var temp;
        var msglen;
        var isCheckStrLen = true;
        msglen = maxlen * 2;

        l = textval.value.length;
        tmpstr = "";

        if (l == 0) { }
        else {
            for (k = 0; k < l; k++) {
                temp = textval.value.charAt(k);

                if (escape(temp).length > 4) {
                    msglen -= 2;
                } else {
                    msglen--;
                }

                if (msglen < 0) {                    
                    textval.value = tmpstr;
                    isCheckStrLen = false;
                    break;
                } else {
                    tmpstr += temp;
                }
            }
        }

        return isCheckStrLen;
    },

    // 숫자인지 체크
    CheckNumber: function (event) {    
        event = event || window.event;
        var keyID = (event.which) ? event.which : event.keyCode;

        if ((keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 || keyID == 9)
            return;
        else
            return false;
    },

    RemoveChar : function(event) {    
        event = event || window.event;
        var keyID = (event.which) ? event.which : event.keyCode;
        if (keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39) {
            return;
        }
        else {
            try {
                event.target.value = event.target.value.replace(/[^0-9]/g, "");
            } catch (e) { }


        }
    }

}


var codeRegSite = 156;
$(document).ready(function() {

    $( '#btnLogin' ).click(function() 
    {
        return DoLogin();
    });
    
    $( '#txtID' ).keypress( function() 
    {
        if( event.keyCode == 13 )
			return DoLogin();
    } );
    
    $( '#txtPwd' ).keypress( function() 
    {
        if( event.keyCode == 13 )
			return DoLogin();
    } );
    
 
    
    $( '#gNxCheckFireWall' ).click(function() 
    {
        if( typeof( NgbAOS ) == 'object' ) 
			return NgbAOS.SetUpFireWall( true, '' ); 
		else 
			alert( '해당 기능을 사용할 수 없습니다.' ); 
		
		return false;
    });
    
    $( '#txtSearchWord' ).keypress( function()
    {
        if ( event.keyCode == 13 )
        {
            $( '#btnSearch' ).click();
        }
    });
});

var ErrorHandler = new function()
{
	this.CheckAjaxError = function( data )
	{
		if( data.indexOf( '{' ) == 0 )
		{
			var result = eval( '(' + data + ')' );
			if( result != null && result.n4ErrorLogSN != null )
			{
				alert( '에러가 발생하였습니다. - ' + result.n4ErrorLogSN );
				return false;
			}
		}
		return true;
	}
}

function DoLogin()
{
	var strNexonID = jQuery.trim( $( '#txtID' ).val() );
	var strPassword = jQuery.trim( $( '#txtPwd' ).val() );
	
	if( strNexonID == '' )
	{
		alert( '아이디 또는 이메일을 입력하세요.' );
		$( '#txtID' ).focus();			
	}
	else if( strPassword == '' )
	{
		alert( '비밀번호를 입력하세요.' );
		$( '#txtPwd' ).focus();			
	}
	else
	{
		NgbLogin.Login( strNexonID, strPassword );
	}
	
	return false;
}

function CopyUrl( value )
{
	var trident = navigator.userAgent.match(/Trident\/(\d)/i);
        

    if (NgbBrowser.msie() || (trident != null && navigator.userAgent.indexOf('Trident') > 0)) {
        window.clipboardData.setData('Text', value);
        alert('주소가 복사되었습니다.\n메신저나 게시판에 Ctrl+V로 붙여 넣으세요.');
    }
    else {
        prompt('이글의 주소입니다. Ctrl+C를 누르신 후\n메신저나 게시판에 Ctrl+V로 붙여 넣으세요.', value);
    }
    return false;
}

function CopyUrlNaver( value )
{
	var trident = navigator.userAgent.match(/Trident\/(\d)/i);
        

    if ((trident != null && navigator.userAgent.indexOf('Trident') > 0)) {
        window.clipboardData.setData('Text', value);
        alert('퍼가기 글이 복사되었습니다! Ctrl+v(붙여넣기) 하여 게시글을 등록해 주세요!');
    }
    else {
        prompt('이글의 내용입니다. Ctrl+C를 누르신 후\n게시글을에 Ctrl+V로 붙여 넣으세요.', value);
    }
    return false;
}


var Article = new function() {
    this.RemoveArticle = function(n4ArticleSN, strGoListLink) {
        if (confirm('정말로 삭제하시겠습니까?')) {
            $.ajax({
                url: 'ajax.aspx',
                data: ({ MethodType: 'RemoveArticle', n4ArticleSN: n4ArticleSN, rd: Math.random() }),
                success: function(data) {
                    if (!ErrorHandler.CheckAjaxError(data))
                        return false;

                    var result = eval('(' + data + ')');

                    if (result.redirectUrl != '')
                        document.location.href = result.redirectUrl;
                    else if (result.errorMessage != '')
                        alert(result.errorMessage);
                    else
                        document.location.href = strGoListLink;
                },
                error: function(xhr, status, exception) {
                    alert('에러가 발생하였습니다' + xhr.responseText);
                }
            });
        }
    }

    this.RecommendArticle = function(n4ArticleSN, n1Point) {
        if (confirm('이 게시물을 추천하시겠어요?')) {
            $.ajax({
                url: 'ajax.aspx',
                data: ({ MethodType: 'RecommendArticle', n4ArticleSN: n4ArticleSN, n1Point: n1Point, rd: Math.random() }),
                success: function(data) {
                    if (!ErrorHandler.CheckAjaxError(data))
                        return false;

                    var result = eval('(' + data + ')');

                    if (result.redirectUrl != '')
                        document.location.href = result.redirectUrl;
                    else if (result.errorMessage != '')
                        alert(result.errorMessage);
                    else {
                        alert('추천 되었습니다');
                        document.location.href = document.location.href;
                    }
                },
                error: function(xhr, status, exception) {
                    alert('에러가 발생하였습니다' + xhr.responseText);
                }
            });
        }
    }

    this.SearchArticle = function(idText) {
        var idObject = '#' + idText;
        var strSearchWord = $.trim($(idObject).val());
        if (strSearchWord == '') {
            alert('검색어를 입력하세요.');
            $(idObject).focus();
            return false;
        }
        else if (strSearchWord.length < 2) {
            alert('검색어를 두 글자 이상 입력하세요.');
            $(idObject).focus();
            return false;
        }
        else {
            return true;
        }
    }
}


var Comment = new function() {
    this.iframeName = new String;
    
    this.iframeResize = function(){
        try{
            if(window.location != window.parent.location){
                parent.document.getElementById(this.iframeName).style.height = $(".cmmt_container").height()+20+'px'; 
            }
        }
        catch( ex ){}
    }
    
    this.AddComment = function(n4ArticleSN, idText) {
        var idObject = '#' + idText;

        //var strComment = helper.trim($(idObject).val());
        var strComment = $.trim($(idObject).val());

        if (strComment == '') {
            alert('댓글을 입력하세요.');
            $(idObject).focus();
        } else if (strComment.length > 200) {
            $(idObject).val(strComment.substring(0, 200));
            alert("200자 까지만 입력이 가능합니다");
            $(idObject).focus();
        }
        
        else {
            $.ajax({
                url: 'ajax.aspx',
                type: 'POST',
                //contentType: "application/x-www-form-urlencoded; charset=ks_c_5601-1987",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                //data: ({ MethodType:'AddComment', n4ArticleSN: n4ArticleSN, strComment:encodeURIComponent( strComment ), rd: Math.random() }),    // GET 방식일때 jquery ajax core 에서 UTF-8 형태로 Encoding 하므로 현 페이지 euc-kr를 Encoding.
                data: ({ MethodType: 'AddComment', n4ArticleSN: n4ArticleSN, strComment: strComment, rd: Math.random() }),  // contentsType 을 UTF-8방식으로 보낼때 서버에서 Request.Form 받으면 별도 Decoding 없이 정상 처리 됨.
                success: function(data) {
                    if (!ErrorHandler.CheckAjaxError(data))
                        return false;

                    var result = eval('(' + data + ')');
                    $(idObject).val('');

                    if (result.errorCode == "WriteStatus_ATL10")
                        NgbMember.BoardVerification();
                    if (result.redirectUrl != '')
                        document.location.href = result.redirectUrl;
                    else if (result.errorMessage != '')
                        alert(result.errorMessage.replace("<br>", "\n"));
                    else {
                        Comment.ReloadComment(result.n4ArticleSN, 1);
                    }
                },
                error: function(xhr, status, exception) {
                    alert('에러가 발생하였습니다' + xhr.responseText);
                }
            });
        }
    }

    this.RemoveComment = function(n4ArticleSN, n4CommentSN) {
        $.ajax({
            url: 'ajax.aspx',
            data: ({ MethodType: 'RemoveComment', n4ArticleSN: n4ArticleSN, n4CommentSN: n4CommentSN, rd: Math.random() }),
            success: function(data) {
                if (!ErrorHandler.CheckAjaxError(data))
                    return false;

                var result = eval('(' + data + ')');
                if (result.redirectUrl != '')
                    document.location.href = result.redirectUrl;
                else if (result.errorMessage != '')
                    alert(result.errorMessage);
                else
                    Comment.ReloadComment(result.n4ArticleSN, 1);
            },
            error: function(xhr, status, exception) {
                alert('에러가 발생하였습니다' + xhr.responseText);
            }
        });
    }

    this.ReloadComment = function(n4ArticleSN, n4CommentPageNo) {
        $('#lblArticleSN').remove();
        $('#CommentList').remove();
        $('.replyPage').remove();
        $('.bbsRL').remove();

        $.ajax({
            url: './commentlist.aspx?n4ArticleSN=' + n4ArticleSN + '&n4CommentPageNo=' + n4CommentPageNo + '&rd=' + Math.random(),
            success: function(data, textStatus, xhr) {
                if (!ErrorHandler.CheckAjaxError(data))
                    return false;

                $(data).appendTo('.bbsReply');
                var n4ArticleSN = $('#lblArticleSN').html();
                
                Comment.iframeResize();

                $('.replyPage a').click(function() {
                    var url = $(this).attr('href');

                    var abc = url.match(/n4PageNo=[\d]+/i);
                    var n4PageNo = abc[0].substr(abc[0].indexOf('=') + 1, 100);

                    Comment.ReloadComment(n4ArticleSN, n4PageNo);
                    return false;
                });

                $('#CommentList a').click(function() {
                    if (confirm("삭제 하시겠습니까?")) {
                        var n4CommentSN = $(this).attr('alt');
                        Comment.RemoveComment(n4ArticleSN, n4CommentSN);
                        return false;
                    }
                    else {
                        return false;
                    }
                });
            },
            error: function(xhr, status, exception) {
                alert('에러가 발생하였습니다' + xhr.responseText);
            }
        });
    }
}

var ArticleReport = new function()
{
    this.Open = function( n4BoardSN, n4ArticleSN, strBoardUrl )
    {
        window.open( '/popup/report.aspx?n4BoardSN=' + n4BoardSN + '&n4ArticleSN=' + n4ArticleSN + '&strBoardUrl=' + strBoardUrl , 'Report', 'width=488, height=440', '' );
    }
}

$(document).ready(function() {
    if($('#editorView').length > 0){
           $('#editorView').ngwResizeImage({
                     wrapperWidth:1110,
                     contentWidth:700
           });
           $('#editorView').ngwBoardMovie();
    }
});

var SNSLink = new function()
{
    this.ShortUrl = function( strTitle, strLongUrl, type )
    {        
        if ( strTitle == "" || strLongUrl == "" || type == "" )
        {
            alert( "유효하지 않은 정보 입니다." );
            return false;
        }
        else
        {
            switch ( type )
            {
                case 1 : strLongUrl = strLongUrl + "&inlink=twitter"; break;
	            //case 2 : strLongUrl = strLongUrl + "&outlink=facebook"; break;
	            case 3 : strLongUrl = strLongUrl + "&inlink=me2day"; break;
            }

            switch (type) {
                case 1: SNSLink.twitter(strTitle, strLongUrl); break;
                case 2: SNSLink.facebook(strTitle, strLongUrl); break;
                case 3: SNSLink.me2day(strTitle, strLongUrl); break;
            }	
		}
    }
     
    this.facebook = function( strTitle, strLink )
    {
        var titl = encodeURIComponent( strTitle );
	    var link = encodeURIComponent( strLink ); 
	    var url = "http://www.facebook.com/sharer.php?u=" + link + "&t=" + titl;
	    
	    if ( link.length != 0 ) 
	    {
	        Util.windowOpen (url, 1000, 600, 'yes');
	        $.get('/wiselog/snslink.aspx?outlink=facebook', { }, function(result) {
            });
        }
    }
    
    this.twitter = function( strTitle, strLink )
    {
        var titl = encodeURIComponent( strTitle );
	    var link = encodeURIComponent( strLink ); 
	    var url = "http://twitter.com/?status=" + titl + "+" + link;
	    
	    if ( link.length != 0 ) 
	    {
	        Util.windowOpen (url, 1000, 600, 'yes');
	        $.get('/wiselog/snslink.aspx?outlink=twitter', { }, function(result) {
            });
        }
    }
    
    this.me2day = function( strTitle, strLink )
    {
        var titl = encodeURIComponent( strTitle );
	    var link = encodeURIComponent( strLink ); 
	    var url = "http://me2day.net/posts/new?new_post[body]=\"" + titl + "\":" + link;
	    
	    if ( link.length != 09 ) 
	    {
	        Util.windowOpen (url, 1000, 600, 'yes');
	        $.get('/wiselog/snslink.aspx?outlink=me2day', { }, function(result) {
            });
	    }
    }
}

var Util = new function()
{
    this.windowOpen = function()
    {
        var nUrl; var nWidth; var nHeight; var nLeft; var nTop; var nScroll;
	    nUrl = arguments[0];
	    nWidth = arguments[1];
	    nHeight = arguments[2];
	    nScroll = (arguments.length > 3 ? arguments[3] : "no");
	    nLeft = (arguments.length > 4 ? arguments[4] : (screen.width/2 - nWidth/2));
	    nTop = (arguments.length > 5 ? arguments[5] : (screen.height/2 - nHeight/2));
    	
	    winopen=window.open(nUrl, 'pbml_win', "left="+nLeft+",top="+nTop+",width="+nWidth+",height="+nHeight+",scrollbars="+nScroll+",toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no");
    }
}

function GetSNS(service, title, url, isLogin) {
    var popupWidth = 1024;
    var popupHeight = 800;
    var SNSURL = "";
    var popupScroll = "yes";

    title = "[엘소드] " + title;

    title = title.replace("<", "&lt;");
    title = title.replace(">", "&gt;");

    switch (service) {
        case "cyworld":
            SNSURL = "http://csp.cyworld.com/bi/bi_recommend_pop.php?url=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(SP_Base64.encode(title));
            popupWidth = 400;
            popupHeight = 400;
            break;

        case "facebook":
            SNSURL = "http://www.facebook.com/sharer.php?t=" + encodeURIComponent(title) + "&u=" + encodeURIComponent(url);
            popupWidth = 800;
            popupHeight = 400;
            break;

        case "me2day":
            SNSURL = "http://me2day.net/posts/new?new_post[body]=" + encodeURIComponent(title) + ' ' + encodeURIComponent("\"" + url + "\":" + url);
            popupWidth = 1024;
            popupHeight = 500;
            break;

        case "naver":
            SNSURL = "http://bookmark.naver.com/post?ns=1&ui=popup&title=" + encodeURIComponent(title) + '&url=' + encodeURIComponent(url);
            popupWidth = 515;
            popupHeight = 340;
            popupScroll = "no";
            break;

        case "twitter":
            SNSURL = "http://twitter.com/home?status=" + encodeURIComponent(title + ' ') + escape(url);
            popupWidth = 800;
            popupHeight = 400;
            break;

        case "yozm":
            SNSURL = "http://yozm.daum.net/api/popup/prePost?link=" + encodeURIComponent(url) + "&prefix=" + encodeURIComponent(title);
            popupWidth = 430;
            popupHeight = 290;
            break;

        case "naverBlog":
            SNSURL = "http://share.naver.com/web/shareView.nhn?url=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(title);
            popupWidth = 800;
            popupHeight = 500;
        }


    window.open(SNSURL, service, 'width=' + popupWidth + ', height=' + popupHeight + ',resizable=yes,scrollbars=' + popupScroll);
}

var SP_Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = SP_Base64._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },
    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) { output = output + String.fromCharCode(chr2); }
            if (enc4 != 64) { output = output + String.fromCharCode(chr3); }
        }
        output = SP_Base64._utf8_decode(output);
        return output;
    },
    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },
    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;
        var c3 = 0;

        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
};

function link(num) {
    //게임소식
    if (num == "110") {
        location.href = "/news/notice/list.aspx";
    }
    else if (num == "120") {
        location.href = "/news/update/list.aspx";
    }
    else if (num == "130") {
        location.href = "/news/events/list.aspx?n4ArticleCategorySN=2";
    }
    else if (num == "140") {
        location.href = "/news/press/list.aspx";
    }
    else if (num == "150") {
        location.href = "/news/gmwebzine/list.aspx";
    }
    //게임가이드
    else if (num == "210") {
        location.href = "/gameinfo/intro/feature.aspx";
    }
    else if (num == "220") {
        location.href = "/gameinfo/character/elsword.aspx";
    }
    else if (num == "230") {
        location.href = "/gameinfo/start/start.aspx";
    }
    else if (num == "240") {
        location.href = "/gameinfo/real/town.aspx";
    }
    else if (num == "250") {
        ngwPopup('/gameinfo/info/elios/elios.aspx', '1024', '768', '0', 'popElios');
    }
    //랭킹
    else if (num == "310") {
        location.href = "/ranking/global.aspx";
    }
    else if (num == "320") {
        location.href = "/ranking/war.aspx";
    }
    //엘툰
    else if (num == "410") {
        location.href = "/eltoon/cartoon/list.aspx";
    }
    else if (num == "420") {
        location.href = "/eltoon/eltype/list.aspx";
    }
    else if (num == "430") {
        location.href = "/eltoon/comicbook/list.aspx";
    }
    else if (num == "440") {
        ngwPopup("/events/110630/cartoon.html", '950', '740', '0', 'popCartoon');
    }
    //컨테스트
    else if (num == "510") {
        location.href = "/contest/avatacontest/list.aspx";
    }
    else if (num == "520") {
        location.href = "/contest/avatacody/list.aspx";
    }
    else if (num == "530") {
        location.href = "/contest/facontestimg/list.aspx?n4ArticleCategory2SN=1";
    }
    //커뮤니티
    else if (num == "610") {
        location.href = "/community/free/list.aspx";
    }
    else if (num == "620") {
        location.href = "/community/strategy/list.aspx";
    }
    else if (num == "630") {
        //location.href = "/community/skill/list.aspx";
        blockmsg();
    }
    else if (num == "640") {
        location.href = "/community/trade/list.aspx";
    }
    else if (num == "650") {
        location.href = "/community/idea/list.aspx";
    }
    else if (num == "660") {
        location.href = "/community/screenshot/list.aspx";
    }
    else if (num == "670") {
        location.href = "/community/fansite/list.aspx";
    }
    else if (num == "680") {
        location.href = "/community/poll/view.aspx";
    }
    //자료실
    else if (num == "710") {
        location.href = "/pds/download.aspx";
    }
    else if (num == "720") {
        location.href = "/pds/multimedia.aspx";
    }
    else if (num == "730") {
        location.href = "/pds/wallpaper.aspx";
    }
    //고객지원
    else if (num == "810") {
        location.href = "/customer/faq/list.aspx";
    }
    else if (num == "820") {
        location.href = "/customer/bugreport/list.aspx";
    }
    else if (num == "830") {
        location.href = "/customer/helpdesk/info.aspx";
    }
}

function blockmsg() {
    if (confirm("해당 서비스는 웹 접근성 개선 작업 중에 있습니다.\n좀 더 자세한 안내를 희망하시면 '확인' 버튼을,\n다른 메뉴를 계속 이용하시려면 '취소' 버튼을 클릭해 주시기 바랍니다.")) {
        location.href= '/notice/94529';
    }
}

//사전 예약 관련 광고 트래킹
function eventAddTracking(depth){
    var t_protocol = "https://";

	if(depth == 4){
		t_protocol = "http://"
	}

	var t_Url = t_protocol + "vtag.midas-i.com/vat-tag?cmp_no=3201&depth=" + depth;
	$.ajax({
				 url : t_Url,
				 dataType : "jsonp",
				 async : true, 
				 timeout: 500,
				 success: function(data) {
				 }, 
				 error : function(e) {
				 }
	});
	return false;
}