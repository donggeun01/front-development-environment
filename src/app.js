import axios from "axios";
import "./app.css";
// import nyancat from "./nyancat.jpg";

document.addEventListener("DOMContentLoaded", async () => {
  // document.body.innerHTML = `<img src=${nyancat} />`;

  const result = await axios.get("/api/user");

  document.body.innerHTML = (result.data || [])
    .map((user) => {
      return `<div>${user.id}: ${user.name}</div>`;
    })
    .join("");
});

// const alert = (msg) => alert(msg);

// alert("메세지 입력 확인");

console.log(process.env.NODE_ENV);
console.log(TWO); // 2;
console.log(STR_TWO); // 1+1;
console.log(VERSION); // v1.2.3
console.log(PRODUCTION); // false
console.log(MAX_COUNT); // 999
console.log(api_domain); // https://dev.api.domain.com
