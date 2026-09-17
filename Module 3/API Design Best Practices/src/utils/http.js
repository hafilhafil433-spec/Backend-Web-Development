function sendOk(res, data) {
  return res.status(200).json({ data });
}

function sendCreated(res, data) {
  return res.status(201).json({ data });
}

function sendError(res, status, code, message) {
  return res.status(status).json({
    error: { code, message }
  });
}

module.exports = { sendOk, sendCreated, sendError };
