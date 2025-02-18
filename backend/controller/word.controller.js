export const wordGet = async (query) => {
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

export const wordPost = async (query, values) => {
  return await new Promise((resolve, reject) => {
    db.run(query, values, (err) => {
      if (err) {
        console.log(err)
      }
      resolve(null);
    })
  });
};
