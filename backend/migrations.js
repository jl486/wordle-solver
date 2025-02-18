import { db } from "./db";
import path from "path";
import fs from "fs";

export const migrate = () => {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word TEXT UNIQUE
      )`,
      (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log("words table created successfully")
        }
      }
    );

    const wordsPath = path.join(process.cwd(), "data/words.txt");
    fs.readFile(wordsPath, "utf8", (err, data) => {
      if (err) {
        console.error(err.message);
        return;
      }

      const words = data.split("\n").map((word) => word.trim()).filter(Boolean);

      const stmt = db.prepare("INSERT OR IGNORE INTO words (word) VALUES (?)");

      words.forEach((word) => {
        stmt.run(word);
      });

      stmt.finalize(() => {
        console.log(`${words.length} words inserted into words database`);
      });
    })
  });
};


