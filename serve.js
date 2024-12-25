import path from "path";
import express from "express";
const app = express();
const distPath = path.resolve("dist");
app.use(express.static(distPath));
app.get("/*", (req, res) => res.sendFile(path.join(distPath, "index.html")));
app.listen(3000, () => console.log("Server serving"));
