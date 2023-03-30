interface User {
  name: string;
}

function saveUser(user: User) {
  console.log(user.name);
}
saveUser({ name: "Kleber" });
