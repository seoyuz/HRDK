//main
$(document).ready(function(){

// 새로고침 시 최상단 이동
// $(window).load(function() {
//     setTimeout (function () {
//         scrollTo(0,0);
//     },100);
// });



// section3
var swiper = new Swiper('.visual-swiper', {
    slidesPerView: 1,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    // direction: 'vertical',
    simulateTouch: false, // touch 방지
    speed: 2000,
    effect:"fade",
    fadeEffect: {
        crossFade: true
    },
    mousewheel: false,
    // parallax: true,
    loop: true, // 무한 반복
    grabCursor: true,
    paginationClickable: true,
    pagination: {
        el: '.vis-bottom-box .swiper-pagination',
        type: 'fraction',
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    },
    navigation: { // 네비게이션 설정
        nextEl: '.swiper-button-next', // 다음 버튼 클래스명
        prevEl: '.swiper-button-prev', // 이번 버튼 클래스명
    },
    on: {
        slideChange: function () {
            $(".donut-segment").removeClass("animate");
        },
        slideChangeTransitionEnd: function () {
            $(".donut-segment").addClass("animate");
        },
    }
});

$(".stop-btn .stop").click(function() {
    $(".donut-segment").css("animation-play-state", "paused");
    $(".stop-btn .stop").hide();
    $(".stop-btn .play").show();
    swiper.autoplay.stop();
});

$(".stop-btn .play").click(function() {
    $(".donut-segment").css("animation-play-state", "running");
    $(".stop-btn .play").hide();
    $(".stop-btn .stop").show();
    swiper.autoplay.start();
});


// main vis calentar
$(".calendar-tbl .tr").each(function() {
    var selectedCells = $(this).find(".td.selected");
    if (selectedCells.length > 1) {
        selectedCells.first().addClass("first");
        selectedCells.last().addClass("last");
    }
});



// 시설안내
var txtSwiper = new Swiper(".txt-swiper", {
	slidesPerView: 1,
	effect:"fade",
	navigation: true,
	watchSlidesProgress: true,
	mousewheelControl: true, 
	simulateTouch: false,
	grabCursor: false,
	allowTouchMove : false, 
	slideToClickedSlide : false,
    fadeEffect: {
        crossFade: false
    },
    paginationClickable: true,
    pagination: {
        el: '.txt-swiper-wrap .swiper-pagination',
        type: 'fraction',
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    },
	on: {
		slideChange: function() {
			var thumbIdx = txtSwiper.activeIndex;
			bgSwiper.slideTo(thumbIdx, 1000);
		},
	},
});

// navigation 버튼에 클릭 이벤트 추가
$(".txt-swiper-wrap .swiper-button-next").click(function() {
    txtSwiper.slideNext();
});

$(".txt-swiper-wrap .swiper-button-prev").click(function() {
    txtSwiper.slidePrev();
});

var bgSwiper = new Swiper(".bg-swiper", {
	grabCursor: true,
    parallax: true,
    mousewheel: false,
	centeredSlides: true,
	slidesPerView: 1,
    speed: 1000,
	pagination: false,
	watchSlidesProgress: false,
	simulateTouch: false,
	allowTouchMove : false, 
	// slideToClickedSlide : true,
	// {
	//     el: ".dx-slider-wrap .swiper-pagination",
	// },
	thumbs: {
		swiper: txtSwiper,
		slideThumbActiveClass: 'step--active',
		autoScrollOffset: 0,
	},
});


/* 탭 콘텐츠 */
tab1(); //신규
function tab1() {
    //탭메뉴 클릭할 때 실행
    
    $(".tab-section").each(function() {
        var tabSection = $(this);
        var tabBtn = $(this).find(".tit-list > li a");
        $(tabBtn).on("click", function (e) {
            e.preventDefault();
            //초기화
            tabSection.find(".tit-list > li").addClass("tab");
            tabSection.find(".tit-list > li").removeClass("active");
            tabSection.find(".tab-list").hide();
    
            $(".tab-list").removeClass("active");
    
            //실행
            $(this).parent().addClass("active");
            var activeTab = $(this).attr("href");
            $(activeTab).addClass("active");
            $(activeTab).show();
        });
    
    })
    //초기 탭 설정
    var activeChk = 0;
    $(".tab-section .tit-list > li").each(function () {
        if ($(this).hasClass("active")) {
            $(this).addClass("active");
            $(this).find("a").trigger("click");
            activeChk++;
        }
    });
    //active 지정 안했을 시 첫 탭메뉴 선택
    if (activeChk == 0) {
        $(".tab-section .tit-list > li:first-child a").trigger("click");
    }
}

slideAct2(); // 교육과정 슬라이드

function slideAct2() {
    var swiperArr = []; //swiper 슬라이드 변수
    var galleryThumbs = []; //swiper 슬라이드 변수2
    var slideInx = []; //현재 슬라이드 index
    var slideNum = []; //슬라이드 개수
    var times = 5000;
    var center = ""; //가운데정렬
    var loopChk = ""; //무한반복 체크
    var viewNum = ""; //슬라이드 개수 (옵션)
    var num = ""; // 복제 슬라이드
    var winWChk = ""; //디바이스 체크
    var effect = "";
    var padding = "";
    var touchMove = "";

    $(".slider2").each(function (index) {
        var $this = $(this);
        //슬라이드 인덱스 클래스 추가
        $this.addClass("slider2-" + index);
        //슬라이드, 옵션 배열 추가
        swiperArr.push(undefined);
        galleryThumbs.push(undefined);
        slideInx.push(0);
        slideNum.push($this.find(".swiper-slide").length);

        $(window).on("load resize", function () {
            winW = window.innerWidth;
            if (winWChk != "pc" && winW > 1280) {
                //PC 버전으로 전환할 때
                winWChk = "pc";
                sliderAction();
            } else if (winWChk != "ta" && 1281 > winW && winW > 767) {
                //태블릿 버전으로 전환할 때
                winWChk = "ta";
                sliderAction();
            } else if (winWChk != "mo" && winW < 768) {
                //모바일 버전으로 전환할 때
                winWChk = "mo";
                sliderAction();
            }
        });
    });


    function sliderAction() {
        $(".slider2").each(function (index) {
            //슬라이드 초기화
            if (swiperArr[index] != undefined) {
                swiperArr[index].destroy();
                swiperArr[index] = undefined;
            }

            //slidesPerView 옵션 설정
            if (winWChk == "pc") {
                viewNum = 3;
                padding = 40;
                effect = "slide";
                touchMove = true;
                autoplay = false;

            } else if (winWChk == "ta") {
                viewNum = 2;
                padding = 30;
                effect = "slide";
                touchMove = true;
                autoplay = true;
            } else {
                //mobile
                viewNum = 1;
                padding = 20;
                effect = "slide";
                touchMove = true;
                autoplay = true;
            }

            // slide list
            swiperArr[index] = new Swiper(".slider2-" + index, {
                // slidesPerView: "auto",
                slidesPerView: viewNum,
                speed : 1500,
                roundLengths: true,
                spaceBetween: padding,
                dots: true,
                pagination: {
                    el: ".slider2-" + index + " .swiper-pagination", 
                    type: 'fraction',
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + (index + 1) + '</span>';
                    },
                },
                // pagination: {
                //     el: ".slider2-" + index + " .swiper-pagination", 
                //     type: 'custom',
                //     renderCustom: function (swiper, current, total) {
                //         return current + '/' + (swiper.slides.length); 
                //     }
                // },
                // slideToClickedSlide: true,
                // allowTouchMove: true,
                initialSlide: 0, // 슬라이드 시작점
                centeredSlides: false,
                loop: false,
                watchSlidesVisibility: true,
                watchSlidesProgress: true, //현재 보이는 슬라이드
                // loopedSlides: 1,
                // loopAdditionalSlides: 1, //슬라이드 loop시 끊김현상 해결
                navigation: {
                    nextEl: $(".slider2-" + index).find(".swiper-next"),
                    prevEl: $(".slider2-" + index).find(".swiper-prev"),
                },
                // autoplay: autoplay,
                observer: true,
                observeParents: true,
                // autoplay: {
                //     delay: times,
                //     disableOnInteraction: true, // 쓸어 넘기거나 버튼 클릭 시 자동 슬라이드 정지.
                // },

                a11y: {
                    prevSlideMessage: '이전 슬라이드',
                    nextSlideMessage: '다음 슬라이드',
                    slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
                },
                on: {
                    init: function() {

                        
                        $(".slider2-" + index + " .swiper-slide").children('a').attr('tabindex','-1');
                        slideInx[index] = this.activeIndex; //현재 슬라이드 index 갱신
                        var thisSl = $(".slider2-" + index + " .swiper-slide");
                        for(i = this.activeIndex; i < this.activeIndex + viewNum; i++) {
                            $(thisSl[i]).children('a').attr('tabindex','0');
                        }; 

                    },
                    activeIndexChange: function () {
                        if (
                            $(".slider2-" + index)
                                .parent(".tab-list")
                                .css("display") != "none"
                        ) {
                            slideInx[index] = this.realIndex; //현재 슬라이드 index 갱신
                        }

                        $(".slider2-" + index + " .swiper-slide").children('a').attr('tabindex','-1');
                        slideInx[index] = this.activeIndex; //현재 슬라이드 index 갱신
                        var thisSl = $(".slider2-" + index + " .swiper-slide");
                        for(i = this.activeIndex; i < this.activeIndex + viewNum; i++) {
                            $(thisSl[i]).children('a').attr('tabindex','0');
                        }; 


                    },
                },
            });

                //슬라이드 배열 값 추가
            if(swiperArr[index] == undefined) {
                swiperArr[index] = swiper;
            }

            $(document).on("click", ".tit-list .tab", function () {
                var idx = $(this).parent().index();
                //첫번째 슬라이드 찾기
                // loop되어 있으므로 실제 슬라이드인 data-swiper-slide-index = 0 인덱스 값으로 이동

                
                var first = $(".slider2-" + index + " .swiper-slide[data-swiper-slide-index=0]").index();
                // swiperArr[index].loopDestroy();
                // swiperArr[index].loopCreate();
                swiperArr[index].slideTo(first,1000,false);
                
                //슬라이드 tabindex 초기화
                $(".slider2-" + index + " .swiper-slide").children('a').attr('tabindex','-1');
                var thisSl = $(".slider2-" + index + " .swiper-slide");
                for(i = slideInx[index]; i < slideInx[index] + viewNum; i++) {
                    $(thisSl[i]).children('a').attr('tabindex','0');
                }; 


                
            });

            
            $(".slider2-" + index + " .swiper-next").click(function(){
                swiperArr[index].slideNext();
            });
            $(".slider2-" + index + " .swiper-prev").click(function(){
                swiperArr[index].slidePrev();
            });

            // slide pause
            $(".section05 .stop-btn .stop").click(function(){
                swiperArr[index].autoplay.stop();
                $(this).hide();
                $(this).siblings(".play").show();
            });
            // slide play
            $(".section05 .stop-btn .play").click(function(){
                swiperArr[index].autoplay.start();
                $(this).hide();
                $(this).siblings(".stop").show();
            }); 
        });
    }
}


/* [ Contents tweenMax ] s */

// 미래교육원 소개
var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
        triggerHook: "0.8",
        duration: '20%'
    }
});

