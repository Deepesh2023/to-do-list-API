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
};

const decodeToken = (request, response, next) => {
  const token = request.headers.authorization;
  try {
    request.body.user = jwt.verify(token, process.env.JWT_KEY);
  } catch (error) {
    return next(error);
  }

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
