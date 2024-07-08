const jwtValidation = (request, response, next) => {
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

module.exports = {
  jwtValidation,
};
