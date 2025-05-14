export function Success(status, message, data, access_token) {
  return {
    access_token: access_token || null,
    data: data || null,
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
