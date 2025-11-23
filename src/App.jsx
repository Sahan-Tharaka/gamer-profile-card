import { useEffect, useState } from "react";
import GamerProfileCard from "./components/GamerProfileCard";

function mapCharacterToProfile(character) {
  const episodeCount = character.episode?.length ?? 0;

  const tierProgress = Math.min(100, episodeCount * 4);
  const kd = (episodeCount / 10).toFixed(1);
  const winRate = Math.min(100, 40 + episodeCount);
  const hours = episodeCount * 12;
  const streak = Math.max(1, Math.min(episodeCount, 10));

  return {
    name: character.name,
    gamertag: `@${character.name.toLowerCase().replace(/\s+/g, "")}`,
    title: `${character.status} • ${character.species}`,
    region: character.location?.name ?? "Unknown location",
    team: character.origin?.name ?? "Unknown origin",
    bannerUrl: character.image,
    avatarUrl: character.image,
    rank: `Multiverse rank ${character.id}`,
    tierProgress,
    streak,
    kd,
    winRate,
    hours,
    loadout: {
      primary: "Portal Gun",
      secondary: "Plumbus",
    },
    specialties: [
      "Dimension travel",
      character.gender,
      character.species,
    ].filter(Boolean),
    achievements: [
      {
        title: `Appeared in ${episodeCount} episode${episodeCount === 1 ? "" : "s"}`,
        detail: "Show highlights",
      },
      {
        title: "Origin world",
        detail: character.origin?.name ?? "Unknown origin",
      },
      {
        title: "Last seen at",
        detail: character.location?.name ?? "Unknown location",
      },
    ],
  };
}

function App() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentId, setCurrentId] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const fetchCharacter = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();
      const mappedProfile = mapCharacterToProfile(data);
      setProfile(mappedProfile);
      setCurrentId(id);

      // Trigger animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    } catch (err) {
      console.error(err);
      setError("Could not load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacter(currentId);
  }, []);

  const handleNext = () => {
    const nextId = currentId + 1;
    fetchCharacter(nextId);
  };

  const handlePrev = () => {
    const prevId = Math.max(1, currentId - 1);
    fetchCharacter(prevId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-200">
        Loading profile...
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-300">
        {error || "Profile not available"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <GamerProfileCard
        key={currentId}
        profile={profile}
        onNext={handleNext}
        onPrev={handlePrev}
        isAnimating={isAnimating}
      />
    </div>
  );
}

export default App;
