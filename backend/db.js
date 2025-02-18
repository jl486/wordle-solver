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
});

export const get = async (query) => {
  return await new Promise((resolve, reject) => {
    db.all(query, (err, row) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(row);
    });
  });
};

export const post = async (query, values) => {
  return await new Promise((resolve, reject) => {
    db.run(query, values, (err) => {
      if (err) {
        console.log(err)
      }
      resolve(null);
    })
  });
};
