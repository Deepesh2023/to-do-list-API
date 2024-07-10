const jwt = require("jsonwebtoken");

const tokenCleanUp = (request, response, next) => {
  const token = request.headers.authorization;
  if (token) {
    if (token.startsWith("Bearer ")) {
      request.headers.authorization = token.replace("Bearer ", "");
      return next();
    } else {
      return response.status(401).end();
    }
  }

  next();
};

const decodeToken = (request, response, next) => {
  const token = request.headers.authorization;
  let username;
  try {
    username = jwt.verify(token, process.env.JWT_KEY);
  } catch (error) {
    return next(error);
  }

  request.headers.username = username;
  next();
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "JsonWebTokenError") {
    response.status(401).end();
  }
};

module.exports = {
  tokenCleanUp,
  decodeToken,
  errorHandler,
};
