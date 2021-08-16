const jwtAuthz = require("express-jwt-authz");

export const checkPermissions = (permissions: string | string[]) => {
    return jwtAuthz([permissions], {
        customScopeKey: "permissions",  // by default it would be the scope
        checkAllScopes: true,
        failWithError: true
    });
};
