import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, MessageCircle, Instagram, Youtube, Music, GamepadIcon } from 'lucide-react';

interface CursorTrail {
  x: number;
  y: number;
  id: number;
}

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [cursorTrails, setCursorTrails] = useState<CursorTrail[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement>(null);
  const trailIdRef = useRef(0);

  // Handle mouse movement for custom cursor and trails
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Create trail effect
      const newTrail: CursorTrail = {
        x: e.clientX,
        y: e.clientY,
        id: trailIdRef.current++
      };
      
      setCursorTrails((prev: CursorTrail[]) => [...prev.slice(-15), newTrail]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Clean up old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorTrails((prev: CursorTrail[]) => prev.slice(-10));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-x-hidden cursor-none">
      {/* Custom Cursor */}
      <div 
        className="fixed w-8 h-8 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
        style={{ 
          left: mousePosition.x, 
          top: mousePosition.y,
          backgroundImage: 'url(/978591492446781480-cursor-8697599.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Cursor Trail */}
      {cursorTrails.map((trail: CursorTrail, index: number) => (
        <div
          key={trail.id}
          className="fixed w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-40 animate-ping"
          style={{
            left: trail.x,
            top: trail.y,
            opacity: (index + 1) / cursorTrails.length * 0.5,
            animationDelay: `${index * 50}ms`
          }}
        />
      ))}

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full animate-spin-slow"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-pink-500/10 to-blue-500/10 rounded-full animate-pulse"></div>
      </div>

      {/* Audio */}
      <audio ref={audioRef} loop>
        <source src="/background_song.mp3" type="audio/mpeg" />
      </audio>

      {/* Music Controls */}
      <div className="fixed top-6 right-6 z-40 flex gap-3">
        <button
          onClick={toggleMusic}
          className="bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={toggleMute}
          className="bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      {/* Profile Section */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
        {/* Profile Picture */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
          <img 
            src="/967161275777966170-pp-4898451.png" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Username with Effect */}
        <div className="relative">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
            PatrickS
          </h1>
          <img 
            src="/NVIDIA_Overlay_YXFS0KWvaQ.gif" 
            alt="Username Effect" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
          />
        </div>

        {/* Badge */}
        <div className="w-24 h-24">
          <img 
            src="/401057485773078528-badge-4448262.png" 
            alt="Badge" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Social Media Buttons */}
        <div className="flex gap-4 mt-4">
          <a href="#" className="bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20">
            <MessageCircle size={24} className="text-[#5865F2]" />
          </a>
          <a href="#" className="bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20">
            <Instagram size={24} className="text-[#E4405F]" />
          </a>
          <a href="#" className="bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20">
            <Youtube size={24} className="text-[#FF0000]" />
          </a>
          <a href="#" className="bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20">
            <Music size={24} className="text-[#1DB954]" />
          </a>
          <a href="#" className="bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20">
            <GamepadIcon size={24} className="text-[#00adee]" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;