const grid = document.getElementById("conferenceGrid");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const resultsCount = document.getElementById("resultsCount");
const clearSearch = document.getElementById("clearSearch");
const emptyState = document.getElementById("emptyState");
const filterButtons = document.querySelectorAll(".filter");
const viewAllBtn = document.getElementById("viewAllBtn");
const modal = document.getElementById("detailModal");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");
const themeToggle = document.getElementById("themeToggle");

let activeFilter = "all";
let query = "";

function normalize(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function matches(conference) {
  const haystack = normalize([
    conference.name,
    conference.location,
    conference.description,
    conference.rank,
    conference.region,
    ...conference.tags
  ].join(" "));

  const queryMatch = !query || haystack.includes(normalize(query));

  let filterMatch = true;
  if (activeFilter === "A*" || activeFilter === "A" || activeFilter === "B") {
    filterMatch = conference.rank === activeFilter;
  } else if (activeFilter === "Việt Nam" || activeFilter === "Quốc tế") {
    filterMatch = conference.region === activeFilter;
  }

  return queryMatch && filterMatch;
}

function renderCard(item) {
  const rankClass = item.rank === "A*" ? "rank star" : "rank";

  return `
    <article class="conference-card">
      <div class="card-top">
        <div class="conference-logo ${item.logoClass}">${item.short}</div>

        <div class="card-title-wrap">
          <h3 class="card-title">${item.name}</h3>
          <div class="meta">
            <span>▣ ${item.date}</span>
            <span>⌖ ${item.location}</span>
          </div>
        </div>
      </div>

      <span class="${rankClass}">${item.rank}</span>

      <p class="card-description">${item.description}</p>

      <div class="tags">
        ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
      </div>

      <div class="card-bottom">
        <button class="detail-btn" data-id="${item.id}">Xem chi tiết →</button>
        <div class="deadline">
          Hạn nộp bài (Full paper)
          <strong>${item.deadline}</strong>
        </div>
      </div>
    </article>
  `;
}

function render() {
  const filtered = conferences.filter(matches);

  grid.innerHTML = filtered.map(renderCard).join("");
  resultsCount.textContent = `Hiển thị ${filtered.length}/${conferences.length} hội nghị`;

  emptyState.hidden = filtered.length !== 0;
  clearSearch.hidden = !query;

  document.querySelectorAll(".detail-btn").forEach(button => {
    button.addEventListener("click", () => openDetail(Number(button.dataset.id)));
  });
}

function openDetail(id) {
  const item = conferences.find(c => c.id === id);
  if (!item) return;

  modalContent.innerHTML = `
    <span class="modal-rank">${item.rank} · ${item.region}</span>
    <h2>${item.name}</h2>
    <p style="color:#657791">${item.description}</p>
    <div class="modal-list">
      <div><strong>THỜI GIAN</strong><span>${item.date}</span></div>
      <div><strong>ĐỊA ĐIỂM</strong><span>${item.location}</span></div>
      <div><strong>HẠN NỘP FULL PAPER</strong><span>${item.deadline}</span></div>
      <div><strong>CHỦ ĐỀ</strong><span>${item.tags.join(" · ")}</span></div>
    </div>
    <div style="margin-top:20px">
      <a href="${item.website}" style="color:#1268c9;font-weight:700;text-decoration:none">
        Trang hội nghị →
      </a>
    </div>
  `;

  modal.showModal();
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  query = searchInput.value.trim();
  render();
  document.getElementById("search").scrollIntoView({ behavior: "smooth", block: "start" });
});

searchInput.addEventListener("input", () => {
  query = searchInput.value.trim();
  render();
});

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  query = "";
  render();
  searchInput.focus();
});

document.querySelectorAll(".keyword-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    searchInput.value = chip.textContent.trim();
    query = searchInput.value;
    render();
    document.getElementById("search").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    render();
  });
});

viewAllBtn.addEventListener("click", () => {
  activeFilter = "all";
  query = "";
  searchInput.value = "";
  filterButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.filter === "all"));
  render();
});

modalClose.addEventListener("click", () => modal.close());

modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("confguidetheme", document.body.classList.contains("dark") ? "dark" : "light");
});

if (localStorage.getItem("confguidetheme") === "dark") {
  document.body.classList.add("dark");
}

render();
