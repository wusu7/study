// import http from "http";
import express from "express";
import postRoutes from "./routes/post.routes.js";
const app = express();

app.use(express.json());

// const server = http.createServer((req, res) => {
//   res.setHeader("Content-Type", "text/plain; charset=utf-8");
//   res.end("OK");
// });

// app.get("/", (req, res) => {
//   res.send("OK");
// });

// // Router
// app.get("/users", userController.list);
// app.post("/users", (req, res) => res.send("사용자 생성"));
// app.get("/users/:id", (req, res) =>
//   res.send(`ID: ${req.params.id} 사용자 조회`)
// );

app.use("/api/v1/posts", postRoutes);
// ...

// server.listen(3000, () => {
//   console.log("OK server was started!");
// });

app.listen(3000, () => {
  console.log("OK server was started!");
});