// TweenMax를 사용하여 동시에 여러 속성을 변경하고, duration 속성을 추가하여 애니메이션의 속도를 늦춥니다.
var tween = TweenMax.to(".section4 > .bg", 10, {backgroundPosition: '50% 10%', scale: 1});

new ScrollMagic.Scene({triggerElement: ".section4", duration: "100%"})
    .setTween(tween)
    // .duration(10000) // TweenMax의 duration 속성을 사용하여 애니메이션 속도를 조절합니다.
    .addTo(controller);






var container = $('.media-slider');
var isFixed = false;

/* 
var swiper = new Swiper('.media-slider', {
    direction: "vertical",
    mousewheel:true,
    // grabCursor: true,
    effect: "creative",
    speed: 500,
    creativeEffect: {
      prev: {
        translate: [0, 0, 0],
      },
      next: {
        translate: [0, "100%", 0],
      },
    },
    // freeMode: isFixed,
    // on: {
    //     slideChangeTransitionEnd: function () {
    //         // swiper.mousewheel.disable();
    //         console.log(swiper.activeIndex);

                    
    //         if (swiper.activeIndex === 1) {
    //             container.removeClass('fixed-swiper');
    //             isFixed = true;
    //         }
    //     }
    // }
    watchOverflow : true,
    on: {
        slideChange: function() {
            setTimeout(function () {
                swiper.params.touchReleaseOnEdges = false;  
                swiper.params.mousewheel.releaseOnEdges = false;
            });
        },
        reachEnd: function() { // 마지막 슬라이드에 도달했을 때
            setTimeout(function () {
                 swiper.params.touchReleaseOnEdges = true;
                swiper.params.mousewheel.releaseOnEdges = true;
                // $('body').removeClass('overflow');
            }, 100);
        },
        reachBeginning: function() { // 처음에 도달했을 때
            setTimeout(function () {
                swiper.params.touchReleaseOnEdges = true;
                swiper.params.mousewheel.releaseOnEdges = true;
                container.removeClass("fixed-swiper");
            }, 100);
            container.removeClass("fixed-swiper");
        }
    }
});
var lastSlideIndex = swiper.slides.length - 1;
*/


