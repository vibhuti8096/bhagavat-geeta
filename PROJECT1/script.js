function toggleChapters() {
  const chapDiv = document.getElementById("chapterslist");
  chapDiv.style.display = chapDiv.style.display === "none" ? "block" : "none";
}
const geeta = () => {
  fetch("https://vedicscriptures.github.io/chapters")
    .then(response => response.json())
    .then(data => {
      const chapDiv = document.getElementById("chapterslist");
      
      const ul = document.createElement("ul");

      data.forEach(chapter => {
        const li = document.createElement("li");
        li.textContent = ` Chapter ${chapter.chapter_number} : ${chapter.name}`;
        ul.appendChild(li);
      });
      chapDiv.appendChild(ul);
    })
    .catch(error => {
      console.log("Error", error);
    });
};

geeta();


function showChapterSummary() {
  const params = new URLSearchParams(window.location.search);
  const num = params.get("num");

  // If summary not found in localStorage, fetch it
  if (!localStorage.getItem(`summary_${num}`)) {
    fetch("https://vedicscriptures.github.io/chapters")
      .then(res => res.json())
      .then(data => {
        const chapter = data.find(ch => ch.chapter_number == num);
        if (chapter) {
          localStorage.setItem(`summary_${num}`, chapter.summary);
          localStorage.setItem(`name_${num}`, chapter.name);
          renderChapter(num);
        } else {
          document.body.innerHTML = "Chapter not found.";
        }
      });
  } else {
    renderChapter(num);
  }
}

function renderChapter(num) {
  const name = localStorage.getItem(`name_${num}`);
  const summary = localStorage.getItem(`summary_${num}`);

  document.getElementById("title").innerText = `Chapter ${num}: ${name}`;
  document.getElementById("summary").innerText = summary || "Summary not found.";
}