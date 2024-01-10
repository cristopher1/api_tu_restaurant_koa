import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Sequelize } from "sequelize";
import config from "../../config/database.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const basename = path.basename(filename);

let sequelize;
if (config.db_url) {
  sequelize = new Sequelize(config.db_url);
} else {
  const { database, username, password, host, port, dialect } = config;
  sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect,
  });
}

const getModelFiles = (dirname, basename) => {
  const modelFiles = fs.readdirSync(dirname).filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  });
  return modelFiles;
};

const buildDBHandler = (sequelize, Sequelize) => {
  const db = {};

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
};

const getBuildORM = (dirname, basename) => {
  const buildORM = async () => {
    const orm = {};
    const modelFiles = getModelFiles(dirname, basename);

    for (const file of modelFiles) {
      const filePath = path.join(dirname, file);
      const fileUrl = path.resolve(filePath);
      const { default: builderModel } = await import(fileUrl);
      const model = builderModel(sequelize, Sequelize.DataTypes);
      orm[model.name] = model;
    }

    Object.keys(orm).forEach((modelName) => {
      if (orm[modelName].associate) {
        orm[modelName].associate(orm);
      }
    });

    orm.sequelize = sequelize;
    orm.Sequelize = Sequelize;

    return orm;
  };
  return buildORM;
};

export const db = buildDBHandler(sequelize, Sequelize);
export const buildORM = getBuildORM(dirname, basename);
