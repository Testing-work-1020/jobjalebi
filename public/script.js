import { db } from './firebase-config.js';
import {
  ref,
  onValue,
  update
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const jobsRef = ref(db, "jobs");
const container = document.getElementById("job-list");
const tabs = document.getElementById("tabs");
const searchInput = document.getElementById("search-input");

let allJobs = [];
let currentFilter = "all";
let currentSearch = "";

function renderJobs(filter, searchText) {
  container.innerHTML = "";
  let delay = 0;

  let filteredJobs = [...allJobs];

  if (filter === "public") {
    filteredJobs = filteredJobs.filter(job =>
      job.type?.toLowerCase().includes("public")
    );
  } else if (filter === "private") {
    filteredJobs = filteredJobs.filter(job =>
      job.type?.toLowerCase().includes("private")
    );
  } else if (filter === "popular") {
    filteredJobs.sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
  }

  if (searchText) {
    filteredJobs = filteredJobs.filter(job =>
      job.title.toLowerCase().includes(searchText.toLowerCase()) ||
      job.company.toLowerCase().includes(searchText.toLowerCase()) ||
      job.location.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  if (filteredJobs.length === 0) {
    container.innerHTML = `<p class="no-jobs-msg">No jobs found for your search or filter.</p>`;
    return;
  }

  filteredJobs.forEach(job => {
    const jobCard = document.createElement("div");
    jobCard.className = "job-card";
    jobCard.style.animationDelay = `${delay}s`;

    jobCard.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>${job.company}</strong></p>
      <p class="location">${job.location} (${job.type})</p>
      <a href="#" class="apply-btn" data-link="${job.link}" data-id="${job.id}">Apply Now ➔</a>
    `;

    const applyBtn = jobCard.querySelector("a");
    applyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = applyBtn.getAttribute("data-id");
      const jobRef = ref(db, `jobs/${id}`);
      update(jobRef, { clicks: (job.clicks || 0) + 1 });
      window.open(applyBtn.getAttribute("data-link"), "_blank");
    });

    container.appendChild(jobCard);
    delay += 0.1;
  });
}

onValue(jobsRef, (snapshot) => {
  allJobs = [];
  snapshot.forEach((childSnapshot) => {
    const jobData = childSnapshot.val();
    jobData.id = childSnapshot.key;
    allJobs.push(jobData);
  });
  renderJobs(currentFilter, currentSearch);
});

tabs.addEventListener("click", (e) => {
  if (!e.target.classList.contains("tab-btn")) return;
  tabs.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  e.target.classList.add("active");
  currentFilter = e.target.getAttribute("data-type");
  renderJobs(currentFilter, currentSearch);
});

searchInput.addEventListener("input", (e) => {
  currentSearch = e.target.value.trim();
  renderJobs(currentFilter, currentSearch);
});
