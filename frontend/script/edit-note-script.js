const noteTitle = document.getElementById("note-title");
const noteBody = document.getElementById("note-body");
const editNoteButton = document.getElementById("edit-note-button");

const id = location.search.slice(4);

async function showNote() {
  const response = await fetch(urlMaker("/note/" + id), {
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
  });

  const data = await response.json();

  noteTitle.value = data.notes.title;
  noteBody.value = data.notes.body;
}

showNote();

editNoteButton.addEventListener("click", async () => {
  try {
    const response = await fetch(urlMaker("/note/" + id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify({
        title: noteTitle.value,
        body: noteBody.value,
      }),
    });

    if (response.status == 200) {
      alert("Note updated successfully");
      location.assign("/frontend/dashboard.html");
    }
  } catch (error) {
    console.error(error);
    alert("An error occured while trying to update note");
  }
});
