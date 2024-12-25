import fs from "fs/promises";
import path from "path";

const distPath = path.resolve("dist");
await clearDist(distPath);

const srcPath = path.resolve("src");
const staticPath = path.join(srcPath, "static");
const pagesPath = path.join(srcPath, "pages");

await Promise.all([
  buildStatic(await getFiles(staticPath), staticPath, distPath),
  buildPages(await getFiles(pagesPath), pagesPath, distPath),
]);

async function clearDist(distPath) {
  try {
    await fs.rm(distPath, { recursive: true, force: true });
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
}

async function getFiles(filesPath) {
  try {
    const pages = await fs.readdir(filesPath, {
      encoding: "utf8",
      recursive: true,
      withFileTypes: true,
    });
    return pages;
  } catch (error) {
    throw error;
  }
}

async function buildStatic(staticFiles, staticPath, distPath) {
  for (const file of staticFiles) {
    if (file.isFile()) {
      const srcFilePath = path.join(file.path, file.name);
      const srcFilePathObject = path.parse(srcFilePath);

      const relPath = path.relative(staticPath, file.path);
      const distFilePath = path.join(distPath, relPath, file.name);

      let content = "";
      try {
        content = await fs.readFile(srcFilePath);
      } catch (error) {
        throw error;
      }

      switch (srcFilePathObject.ext.substring(1)) {
        case "html":
          break;

        case "js":
          break;

        case "css":
          break;

        default:
          break;
      }

      await fs.mkdir(path.parse(distFilePath).dir, { recursive: true });
      try {
        await fs.writeFile(distFilePath, content);
      } catch (error) {
        throw error;
      }
    }
  }
}

async function buildPages(pageFiles, pagesPath, distPath) {
  const routes = {};
  for (const file of pageFiles) {
    if (file.isFile()) {
      const srcFilePath = path.join(file.path, file.name);
      const srcFilePathObject = path.parse(srcFilePath);

      const relPath = path.relative(pagesPath, file.path);
      const distFileRelPath = path.join(
        relPath,
        `${srcFilePathObject.name}.html`
      );
      const distFilePath = path.join(distPath, distFileRelPath);

      let content = "";
      try {
        content = await fs.readFile(srcFilePath);
      } catch (error) {
        throw error;
      }

      switch (srcFilePathObject.ext.substring(1)) {
        case "md":
          content = `<section><div class="wrapper"><article>${content}</article></div></section>`;
          break;

        default:
          break;
      }

      await fs.mkdir(path.parse(distFilePath).dir, { recursive: true });
      try {
        await fs.writeFile(distFilePath, content);
      } catch (error) {
        throw error;
      }

      const route = `${relPath ? "/" : ""}${relPath
        .split(path.sep)
        .join("/")}/${srcFilePathObject.name}`;
      routes[route] = `/${distFileRelPath}`;

      if (distFileRelPath === "home.html") {
        routes["/"] = `/${distFileRelPath}`;
      }
    }
  }

  try {
    await fs.writeFile(
      path.join(distPath, "routes.json"),
      JSON.stringify(routes)
    );
  } catch (error) {
    throw error;
  }
}
