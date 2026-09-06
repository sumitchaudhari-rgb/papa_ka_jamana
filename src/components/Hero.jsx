import { usePlayer } from '../context/PlayerContext';
import { useLiveClock } from '../hooks/useLiveClock';
import { Play, ChevronDown } from 'lucide-react';

// Cinematic painted SVG scene — Old Indian railway platform at dusk
function HeroBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0520" />
          <stop offset="30%" stopColor="#1a1040" />
          <stop offset="60%" stopColor="#2d1a5a" />
          <stop offset="80%" stopColor="#4a2040" />
          <stop offset="100%" stopColor="#8B3A2A" />
        </linearGradient>
        <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1010" />
          <stop offset="100%" stopColor="#0a0808" />
        </linearGradient>
        <linearGradient id="sunsetGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF8C42" stopOpacity="0.0" />
          <stop offset="40%" stopColor="#FF6B35" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#C44D18" stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id="lampGlow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#FF8C00" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FF4500" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lampGlow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF0A0" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#FFD700" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FF8C00" stopOpacity="0" />
        </radialGradient>
        <filter id="blur4">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="blur8">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter id="blur2">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* Sky */}
      <rect width="1600" height="900" fill="url(#sky)" />

      {/* Horizon sunset glow */}
      <rect x="0" y="450" width="1600" height="300" fill="url(#sunsetGlow)" />

      {/* Stars */}
      {[
        [80,40],[200,80],[350,30],[500,60],[700,20],[900,50],[1100,35],[1300,70],[1450,25],[1550,55],
        [150,120],[450,110],[750,90],[1050,130],[1350,100],[250,55],[620,40],[950,70],[1200,45],[1480,80],
      ].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={Math.random()<0.5?1.5:1} fill="white" opacity={0.4+Math.random()*0.4} />
      ))}

      {/* Distant mountains / hills silhouette */}
      <path d="M0 520 Q200 420 350 480 Q500 420 600 460 Q750 380 900 430 Q1050 370 1150 410 Q1300 350 1450 400 Q1550 370 1600 390 L1600 900 L0 900 Z"
        fill="#0f0a1a" opacity="0.9" />

      {/* Platform / ground */}
      <rect x="0" y="620" width="1600" height="280" fill="url(#groundGrad)" />

      {/* Railway tracks */}
      {/* Left rail */}
      <path d="M600 900 Q680 780 720 700 Q740 660 760 640" stroke="#3a2a1a" strokeWidth="3" fill="none" opacity="0.7" />
      {/* Right rail */}
      <path d="M680 900 Q740 780 770 700 Q785 660 800 640" stroke="#3a2a1a" strokeWidth="3" fill="none" opacity="0.7" />
      {/* Track ties */}
      {[900, 840, 790, 750, 720, 700, 685, 670, 658, 648].map((y, i) => {
        const x1 = 600 + i * 18;
        return <line key={i} x1={x1} y1={y} x2={x1+60} y2={y-2} stroke="#2a1a0a" strokeWidth="5" opacity="0.6" />;
      })}

      {/* Platform edge */}
      <rect x="0" y="600" width="580" height="300" fill="#1a1010" />
      <rect x="0" y="598" width="580" height="5" fill="#2a1a10" />
      <rect x="0" y="600" width="580" height="8" fill="#3a2a18" />

      {/* Station building — arched facade */}
      <rect x="30" y="350" width="320" height="260" fill="#1a0f0a" />
      <rect x="50" y="370" width="280" height="240" fill="#140c08" />
      {/* Arched windows */}
      {[80, 160, 240].map((x, i) => (
        <g key={i}>
          <path d={`M${x} 420 Q${x+30} 390 ${x+60} 420 L${x+60} 490 L${x} 490 Z`}
            fill="#FFD700" opacity="0.15" />
          <path d={`M${x} 420 Q${x+30} 390 ${x+60} 420 L${x+60} 490 L${x} 490 Z`}
            fill="none" stroke="#4a3020" strokeWidth="2" />
          {/* Window glow */}
          <ellipse cx={x+30} cy={445} rx={25} ry={35} fill="url(#lampGlow1)" filter="url(#blur4)" opacity="0.6" />
        </g>
      ))}
      {/* Station name sign */}
      <rect x="70" y="355" width="240" height="30" fill="#2a1a10" rx="3" />
      <rect x="75" y="358" width="230" height="24" fill="#1a0f08" rx="2" />

      {/* Pillars */}
      {[50, 170, 290].map((x, i) => (
        <rect key={i} x={x} y={350} width="12" height="260" fill="#2a1a10" />
      ))}

      {/* Platform lamp posts */}
      {[[120, 580], [280, 580], [440, 580]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y-120} width="5" height="120" fill="#2a2020" />
          <path d={`M${x-2} ${y-120} Q${x+20} ${y-145} ${x+35} ${y-130}`}
            stroke="#2a2020" strokeWidth="4" fill="none" />
          {/* Lamp */}
          <ellipse cx={x+35} cy={y-130} rx={10} ry={7} fill="#FFD700" opacity="0.9" />
          {/* Glow */}
          <ellipse cx={x+35} cy={y-130} rx={60} ry={50} fill="url(#lampGlow1)" filter="url(#blur8)" opacity="0.5" />
        </g>
      ))}

      {/* Tea stall — "चाय गरम" */}
      <rect x="420" y="520" width="140" height="90" fill="#2a1808" />
      <path d="M415 520 L420 500 L560 500 L565 520 Z" fill="#3a2210" />
      {/* Stall glow */}
      <rect x="430" y="530" width="120" height="70" fill="#1a1008" />
      {/* Tea stall lamp glow */}
      <ellipse cx="490" cy="520" rx="70" ry="40" fill="url(#lampGlow2)" filter="url(#blur8)" opacity="0.6" />
      {/* Stall person silhouette */}
      <ellipse cx="490" cy="563" rx="10" ry="15" fill="#0a0806" />
      <circle cx="490" cy="543" r="7" fill="#0a0806" />

      {/* Waiting people silhouettes on platform */}
      {/* Person 1 — standing, looking at train */}
      <g opacity="0.8">
        <ellipse cx="170" cy="580" rx="10" ry="22" fill="#0d0808" />
        <circle cx="170" cy="553" r="8" fill="#0d0808" />
      </g>
      {/* Person 2 — sitting on bench */}
      <g opacity="0.7">
        <rect x="230" y="572" width="40" height="8" fill="#1a1010" rx="2" />
        <ellipse cx="245" cy="565" rx="9" ry="14" fill="#0d0808" />
        <circle cx="245" cy="548" r="7" fill="#0d0808" />
      </g>
      {/* Person 3 — walking, carrying bag */}
      <g opacity="0.75">
        <ellipse cx="350" cy="578" rx="9" ry="20" fill="#0d0808" />
        <circle cx="350" cy="555" r="7" fill="#0d0808" />
        <rect x="357" y="565" width="14" height="10" fill="#0d0808" rx="2" />
      </g>
      {/* Person 4 */}
      <g opacity="0.65">
        <ellipse cx="400" cy="575" rx="8" ry="18" fill="#0d0808" />
        <circle cx="400" cy="554" r="7" fill="#0d0808" />
      </g>

      {/* Vintage train (far right) */}
      <g opacity="0.75">
        {/* Engine */}
        <rect x="820" y="590" width="180" height="70" fill="#1a1010" rx="5" />
        <rect x="820" y="600" width="180" height="50" fill="#140c08" rx="3" />
        {/* Chimney */}
        <rect x="870" y="565" width="15" height="30" fill="#1a1010" />
        <ellipse cx="877" cy="563" rx="12" ry="5" fill="#0a0808" />
        {/* Smoke puffs */}
        <circle cx="877" cy="540" r="12" fill="#2a2030" opacity="0.4" filter="url(#blur4)" />
        <circle cx="890" cy="520" r="16" fill="#2a2030" opacity="0.3" filter="url(#blur4)" />
        <circle cx="905" cy="502" r="20" fill="#2a2030" opacity="0.2" filter="url(#blur8)" />
        {/* Windows */}
        {[840,880,920,960].map((x,i) => (
          <rect key={i} x={x} y={608} width={28} height={20} fill="#FFD700" opacity={0.12} rx="2" />
        ))}
        {/* Engine lamp glow */}
        <ellipse cx="998" cy="625" rx="15" ry="10" fill="#FFD700" opacity="0.7" />
        <ellipse cx="998" cy="625" rx="60" ry="40" fill="url(#lampGlow1)" filter="url(#blur8)" opacity="0.6" />
        {/* Wheels */}
        {[850,900,960].map((x,i) => (
          <circle key={i} cx={x} cy={660} r={18} fill="#0a0808" stroke="#2a1a10" strokeWidth="3" />
        ))}
        {/* Carriages */}
        <rect x="1000" y="600" width="200" height="55" fill="#110a08" rx="3" />
        <rect x="1200" y="600" width="180" height="55" fill="#0e0808" rx="3" />
        {[1020,1060,1100,1140,1220,1260,1300,1340].map((x,i) => (
          <rect key={i} x={x} y={608} width={24} height={18} fill="#FFD700" opacity={0.08} rx="2" />
        ))}
      </g>

      {/* Atmospheric haze layer */}
      <rect x="0" y="500" width="1600" height="200" fill="#1a0f20" opacity="0.25" filter="url(#blur8)" />

      {/* Foreground vignette */}
      <rect x="0" y="0" width="1600" height="900"
        fill="url(#sky)" opacity="0.1" />

      {/* Moonlight */}
      <circle cx="1350" cy="90" r="40" fill="#e8d8f0" opacity="0.15" />
      <circle cx="1350" cy="90" r="35" fill="#f0e8ff" opacity="0.2" />
      <circle cx="1350" cy="90" r="28" fill="#fff8ff" opacity="0.3" />
      <ellipse cx="1350" cy="90" rx="100" ry="80" fill="url(#lampGlow2)" filter="url(#blur8)" opacity="0.25" />

      {/* Birds flying */}
      {[[300,200],[320,195],[340,205],[600,160],[625,155],[650,165],[900,180],[920,173]].map(([x,y],i) => (
        <path key={i} d={`M${x} ${y} Q${x+8} ${y-5} ${x+16} ${y}`}
          stroke="#0a0818" strokeWidth="1.5" fill="none" opacity="0.5" />
      ))}
    </svg>
  );
}

