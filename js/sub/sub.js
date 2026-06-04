// 추천 섹션
document.addEventListener("DOMContentLoaded", function () {
  const recommendSwiper = new Swiper(".recommend-swiper", {
    // 한 화면에 보여질 카드 개수 (3개 고정)
    slidesPerView: 3,

    // 카드 사이의 간격 (픽셀 단위)
    spaceBetween: 30,

    // 활성 슬라이드를 중앙으로
    centeredSlides: true,

    // 무한 루프 활성화
    loop: true,

    // 화살표 버튼 연결
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});
