import sqlite3 from "sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "data/wordle.db")
export const db = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("connected to words database");
    }
  }
);

// Create words database
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
