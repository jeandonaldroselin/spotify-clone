import React from "react";

export const AuthenticationContext = React.createContext({
    isAuthenticated: false,
    accessToken: "",
    refreshToken: "",
    setIsAuthenticated: (value) => { },
    setAccessToken: (value) => { },
    setRefreshToken: (value) => { }
})