import React from "react";

export const PlayerContext = React.createContext({
    currentMediaPlaylistId: -1,
    setCurrentMediaPlaylistId: (value) => { },
    currentPlaylist: [],
    setCurrentPlaylist: (value) => { },
})