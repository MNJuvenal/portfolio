# portfolio

[![LeetCode](https://portfolio-hwg8.onrender.com/api/badge/leetcode.svg)](https://leetcode.com/u/lajuve01/)
[![Deep-ML](https://portfolio-hwg8.onrender.com/api/badge/deepml.svg)](https://www.deep-ml.com/profile/JrKuyw4UG7SbUZeJiSxoiJjRleg2)

[![LeetCode stats](https://leetcard.jacoblin.cool/lajuve01?theme=dark&font=Inter)](https://leetcode.com/u/lajuve01/)

## Badges dynamiques

Le backend expose mes statistiques LeetCode et Deep-ML, mises en cache 1h :

| Route | Rôle |
| --- | --- |
| `GET /api/stats/leetcode` | Stats JSON (via l'API GraphQL publique de LeetCode) |
| `GET /api/stats/deepml` | Stats JSON (extraites de la page profil Deep-ML) |
| `GET /api/badge/leetcode.svg` | Badge SVG |
| `GET /api/badge/deepml.svg` | Badge SVG |
