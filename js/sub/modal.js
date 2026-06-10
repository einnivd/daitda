console.log("modal.js 연결됨");

$(document).ready(function () {
  let puzzleData = [];

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

    // 데이터 가져오기
    const selected = puzzleData[index];

    console.log("selected:", selected);

    // 데이터 없으면 종료
    if (!selected) return;

    // 모달 내용 넣기
    $("#modal-category").text(selected.category);
    $("#modal-question").text(selected.question);

    // 버튼 비우기
    $("#option-container").empty();

    // 옵션 버튼 생성
    selected.options.forEach((option) => {
      $("#option-container").append(`
        <button class="option-btn">
          ${option}
        </button>
      `);
    });

    // 모달 열기
    $("#puzzle-modal").css("display", "flex").hide().fadeIn(200);
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
});
