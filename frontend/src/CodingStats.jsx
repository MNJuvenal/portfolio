import { useState, useEffect } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://portfolio-hwg8.onrender.com';

const PLATFORMS = [
  {
    key: 'leetcode',
    name: 'LeetCode',
    icon: 'bx bx-code-block',
    subtitle: 'Algorithmique & structures de données',
    profileUrl: 'https://leetcode.com/u/lajuve01/'
  },
  {
    key: 'deepml',
    name: 'Deep-ML',
    icon: 'bx bx-brain',
    subtitle: 'ML from scratch : NumPy, algèbre linéaire, deep learning',
    profileUrl: 'https://www.deep-ml.com/profile/JrKuyw4UG7SbUZeJiSxoiJjRleg2'
  }
];

const DIFFICULTIES = [
  { key: 'easy', label: 'Easy', className: 'easy' },
  { key: 'medium', label: 'Medium', className: 'medium' },
  { key: 'hard', label: 'Hard', className: 'hard' }
];

function StatCard({ platform }) {
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    // Le backend Render peut mettre ~50s à se réveiller : on attend sans bloquer la page
    fetch(`${BACKEND_URL}/api/stats/${platform.key}`)
      .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
      .then((data) => {
        setStats(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, [platform.key]);

  return (
    <a
      href={platform.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`coding-card ${platform.key}`}
    >
      <div className="coding-card-header">
        <i className={platform.icon}></i>
        <div>
          <h3>{platform.name}</h3>
          <p>{platform.subtitle}</p>
        </div>
        {status === 'ready' && <span className="live-dot" title="Mis à jour automatiquement"></span>}
      </div>

      {status === 'loading' && <div className="coding-card-loading">Chargement des statistiques…</div>}

      {status === 'error' && (
        <div className="coding-card-loading">Voir mon profil {platform.name} →</div>
      )}

      {status === 'ready' && (
        <>
          <div className="coding-card-main">
            <span className="coding-solved">{stats.solved}</span>
            <span className="coding-solved-label">
              problèmes résolus{stats.total ? ` / ${stats.total}` : ''}
            </span>
          </div>

          <div className="coding-difficulties">
            {DIFFICULTIES.map(({ key, label, className }) => (
              <div key={key} className="coding-difficulty">
                <div className="coding-difficulty-row">
                  <span>{label}</span>
                  <span>{stats[key] ?? 0}</span>
                </div>
                <div className="coding-bar">
                  <div
                    className={`coding-bar-fill ${className}`}
                    style={{ width: `${stats.solved ? ((stats[key] ?? 0) / stats.solved) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="coding-card-footer">
            {stats.ranking && <span>🏆 Rang #{stats.ranking.toLocaleString('fr-FR')}</span>}
            {stats.flameScore !== undefined && stats.flameScore !== null && (
              <span>🔥 {stats.flameScore} Flame Score</span>
            )}
            <span className="coding-link">Voir le profil →</span>
          </div>
        </>
      )}
    </a>
  );
}

function CodingStats() {
  return (
    <div className="coding-stats">
      <h2 className="coding-stats-title">
        <i className='bx bx-trending-up'></i>
        Entraînement continu
      </h2>
      <p className="coding-stats-subtitle">
        Statistiques en temps réel, mises à jour automatiquement depuis mes profils.
      </p>
      <div className="coding-stats-grid">
        {PLATFORMS.map((platform) => (
          <StatCard key={platform.key} platform={platform} />
        ))}
      </div>
    </div>
  );
}

export default CodingStats;
