const moment = require("moment");
const config = require("../config");
const auditLog = require("./auditLog");

exports.morganAPI = (tokens, req, res) => {
  const body = req.body;
  const code = res.statusCode;
  const method = req.method;
  const url = req.originalUrl;
  const username = req.user ? req.user.username : "unknown";

  // only log api calls (except sessions)
  if (
    !url.startsWith("/api/") ||
    (config.environment !== "debug" && (url.includes("/sessions/") || url.includes("/stats/")))
  ) {
    return null;
  }

  if (body.password) {
    body.password = "*****";
  }

  auditLog.log("api", {
    body: JSON.stringify(body),
    code: code,
    method: method,
    timestamp: moment()
      .toISOString(),
    url: url,
    username: username,
  });

  return null;
};