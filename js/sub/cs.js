/* ===================================================
   우측 하단 고객센터 모달, 서브 메뉴 토글 및 TOP 버튼 로직 (최종 수정본)
   =================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const csBtn = document.querySelector(".cs-fixed-btn");
  const csModal = document.querySelector(".cs-modal-box");
  const csCloseBtn = document.querySelector(".cs-close-btn");
  const csBackBtn = document.querySelector(".cs-back-btn");
  const goTopBtn = document.querySelector(".go-top-btn");

  const mainPanel = document.querySelector(".cs-main-panel");
  const subPanels = document.querySelectorAll(".cs-sub-panel");
  const triggers = document.querySelectorAll(".cs-trigger");

  // [메뉴 초기화 함수] 모달창 닫혀있다가 새로 열릴 땐 메인 화면이 보이도록 리셋
  function resetPanels() {
    if (mainPanel) mainPanel.classList.add("active");
    if (subPanels)
      subPanels.forEach((panel) => panel.classList.remove("active"));
    if (csBackBtn) csBackBtn.style.display = "none";

    // 아코디언 열려있던 것들도 싹 닫기
    document.querySelectorAll(".faq-item").forEach((item) => {
      item.classList.remove("open");
      const faqA = item.querySelector(".faq-a");
      if (faqA) faqA.style.maxHeight = null;
    });
  }

  // 1. 고객센터(CS) 버튼 클릭 -> 모달 토글
  if (csBtn && csModal) {
    document.addEventListener("click", () => {
      csModal.classList.remove("active");
    });
  }

  // 2. 모달 내부 X 버튼 클릭 -> 모달 닫기
  if (csCloseBtn && csModal) {
    csCloseBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      csModal.classList.remove("active");
    });
  }

  // 3. 서브 메뉴 클릭 시 패널 스위칭
  if (triggers) {
    triggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const targetId = trigger.getAttribute("data-target");
        const targetPanel = document.getElementById(`panel-${targetId}`);

        if (targetPanel && mainPanel) {
          mainPanel.classList.remove("active");
          targetPanel.classList.add("active");
          if (csBackBtn) csBackBtn.style.display = "block"; // 뒤로가기 버튼 노출
        }
      });
    });
  }

  // 4. 뒤로가기(<) 버튼 클릭 시 메인으로 복귀
  if (csBackBtn) {
    csBackBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      resetPanels();
    });
  }

  // 5. FAQ 아코디언 기능 구현
  const faqQuestions = document.querySelectorAll(".faq-q");
  if (faqQuestions) {
    faqQuestions.forEach((q) => {
      q.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const currentItem = q.parentElement;
        if (!currentItem) return;
        const answer = currentItem.querySelector(".faq-a");
        if (!answer) return;

        if (currentItem.classList.contains("open")) {
          currentItem.classList.remove("open");
          answer.style.maxHeight = null;
        } else {
          // 다른 열려있는 질문이 있다면 먼저 닫아주기
          document.querySelectorAll(".faq-item").forEach((item) => {
            item.classList.remove("open");
            const faqA = item.querySelector(".faq-a");
            if (faqA) faqA.style.maxHeight = null;
          });

          currentItem.classList.add("open");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });
  }

  // 6. 고탑(GO TOP) 버튼 부드러운 스크롤 로직
  if (goTopBtn) {
    goTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); // 바탕화면 클릭 이벤트와 충돌 방지

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // 7. 바탕화면 아무 데나 누르면 대화창 닫히는 기능 (독립 배치)
  document.addEventListener("click", (e) => {
    if (csModal && csBtn) {
      // 클릭한 대상이 모달창 내부도 아니고, CS 버튼도 아닐 때만 닫기
      if (!csModal.contains(e.target) && !csBtn.contains(e.target)) {
        csModal.classList.remove("active");
      }
    }
  });
});