// function activeHeightSet() {
//     var activeHt = $(".swiper-slide-active .mainImg").height();
//     eventActiveHt(activeHt);
//     scrollUp();
// }

// function eventActiveHt(activeHt) {
//     $(".swiper-container").stop(true).animate({

//     },300);
// }

// function scrollUp() {
// $(".section3").stop(true).animate({
//     scrollTop: "0",
//     }, 1000);
// }

// swiper.on("slideChangeTransitionStart", activeHeightSet);


// fixed
// function updateSwiperPosition() {
//     var containerTop = container.offset().top;
//     var scrollTop = $(window).scrollTop();

//     if (scrollTop >= containerTop) {
//       container.addClass('fixed-swiper');
//       isFixed = true;
//     } else {
//       container.removeClass('fixed-swiper');
//       isFixed = false;
//     }

//     // Check if the last slide is reached
//     /* 해제
//     if (swiper.activeIndex === lastSlideIndex) {
//         container.removeClass('fixed-swiper');
//         isFixed = false;
//     }
//     */
// }
// $(window).on('scroll', updateSwiperPosition);

// Trigger the updateSwiperPosition function on page load



var section = $(".section3"); // 해당 섹션의 클래스나 ID로 선택자를 바꾸세요
var isScrolledPastTop = false;
var isScrolledPastBottom = false;


