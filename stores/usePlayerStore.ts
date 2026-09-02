import { create } from "zustand";

type PlayerState = {
    currentTime: number;
    isPlaying: boolean;
    duration: number;
    seekTo: number | null;

    setCurrentTime: (time: number) => void;
    setIsPlaying: (playing: boolean) => void;
    setDuration: (duration: number) => void;
    requestSeek: (time: number) => void;
    clearSeekRequest: () => void;
};

export const usePlayerStore = create<PlayerState>((set) => ({
    currentTime: 0,
    isPlaying: false,
    duration: 0,
    seekTo: null,

    setCurrentTime: (time) => set({ currentTime: time }),
    setIsPlaying: (playing) => set({ isPlaying: playing }),
    setDuration: (duration) => set({ duration }),
    requestSeek: (time) => set({ seekTo: time }),
    clearSeekRequest: () => set({ seekTo: null }),
}));