/**
 * Role-based authorization middleware
 * Usage:
 * authorizeRoles("hr", "admin")
 */

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user is injected by auth.middleware.js
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        message: "Unauthorized: user role missing",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Forbidden: insufficient permissions",
      });
    }

    next();
  };
};
