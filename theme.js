// ===== Theme Toggle =====
const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    themeToggle.textContent = savedTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
}
themeToggle.addEventListener("click", () => {
    let newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    themeToggle.textContent = newTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
});
