import Hero from '../components/Hero';
import { SongCard } from '../components/SongCard';
import { PlaylistCard } from '../components/PlaylistCard';
import { usePlayer } from '../context/PlayerContext';
import { Link } from 'react-router-dom';
import { ChevronRight, Music2 } from 'lucide-react';

function SectionHeader({ title, subtitle, linkTo, linkLabel }) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div>
        <h2 className="font-dev-hero text-2xl md:text-3xl text-white">{title}</h2>
        {subtitle && <p className="text-white/40 text-sm font-mukta mt-1">{subtitle}</p>}
      </div>
      {linkTo && (
        <Link to={linkTo} className="flex items-center gap-1 text-accent-violet text-sm font-mukta hover:text-purple-300 transition-colors">
          {linkLabel} <ChevronRight size={14} />
        </Link>
      )}
    </div>
  );
}

// Artist spotlight component
function ArtistSpotlight({ name, nameHindi, songs, coverGradient, emoji }) {
  const { playSong } = usePlayer();
  return (
    <button
      onClick={() => songs.length && playSong(songs[0], songs)}
      className="glass rounded-2xl p-4 text-left hover:bg-white/8 transition-all group w-full"
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-3 mx-auto group-hover:scale-110 transition-transform"
        style={{ background: coverGradient, boxShadow: '0 0 20px rgba(0,0,0,0.4)' }}
      >
        {emoji}
      </div>
      <p className="font-dev-body font-semibold text-white text-sm text-center truncate">{nameHindi}</p>
      <p className="text-white/40 text-xs font-outfit text-center mt-0.5">{songs.length} गाने</p>
    </button>
  );
}

const ARTISTS = [
  { name: 'Lata Mangeshkar', nameHindi: 'लता मंगेशकर', coverGradient: 'linear-gradient(135deg, #6b1a6b, #b44db4)', emoji: '🌹' },
  { name: 'Kishore Kumar', nameHindi: 'किशोर कुमार', coverGradient: 'linear-gradient(135deg, #1a4a6b, #2d8ab4)', emoji: '🎤' },
  { name: 'Mohammed Rafi', nameHindi: 'मोहम्मद रफ़ी', coverGradient: 'linear-gradient(135deg, #6b2d1a, #c44d1e)', emoji: '🎵' },
  { name: 'Asha Bhosle', nameHindi: 'आशा भोसले', coverGradient: 'linear-gradient(135deg, #4a6b1a, #8ab42d)', emoji: '🎶' },
  { name: 'Jagjit Singh', nameHindi: 'जगजीत सिंह', coverGradient: 'linear-gradient(135deg, #1a4a3a, #2d8068)', emoji: '🎸' },
  { name: 'Mukesh', nameHindi: 'मुकेश', coverGradient: 'linear-gradient(135deg, #4a3a1a, #8a6e2d)', emoji: '⭐' },
];

export default function Home() {
  const { allSongs, allPlaylists, recentlyPlayed } = usePlayer();

  const recentSongs = recentlyPlayed
    .map(id => allSongs.find(s => s.id === id))
    .filter(Boolean)
    .slice(0, 6);

  const featuredSongs = allSongs.slice(0, 6);

  const artistSongs = (artistName) =>
    allSongs.filter(s => s.artist.includes(artistName));

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <Hero />

      {/* Main content */}
      <div id="songs" className="relative z-10 px-4 md:px-8 lg:px-12 pb-40 max-w-7xl mx-auto">

        {/* Recently played */}
        {recentSongs.length > 0 && (
          <section className="mt-12">
            <SectionHeader
              title="हाल में सुने"
              subtitle="आपने जो गाने हाल ही में सुने"
              linkTo="/browse"
              linkLabel="सभी देखें"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {recentSongs.map(song => (
                <SongCard key={song.id} song={song} allSongs={allSongs} />
              ))}
            </div>
          </section>
        )}

        {/* Featured / Top songs */}
        <section className="mt-14">
          <SectionHeader
            title="चुनिंदा गाने"
            subtitle="इस हफ़्ते की खास पेशकश"
            linkTo="/browse"
            linkLabel="सभी देखें"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {featuredSongs.map(song => (
              <SongCard key={song.id} song={song} allSongs={allSongs} />
            ))}
          </div>
        </section>

        {/* Playlists */}
        <section className="mt-14">
          <SectionHeader
            title="प्लेलिस्ट"
            subtitle="मूड के हिसाब से संगीत"
            linkTo="/browse"
            linkLabel="सभी देखें"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allPlaylists.slice(0, 6).map(pl => (
              <PlaylistCard key={pl.id} playlist={pl} />
            ))}
          </div>
        </section>

        {/* Artist spotlights */}
        <section className="mt-14">
          <SectionHeader
            title="कलाकार"
            subtitle="सुनहरे दौर के महान फ़नकार"
          />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {ARTISTS.map(artist => (
              <ArtistSpotlight
                key={artist.name}
                {...artist}
                songs={artistSongs(artist.name)}
              />
            ))}
          </div>
        </section>

        {/* Mood banner */}
        <section className="mt-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { mood: 'romantic', moodHindi: 'रोमांटिक', gradient: 'linear-gradient(135deg, #6b1a3a, #b42d6e)', emoji: '❤️', desc: 'प्यार की बातें' },
              { mood: 'sad', moodHindi: 'दर्द भरे', gradient: 'linear-gradient(135deg, #1a2d4a, #2d5080)', emoji: '🌧️', desc: 'दिल की गहराइयाँ' },
              { mood: 'ghazal', moodHindi: 'ग़ज़लें', gradient: 'linear-gradient(135deg, #1a3a2d, #2d7a56)', emoji: '🎸', desc: 'महफ़िल-ए-ग़ज़ल' },
            ].map(({ mood, moodHindi, gradient, emoji, desc }) => {
              const moodSongs = allSongs.filter(s => s.mood.includes(mood));
              const { playSong } = usePlayer();
              return (
                <button
                  key={mood}
                  onClick={() => moodSongs.length && playSong(moodSongs[0], moodSongs)}
                  className="relative rounded-2xl overflow-hidden h-28 group text-left"
                  style={{ background: gradient }}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="relative z-10 p-5 flex items-center gap-4 h-full">
                    <span className="text-4xl">{emoji}</span>
                    <div>
                      <p className="font-dev-body font-bold text-white text-lg">{moodHindi}</p>
                      <p className="text-white/60 text-xs font-mukta">{desc} · {moodSongs.length} गाने</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
