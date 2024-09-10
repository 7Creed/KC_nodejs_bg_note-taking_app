const noteTitle = document.getElementById("note-title");
const noteBody = document.getElementById("note-body");
const addNoteButton = document.getElementById("add-note-button");

addNoteButton.addEventListener("click", async () => {
  const response = await fetch(urlMaker("/note"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    body: JSON.stringify({
      title: noteTitle.value,
      body: noteBody.value,
    }),
  });

  if (response.status == 201) {
    alert("Note added successfully!");
    location.assign("/frontend/dashboard.html");
  }
});
