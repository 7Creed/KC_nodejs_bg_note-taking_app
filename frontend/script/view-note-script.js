const mainArea = document.querySelector("main");

async function fetchSingleNote() {
  const id = location.search.slice(4);

  const response = await fetch(urlMaker("/note/" + id), {
    method: "GET",
    headers: {
      //   "Content-Type": "application/json",
      Authorization: getToken(),
    },
  });

  const data = await response.json();

  mainArea.innerHTML = `
  <div class="single-note">
      <h3 style="font-weight: bold">${data.notes.title}</h3>
      <div>${data.notes.body}</div>
      <div style="text-align: center">
        <button id="edit-button" onclick="location.assign('/frontend/edit-note.html?id=${data.notes._id}')">Edit</button>
        <button onclick="history.back()"
        style="color: blue; background-color: white; border: 1px solid blue"
      >
        Back
      </button>
      </div>
  </div>
`;
}

fetchSingleNote();
