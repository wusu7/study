// const http = require("http");
// let count =0;
// const server = http.createServer((req, res) => {
//     log(count);
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "text/plain");
//     res.write("hello/n");
//     setTimeout(() => {
//         res.end("Node.1js");
//     }, 2000);
// });
// function log(count) {
//     console.log((count += 1));

// }
// server.listen(8000);

const http = require("http");
let count = 0;

const server = http.createServer((req, res) => {
  // 전역 count를 바로 ++ 해서 로그
  console.log(++count);

  res.writeHead(200, { "Content-Type": "text/plain" });
  // 백슬래시 n : 개행
  res.write("hello\n");

  setTimeout(() => {
    res.end("Node.js");
  }, 20000);
});

server.listen(8000, () => {
  console.log("Server listening on port 8000");
});