export function Success(status, message, data) {
  return {
    data: data || "",
    status: status,
    message: message,
  };
}

export function Error(status, message, error) {
  return {
    error: error || "",
    status: status,
    message: message,
  };
}
