// Vercel Serverless Function: /api/coding-stats
// Provides aggregated, live-revalidated coding statistics for Alisam Srivardhan
// Profiles: LeetCode (Vardhann13), CodeChef (vardhann18), GitHub (Vardhan-1806)

const VERIFIED_SNAPSHOT = {
  status: 'success',
  source: 'snapshot',
  lastUpdated: Date.now(),
  leetcode: {
    username: 'Vardhann13',
    profileUrl: 'https://leetcode.com/u/Vardhann13/',
    totalSolved: 319,
    easySolved: 237,
    mediumSolved: 81,
    hardSolved: 1,
    ranking: 474671,
    rating: 1454,
    topPercent: '60.69%',
    contestsAttended: 7,
    activeDays: 103,
    totalSubmissions: 488,
    acceptedSubmissions: 334,
    badges: [
      { displayName: '100 Days Badge 2026', icon: 'assets/badges/100_days_2026.png', creationDate: '2026-10-15', id: 10901862 },
      { displayName: '50 Days Badge 2026', icon: 'assets/badges/50_days_2026.png', creationDate: '2026-08-25', id: 10696469 }
    ],
    contests: [
      { title: 'Weekly Contest 517', date: '2026-08-30', rating: 1356, rank: 16876 },
      { title: 'Weekly Contest 518', date: '2026-09-06', rating: 1399, rank: 9325 },
      { title: 'Biweekly Contest 191', date: '2026-09-12', rating: 1376, rank: 14292 },
      { title: 'Weekly Contest 519', date: '2026-09-13', rating: 1415, rank: 7730 },
      { title: 'Weekly Contest 522', date: '2026-10-04', rating: 1422, rank: 11199 },
      { title: 'Biweekly Contest 193', date: '2026-10-10', rating: 1423, rank: 9404 },
      { title: 'Weekly Contest 523', date: '2026-10-11', rating: 1454, rank: 6864 }
    ]
  },
  codechef: {
    username: 'vardhann18',
    profileUrl: 'https://www.codechef.com/users/vardhann18',
    rating: 1036,
    highestRating: 1036,
    stars: '1★',
    division: 'Div 4',
    globalRank: 137952,
    countryRank: 133148,
    contestsAttended: 4,
    contests: [
      { name: 'Starters 253', date: '2026-08-26', rating: 747, rank: 18290 },
      { name: 'Starters 254', date: '2026-09-02', rating: 823, rank: 18195 },
      { name: 'Starters 256', date: '2026-09-16', rating: 954, rank: 9303 },
      { name: 'Starters 260', date: '2026-10-14', rating: 1036, rank: 11307 }
    ]
  },
  github: {
    username: 'Vardhan-1806',
    profileUrl: 'https://github.com/Vardhan-1806',
    repos: 6,
    followers: 2,
    following: 2,
    totalContributions: 26,
    activeDays: 13
  }
};

