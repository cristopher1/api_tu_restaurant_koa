const { JWT_SECRET, JWT_ALGORITHM } = process.env;

export default {
  jwt_secret: JWT_SECRET,
  jwt_algorithm: JWT_ALGORITHM,
};
