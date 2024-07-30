let vocabularyData = [];
let currentIndex = 0;

document
  .getElementById("fileInput")
  .addEventListener("change", handleFile, false);
document.getElementById("flashcard").addEventListener("click", flipCard);
document.getElementById("prevBtn").addEventListener("click", showPreviousCard);
document.getElementById("nextBtn").addEventListener("click", showNextCard);

function handleFile(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    vocabularyData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
    vocabularyData = vocabularyData.slice(1); // Remove header row
    showCard(currentIndex);
  };
  reader.readAsArrayBuffer(file);
}

function flipCard() {
  document.getElementById("flashcard").classList.toggle("flipped");
}

function showCard(index) {
  if (vocabularyData.length === 0) return;
  const [word, type, definition, note] = vocabularyData[index];
  document.getElementById("word").textContent = word;
  document.getElementById("type").textContent = `Type: ${type}`;
  document.getElementById(
    "definition"
  ).textContent = `Definition: ${definition}`;
  document.getElementById("note").textContent = `Note: ${note}`;
  document.getElementById("flashcard").classList.remove("flipped");
}

function showPreviousCard() {
  if (currentIndex > 0) {
    currentIndex--;
    showCard(currentIndex);
  }
}

function showNextCard() {
  if (currentIndex < vocabularyData.length - 1) {
    currentIndex++;
    showCard(currentIndex);
  }
}
