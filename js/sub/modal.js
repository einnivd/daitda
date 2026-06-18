console.log("modal.js 연결됨");

$(document).ready(function () {
  let puzzleData = [];
  let currentIndex = null;
  let selectedOption = null;
  let userAnswers = {};
  let selectedCategories = [];

  // 퍼즐 완성도 업데이트
  function updateCompletion() {
    const totalPieces = 9;

    const completedPieces = $(".piece img.active").length;

    const percent = Math.round((completedPieces / totalPieces) * 100);

    // 퍼센트 숫자 변경
    $("#completion-percent").text(`${percent}%`);

    // 그래프 이미지 보이는 영역 변경
    $(".completion-fill").css("width", `${percent}%`);
  }

  // JSON 불러오기
  fetch("sub-modal.json")
    .then((response) => response.json())
    .then((data) => {
      puzzleData = data;
      console.log("JSON 로드 성공", puzzleData);
    })
    .catch((error) => {
      console.error("JSON 오류:", error);
    });

  // 퍼즐 텍스트 클릭
  $(document).on("click", ".board-category p", function () {
    console.log("board-category 클릭됨");

    // 클릭한 순서
    const index = $(this).index();
    currentIndex = index;
    selectedOption = null;

    console.log("index:", index);

    const puzzleShapes = [
      "modal_purple.png",
      "modal_pink.png",
      "modal_purple.png",
      "modal_blue.png",
      "modal_purple.png",
      "modal_blue.png",
      "modal_purple.png",
      "modal_pink.png",
      "modal_purple.png",
    ];
    // 클릭한 퍼즐 이미지
    const shapeFile = puzzleShapes[index];
    // 모달 퍼즐 이미지 변경
    $("#modal-puzzle-shape").attr("src", `images/sub_page/${shapeFile}`);

    // 퍼즐 타입 초기화
    $("#modal-box").removeClass("horizontal vertical");

    // 퍼즐 모양별 타입
    if (shapeFile === "modal_pink.png" || shapeFile === "modal_blue.png") {
      // 세로 퍼즐
      $("#modal-box").addClass("vertical");
    } else {
      // 가로 퍼즐
      $("#modal-box").addClass("horizontal");
    }
    // 데이터 가져오기
    const selected = puzzleData[index];

    console.log("selected:", selected);

    // 데이터 없으면 종료
    if (!selected) return;

    // 모달 내용 넣기
    $("#modal-category").text(selected.category);
    $("#modal-question").text(selected.question);

    let categoryColor = "";

    // index 기준 퍼즐 색상 매핑
    if ([0, 2, 4, 6, 8].includes(index)) {
      // 보라 퍼즐
      categoryColor = "#9b89f7";
    } else if ([1, 7].includes(index)) {
      // 핑크 퍼즐
      categoryColor = "#f789d7";
    } else if ([3, 5].includes(index)) {
      // 파랑 퍼즐
      categoryColor = "#89c7f7";
    }

    // 카테고리 배경색 적용
    $("#modal-category").css("background-color", categoryColor);

    // 완료 버튼 색상 변경
    $("#complete-btn").css({
      backgroundColor: categoryColor,
      borderColor: categoryColor,
    });

    // 버튼 비우기
    $("#option-container").empty();

    // 옵션 버튼 생성
    selected.options.forEach((option) => {
      const button = $(`
    <button class="option-btn">
      ${option}
    </button>
  `);

      // 버튼 클릭 이벤트
      button.on("click", function () {
        $(".option-btn").removeClass("active").css({
          backgroundColor: "#fff",
          borderColor: "#ddd",
          color: "#000",
        });

        $(this).addClass("active").css({
          backgroundColor: categoryColor,
          borderColor: categoryColor,
          color: "#fff",
        });

        // 선택값 저장
        selectedOption = option;
      });

      // 버튼 추가
      $("#option-container").append(button);
    });

    // 모달 열기
    $("#puzzle-modal").css("display", "flex").hide().fadeIn(200);
  });

  // 완료 버튼 클릭
  $("#complete-btn").click(function () {
    // 옵션 선택 안 했을 때
    if (!selectedOption) {
      alert("옵션을 선택해주세요.");
      return;
    }

    // 답변 저장
    userAnswers[currentIndex] = selectedOption;

    // 선택한 카테고리 저장
    const category = puzzleData[currentIndex].category;

    if (!selectedCategories.includes(category)) {
      selectedCategories.push(category);
    }

    console.log("사용자 답변:", userAnswers);

    // 해당 퍼즐 조각 활성화
    $(".piece img").eq(currentIndex).addClass("active");

    // 퍼즐 완성도 업데이트
    updateCompletion();

    // 기본 텍스트 숨기기
    $(".board-category p").eq(currentIndex).css("opacity", "0");

    // 퍼즐 위 텍스트 보이기
    $(".piece-category p").eq(currentIndex).css("opacity", "1");

    // 모달 닫기
    $("#puzzle-modal").fadeOut(200);
  });

  // 닫기 버튼
  $(".close-btn").click(function () {
    $("#puzzle-modal").fadeOut(200);
  });

  // 바깥 클릭 닫기
  $("#puzzle-modal").click(function (e) {
    if (e.target === this) {
      $(this).fadeOut(200);
    }
  });

// 결과 보기 버튼 클릭
$(".result-btn").click(function () {

  // 퍼즐 안 맞췄을 때
  if (selectedCategories.length === 0) {
    alert("퍼즐을 먼저 맞춰주세요.");
    return;
  }

  let visibleCount = 0;

  // 카드 전부 숨김
  $(".card-item")
  .hide()
  .removeClass("show");

  // 선택 카테고리와 같은 카드만 보여주기
  $(".card-item").each(function () {
    const cardCategory = $(this).data("category");

    if (
  selectedCategories.includes(
    cardCategory
  )
) {
  $(this)
    .fadeIn(300)
    .addClass("show");

  visibleCount++;
}
  });

  // 개수 변경
  $("#benefit-count").text(visibleCount + "개");

  // 카드 영역으로 스크롤
  $("html, body").animate({
    scrollTop: $(".count-section").offset().top - 100
  }, 700);
});

// 찜하기(별) 버튼
$(document).on(
  "click",
  ".like i",
  function () {

    // active 토글
    $(this).toggleClass("active");

    // 빈 별 ↔ 채워진 별 변경
    if ($(this).hasClass("active")) {
      $(this)
        .removeClass("fa-regular")
        .addClass("fa-solid");
    } else {
      $(this)
        .removeClass("fa-solid")
        .addClass("fa-regular");
    }
  }
);
});
