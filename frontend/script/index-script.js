const usernameOrEmail = document.getElementById("usernameOrEmail");
const password = document.getElementById("password");
const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", async () => {
  const result = await fetch(urlMaker("/auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailOrUsername: usernameOrEmail.value,
      password: password.value,
    }),
  });

  const data = await result.json();

  sessionStorage.setItem("token", `Bearer ${data.token}`);

  location.assign("/frontend/dashboard.html");
});
