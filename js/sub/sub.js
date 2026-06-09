// 퍼즐 게임 섹션
document.addEventListener('DOMContentLoaded', () => {
  // 1. 필요한 요소들 가져오기
  const boardCategories = document.querySelectorAll('.board-category p'); // 클릭할 글자들
  const puzzlePieces = document.querySelectorAll('.piece img');           // 나타날 퍼즐 조각들
  const pieceCategories = document.querySelectorAll('.piece-category p'); // 퍼즐 위 검정 글자들 (필요시)
  
  // 팝업창 관련 (HTML에 해당 ID와 클래스가 있다고 가정)
  const modal = document.getElementById('modal-box'); 
  // const optButtons = document.querySelectorAll('.opt-btn'); // 팝업 안의 선택 버튼들
  
  let currentSelectedIndex = null; // 현재 어떤 카테고리를 눌렀는지 기억

  // 처음에는 퍼즐 위의 검정 글자(piece-category)들도 안 보이게 설정 (선택사항)
  pieceCategories.forEach(p => p.style.opacity = '0');

  // 2. 배경 카테고리 클릭 시 팝업 열기
  boardCategories.forEach((category, index) => {
    category.style.cursor = 'pointer'; // 클릭 가능한 표시
    
    category.addEventListener('click', () => {
      currentSelectedIndex = index; // 클릭한 순서 저장 (0~8)
      modal.style.display = 'flex'; // 팝업 열기
    });
  });

  // 3. 팝업창에서 옵션 버튼 클릭 시
  optButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (currentSelectedIndex !== null) {
        // [핵심] 해당 순서의 퍼즐 조각에 .active 추가 (CSS에 의해 opacity가 1이 됨)
        puzzlePieces[currentSelectedIndex].classList.add('active');
        
        // 퍼즐 위의 검정 글자(piece-category)도 함께 보여주기
        if(pieceCategories[currentSelectedIndex]) {
            pieceCategories[currentSelectedIndex].style.opacity = '1';
        }

        // 팝업 닫기 및 인덱스 초기화
        modal.style.display = 'none';
        currentSelectedIndex = null;
        
        // 완성도 체크 로직 호출
        checkCompletion();
      }
    });
  });

  // 4. 모든 퍼즐이 채워졌는지 확인 (보너스 기능)
  function checkCompletion() {
    const activeCount = document.querySelectorAll('.piece img.active').length;
    console.log(`현재 맞춰진 조각: ${activeCount} / 9`);
    
    if (activeCount === 9) {
      const resultBtn = document.querySelector('.result-btn');
      resultBtn.style.backgroundColor = '#6c5ce7'; // 완료 시 버튼 색상 변경 예시
      resultBtn.querySelector('h2').innerText = "퍼즐 완성! 결과 확인하기";
    }
  }
});

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