export default function Hero() {
  const { allSongs, playSong, currentSong, isPlaying } = usePlayer();
  const { display, greeting, ampm } = useLiveClock();
  const featuredSong = allSongs[0];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Cinematic background painting */}
      <HeroBackground />

      {/* Dark overlay for text legibility */}
      <div className="hero-overlay absolute inset-0" />

      {/* Ambient glow orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Live clock — top left */}
      <div className="absolute top-20 left-4 md:left-8 flex flex-col gap-0.5 z-10">
        <span className="text-white/30 text-xs font-mukta tracking-widest uppercase">{greeting}</span>
        <span className="text-white/50 text-sm font-outfit tabular-nums">{display}</span>
      </div>

      {/* Center hero text */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mt-16">
        {/* Decorative top line */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent-gold/60" />
          <span className="text-accent-gold/60 text-xs font-outfit tracking-[0.3em] uppercase">Radio Ceylon · Vividh Bharati · AIR Gold</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent-gold/60" />
        </div>

        {/* Main title */}
        <h1 className="font-dev-hero text-6xl md:text-8xl lg:text-9xl text-white leading-none mb-4 text-glow-gold"
          style={{ textShadow: '0 0 60px rgba(245,158,11,0.6), 0 0 120px rgba(245,158,11,0.3), 0 4px 20px rgba(0,0,0,0.8)' }}>
          पापा का ज़माना
        </h1>

        {/* Tagline */}
        <p className="font-dev-body text-xl md:text-2xl text-white/70 mt-3 mb-2"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}>
          हर गाने की एक याद होती है
        </p>
        <p className="font-outfit text-sm text-white/35 tracking-wider">
          Relive the Golden Era of Hindi Cinema Music
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4 mt-10">
          <button
            onClick={() => playSong(featuredSong, allSongs)}
            className="flex items-center gap-2 bg-accent-gold hover:bg-amber-400 text-black px-8 py-3 rounded-full font-mukta font-semibold text-base transition-all duration-200 hover:scale-105 glow-gold"
          >
            <Play size={18} fill="black" />
            अभी सुनें
          </button>
          <a href="#songs" className="flex items-center gap-2 glass text-white/80 px-6 py-3 rounded-full font-mukta text-sm hover:bg-white/12 transition-all duration-200">
            गाने देखें
            <ChevronDown size={16} />
          </a>
        </div>

        {/* Decade chips */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {['1950s', '1960s', '1970s', '1980s', '1990s'].map(decade => (
            <span key={decade} className="decade-badge px-3 py-1 rounded-full text-white/60 font-mukta text-xs">
              {decade}
            </span>
          ))}
        </div>
      </div>

      {/* Now playing indicator at bottom */}
      {currentSong && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 glass px-4 py-2 rounded-full">
          {isPlaying && (
            <div className="eq-bars">
              {[1,2,3,4,5].map(i => <div key={i} className="eq-bar" style={{ animationDelay: `${i * 0.1}s` }} />)}
            </div>
          )}
          <span className="text-white/60 text-xs font-mukta">
            अभी बज रहा है: <span className="text-accent-violet">{currentSong.titleHindi}</span>
          </span>
        </div>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/25 text-xs font-mukta">नीचे स्क्रॉल करें</span>
        <ChevronDown size={16} className="text-white/25" />
      </div>
    </section>
  );
}
