const clampPercent = (value = 0) => Math.max(0, Math.min(100, Math.round(value)))

const Stat = ({ label, value, sublabel }) => (
  <div className="rounded-xl border border-slate-800/70 bg-slate-900/70 px-4 py-3 shadow-inner shadow-slate-900/50 ring-1 ring-white/5">
    <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{label}</p>
    <p className="mt-1 text-xl font-semibold text-slate-50">{value}</p>
    {sublabel && <p className="text-sm text-slate-400">{sublabel}</p>}
  </div>
)

const GamerProfileCard = ({ profile, onNext, onPrev, isAnimating }) => {
  const {
    name,
    gamertag,
    title,
    region,
    team,
    bannerUrl,
    avatarUrl,
    rank,
    tierProgress,
    streak,
    kd,
    winRate,
    hours,
    loadout,
    specialties = [],
    achievements = [],
  } = profile

  const progress = clampPercent(tierProgress)

  const stats = [
    { label: 'Rank', value: rank || '—', sub: `${progress}% tier progress` },
    { label: 'Win rate', value: `${winRate ?? 0}%`, sub: 'Last matches' },
    { label: 'K / D', value: kd ?? '—', sub: 'Current split' },
    { label: 'Hours', value: `${hours?.toLocaleString() ?? 0}h`, sub: 'Lifetime' },
  ]

  return (
    <article className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/80 shadow-[0_20px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/5 backdrop-blur">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/15 via-fuchsia-500/10 to-cyan-400/10" />
      <div className="relative">
        <div
          className="h-40 w-full bg-slate-900/60 md:h-48"
          style={{
            backgroundImage: `linear-gradient(120deg, rgba(15,23,42,0.85), rgba(15,23,42,0.45)), url(${bannerUrl})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="flex h-full items-start justify-end p-4">
            <div className="flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-emerald-100">Online</span>
            </div>
          </div>
        </div>

        <div className="-mt-12 px-6 pb-6 md:px-8 md:pb-8">
          <div className={`rounded-2xl border border-slate-800/70 bg-slate-950/80 p-6 shadow-2xl ring-1 ring-white/5 backdrop-blur md:p-8 ${isAnimating ? 'content-fade-in' : ''}`}>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="relative h-20 w-20 md:h-24 md:w-24">
                  <div className="h-full w-full overflow-hidden rounded-2xl ring-2 ring-indigo-400/60">
                    <img
                      src={avatarUrl}
                      alt={`${name} avatar`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 z-30 h-4 w-4 rounded-full border border-slate-950 bg-emerald-400 shadow shadow-emerald-500/50" />
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">{name}</h2>
                    <span className="rounded-full bg-slate-800/70 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10">
                      {gamertag}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 md:text-base">{title}</p>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-200">
                    <span className="rounded-full bg-indigo-500/10 px-2.5 py-1 ring-1 ring-indigo-400/30">
                      {region}
                    </span>
                    <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 ring-1 ring-cyan-400/30">
                      {team}
                    </span>
                    <span className="rounded-full bg-amber-500/10 px-2.5 py-1 ring-1 ring-amber-400/40">
                      {`Streak: ${streak}W`}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 md:justify-end">
                <button
                  onClick={onPrev}
                  className="rounded-xl bg-slate-800/70 px-4 py-2 text-sm font-semibold text-slate-100 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-slate-700/80"
                >
                  Previous
                </button>
                <button
                  onClick={onNext}
                  className="rounded-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-fuchsia-500/25"
                >
                  Next Player
                </button>
              </div>
            </div>

            {specialties.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {specialties.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-slate-800/60 bg-slate-900/70 px-3 py-1 text-xs font-medium text-slate-200 shadow-inner shadow-slate-900/70"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map(({ label, value, sub }) => (
                <Stat key={label} label={label} value={value} sublabel={sub} />
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-800/70 bg-slate-900/60 p-4 shadow-inner shadow-slate-900/60 ring-1 ring-white/5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-200">Rank progress</p>
                  <span className="text-sm font-semibold text-indigo-200">{progress}%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-300" />
                    <span>Loadout: {loadout?.primary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                    <span>Secondary: {loadout?.secondary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <span>Streak: {streak} wins</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                    <span>Last update: live</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800/70 bg-slate-900/60 p-4 shadow-inner shadow-slate-900/60 ring-1 ring-white/5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-200">Recent achievements</p>
                  <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs font-semibold text-slate-100">
                    {achievements.length} highlights
                  </span>
                </div>
                <ul className="mt-3 space-y-2">
                  {achievements.map((item) => (
                    <li
                      key={item.title}
                      className="flex items-start gap-3 rounded-lg border border-slate-800/60 bg-slate-900/70 p-3"
                    >
                      <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-emerald-400" />
                      <div>
                        <p className="text-sm font-semibold text-slate-100">{item.title}</p>
                        <p className="text-xs text-slate-400">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default GamerProfileCard
