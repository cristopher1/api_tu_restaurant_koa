import { buildAPI } from "./api/index.js";
import { db } from "./db/models/index.js";

const getPort = () => {
  const port = process.env.PORT || 3000;
  return port;
};

const startAPI = async (buildAPI, db) => {
  try {
    const port = getPort();
    const api = await buildAPI();

    await db.sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );

    api.listen(port, (err) => {
      if (err) {
        return console.error("Failed", err);
      }
      console.log(`Listening on port ${port}`);
      return api;
    });
  } catch (err) {
    console.error(err);
  }
};

startAPI(buildAPI, db);
