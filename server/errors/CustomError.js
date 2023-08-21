class CustomError extends Error {
  constructor(message, errorTypeDetail, field) {
    super(message);
    this.errorTypeDetail = errorTypeDetail;
    this.field = field;
  }
}

export default CustomError;
