// 스크롤 시 해당 섹션에 맞춰 네비게이션 활성화
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".side-nav a");

const container = document.querySelector(".full-container");

container.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (container.scrollTop >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((a) => {
        a.classList.remove("active");
        if (a.getAttribute("href") === `#${current}`) {
            a.classList.add("active");
        }
    });
});