module.exports = async (req, res) => {
  // CORS & 15-Minute Cache Headers (Edge CDN cache 900s, stale-while-revalidate 1800s)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=1800');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Clone verified base snapshot
  const result = JSON.parse(JSON.stringify(VERIFIED_SNAPSHOT));
  result.lastUpdated = Date.now();

  // Non-blocking fetch with short timeout to ensure ultra-fast response time
  const timeoutMs = 2800;

  async function fetchWithTimeout(url) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(id);
      if (response.ok) return await response.json();
    } catch (_) {
      clearTimeout(id);
    }
    return null;
  }

  try {
    const [lcGeneral, lcContests, ghProfile, ccHeatmap, ccRating, lcBadges] = await Promise.all([
      fetchWithTimeout('https://leetcode-api-faisalshohag.vercel.app/Vardhann13'),
      fetchWithTimeout('https://alfa-leetcode-api.onrender.com/userContestRankingInfo/Vardhann13'),
      fetchWithTimeout('https://api.github.com/users/Vardhan-1806'),
      fetchWithTimeout('https://codechef-stats.tashif.codes/vardhann18/heatmap'),
      fetchWithTimeout('https://codechef-stats.tashif.codes/vardhann18/rating'),
      fetchWithTimeout('https://alfa-leetcode-api.onrender.com/Vardhann13/badges')
    ]);

    if (lcGeneral && lcGeneral.totalSolved) {
      result.leetcode.totalSolved = lcGeneral.totalSolved;
      if (lcGeneral.easySolved) result.leetcode.easySolved = lcGeneral.easySolved;
      if (lcGeneral.mediumSolved) result.leetcode.mediumSolved = lcGeneral.mediumSolved;
      if (lcGeneral.hardSolved) result.leetcode.hardSolved = lcGeneral.hardSolved;
      if (lcGeneral.ranking) result.leetcode.ranking = lcGeneral.ranking;
      if (lcGeneral.submissionCalendar && typeof lcGeneral.submissionCalendar === 'object') {
        result.leetcode.activeDays = Object.keys(lcGeneral.submissionCalendar).length;
        result.leetcode.submissionCalendar = lcGeneral.submissionCalendar;
      }
      if (Array.isArray(lcGeneral.totalSubmissions) && lcGeneral.totalSubmissions[0]) {
        result.leetcode.totalSubmissions = lcGeneral.totalSubmissions[0].submissions || result.leetcode.totalSubmissions;
      }
      result.source = 'live-revalidated';
    }

    if (ccHeatmap && ccHeatmap.data) {
      if (Array.isArray(ccHeatmap.data.dailyContributions)) {
        result.codechef.dailyContributions = ccHeatmap.data.dailyContributions;
      }
      if (ccHeatmap.data.totalSubmissions) {
        result.codechef.totalSubmissions = ccHeatmap.data.totalSubmissions;
      }
      if (ccHeatmap.data.totalActiveDays) {
        result.codechef.totalActiveDays = ccHeatmap.data.totalActiveDays;
      }
      if (ccHeatmap.data.longestStreak) {
        result.codechef.longestStreak = ccHeatmap.data.longestStreak;
      }
      result.source = 'live-revalidated';
    }

    if (ccRating && ccRating.data && ccRating.data.current) {
      result.codechef.rating = ccRating.data.current.rating || result.codechef.rating;
      if (ccRating.data.current.stars) result.codechef.stars = ccRating.data.current.stars;
      if (ccRating.data.current.division) result.codechef.division = ccRating.data.current.division;
      if (ccRating.data.max && ccRating.data.max.rating) result.codechef.highestRating = ccRating.data.max.rating;
      result.source = 'live-revalidated';
    }

    if (lcContests && lcContests.userContestRanking) {
      const ucr = lcContests.userContestRanking;
      if (ucr.rating) result.leetcode.rating = Math.round(ucr.rating);
      if (ucr.topPercentage) result.leetcode.topPercent = ucr.topPercentage.toFixed(2) + '%';
      if (ucr.attendedContestsCount) result.leetcode.contestsAttended = ucr.attendedContestsCount;
      if (ucr.globalRanking) result.leetcode.ranking = ucr.globalRanking;

      if (Array.isArray(lcContests.userContestRankingHistory)) {
        const attended = lcContests.userContestRankingHistory.filter(h => h.attended);
        if (attended.length > 0) {
          result.leetcode.contests = attended.map(c => ({
            title: c.contest ? c.contest.title : 'Contest',
            date: c.contest && c.contest.startTime ? new Date(c.contest.startTime * 1000).toISOString().split('T')[0] : '',
            rating: Math.round(c.rating),
            rank: c.ranking
          }));
        }
      }
      result.source = 'live-revalidated';
    }

    if (ghProfile && ghProfile.public_repos !== undefined) {
      result.github.repos = ghProfile.public_repos;
      result.github.followers = ghProfile.followers;
      result.github.following = ghProfile.following;
      result.source = 'live-revalidated';
    }

    // Process LeetCode badges from live API
    if (lcBadges && lcBadges.badges && Array.isArray(lcBadges.badges)) {
      const liveBadges = lcBadges.badges.map(b => ({
        displayName: b.displayName || b.name || 'Badge',
        icon: b.icon || '',
        creationDate: b.creationDate ? new Date(b.creationDate).toISOString().split('T')[0] : '',
        id: b.id || 0
      }));
      if (liveBadges.length > 0) {
        result.leetcode.badges = liveBadges;
        result.source = 'live-revalidated';
      }
    }
  } catch (_) {
    // If external calls fail, verified snapshot is reliably delivered
  }

  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json(result);
};
