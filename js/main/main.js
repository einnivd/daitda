window.addEventListener("load", () => {
  /* AOS 초기화 */
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 120,
    });
  }

  /* 3D 커버플로우 무한 스무스 스와이퍼 */
  const guideSwiperEl = document.querySelector(".guide-swiper");

  if (guideSwiperEl && typeof Swiper !== "undefined") {
    new Swiper(".guide-swiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",

      // 무한 루프 인덱스 에러 방지 세팅
      loop: true,
      loopedSlides: 3,

      // 드래그 터치 감도 및 스무스 최적화 치트키
      touchRatio: 1.2, // 마우스 드래그 반응 민감도를 살짝 올려 손맛을 올림
      resistanceRatio: 0, // 양방향 끝 바운스 저항 제거 (부드러운 무한 이동)
      followRelations: true,

      // 자동 재생 옵션
      autoplay: {
        delay: 3000,
        disableOnInteraction: false, // 마우스로 만져도 자동 재생 풀리지 않음
      },

      speed: 700, // 카드가 넘어갈 때 걸리는 속도 (0.7초 동안 쫀득하게 넘어감)

      // 순정 데모 기반 완벽 입체감 세팅
      coverflowEffect: {
        rotate: 50, // 3D 회전 꺾임 각도 (50도)
        stretch: 0, // 카드 간격 밀착도
        depth: 100, // 원근 3D 원거리감 깊이 (100)
        modifier: 1,
        slideShadows: true, // 입체 그림자 활성화
      },

      // 반응형 브라우저 크기별 최적화
      breakpoints: {
        0: {
          coverflowEffect: {
            rotate: 20,
            stretch: 0,
            depth: 80,
            slideShadows: true,
          },
        },
        700: {
          coverflowEffect: {
            rotate: 35,
            stretch: 0,
            depth: 100,
            slideShadows: true,
          },
        },
        1100: {
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            slideShadows: true,
          },
        },
      },
    });

    console.log("드래그 버그 수정 및 스무스 3D 스와이퍼 세팅 완료!");
  }
});
/* =========================
SECTION 5 FINANCE LOOP
========================= */
window.addEventListener("load", () => {
  const financeSection = document.querySelector(".finance-section");

  if (!financeSection) return;

  const financeTracks = financeSection.querySelectorAll(".finance-track");

  financeTracks.forEach((track) => {
    const cards = track.querySelectorAll("img");

    if (cards.length < 4) {
      console.warn(
        "finance-track 안에 이미지가 너무 적습니다. 무한루프용으로 최소 6장 추천.",
      );
    }
  });
});
/* =========================
SECTION 5 FINANCE LOOP
이미지 로딩 후 애니메이션 시작
========================= */
window.addEventListener("load", () => {
  const financeSection = document.querySelector(".finance-section");

  if (!financeSection) return;

  const financeImages = financeSection.querySelectorAll(".finance-track img");

  if (financeImages.length === 0) {
    financeSection.classList.add("is-ready");
    return;
  }

  let loadedCount = 0;

  const startFinanceLoop = () => {
    loadedCount++;

    if (loadedCount >= financeImages.length) {
      financeSection.classList.add("is-ready");
    }
  };

  financeImages.forEach((img) => {
    if (img.complete) {
      startFinanceLoop();
    } else {
      img.addEventListener("load", startFinanceLoop);
      img.addEventListener("error", startFinanceLoop);
    }
  });
});
// ==========================================
// BAITDA 모바일 햄버거 메뉴 토글 스크립트
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu-overlay");

  // 햄버거 버튼 누를 때마다 토글 이벤트 실행
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open"); /* 삼선 ➔ X자 변신 */
    mobileMenu.classList.toggle("active"); /* 메뉴 레이어 스르륵 오픈 */
  });

  // 모바일 메뉴 내 메뉴 링크를 클릭했을 때 메뉴판이 자동으로 닫히는 설정
  const mobileLinks = document.querySelectorAll(".mobile-nav a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("open");
      mobileMenu.classList.remove("active");
    });
  });
});
