$(document).ready(function(){
/* s */


/* 서브페이지 공통 */
$(".breadcrumb-box .tit-btn").click(function() {
    if (!$(this).hasClass("close")) {
        // 초기화
        $(".breadcrumb-box .tit-btn").removeClass("close");
        $(".breadcrumb-box .tit-btn").attr("title", "메뉴 열기")
        $(".breadcrumb-box ul").stop().hide();
        $(".breadcrumb-box .depth2-list > li > a").removeClass("close");

        // depth3-list 내의 각 a 요소에 대해 확인
        $(".depth3-list a.active").each(function() {
            $(this).closest("ul").show();
            $(this).parents().siblings("a").addClass("close");
            $(this).parents().siblings("a").attr("title", "메뉴 닫기");
        });

        playBreadcrumb(this);
    } else {
        // tit-btn을 닫을 때 depth2-list의 a 요소도 닫기
        $(".depth2-list > li > a").removeClass("close");
        $(".depth2-list > li > a").attr("title", "메뉴 열기");
        $(".breadcrumb-box .depth3-list").stop().hide();
        stopBreadcrumb(this);
    }
});

$(document).on("click", function(event) {
    // 브래드크럼이 아닌 다른 곳을 클릭했을 때 브래드크럼 닫기
    if (!$(event.target).closest(".breadcrumb-box").length) {
        stopBreadcrumb($(".breadcrumb-box .tit-btn"));
        stopBreadcrumb($(".depth2-list > li > a.open"));
    }
});

// depth3
$(".depth2-list > li > a").each(function() {
    if ($(this).next("ul").length) {
        $(this).addClass("open");
        $(this).attr("title", "메뉴 열기");
    }
});
$(document).on("click", ".depth2-list > li > a.open", function() {
    if (!$(this).hasClass("close")) {
        // 초기화
        $(".depth2-list > li > a.open").removeClass("close");
        $(".depth2-list > li > a.open").attr("title", "메뉴 열기")
        $(".breadcrumb-box .depth3-list").stop().hide();

        playBreadcrumb(this);
    } else {
        stopBreadcrumb(this);
    }
});


function stopBreadcrumb(el) {
    $(".depth2-list > li > a.open").removeClass("close");
    $(".depth2-list > li > a.open").attr("title", "메뉴 열기");
    $(el).removeClass("close");
    $(el).attr("title", "메뉴 열기")
    $(el).siblings("ul").stop().hide();
}


function playBreadcrumb(el) {
    $(el).addClass("close");
    $(el).attr("title", "메뉴 닫기");
    $(el).siblings("ul").stop().slideDown();
}



/* scroll event */
$(window).scroll(function() {

	$('.sub-tab-wrap .ui-subtab-list li:first-child a').addClass('on');
	if($('.sub-tab-wrap .ui-subtab-list').length) {
		if($(window).scrollTop() >= $(".sub-tab-trigger").offset().top) {
			$('.sub-tab-trigger').addClass('add');
			$('.sub-tab-wrap').addClass('fixed');
		} else {
			$('.sub-tab-trigger').removeClass('add');
			$('.sub-tab-wrap').removeClass('fixed');
		}
	}
	$('.sub-cont-tab').each(function() {
		if($(window).scrollTop() >= $(this).offset().top - $('.sub-tab-wrap').height() * 2) {
			var id = $(this).attr('id');
			$('.sub-tab-wrap .ui-subtab-list li a').removeClass('on');
			$('.sub-tab-wrap .ui-subtab-list li a[href="#'+ id +'"]').addClass('on');
		}
	});
});
 
$('.sub-tab-wrap .ui-subtab-list li a').on('click', function(event) {
    event.preventDefault();
    var $anchor = $(this);
    var targetSection = $($anchor.attr('href'));
    // 스크롤 애니메이션 적용
    $('html, body').stop().animate({
        scrollTop: targetSection.offset().top - 50
    }, {
        duration: 500
    });
});




//자주묻는 질문
$('.faq-list .item .qstion a').click(function(e){
	e.preventDefault();
	if (!$(this).parent().parent().hasClass('on'))
	{
		$('.faq-list .item').removeClass('on');
		$('.faq-list .item .answer').slideUp();
		$('.faq-list .item .qstion a .open').text('질문 열기');
		
		$(this).children('.open').text('질문 닫기');
		$(this).parent().siblings('.answer').stop().slideDown();
		$(this).parent().parent().addClass('on');

	}else{
		$(this).children('.open').text('질문 열기');
		$(this).parent().siblings('.answer').stop().slideUp();
		$(this).parent().parent().removeClass('on');
	}
	return false;
});


/* flicking */
var scrollStartPos = 0;
$('.business-tab-box .ui-tab-list').each(function (index, element) {
	$(this).wrap('<div id="f_wrapper_' + index + '" class="f_wrapper"></div>').wrap('<div class="f_wrapper_inner"></div>').wrap('<div class="f_scroller"></div>').before('<p class="touch">터치해서 좌우로 움직이세요</p>');
});





// 시설안내 작업 중
slider(); //슬라이드 실행
function slider() {
	var swiperArr = []; //swiper 슬라이드 변수
	var slideInx = []; //현재 슬라이드 index
	var slideNum = []; //슬라이드 개수
	var times = 5000;
	var center = ""; //가운데정렬
	var loopChk = ""; //무한반복 체크
	var viewNum = ""; //슬라이드 개수 (옵션)
	var winWChk = ""; //디바이스 체크
	var touch = ""; //슬라이드 3개 미만시 터치슬라이드 x
	var effect = "";
	var padding = "";
	var touchMove = "";
	var direction = "";

	$(".facilities-swiper").each(function (index) {
		var $this = $(this);
		//슬라이드 인덱스 클래스 추가
		$this.addClass("facilities-slider-" + index);
		//슬라이드, 옵션 배열 추가
		swiperArr.push(undefined);
		slideInx.push(0);
		slideNum.push($this.find(".swiper-slide").length);

		$(window).on("load resize", function () {
			winW = window.innerWidth;
			if (winWChk != "pc" && winW > 1300) {
				//PC 버전으로 전환할 때
				winWChk = "pc";
				sliderAct();
			} else if (winWChk != "ta" && 1301 > winW && winW > 767) {
				//태블릿 버전으로 전환할 때
				winWChk = "ta";
				sliderAct();
			} else if (winWChk != "mo" && winW < 768) {
				//모바일 버전으로 전환할 때
				winWChk = "mo";
				sliderAct();
				// $(".carrer-swiper").destroy();
			}
		});
	});

	function sliderAct() {
		$(".facilities-swiper").each(function (index) {
			//슬라이드 초기화

			if (swiperArr[index] != undefined) {
				swiperArr[index].destroy();
				swiperArr[index] = undefined;
			}

			//slidesPerView 옵션 설정
			if (winWChk == "pc") {
				viewNum = 1;
				padding = 0;
				effect = "slide";
				touchMove = true;
				// direction = "vertical";

			} else if (winWChk == "ta") {
				viewNum = 1;
				padding = 0;
				effect = "slide";
				touchMove = true;
				// direction = "vertical";
			} else {
				//mobile
				// viewNum = 4;
				// padding = 0;
				// effect = "slide";
				// touchMove = true;
				// direction = "horizontal";

				return;
			}

			//loop 옵션 체크
			if (slideNum[index] > 3) {
				loopChk = true;
				touch = true;
			} else {
				loopChk = false;
				touch = false;
			}

			// slide Top
						
			var carrerSlideTitArray = new Array();
			swiperArr[index] = new Swiper(".facilities-slider-" + index, {
				slidesPerView: viewNum,
				allowTouchMove: touchMove,
				// direction: direction,
				// parallax : true,
				speed:1000,
				effect : "fade", // 페이드 효과 사용
				// autoplay: {
				// 	delay: times,
				// 	// disableOnInteraction: false, // 쓸어 넘기거나 버튼 클릭 시 자동 슬라이드 정지.
				// },
				loop:true,
				simulateTouch: false, // touch 방지
				
                pagination: {
                    el: ".facilities-slider-" + index + " .swiper-pagination", 
                    type: 'fraction',
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + (index + 1) + '</span>';
                    },
                },
				
                navigation: {
                    nextEl: ".facilities-slider-" + index + " .swiper-next",
                    prevEl: ".facilities-slider-" + index + " .swiper-prev",
                },
				// on: {
				// 	slideChange: function() {
				// 		setTimeout(function () {
				// 			swiperArr[index].params.touchReleaseOnEdges = false;  
				// 			swiperArr[index].params.mousewheel.releaseOnEdges = false;
				// 		});
				// 	},
				// 	reachEnd: function() {
				// 		setTimeout(function () {
				// 			swiperArr[index].params.touchReleaseOnEdges = true;
				// 			swiperArr[index].params.mousewheel.releaseOnEdges = true;
				// 		}, 500);
				// 	},
				// 			reachBeginning: function() {
				// 		setTimeout(function () {
				// 			swiperArr[index].params.touchReleaseOnEdges = true;
				// 			swiperArr[index].params.mousewheel.releaseOnEdges = true;
				// 		}, 500);
				// 	}
				// }
			});
		});
		
	}
}


/* [ Contents tweenMax ] s */



/* e */

});