/*
$(window).scroll(function () {
    // updateSwiperPosition();

    var scrollTop = $(window).scrollTop();
    var sectionTop = section.offset().top;
    var sectionBottom = sectionTop + section.outerHeight();


    // 스크롤 위치가 섹션의 상단에 도착했는지 확인
    if (scrollTop >= sectionTop && !isScrolledPastTop) {
        section.addClass("fixed-offset-top");
        isScrolledPastTop = true;
        
    } else {
        section.removeClass("fixed-offset-top");
        isScrolledPastTop = false;
    }



    // 현재 스크롤 위치 계산
    var scrollPosition = $(window).scrollTop();

    // 각 섹션의 위치 계산
    var section3Top = $('.section3').offset().top;
    var section3Height = $('.section3 .swiper-slide').outerHeight() + ($('.section3 .swiper-slide').outerHeight() / 1.5);

    // 현재 스크롤 위치에 따라 클래스를 추가 또는 제거
    if (scrollPosition >= section3Top && scrollPosition < section3Top + section3Height 
        + (section3Height / 2)) {
        // $(".fixed-menu").fadeIn();
    } else {
        // $(".fixed-menu").fadeOut();
    }


    // main fixed menu - scroll
    $(".fixed-menu li a").each(function() {
        var fixedAnchor = $(this).attr("href");
        var scrollTop = $(window).scrollTop();
        if(scrollTop >= $(fixedAnchor).offset().top) {
            $(".fixed-menu li").removeClass("on");
            $(this).parent().addClass("on");
        } else {
            $(this).parent().removeClass("on");
        }
    });
});

*/


// main fixed menu - click
$('.fixed-menu li a').bind('click', function(event) {
    var $anchor = $(this);
    if($anchor.attr('href').startsWith('#') ){
        event.preventDefault();
        $('.fixed-menu li').removeClass('on');
        $anchor.parent().addClass('on');
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top)
        }, 500);
    }
});






/* [ tweenMax ] s */
var controller = new ScrollMagic.Controller();


// - section3 딤 레이어
var sectionDim = TweenMax.to(".section-dim", 0.1, {opacity:0, display:"none"});
var scene = new ScrollMagic.Scene({
    triggerElement: ".section-trigger",
    duration: "50%",
})
.setClassToggle(".info1", "active")
.setTween(sectionDim)
.addTo(controller);


// - section3 슬라이드 좌우 커튼 레이어
var tweenDimL = TweenMax.to(".bg.left", 1, {x: "-100%",});
var tweenDimR = TweenMax.to(".bg.right", 1, {x: "100%",});

var sceneBgLeft = new ScrollMagic.Scene({
    triggerElement: ".section-trigger",
    duration: "50%",
})
// .setClassToggle('.info1', 'active')
.setTween(tweenDimL)
.addTo(controller);

var sceneBgRight = new ScrollMagic.Scene({
    triggerElement: ".section-trigger",
    duration: "50%",
})
.setTween(tweenDimR)
.addTo(controller);
 

