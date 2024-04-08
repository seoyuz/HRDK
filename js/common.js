$(document).ready(function(){


    $(window).on("scroll", function () {
        // scroll header
        if($(window).scrollTop() >= $(".header").height()) {
            $(".header").addClass("scroll");
        } else {
            $(".header").removeClass("scroll");
        }
        


        var windowScrollTop = $(window).scrollTop();
        $(".bg-white").each(function() {
            var bgWhiteTop = $(this).offset().top;
            var headerHalf = $(".header").outerHeight() / 2;
            if(windowScrollTop + headerHalf >= bgWhiteTop && windowScrollTop <= bgWhiteTop + $(this).outerHeight()){
                $(".header").addClass("white");
                return false; 
            } else {
                $(".header").removeClass("white");
            }
        });
    });



    //접근성
    $(".hd-bottom #gnb").on("focusin",function  () {
        $("#header").addClass("hover");
        $(".hd-bottom #gnb .depth2").stop().slideDown(300);
        $(".hd-bottom #gnb").addClass("on");
        $(".hd-bottom-dim").stop().slideDown(300);
    });

    $(".hd-bottom #gnb").on("focusout",function  () {
        $("#header").removeClass("hover");
        $(".hd-bottom #gnb .depth2").stop().slideUp(300);
        // $(".hd-bottom #gnb").removeClass("on");
        $(".hd-bottom-dim").stop().slideUp(300);
    });

    // mobile gnb click
    $(document).on('click', '.mobile-menu', function () {
        $(this).addClass("gnb-close");
        $('.mobile-gnb-wrap').addClass('open');
        // $('.dim').fadeIn();
        //$('.dim_layer').slideDown();
    });

    // mobile gnb click
    // $(document).on('click', '.mobile .mobile-menu', function () {
    //     $('body').addClass('overflow');
    // });

    $(document).on('click', '.mobile-menu.gnb-close', function () {
        $(this).removeClass("gnb-close");
        $('.mobile-gnb-wrap').removeClass('open');
        // $('.dim').fadeOut();
        $('.mobileOn .gnb > ul > li > ul').hide();
        $('.mobileOn .gnb > ul > li > a').removeClass('open');
        //$('.dim_layer').stop().slideUp();
    });




    //layer popup
    $('.modal-wrap').each(function (index, element) {
        $(this).contents().wrapAll('<div id="f_wrapper_' + index + '" class="f_wrapper"></div>');
    });

    $(document).on('click', '.modal-btn', function (event) {
        event.stopPropagation();
        event.preventDefault();
        
        var el = $(this);
        var lp = $(this).attr('data-popup');
        var popId = lp;

        // 메인 팝업 조건 s
        if($(this).hasClass('icolink') && !$(this).hasClass('open')) {
            $('.modal-wrap').removeClass('open');
            $('.modal-wrap').fadeOut();
            $('.modal-wrap').attr("tabindex","-1");
            $('.modal-btn').removeAttr('data-focus');
            $('.modal-btn').removeClass('open');
            $('.modal-close').removeAttr('data-close');
        }
        // 메인 팝업 조건 e


        $("#" + lp).find('.modal-close, .b-close').attr('data-close', popId);
        $("#" + lp).attr('tabindex','0');
        $(el).addClass('open');
        $("#" + lp).fadeIn();        
        // $(lp).focus();

        // var lp = $("#" + $(this).attr("aria-controls"));
        var lpObj = $("#" + lp).children('.f_wrapper');
        // var lpObjClose = $(lp).find(".modal-close");
        var lpObjTabbable = lpObj.find("button, .datepicker, .datepicker2, input:not([type='hidden']), select, iframe, textarea, [href], [tabindex]:not([tabindex='-1'])");
        var lpObjTabbableFirst = lpObjTabbable && lpObjTabbable.first();
        var lpObjTabbableLast = lpObjTabbable && lpObjTabbable.last();
        var lpOuterObjHidden = $('.skip-links, .masthead, .initial-content, .search-content, .page__footer'); // 레이어 바깥 영역의 요소
                
        lpOuterObjHidden.attr('aria-hidden', 'true'); // 레이어 바깥 영역을 스크린리더가 읽지 않게
        lpObjTabbable.length ? lpObjTabbableFirst.focus().on('keydown', function(event) {  // 레이어 열리자마자 초점 받을 수 있는 첫번째 요소로 초점 이동
            if (event.shiftKey && (event.keyCode || event.which) === 9) {  // Shift + Tab키 : 초점 받을 수 있는 첫번째 요소에서 마지막 요소로 초점 이동
                event.preventDefault();
                lpObjTabbableLast.focus();
            }
        }) : lpObj.attr('tabindex', '0').focus().on('keydown', function(event){
            tabDisable = true;
            if ((event.keyCode || event.which) === 9) event.preventDefault(); // Tab키 / Shift + Tab키 : 초점 받을 수 있는 요소가 없을 경우 레이어 밖으로 초점 이동 안되게
        });

        
        lpObjTabbableLast.on('keydown', function(event) {
            if (!event.shiftKey && (event.keyCode || event.which) === 9) {
                // Tab키 : 초점 받을 수 있는 마지막 요소에서 첫번째 요소으로 초점 이동
                event.preventDefault();
                lpObjTabbableFirst.focus();
            }
        });
    

        el.attr('data-focus', popId + 'on'); 
    });
    $(document).on('click', '.modal-close, .b-close', function (event) {
        event.stopPropagation();
        event.preventDefault();

        $(this).parents('.modal-wrap').removeClass('open');
        $(this).parents('.modal-wrap').fadeOut();
        $(this).parents('.modal-wrap').attr("tabindex","-1");
        var popId = $(this).attr("data-close");
            
        $('[data-focus~=' + popId + 'on]').focus(); // 표시해둔 곳으로 초점 이동
        $('[data-focus~=' + popId + 'on]').removeClass('open');
        window.setTimeout(function(){
            $('[data-focus~=' + popId + 'on]').removeAttr('data-focus');
        },500); // 역할을 다하고 필요없어진 표시 삭제
        $(this).removeAttr('data-close');
        
    });
    // 



    $(window).resize(function () {

        // $('.mobile-gnb-wrap').removeClass('open');
        // $('.mobile-menu.gnb-close').removeClass('gnb-close');
        // $('.dim').hide();
        // $('body').removeClass('overflow');
        // $('.mobile-menu').removeClass('active');
        // $('.mobile-gnb-wrap.mobileOn .gnb > ul > li > ul').hide();
        if ($(window).width() < 1200) {
            $('body').removeClass('pc');
            $('body').removeClass('tablet');
            $('body').addClass('mobile');
            $('.mobile-gnb-wrap').addClass('mobileOn');

            $('.hd-search-box').hide();

            /***** kakao inapp broswer bug - 201105 ej *****/
            var userAgent = navigator.userAgent.toLowerCase();

            // 카카오 인앱 브라우저인지 확인
            if (userAgent.indexOf('kakaotalk') > -1) {
                // 카카오 인앱 브라우저에서 열린 경우
            } else {
                // 일반적인 브라우저에서 열림
                $('.mobile-gnb-wrap .gnb > ul > li > a').removeClass('open');
                $('.mobile-gnb-wrap .gnb > ul > li > ul').hide();
            }
        } else if($(window).width() < 1201) {
            $('body').removeClass('pc');
            $('body').addClass('tablet');
            $('body').removeClass('mobile');

        } else {
            $('body').addClass('pc');
            $('body').removeClass('tablet');
            $('body').removeClass('mobile');
            
            //$('.mobile-menu').hide();
            // $('#wrap').removeClass('mobile');
            $('.mobile-gnb-wrap').removeClass('mobileOn');
            // $('.mobile-gnb-wrap').removeClass('open');
            // $('.dim').hide();
            $(".hd-bottom").mouseover(function() {
                $("body.pc #header").addClass("hover");
                // if($(this).children('.depth2').length) {
                    $('.hd-bottom #gnb .depth2').stop().slideDown(300);
                    $(".hd-bottom-dim").stop().slideDown(300);
                // }
            })
            $(".hd-bottom").mouseout(function() {
                $("body.pc #header").removeClass("hover");
                $('.hd-bottom #gnb .depth2').stop().slideUp(300);
                $(".hd-bottom-dim").stop().slideUp(300);
            })


            $('.mobile-gnb-wrap .gnb > ul > li > ul').show(); // pc
        }
    }).resize();


    $(document).on('click', '.mobile-gnb-wrap.mobileOn .gnb > ul > li > a', function (e) {
        if ($(this).next('ul').length) {
            e.preventDefault();
            $(this).parent().siblings().children('ul').slideUp();
            $(this).siblings('ul').slideDown();
            $('.mobile-gnb-wrap .gnb > ul > li > a').removeClass('open');
            $(this).addClass('open');
            $(this).children('.open').text("닫기");
        }
    });


    $(document).on('click', '.mobile-gnb-wrap.mobileOn .gnb > ul > li > a.open', function () {
        $(this).siblings('ul').slideUp();
        $(this).removeClass('open');
        $(this).children('.open').text("열기");
    })


    
    
    //datepicker
    $.datepicker.setDefaults({
        dateFormat: 'yy. mm. dd',	//날짜 포맷이다. 보통 yy-mm-dd 를 많이 사용하는것 같다.
        prevText: '이전 달',	// 마우스 오버시 이전달 텍스트
        nextText: '다음 달',	// 마우스 오버시 다음달 텍스트
        closeText: '닫기', // 닫기 버튼 텍스트 변경
        currentText: '오늘', // 오늘 텍스트 변경
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],	//한글 캘린더중 월 표시를 위한 부분
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],	//한글 캘린더 중 월 표시를 위한 부분
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],	//한글 캘린더 요일 표시 부분
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],	//한글 요일 표시 부분
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],	// 한글 요일 표시 부분
        showMonthAfterYear: true,	// true : 년 월  false : 월 년 순으로 보여줌
        yearSuffix: '년',	//
        showButtonPanel: true,	// 오늘로 가는 버튼과 달력 닫기 버튼 보기 옵션
        // buttonImageOnly: true,	// input 옆에 아이콘으로 캘린더 선택가능하게 하기
        // buttonImage: "../images/sub/ico_calendar.png",	// 조그만한 아이콘 이미지
        // buttonText: "Select date"	// 아이콘 툴팁
        changeMonth: true,
        changeYear: true,
    });

    var startDate =  $(".datepicker").datepicker(); // 시작일 or 단일 데이트피커
    var endDate = $(".datepicker2").datepicker(); // 종료일 있을 경우

    $("input.birth").datepicker({ yearRange: "-100:+0" });
    
    
    startDate.datepicker("option", "maxDate", endDate.val());
    startDate.datepicker("option", "onClose", function ( selectedDate ) {
        endDate.datepicker( "option", "minDate", selectedDate );
    });

    endDate.datepicker();
    endDate.datepicker("option", "minDate", startDate.val());

        


    $(".family-btn").click(function() {
        if(!$(this).hasClass("active")) {
            $(this).addClass("active");
            $(this).attr("title", "닫기");
            $(this).siblings(".list").slideDown();
        } else {
            $(this).removeClass("active");
            $(this).removeAttr("title", "열기");
            $(this).siblings(".list").slideUp();
        }
    });


    /* ........... 정규식 ........... */
    //휴대폰번호
    $(document).on("keyup", "input.phone-num", function() { 
        $(this).val( $(this).val().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-") );
    });

    //사업자등록번호
    $('input.bsnss-num').on('keyup', function(){
        var num = $(this).val();
        num.trim();  // 스페이스바 제거
        this.value = AutoHypen(num) ;
    });
    function AutoHypen(companyNum){
        companyNum = companyNum.replace(/[^0-9]/g, '');
        var tempNum = '';   
  
        if(companyNum.length < 4){
            return companyNum;
        }
        else if(companyNum.length < 6){
            tempNum += companyNum.substr(0,3);
            tempNum += '-';
            tempNum += companyNum.substr(3,2);
            return tempNum;
        }
        else if(companyNum.length < 11){
            tempNum += companyNum.substr(0,3);
            tempNum += '-';
            tempNum += companyNum.substr(3,2);
            tempNum += '-';
            tempNum += companyNum.substr(5);
            return tempNum;
        }
        else{        
            tempNum += companyNum.substr(0,3);
            tempNum += '-';
            tempNum += companyNum.substr(3,2);
            tempNum += '-';
            tempNum += companyNum.substr(5);
            return tempNum;
        }
    }
    //e

    // 서브페이지검색
    $('.search-wrap .category-btn').click(function(){
        if (!$(this).hasClass('open'))
        {
            $(this).children('span').text('목록 닫기');
            $('.search-detail').stop().slideDown();
            $(this).addClass('open');

        }else{
            $(this).children('span').text('목록 열기');
            $('.search-detail').stop().slideUp();
            $(this).removeClass('open');
        }
        return false;
    });

	// 상단으로 이동
	$('.top-btn').click('click', function(e) {
		e.preventDefault();
		$('html, body').stop().animate({scrollTop: 0}, 300);
	});
    
    /* flicking */
    var scrollStartPos = 0;
    $('.flicking').each(function (index, element) {
        $(this).wrap('<div id="f_wrapper_' + index + '" class="f_wrapper"></div>').wrap('<div class="f_wrapper_inner"></div>').wrap('<div class="f_scroller"></div>').before('<p class="touch">터치해서 좌우로 움직이세요</p>');
    });
    
    // 소득공제 대상 사업자 검색영역
    $(".srch-select .tit").click(function() {
        if(!$(this).parent().hasClass('on')) {
            $(this).parent().attr("title","선택됨");
            $(this).children('span').text('목록 닫기');
            $(this).siblings('ul').stop().slideDown(200);
            $(this).parent().addClass('on');
        } else {
            $(this).parent().attr("title","");
            $(this).children('span').text('목록 열기');
            $(this).siblings('ul').stop().slideUp(200);
            $(this).parent().removeClass('on');
        }
    });


    $('input.inp, textarea.inp').on('input propertychange', function() {
        var $this = $(this);
        var visible = Boolean($this.val());
        $this.siblings('.form-control-clear').toggleClass('hidden', !visible);
    }).trigger('propertychange');

    $('.form-control-clear').click(function() {
        $(this).siblings('.inp').val('').trigger('propertychange').focus();
    });


    //select floating label // 클릭 시
    $('.input select').on('focus blur change', function (e) {
        var $currEl = $(this);
        $currEl.parents('.input').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');




    //첨부파일 커스텀
    var $fileBox = null;
  
    $(function() {
        init();
    })
    
    function init() {
        $fileBox = $('.filebox');
        fileLoad();
    }
    
    function fileLoad() {
        $.each($fileBox, function(idx){
            var $this = $fileBox.eq(idx),
                $btnUpload = $this.find('[type="file"]'),
                $label = $this.find('.file-btn');

            $btnUpload.on('change', function() {
                var $target = $(this),
                    fileName = $target.val(),
                    $fileText = $target.siblings('.file-inp');
                $fileText.text(fileName);
            })

            $btnUpload.on('focusin focusout', function(e) {
                e.type == 'focusin' ?
                $label.addClass('file-focus') : $label.removeClass('file-focus');
            })
        })
    }



    $('.tr-chk').click(function() {
        if(!$(this).hasClass('on')) {
            $(this).addClass('on');
            $(this).parents('tr').addClass('selected');
        } else {
            $(this).removeClass('on');
            $(this).parents('tr').removeClass('selected');
        }
    });


// 배너존
var bannerSwiper = new Swiper(".banner-swiper", {
	// spaceBetween: 50,
	grabCursor: true,
    slidesPerView: 2,
	spaceBetween: 0,
    speed: 1000,
	pagination: false,
	watchSlidesProgress: true,
	simulateTouch: true,
	allowTouchMove : true, 
    loop:true,
	slideToClickedSlide : true,
	navigation: {
	  nextEl: '.foot-banner-wrap .swiper-button-next',
	  prevEl: '.foot-banner-wrap .swiper-button-prev',
	},
    pagination: {
        el: '.foot-banner-wrap .swiper-pagination',
        // type: 'fraction',
        clickable: true,
        renderBullet: function(index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    },
	// on: {
	// 	slideChange: function() {
			
	// 		var thumbIdx = banner.activeIndex;
	// 		dxTxtSwiper.slideTo(thumbIdx, 0, false);
	// 	},
	// },
	breakpoints: {
		// 화면의 넓이가 350px 이상일 때
		300: {
			slidesPerView: 2,
			spaceBetween: 0,
		},
		// 화면의 넓이가 600px 이상일 때
		600: {
			slidesPerView: 3,
			spaceBetween: 0,
		},
		1024: {
			slidesPerView: 6,
			spaceBetween: 20,
		},
	}
});


});
