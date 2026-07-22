const MLB_LEAGUE_BY_TEAM: Record<string, string> = {
  'Arizona Diamondbacks': 'NL',
  'Athletics': 'AL',
  'Atlanta Braves': 'NL',
  'Baltimore Orioles': 'AL',
  'Boston Red Sox': 'AL',
  'Chicago Cubs': 'NL',
  'Chicago White Sox': 'AL',
  'Cincinnati Reds': 'NL',
  'Cleveland Guardians': 'AL',
  'Colorado Rockies': 'NL',
  'Detroit Tigers': 'AL',
  'Houston Astros': 'AL',
  'Kansas City Royals': 'AL',
  'Los Angeles Angels': 'AL',
  'Los Angeles Dodgers': 'NL',
  'Miami Marlins': 'NL',
  'Milwaukee Brewers': 'NL',
  'Minnesota Twins': 'AL',
  'New York Mets': 'NL',
  'New York Yankees': 'AL',
  'Philadelphia Phillies': 'NL',
  'Pittsburgh Pirates': 'NL',
  'San Diego Padres': 'NL',
  'San Francisco Giants': 'NL',
  'Seattle Mariners': 'AL',
  'St. Louis Cardinals': 'NL',
  'Tampa Bay Rays': 'AL',
  'Texas Rangers': 'AL',
  'Toronto Blue Jays': 'AL',
  'Washington Nationals': 'NL'
};

const VALID_MLB_LEAGUES = new Set(['AL', 'NL']);

const SPORT_FALLBACK_LEAGUE: Record<string, string> = {
  nba: 'NBA',
  nfl: 'NFL',
  nhl: 'NHL',
  pga: 'PGA'
};

export function resolveLeagueValueForSport(sport: string, teamName: string, league: any): string {
  const sportKey = String(sport || '').trim().toLowerCase();
  const leagueCode = String(league || '').trim().toUpperCase();

  if (sportKey === 'mlb') {
    if (VALID_MLB_LEAGUES.has(leagueCode)) {
      return leagueCode;
    }

    const normalizedTeamName = String(teamName || '').trim();
    return MLB_LEAGUE_BY_TEAM[normalizedTeamName] || '';
  }

  if (leagueCode) {
    return leagueCode;
  }

  return SPORT_FALLBACK_LEAGUE[sportKey] || '';
}