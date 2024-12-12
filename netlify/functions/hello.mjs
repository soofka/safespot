import fs from "fs/promises";
import path from "path";

export default async (req, context) => {
  let signups = [];
  const filePath = path.resolve("./signups.json");
  try {
    signups = JSON.parse(await fs.readFile(filePath, { encoding: "utf8" }));
    signups.push(Date.now());
    await fs.writeFile(filePath, JSON.stringify(signups), { encoding: "utf8" });
    return new Response(signups);
  } catch (readingError) {
    if (readingError.code && readingError.code === "ENOENT") {
      try {
        await fs.writeFile(filePath, JSON.stringify(signups), {
          encoding: "utf8",
        });
        return new Response(signups);
      } catch (writingError) {
        return new Response(writingError.message, { status: 500 });
      }
    }
    return new Response(readingError.message, { status: 500 });
  }
};
