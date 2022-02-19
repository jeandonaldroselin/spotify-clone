import React from "react";

export const PlayerContext = React.createContext({
    currentMediaPlaylistId: -1,
    setCurrentMediaPlaylistId: (value) => { },
    currentPlaylist: [],
    setCurrentPlaylist: (value) => { },
    isPlaying: false,
    setIsPlaying: (value) => { },
    setSound: (value) => { },
    sound: undefined
})