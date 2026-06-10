// ==========================================
// BAITDA 메인 페이지 통합 스크립트 (최종 완벽본)
// ==========================================

window.addEventListener("load", () => {
  /* 1. AOS 초기화 */
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 120,
    });
  }

  /* 2. 3D 커버플로우 무한 스무스 스와이퍼 */
  const guideSwiperEl = document.querySelector(".guide-swiper");

  if (guideSwiperEl && typeof Swiper !== "undefined") {
    new Swiper(".guide-swiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      loop: true,
      loopedSlides: 3,
      touchRatio: 1.2,
      resistanceRatio: 0,
      followRelations: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      speed: 700,
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
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

  /* 3. SECTION 5 FINANCE LOOP (수량 체크) */
  const financeSection = document.querySelector(".finance-section");

  if (financeSection) {
    const financeTracks = financeSection.querySelectorAll(".finance-track");
    financeTracks.forEach((track) => {
      const cards = track.querySelectorAll("img");
      if (cards.length < 4) {
        console.warn(
          "finance-track 안에 이미지가 너무 적습니다. 무한루프용으로 최소 6장 추천.",
        );
      }
    });

    /* 4. SECTION 5 FINANCE LOOP (이미지 로딩 후 애니메이션 시작) */
    const financeImages = financeSection.querySelectorAll(".finance-track img");

    if (financeImages.length === 0) {
      financeSection.classList.add("is-ready");
    } else {
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
    }
  }

  /* 5. ⚡ 모바일 햄버거 메뉴 토글 & 드롭다운 (중복 제거 및 최적화 통합) */
  const menuBtn = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu-overlay");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      menuBtn.classList.toggle("open"); /* 삼선 ➔ X자 변신 */
      mobileMenu.classList.toggle(
        "active",
      ); /* 메뉴 레이어 상단 드롭다운 오픈 */
    });
  }

  /* 모바일 메뉴 내 링크 클릭 시 메뉴판 자동으로 닫히기 */
  const mobileLinks = document.querySelectorAll(".mobile-nav a");
  if (mobileLinks.length > 0) {
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (menuBtn && mobileMenu) {
          menuBtn.classList.remove("open");
          mobileMenu.classList.remove("active");
        }
      });
    });
  }

  /* 6. ⚡ 메뉴 글자 호버 시 랜덤 색상 변경 이펙트 */
  const hoverColors = ["#f0a2f6", "#b8e6ff", "#9b73fc"];
  const allLinks = document.querySelectorAll(".nav a, .mobile-nav a");

  if (allLinks.length > 0) {
    allLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        const randomIndex = Math.floor(Math.random() * hoverColors.length);
        link.style.color = hoverColors[randomIndex];
      });
      link.addEventListener("mouseleave", () => {
        link.style.color = "#fff";
      });
    });
  }
});
/* ==========================================
     7. ⚡ 우측 하단 고객센터 모달 토글 로직
     ========================================== */
const csBtn = document.querySelector(".cs-fixed-btn");
const csModal = document.querySelector(".cs-modal-box");
const csCloseBtn = document.querySelector(".cs-close-btn");

if (csBtn && csModal && csCloseBtn) {
  // CS 버튼 클릭 시 대화창 토글
  csBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    csModal.classList.toggle("active");
  });

  // X 버튼 클릭 시 대화창 닫기
  csCloseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    csModal.classList.remove("active");
  });

  // 바탕화면 아무 데나 누르면 대화창 닫히는 센스있는 기능
  document.addEventListener("click", (e) => {
    if (!csModal.contains(e.target) && !csBtn.contains(e.target)) {
      csModal.classList.remove("active");
    }
  });
}
