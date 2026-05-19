document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const sections = document.querySelectorAll(".section");
    const dots = document.querySelectorAll(".dot");
    
    let currentIndex = 0;
    const totalSections = sections.length;
    let isScrolling = false;

    // 화면 전환 함수
    function updatePage(index) {
        currentIndex = index;
        
        // 컨테이너 이동 (Y축 위로 올리기)
        container.style.transform = `translateY(-${currentIndex * 100}vh)`;
        
        // 인디케이터 상태 업데이트
        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }

    // 마우스 휠 이벤트 처리
    window.addEventListener("wheel", (e) => {
        if (isScrolling) return; // 애니메이션 중 스크롤 중복 차단

        isScrolling = true;
        setTimeout(() => { isScrolling = false; }, 1000); // 1초 쿨타임

        if (e.deltaY > 0) {
            // 휠을 아래로 내릴 때
            if (currentIndex < totalSections - 1) {
                updatePage(currentIndex + 1);
            }
        } else {
            // 휠을 위로 올릴 때
            if (currentIndex > 0) {
                updatePage(currentIndex - 1);
            }
        }
    }, { passive: true });

    // 인디케이터 클릭 이벤트 처리
    dots.forEach((dot) => {
        dot.addEventListener("click", (e) => {
            const targetIndex = parseInt(e.target.dataset.index);
            updatePage(targetIndex);
        });
    });

    // 키보드 방향키 호환성 추가
    window.addEventListener("keydown", (e) => {
        if (isScrolling) return;
        
        if (e.key === "ArrowDown" || e.key === "PageDown") {
            if (currentIndex < totalSections - 1) {
                isScrolling = true;
                updatePage(currentIndex + 1);
                setTimeout(() => { isScrolling = false; }, 1000);
            }
        } else if (e.key === "ArrowUp" || e.key === "PageUp") {
            if (currentIndex > 0) {
                isScrolling = true;
                updatePage(currentIndex - 1);
                setTimeout(() => { isScrolling = false; }, 1000);
            }
        }
    });
});