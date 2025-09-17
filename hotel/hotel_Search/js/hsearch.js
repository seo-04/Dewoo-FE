const peopletBtn = document.getElementById("peopletBtn");
const peopleModal = document.getElementById("peopleModal");
const applyBtn = document.getElementById("applyPeople");
const roomCount = document.getElementById("roomCount");
const guestCount = document.getElementById("guestCount");
const currentPeople = document.getElementById("currentPeople");

let rooms = 1;
let guests = 1;

// 인원 수 창  열기
peopletBtn.addEventListener("click", () => {
    peopleModal.style.display = "flex";
});

// 선택하고 자동으로 창 닫히기
peopleModal.addEventListener("click", (e) => {
    if (e.target === peopleModal) {
        peopleModal.style.display = "none";
    }
});

// 인원수 버튼
document.querySelectorAll(".controls button").forEach(btn => {
    btn.addEventListener("click", () => {
        const type = btn.dataset.type;
        if (type === "room") {
            if (btn.classList.contains("increase")) rooms++;
            if (btn.classList.contains("decrease") && rooms > 1) rooms--;
            roomCount.textContent = rooms;
        }
        if (type === "guest") {
            if (btn.classList.contains("increase")) guests++;
            if (btn.classList.contains("decrease") && guests > 1) guests--;
            guestCount.textContent = guests;
        }
    });
});

// 적용 버튼
applyBtn.addEventListener("click", () => {
    currentPeople.textContent = `${rooms} Room${rooms > 1 ? "s" : ""}, ${guests} Guest${guests > 1 ? "s" : ""}`;
    peopleModal.style.display = "none";
});
