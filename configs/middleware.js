const jwtValidation = (request, response, next) => {
  let token = request.headers.authorization;
  if (token) {
    if (token.startsWith("Bearer ")) {
      request.headers.authorization = token.replace("Bearer ", "");
      next();
    } else {
      response.status(401).end();
    }
  }
  next();
};

module.exports = {
  jwtValidation,
};
