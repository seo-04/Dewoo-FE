








// const guestsInput = document.getElementById("guests");
// const guestDropdown = document.getElementById("guestDropdown");
//
// function updateInput() {
//     const rooms = document.getElementById("roomCount").textContent;
//     const adults = document.getElementById("adultCount").textContent;
//     guestsInput.value = `Rooms ${rooms}, Adults ${adults}`;
// }
//
// // 인원수 버튼 기능
// function setupCounter(id, min = 0) {
//     const countEl = document.getElementById(id);
//     const minusBtn = countEl.previousElementSibling;
//     const plusBtn = countEl.nextElementSibling;
//
//     minusBtn.addEventListener("click", () => {
//         let count = parseInt(countEl.textContent);
//         if (count > min) count--;
//         countEl.textContent = count;
//         updateInput();
//     });
//
//     plusBtn.addEventListener("click", () => {
//         let count = parseInt(countEl.textContent);
//         count++;
//         countEl.textContent = count;
//         updateInput();
//     });
// }
//
// // 최소 1룸, 최소 1성인
// setupCounter("roomCount", 1);
// setupCounter("adultCount", 1);
//
// // input 클릭 시 드롭다운 열기, 닫기
// guestsInput.addEventListener("click", () => {
//     guestDropdown.style.display =
//         guestDropdown.style.display === "block" ? "none" : "block";
// });
//
// // 바깥 클릭 시 드롭다운 닫기
// document.addEventListener("click", (e) => {
//     if (!e.target.closest(".dropdown-container")) {
//         guestDropdown.style.display = "none";
//     }
// });
//
// updateInput();
