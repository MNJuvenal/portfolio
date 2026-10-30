// Statistiques LeetCode / Deep-ML + badges SVG dynamiques
const express = require('express');

const LEETCODE_USER = process.env.LEETCODE_USER || 'lajuve01';
const DEEPML_USER_ID = process.env.DEEPML_USER_ID || 'JrKuyw4UG7SbUZeJiSxoiJjRleg2';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1h : évite de spammer les sources (et Render qui dort)

const cache = new Map();

// Retourne la valeur en cache si fraîche, sinon recharge.
// En cas d'erreur, on renvoie la dernière valeur connue plutôt qu'un badge cassé.
const cached = async (key, loader) => {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.time < CACHE_TTL_MS) return entry.value;
  try {
    const value = await loader();
    cache.set(key, { value, time: Date.now() });
    return value;
  } catch (error) {
    console.error(`❌ Erreur stats ${key}:`, error.message);
    if (entry) return entry.value;
    throw error;
  }
};

const fetchLeetCode = async () => {
  const response = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Referer: 'https://leetcode.com' },
    body: JSON.stringify({
      query: `query($u: String!) {
        matchedUser(username: $u) {
          profile { ranking }
          submitStatsGlobal { acSubmissionNum { difficulty count } }
        }
        allQuestionsCount { difficulty count }
      }`,
      variables: { u: LEETCODE_USER }
    }),
    signal: AbortSignal.timeout(10000)
  });
  if (!response.ok) throw new Error(`LeetCode HTTP ${response.status}`);

  const { data } = await response.json();
  if (!data || !data.matchedUser) throw new Error('Utilisateur LeetCode introuvable');

  const toMap = (list) => Object.fromEntries(list.map(({ difficulty, count }) => [difficulty, count]));
  const solved = toMap(data.matchedUser.submitStatsGlobal.acSubmissionNum);
  const total = toMap(data.allQuestionsCount);

  return {
    platform: 'leetcode',
    username: LEETCODE_USER,
    profileUrl: `https://leetcode.com/u/${LEETCODE_USER}/`,
    solved: solved.All,
    total: total.All,
    easy: solved.Easy,
    medium: solved.Medium,
    hard: solved.Hard,
    ranking: data.matchedUser.profile.ranking
  };
};

// Deep-ML rend la page côté client, mais la balise <meta name="description">
// est générée côté serveur et contient le résumé du profil :
// "... · 11 problems solved (Easy 82% · Medium 18% · Hard 0%) · 🔥 140 Flame Score · 0 day streak."
const parseDeepML = (html) => {
  const meta = html.match(/<meta name="description" content="([^"]*)"/);
  if (!meta) throw new Error('Description Deep-ML introuvable');
  const text = meta[1];

  const number = (regex) => {
    const match = text.match(regex);
    return match ? parseInt(match[1], 10) : null;
  };

  const solved = number(/(\d+) problems? solved/);
  if (solved === null) throw new Error('Format Deep-ML inattendu');

  // Les pourcentages sont convertis en nombres de problèmes
  const fromPercent = (label) => {
    const percent = number(new RegExp(`${label} (\\d+)%`));
    return percent === null ? null : Math.round((solved * percent) / 100);
  };

  return {
    solved,
    easy: fromPercent('Easy'),
    medium: fromPercent('Medium'),
    hard: fromPercent('Hard'),
    flameScore: number(/(\d+) Flame Score/),
    streak: number(/(\d+) day streak/)
  };
};

const fetchDeepML = async () => {
  const profileUrl = `https://www.deep-ml.com/profile/${DEEPML_USER_ID}`;
  const response = await fetch(profileUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (portfolio-badge)' },
    signal: AbortSignal.timeout(10000)
  });
  if (!response.ok) throw new Error(`Deep-ML HTTP ${response.status}`);

  return { platform: 'deepml', profileUrl, ...parseDeepML(await response.text()) };
};

const escapeXml = (value) =>
  String(value).replace(/[<>&"']/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]);

// Badge SVG au format "shields" : [ label | valeur ]
const renderBadge = (label, value, color) => {
  const charWidth = 7;
  const labelWidth = label.length * charWidth + 20;
  const valueWidth = value.length * charWidth + 20;
  const width = labelWidth + valueWidth;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="28" role="img" aria-label="${escapeXml(label)}: ${escapeXml(value)}">
  <title>${escapeXml(label)}: ${escapeXml(value)}</title>
  <rect width="${labelWidth}" height="28" fill="#1a1a2e"/>
  <rect x="${labelWidth}" width="${valueWidth}" height="28" fill="${color}"/>
  <g fill="#fff" font-family="Verdana,DejaVu Sans,sans-serif" font-size="11" font-weight="bold" text-anchor="middle">
    <text x="${labelWidth / 2}" y="18">${escapeXml(label)}</text>
    <text x="${labelWidth + valueWidth / 2}" y="18">${escapeXml(value)}</text>
  </g>
</svg>`;
};

const sendBadge = (res, svg) => {
  res.set('Content-Type', 'image/svg+xml; charset=utf-8');
  // GitHub (camo) met les images en cache : on limite à 1h
  res.set('Cache-Control', 'public, max-age=3600');
  res.send(svg);
};

const router = express.Router();

router.get('/stats/leetcode', async (req, res) => {
  try {
    res.json(await cached('leetcode', fetchLeetCode));
  } catch (error) {
    res.status(502).json({ error: 'Statistiques LeetCode indisponibles' });
  }
});

router.get('/stats/deepml', async (req, res) => {
  try {
    res.json(await cached('deepml', fetchDeepML));
  } catch (error) {
    res.status(502).json({ error: 'Statistiques Deep-ML indisponibles' });
  }
});

router.get('/badge/leetcode.svg', async (req, res) => {
  try {
    const stats = await cached('leetcode', fetchLeetCode);
    sendBadge(res, renderBadge('LeetCode', `${stats.solved} solved · E${stats.easy} M${stats.medium} H${stats.hard}`, '#ffa116'));
  } catch (error) {
    sendBadge(res, renderBadge('LeetCode', 'indisponible', '#555'));
  }
});

router.get('/badge/deepml.svg', async (req, res) => {
  try {
    const stats = await cached('deepml', fetchDeepML);
    sendBadge(res, renderBadge('Deep-ML', `${stats.solved} solved · 🔥 ${stats.flameScore ?? 0}`, '#7c3aed'));
  } catch (error) {
    sendBadge(res, renderBadge('Deep-ML', 'indisponible', '#555'));
  }
});

module.exports = { router, parseDeepML };
