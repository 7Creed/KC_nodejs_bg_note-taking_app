const fullName = document.getElementById("full-name");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const registerButton = document.getElementById("register-button");

registerButton.addEventListener("click", async () => {
  try {
    const response = await fetch(urlMaker("/auth/register"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullName.value,
        email: email.value,
        username: username.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (response.status == 201 && data.message == "User created") {
      location.assign("/frontend/index.html");
    }

    // sessionStorage.setItem("token", `Bearer ${data.token}`);
  } catch (error) {
    // console.log(error);
    alert("An error occured");
  }
});
