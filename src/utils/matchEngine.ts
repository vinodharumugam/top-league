import { Squad, MatchSimEvent, MatchSimResult, ManOfTheMatch } from '../types/dreamteam';
import { DreamTeamPlayer } from '../types/player';

const COMMENTARY = {
  goal: [
    '{player} scores a brilliant goal! What a finish!',
    'GOOOAL! {player} puts it in the back of the net!',
    '{player} smashes it home! The crowd goes wild!',
    'What a strike by {player}! Unstoppable!',
    '{player} heads it in! Perfect timing!',
    'Cool as ice, {player} slots it past the keeper!',
    '{player} curls it into the top corner! INCREDIBLE!',
    'TAP IN! {player} was in the right place at the right time!',
    '{player} with a rocket from outside the box! GET IN!',
    'The keeper had no chance! {player} makes it look easy!',
  ],
  save: [
    'Great save by the goalkeeper! {player}\'s shot is denied!',
    'What a stop! {player}\'s effort is saved brilliantly!',
    '{player} fires it in but the keeper is equal to it!',
    'AMAZING SAVE! {player} thought that was going in!',
    'The keeper dives full stretch to keep out {player}\'s shot!',
    '{player} goes close but the keeper pushes it wide!',
  ],
  chance: [
    '{player} creates a great chance but it goes wide!',
    'Close! {player} hits the crossbar!',
    '{player} has a shot but it\'s just over the bar!',
    'Good build-up play by {player} but no goal this time.',
    '{player} cuts inside and shoots... just wide!',
    'OH SO CLOSE! {player} hits the post!',
    '{player} with a beautiful run but the final ball is just off!',
    'Great pass finds {player} but the shot is dragged wide!',
    '{player} tries a long-range effort... flies over the bar!',
    '{player} gets in behind the defence but can\'t finish!',
  ],
  foul: [
    'Foul by {player}. Free kick awarded.',
    '{player} makes a tough challenge. The referee blows.',
    '{player} slides in late. Free kick given.',
    'That\'s a foul! {player} catches the opponent.',
  ],
  card: [
    'Yellow card for {player}! The referee reaches for his pocket.',
    '{player} goes into the book! That\'s a yellow card.',
  ],
  injury_minor: [
    '{player} is down after that tackle... looks like a knock. They\'re limping but staying on.',
    '{player} took a hit there. The physio comes on to check. They\'ll continue but look uncomfortable.',
    'Ouch! {player} feels the challenge. They shake it off but they\'re not moving as freely.',
  ],
  injury_bad: [
    '{player} is DOWN! That was a really bad tackle. The stretcher is coming on...',
    'Oh no! {player} is holding their leg after that collision. This doesn\'t look good at all!',
    '{player} can\'t continue! They\'re being carried off the pitch. A big loss for the team!',
  ],
  buildup: [
    'Nice passing move in midfield. Both teams probing for openings.',
    'The ball is being played around patiently. Looking for a gap.',
    'Great pressing from the defence. Winning the ball back quickly.',
    'Corner kick! The ball swings in...',
    'Free kick from a dangerous position...',
    'Quick throw-in leads to a promising attack.',
    'Brilliant dribble down the wing! Can they deliver the cross?',
    'The crowd is getting louder! The atmosphere is electric!',
    'End-to-end stuff now! Both teams pushing forward!',
    'A long ball over the top... the striker chases it down!',
    'Neat one-two on the edge of the box!',
    'The tempo is picking up here! Great entertainment!',
  ],
  midfield_domination: [
    'Total midfield dominance here. {team} controlling the game.',
    '{team} are passing rings around the opposition midfield.',
    'The midfield battle is being won convincingly by {team}.',
  ],
  counter_attack: [
    'COUNTER ATTACK! {player} uses their pace to burst forward!',
    '{player} picks up the ball and sprints past the defenders!',
    'Breakaway! {player} is too quick for the defence!',
  ],
  momentum: [
    'The momentum has shifted! {team} are all over them now!',
    '{team} are fired up after that goal! They smell blood!',
    'The confidence is flowing through {team}! They want another!',
  ],
  fatigue: [
    'Players are tiring now. The legs are getting heavy.',
    'You can see the fatigue setting in. Passes are going astray.',
    'Both teams looking exhausted in these final minutes.',
  ],
  gk_heroic: [
    'The goalkeeper is having the game of his life! Another incredible save!',
    'UNBELIEVABLE KEEPING! He\'s single-handedly keeping his team in this!',
  ],
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// =============================================
// TEAM ANALYSIS — calculate real tactical stats
// =============================================

interface TeamAnalysis {
  squad: Squad;
  attackPower: number;      // FWD shooting + pace average
  midfieldControl: number;  // MID passing + shooting average
  defenceStrength: number;  // DEF defending + physical average
  gkRating: number;         // Goalkeeper overall
  teamPace: number;         // Average pace of attackers (for counters)
  teamPhysical: number;     // Average physical (for fatigue resistance)
  players: {
    gk: DreamTeamPlayer[];
    def: DreamTeamPlayer[];
    mid: DreamTeamPlayer[];
    fwd: DreamTeamPlayer[];
  };
}

function analyzeTeam(squad: Squad): TeamAnalysis {
  const gk = squad.players.filter((p) => p.position === 'GK');
  const def = squad.players.filter((p) => p.position === 'DEF');
  const mid = squad.players.filter((p) => p.position === 'MID');
  const fwd = squad.players.filter((p) => p.position === 'FWD');

  const avg = (players: DreamTeamPlayer[], stat: keyof DreamTeamPlayer) => {
    if (players.length === 0) return 50;
    return players.reduce((sum, p) => sum + (p[stat] as number), 0) / players.length;
  };

  return {
    squad,
    attackPower: (avg(fwd, 'shooting') * 0.6 + avg(fwd, 'pace') * 0.4),
    midfieldControl: (avg(mid, 'passing') * 0.5 + avg(mid, 'shooting') * 0.25 + avg(mid, 'defending') * 0.25),
    defenceStrength: (avg(def, 'defending') * 0.6 + avg(def, 'physical') * 0.3 + avg(def, 'pace') * 0.1),
    gkRating: gk.length > 0 ? gk[0].rating : 50,
    teamPace: avg([...fwd, ...mid], 'pace'),
    teamPhysical: avg(squad.players, 'physical'),
    players: { gk, def, mid, fwd },
  };
}

// =============================================
// MATCH SIMULATION
// =============================================

export function simulateMatch(homeSquad: Squad, awaySquad: Squad): MatchSimResult {
  const home = analyzeTeam(homeSquad);
  const away = analyzeTeam(awaySquad);
  const events: MatchSimEvent[] = [];
  let homeGoals = 0;
  let awayGoals = 0;

  // Momentum: starts at 0, positive = home momentum, negative = away
  let momentum = 0;

  // Track player performance
  const playerStats: Record<string, { team: 'home' | 'away'; goals: number; saves: number; chances: number }> = {};
  const trackPlayer = (name: string, team: 'home' | 'away', type: 'goal' | 'save' | 'chance') => {
    if (!name) return;
    if (!playerStats[name]) playerStats[name] = { team, goals: 0, saves: 0, chances: 0 };
    if (type === 'goal') playerStats[name].goals++;
    else if (type === 'save') playerStats[name].saves++;
    else playerStats[name].chances++;
  };

  // Track injuries
  const injuredPlayers: Record<string, 'minor' | 'bad'> = {};

  // Kickoff
  events.push({
    minute: 0,
    type: 'kickoff',
    team: 'home',
    player: '',
    commentary: 'The referee blows the whistle! The match has begun!',
  });

  for (let minute = 1; minute <= 90; minute++) {
    // ---- FATIGUE: players lose effectiveness after minute 70 ----
    const fatigueMultiplier = minute > 75
      ? 0.85 - ((minute - 75) * 0.01) // drops from 0.85 to ~0.70 by minute 90
      : minute > 65
      ? 0.92
      : 1.0;

    // Teams with higher physical resist fatigue better
    const homeFatigue = fatigueMultiplier + (home.teamPhysical - 70) * 0.002;
    const awayFatigue = fatigueMultiplier + (away.teamPhysical - 70) * 0.002;

    // Fatigue commentary
    if (minute === 70 && Math.random() < 0.6) {
      events.push({ minute, type: 'chance', team: 'home', player: '', commentary: pickRandom(COMMENTARY.fatigue) });
    }

    // ---- MIDFIELD BATTLE: determines who gets more possession ----
    // Higher midfield control = more attacks
    const homeMidPower = home.midfieldControl * homeFatigue + momentum * 2;
    const awayMidPower = away.midfieldControl * awayFatigue - momentum * 2;
    const possessionChance = homeMidPower / (homeMidPower + awayMidPower);

    // ~12% chance of an event each minute
    if (Math.random() > 0.88) {
      // Midfield decides who attacks — not a coin flip, based on real midfield stats
      const isHome = Math.random() < possessionChance;
      const attackTeam = isHome ? 'home' : 'away';
      const attAnalysis = isHome ? home : away;
      const defAnalysis = isHome ? away : home;

      // Pick an attacker
      const attackers = [...attAnalysis.players.fwd, ...attAnalysis.players.mid];
      if (attackers.length === 0) continue;
      const attacker = pickRandom(attackers);
      const attackerName = attacker.name;

      // Check if attacker is injured
      const injuryState = injuredPlayers[attackerName];
      const injuryPenalty = injuryState === 'bad' ? 0.15 : injuryState === 'minor' ? 0.6 : 1.0;

      // ---- COUNTER ATTACK: fast players vs slow defenders ----
      const isCounter = Math.random() < 0.2; // 20% of attacks are counters
      let counterBonus = 0;
      if (isCounter && attacker.pace > 85) {
        const avgDefPace = defAnalysis.players.def.length > 0
          ? defAnalysis.players.def.reduce((s, d) => s + d.pace, 0) / defAnalysis.players.def.length
          : 70;
        const paceGap = attacker.pace - avgDefPace;
        if (paceGap > 5) {
          counterBonus = paceGap * 0.005; // up to ~0.075 bonus
          events.push({
            minute, type: 'chance', team: attackTeam, player: attackerName,
            commentary: pickRandom(COMMENTARY.counter_attack).replace('{player}', attackerName),
          });
        }
      }

      // ---- SHOT OUTCOME: attacker shooting vs defender + goalkeeper ----
      const shotPower = (attacker.shooting * injuryPenalty) / 100;
      const bestDefender = defAnalysis.players.def.length > 0
        ? defAnalysis.players.def.reduce((best, d) => d.defending > best.defending ? d : best)
        : null;
      const defBlock = bestDefender ? (bestDefender.defending / 100) * 0.25 : 0.12;
      const gkSave = (defAnalysis.gkRating / 100) * 0.2;

      // Goal probability = attacker skill vs defence + GK, with momentum & counter bonus
      const momentumBonus = (isHome ? momentum : -momentum) * 0.015;
      const goalChance = (shotPower * 0.55 - defBlock - gkSave + counterBonus + momentumBonus) * injuryPenalty;

      // Clamp between 5% and 40%
      const finalGoalChance = Math.max(0.05, Math.min(0.40, goalChance));

      const outcome = Math.random();

      if (outcome < finalGoalChance) {
        // ---- GOAL! ----
        if (isHome) homeGoals++;
        else awayGoals++;
        trackPlayer(attackerName, attackTeam, 'goal');

        // Momentum shift towards scoring team
        momentum += isHome ? 3 : -3;
        momentum = Math.max(-8, Math.min(8, momentum));

        events.push({
          minute, type: 'goal', team: attackTeam, player: attackerName,
          commentary: pickRandom(COMMENTARY.goal).replace('{player}', attackerName),
        });

        // Momentum commentary
        if (Math.abs(momentum) >= 4 && Math.random() < 0.5) {
          const teamName = isHome ? homeSquad.name : awaySquad.name;
          events.push({
            minute, type: 'chance', team: attackTeam, player: '',
            commentary: pickRandom(COMMENTARY.momentum).replace('{team}', teamName),
          });
        }

      } else if (outcome < finalGoalChance + 0.15) {
        // ---- SAVE: GK rating determines quality ----
        trackPlayer(attackerName, attackTeam, 'save');
        const gkName = defAnalysis.players.gk[0]?.name || 'The keeper';

        // Heroic save if GK is very good and makes a tough stop
        if (defAnalysis.gkRating >= 90 && Math.random() < 0.3) {
          events.push({
            minute, type: 'save', team: attackTeam, player: attackerName,
            commentary: pickRandom(COMMENTARY.gk_heroic),
          });
        } else {
          events.push({
            minute, type: 'save', team: attackTeam, player: attackerName,
            commentary: pickRandom(COMMENTARY.save).replace('{player}', attackerName),
          });
        }

      } else if (outcome < finalGoalChance + 0.35) {
        // ---- CHANCE: missed ----
        trackPlayer(attackerName, attackTeam, 'chance');
        events.push({
          minute, type: 'chance', team: attackTeam, player: attackerName,
          commentary: pickRandom(COMMENTARY.chance).replace('{player}', attackerName),
        });

      } else if (outcome < finalGoalChance + 0.48) {
        // ---- FOUL by defending team ----
        const defenders = defAnalysis.players.def.length > 0 ? defAnalysis.players.def : defAnalysis.players.mid;
        const fouler = defenders.length > 0 ? pickRandom(defenders).name : 'a defender';
        const defTeam = isHome ? 'away' : 'home';

        events.push({
          minute, type: 'foul', team: defTeam, player: fouler,
          commentary: pickRandom(COMMENTARY.foul).replace('{player}', fouler),
        });

        // Yellow card chance — worse physical = more fouls = more cards
        const foulerPlayer = defenders.find((d) => d.name === fouler);
        const cardChance = foulerPlayer ? (100 - foulerPlayer.physical) * 0.005 : 0.2;
        if (Math.random() < cardChance) {
          events.push({
            minute, type: 'card', team: defTeam, player: fouler,
            commentary: pickRandom(COMMENTARY.card).replace('{player}', fouler),
          });
        }

        // Injury — ~8% chance, based on defender's physical (higher physical = harder tackle)
        if (Math.random() < 0.08) {
          const victims = attAnalysis.squad.players.filter((p) => !injuredPlayers[p.name]);
          if (victims.length > 0) {
            const victim = pickRandom(victims);
            // Bad injury more likely from high-physical defenders
            const badChance = foulerPlayer ? foulerPlayer.physical * 0.004 : 0.3;
            const isBad = Math.random() < badChance;
            injuredPlayers[victim.name] = isBad ? 'bad' : 'minor';
            events.push({
              minute, type: 'injury', team: attackTeam, player: victim.name,
              commentary: isBad
                ? pickRandom(COMMENTARY.injury_bad).replace('{player}', victim.name)
                : pickRandom(COMMENTARY.injury_minor).replace('{player}', victim.name),
            });
          }
        }
      } else {
        // ---- BUILD-UP PLAY ----
        // Midfield domination commentary if one side is much stronger
        if (Math.abs(possessionChance - 0.5) > 0.15 && Math.random() < 0.3) {
          const domTeam = possessionChance > 0.5 ? homeSquad.name : awaySquad.name;
          events.push({
            minute, type: 'chance', team: attackTeam, player: '',
            commentary: pickRandom(COMMENTARY.midfield_domination).replace('{team}', domTeam),
          });
        } else {
          events.push({
            minute, type: 'chance', team: attackTeam, player: '',
            commentary: pickRandom(COMMENTARY.buildup),
          });
        }
      }
    }

    // Momentum slowly decays back towards neutral
    if (momentum > 0) momentum -= 0.15;
    else if (momentum < 0) momentum += 0.15;

    // Half time
    if (minute === 45) {
      // Reset momentum at half time
      momentum = 0;
      events.push({
        minute: 45, type: 'halftime', team: 'home', player: '',
        commentary: `Half time! ${homeSquad.name} ${homeGoals} - ${awayGoals} ${awaySquad.name}`,
      });
    }
  }

  // Full time
  events.push({
    minute: 90, type: 'fulltime', team: 'home', player: '',
    commentary: `Full time! ${homeSquad.name} ${homeGoals} - ${awayGoals} ${awaySquad.name}`,
  });

  // ---- MAN OF THE MATCH ----
  let bestPlayer = '';
  let bestScore = -1;
  let bestTeam: 'home' | 'away' = 'home';
  let bestGoals = 0;
  let bestSaves = 0;
  let bestChances = 0;

  for (const [name, stats] of Object.entries(playerStats)) {
    const score = stats.goals * 5 + stats.saves * 3 + stats.chances * 1;
    if (score > bestScore) {
      bestScore = score;
      bestPlayer = name;
      bestTeam = stats.team;
      bestGoals = stats.goals;
      bestSaves = stats.saves;
      bestChances = stats.chances;
    }
  }

  const motmRating = Math.min(10, 6 + bestGoals * 1.2 + bestSaves * 0.8 + bestChances * 0.3);

  const motm: ManOfTheMatch = {
    name: bestPlayer || 'Unknown',
    team: bestTeam,
    goals: bestGoals,
    saves: bestSaves,
    chances: bestChances,
    rating: Math.round(motmRating * 10) / 10,
  };

  return {
    homeSquad,
    awaySquad,
    homeGoals,
    awayGoals,
    events,
    winner: homeGoals > awayGoals ? 'home' : awayGoals > homeGoals ? 'away' : 'draw',
    motm,
  };
}