// - section3 슬라이드 txt1
var visTxt1 = TweenMax.from(".slide1 .vis-txt-wrap", 1, {y: "30"});
var scene = new ScrollMagic.Scene({
    triggerElement: ".section3",
    duration: "0%",
})
.setTween(visTxt1)
.addTo(controller);

// - section3 슬라이드 txt2
var visTxt2 = TweenMax.from(".slide2 .vis-txt-wrap", 1, {y: "30", delay:1});
var scene = new ScrollMagic.Scene({
    triggerElement: ".slide1 .vis-txt-wrap",
    duration: "0%",
    
})
.setTween(visTxt2)
.addTo(controller);

// - section3 슬라이드 txt3
var visTxt3 = TweenMax.from(".slide3 .vis-txt-wrap", 1, {y: "30", delay:1});
var scene = new ScrollMagic.Scene({
    triggerElement: ".slide2 .vis-txt-wrap",
    duration: "0%",
    
})
.setTween(visTxt3)
.addTo(controller);


// - section3 fixed menu
var fixedMenu = TweenMax.from(".fixed-menu-position", .7, {opacity:0, x: "100"});
var scene = new ScrollMagic.Scene({
    triggerElement: ".section3",
    duration: "0%",
    
})
.setTween(fixedMenu)
.addTo(controller);



// - section4 소식1
var newsTxt1 = TweenMax.from(".notice-box .item:first-child .item-txt-box", 0.5, {opacity:0, x: "-100", });
var scene = new ScrollMagic.Scene({
    triggerElement: ".section4",
    duration: "0%"
})
.setTween(newsTxt1)
.addTo(controller);
var newsImages1 = TweenMax.from(".notice-box .item:first-child .thumbnail", 0.5, {opacity:0, x: "-100", delay:0.2});
var scene = new ScrollMagic.Scene({
    triggerElement: ".section4",
    duration: "0%"
})
.setTween(newsImages1)
.addTo(controller);


// - section4 소식2
var newsTxt2 = TweenMax.from(".notice-box .item:last-child .item-txt-box", 0.5, {opacity:0, x: "100", delay:0.4});
var scene = new ScrollMagic.Scene({
    triggerElement: ".section4",
    duration: "0%"
})
.setTween(newsTxt2)
.addTo(controller);

var newsImages2 = TweenMax.from(".notice-box .item:last-child .thumbnail", 0.5, {opacity:0, x: "100", delay:0.5});
var scene = new ScrollMagic.Scene({
    triggerElement: ".section4",
    duration: "0%"
})
.setTween(newsImages2)
.addTo(controller);


// - section4 소식3 슬라이드
var newsSlide = TweenMax.from(".notice-slider-wrap", 0.5, {opacity:0, y: "100", delay:0.4});
var scene = new ScrollMagic.Scene({
    triggerElement: ".notice-box .item1",
    duration: "0%"
})
.setTween(newsSlide)
.addTo(controller);




var noticeSwiper = new Swiper('.notice-slider', {
    
    // autoplay: {
    //     delay: 4000,
    //     disableOnInteraction: false,
    // },
    slidesPerView: 3,
    spaceBetween: 40,
    // simulateTouch:false, // touch 방지
    speed: 1000,
    // fadeEffect: {
    //     crossFade: true
    // },
    // mousewheel: true,
    // parallax: true,
    // loop: true, // 무한 반복
    // grabCursor: true,
    paginationClickable: true,
    pagination: {
        el: '.notice-slider-wrap .swiper-pagination',
        // type: 'fraction',
        clickable: true,
        renderBullet: function(index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    },
    navigation: { // 네비게이션 설정
        nextEl: '.notice-slider-wrap .swiper-button-next', // 다음 버튼 클래스명
        prevEl: '.notice-slider-wrap .swiper-button-prev', // 이번 버튼 클래스명
    },
});


// bg magic scroll 나중에 수정
// var controller = new ScrollMagic.Controller({
//     globalSceneOptions: {triggerHook: "onEnter"}
// });

// new ScrollMagic
// .Scene({triggerElement: "#contactus", duration: "200%"})
// .setTween("#contactus > .bg", {y: "20%", ease: Linear.easeNone})
// .addTo(controller);


// var controller = new ScrollMagic.Controller();
// var tween = TweenMax.to(".aboutme1", 0.2, {
//     backgroundColor: "#ffe5b9",
// })

// var scene = new ScrollMagic.Scene({triggerElement: ".aboutme1 .ab_right .ab_tit.tit1", duration: 1000})
// .setTween(tween)
// .addTo(controller);
    
    
// tweenMax e



//
});