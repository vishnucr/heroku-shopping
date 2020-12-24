import { string } from "assets/strings";

const parseErrors = {
  500: string("serverError.internalServerError"),
  401: string("serverError.unauthorized"),
  403: string("serverError.forbidden")
};

class ServiceError extends Error {
  constructor(error) {
    const message =
      error.message ||
      parseErrors[error.status] ||
      string("serverError.defaultError");
    super(message);
  }
}

export default ServiceError;
