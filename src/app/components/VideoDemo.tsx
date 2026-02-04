'use client';

import { useRef, useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

interface VideoDemoProps {
    src: string;
}

export default function VideoDemo({ src }: VideoDemoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => setCurrentTime(video.currentTime);
        const handleLoadedMetadata = () => setDuration(video.duration);
        const handleEnded = () => setIsPlaying(false);

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('ended', handleEnded);
        };
    }, []);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-full h-full bg-black flex flex-col">
            {/* Video Container */}
            <div className="relative flex-1 bg-black overflow-hidden">
                <video
                    ref={videoRef}
                    src={src}
                    className="w-full h-full object-contain"
                    onClick={togglePlay}
                />

                {/* Play/Pause Button Overlay */}
                {!isPlaying && (
                    <button
                        onClick={togglePlay}
                        className="absolute inset-0 m-auto w-24 h-24 bg-black/70 border border-white/20 text-white hover:bg-black/80 hover:border-white/40 transition-all flex items-center justify-center group"
                    >
                        <Play size={32} fill="white" className="group-hover:scale-110 transition-transform" />
                    </button>
                )}

                {/* Pause Overlay (appears on hover when playing) */}
                {isPlaying && (
                    <button
                        onClick={togglePlay}
                        className="absolute inset-0 bg-transparent hover:bg-black/20 transition-opacity group"
                    >
                        <div className="absolute inset-0 m-auto w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Pause size={48} className="text-white/80 mx-auto" />
                        </div>
                    </button>
                )}
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-neutral-800 relative">
                <div
                    className="h-full bg-white transition-all"
                    style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                />
            </div>

            {/* Controls Bar */}
            <div className="h-12 bg-[#0a0a0a] border-t border-neutral-800 px-4 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-4 text-neutral-400">
                    <button
                        onClick={togglePlay}
                        className="text-white hover:text-neutral-300 transition-colors"
                    >
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <span>
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    {isPlaying && (
                        <>
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                            </span>
                            <span className="text-red-500 text-[10px]">PLAYING</span>
                        </>
                    )}
                    {!isPlaying && (
                        <span className="text-neutral-600 text-[10px]">PAUSED</span>
                    )}
                </div>
            </div>
        </div>
    );
}
