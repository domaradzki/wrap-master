/**
 * Array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/", "/authentication/new-verification"];

/**
 * Array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */

export const authRoutes = [
  "/authentication/login",
  "/authentication/register",
  "/authentication/error",
  "/authentication/reset",
  "/authentication/new-password",
];

/**
 * Prefix for API authenticated routes
 * Routes that start with this prefix are used for API authenticated purposes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/pulpit";
