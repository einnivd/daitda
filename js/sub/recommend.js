// 추천 섹션
document.addEventListener("DOMContentLoaded", function () {
  const recommendSwiper = new Swiper(".recommend-swiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    
    // 루프 시 슬라이드 복제 개수를 넉넉히 잡아 끊김 방지
    loopedSlides: 4, 

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});