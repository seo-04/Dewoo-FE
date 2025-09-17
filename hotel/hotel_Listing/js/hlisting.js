document.addEventListener("DOMContentLoaded", () => {
    // 탭  (숙소 유형)
    const tabs = document.querySelectorAll(".tab_item");
    const roomLists = document.querySelectorAll(".room_list");
    const resultBtn = document.querySelector(".button_result");
    const showingBox = document.getElementById("showingBox");
    const showingText = showingBox ? showingBox.querySelector("p") : null;

    // showing 문구
    const showingData = {
        hotels: "Showing 4 of 257 places",
        motels: "Showing 4 of 51 places",
        resorts: "Showing 4 of 72 places"
    };

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const category = tab.dataset.category;

            // 탭 활성화
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            // showing 업데이트
            if (showingBox && showingText) {
                showingBox.style.display = "flex";
                showingText.textContent = showingData[category] || "";
            }

            // 숙소 리스트 표시
            roomLists.forEach(list => {
                list.style.display = (list.dataset.category === category) ? "flex" : "none";
            });

            // 버튼 위치 이동 → 현재 리스트 마지막 카드 뒤
            const activeList = document.querySelector(`.room_list[data-category="${category}"]`);
            const lastCard = activeList.querySelector(".room_box:last-child");

            if (lastCard && resultBtn) {
                lastCard.insertAdjacentElement("afterend", resultBtn);
                resultBtn.style.display = "block";
            }
        });
    });

    // 초기 상태: 리스트/버튼/쇼잉 숨김
    roomLists.forEach(list => list.style.display = "none");
    if (resultBtn) resultBtn.style.display = "none";
    if (showingBox) showingBox.style.display = "none";


    //  찜(하트) 버튼 토글
    document.body.addEventListener("click", (e) => {
        if (e.target.closest(".heart")) {
            const icon = e.target.closest(".heart").querySelector("i");
            icon.classList.toggle("fa-regular");
            icon.classList.toggle("fa-solid");
            icon.classList.toggle("active-heart");
        }
    });


    // Show more 버튼 (리스트 확장)
    if (resultBtn) {
        resultBtn.addEventListener("click", () => {
            const activeList = document.querySelector(".room_list[style*='flex']");
            if (!activeList) return;

            const hiddenItems = activeList.querySelectorAll(".room_box.hidden");
            hiddenItems.forEach((item, idx) => {
                if (idx < 2) item.classList.remove("hidden"); // 2개씩 보여주기
            });

            if (activeList.querySelectorAll(".room_box.hidden").length === 0) {
                resultBtn.style.display = "none";
            }
        });
    }


    // Rating 버튼 단일 선택
    const ratingButtons = document.querySelectorAll(".rating_buttons button");
    ratingButtons.forEach(button => {
        button.addEventListener("click", () => {
            ratingButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });


    // (슬라이더 값 로그)
    const priceRange = document.getElementById("priceRange");
    if (priceRange) {
        priceRange.addEventListener("input", () => {
            console.log("현재 가격:", priceRange.value);
        });
    }


    // 체크박스 필터 (Freebies, Amenities)
    const filterCheckboxes = document.querySelectorAll(".filter_section input[type='checkbox']");
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            console.log(`${checkbox.nextSibling.textContent.trim()} : ${checkbox.checked}`);
        });
    });


    // 필터 전체 적용
    const filterForm = document.getElementById("filter-form");
    if (filterForm) {
        filterForm.addEventListener("change", () => {
            const formData = new FormData(filterForm);

            const minPrice = parseInt(formData.get("minPrice") || "0");
            const maxPrice = parseInt(formData.get("maxPrice") || "999999");
            const selectedFreebies = formData.getAll("freebies");
            const selectedRatings = formData.getAll("rating");
            const selectedAmenities = formData.getAll("amenities");

            roomLists.forEach(roomList => {
                const roomBoxes = roomList.querySelectorAll(".room_box");

                roomBoxes.forEach(roomBox => {
                    const price = parseInt(roomBox.dataset.price || "0");
                    const rating = roomBox.dataset.rating || "";
                    const freebies = (roomBox.dataset.freebies || "").split(",");
                    const amenities = (roomBox.dataset.amenities || "").split(",");

                    let visible = true;

                    if (price < minPrice || price > maxPrice) visible = false;
                    if (selectedRatings.length > 0 && !selectedRatings.includes(rating)) visible = false;
                    if (selectedFreebies.length > 0 && !selectedFreebies.every(f => freebies.includes(f))) visible = false;
                    if (selectedAmenities.length > 0 && !selectedAmenities.every(a => amenities.includes(a))) visible = false;

                    roomBox.style.display = visible ? "flex" : "none";
                });
            });
        });
    }


    //  Sort 모달
    const sortBtn = document.getElementById("sortBtn");
    const sortModal = document.getElementById("sortModal");
    const currentSort = document.getElementById("currentSort");

    if (sortBtn && sortModal && currentSort) {
        sortBtn.addEventListener("click", () => {
            sortModal.style.display = "flex"; // 열기
        });

        document.querySelectorAll(".sort_content ol").forEach(option => {
            option.addEventListener("click", () => {
                currentSort.textContent = option.dataset.value; // 선택 반영
                sortModal.style.display = "none"; // 닫기
            });
        });

        sortModal.addEventListener("click", (e) => {
            if (e.target === sortModal) {
                sortModal.style.display = "none";
            }
        });
    }
});
