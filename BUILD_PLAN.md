# ⚽ Top League - Build Plan

### 🏗️ Built by Rayden | Soccer App for the Ultimate Fan

---

## 📋 Project Overview

**Top League** is a soccer app that brings together the Big 5 European leagues, live transfers, match highlights, and a Dream Team game where you build your squad and watch them play!

**Tech Stack:**
- 📱 React Native + Expo (mobile app framework)
- 🔷 TypeScript (typed JavaScript)
- ⚡ API-Football (live soccer data)
- 🗄️ Supabase (backend database & auth)

---

## 🗺️ Full Project Structure (What We're Building)

```
TopLeague/
├── App.tsx                          # ✅ Done - App entry point
├── app.json                         # ✅ Done - Expo config
├── index.ts                         # ✅ Done - Register app
├── package.json                     # ✅ Done - Dependencies
├── tsconfig.json                    # ✅ Done - TypeScript config
├── assets/                          # App images & icons
│   ├── league-logos/                # League crest images
│   ├── animations/                  # Lottie animations for match sim
│   └── icons/                       # Custom tab & UI icons
└── src/
    ├── constants/
    │   ├── colors.ts                # ✅ Done - App color palette
    │   ├── leagues.ts               # League IDs, names, logos
    │   ├── tiers.ts                 # Dream Team tier pricing
    │   └── config.ts                # API keys, Supabase URL
    ├── types/
    │   ├── league.ts                # League, Standing, Team types
    │   ├── player.ts                # Player, Transfer types
    │   ├── match.ts                 # Fixture, Score, Highlight types
    │   └── dreamteam.ts             # DreamTeam, Squad types
    ├── services/
    │   ├── api.ts                   # API-Football base client
    │   ├── leagueService.ts         # Standings, fixtures, POTM calls
    │   ├── transferService.ts       # Transfer feed API calls
    │   ├── highlightService.ts      # Match highlights API calls
    │   └── supabase.ts              # Supabase client & helpers
    ├── hooks/
    │   ├── useStandings.ts          # Fetch & cache standings
    │   ├── useFixtures.ts           # Fetch & cache match results
    │   ├── useTransfers.ts          # Fetch & cache transfers
    │   ├── useHighlights.ts         # Fetch & cache highlights
    │   └── useDreamTeam.ts          # Dream Team game state
    ├── components/
    │   ├── common/
    │   │   ├── LoadingSpinner.tsx    # Reusable loading indicator
    │   │   ├── ErrorMessage.tsx      # Reusable error display
    │   │   ├── Card.tsx             # Reusable card component
    │   │   └── Badge.tsx            # Stat badges & labels
    │   ├── league/
    │   │   ├── LeagueSelector.tsx    # Tab bar to pick a league
    │   │   ├── StandingsTable.tsx    # Full standings table
    │   │   ├── StandingsRow.tsx      # Single team row
    │   │   ├── FixtureCard.tsx       # Single match result card
    │   │   ├── FixtureList.tsx       # Scrollable match list
    │   │   └── PlayerOfMonth.tsx     # POTM spotlight card
    │   ├── transfers/
    │   │   ├── TransferCard.tsx      # Single transfer item
    │   │   ├── TransferFeed.tsx      # Scrollable transfer list
    │   │   └── TransferFilter.tsx    # Filter by league/type
    │   ├── highlights/
    │   │   ├── HighlightCard.tsx     # Video thumbnail card
    │   │   └── HighlightPlayer.tsx   # Video player component
    │   └── dreamteam/
    │       ├── BudgetBar.tsx         # Budget remaining display
    │       ├── TierSelector.tsx      # Pick a tier to browse
    │       ├── PlayerCard.tsx        # Player card (pick/remove)
    │       ├── FormationView.tsx     # Visual formation layout
    │       ├── SquadList.tsx         # List of picked players
    │       └── MatchSimulation.tsx   # Animated match simulator
    ├── navigation/
    │   ├── TabNavigator.tsx         # ✅ Done - Bottom tabs
    │   ├── LeagueStack.tsx          # League detail navigation
    │   └── DreamTeamStack.tsx       # Dream Team flow navigation
    └── screens/
        ├── HomeScreen.tsx           # ✅ Done - Main landing
        ├── LeaguesScreen.tsx        # ✅ Done - League browser
        ├── DreamTeamScreen.tsx      # ✅ Done - Dream Team hub
        ├── MoreScreen.tsx           # ✅ Done - Settings/extras
        ├── LeagueDetailScreen.tsx   # Single league deep dive
        ├── MatchDetailScreen.tsx    # Single match details
        ├── TransfersScreen.tsx      # Transfer feed screen
        ├── HighlightsScreen.tsx     # Highlights browser
        ├── PlayerPickScreen.tsx     # Browse & pick players
        ├── FormationScreen.tsx      # Set your formation
        ├── MatchSimScreen.tsx       # Watch your team play!
        └── MultiplayerScreen.tsx    # Challenge a friend
```

---

## 🏟️ Phase 1: Foundation (IN PROGRESS)

> **Goal:** Get the app running with navigation and placeholder screens

### ✅ Completed Tasks
- [x] Create Expo project with TypeScript template
- [x] Install dependencies: `react-navigation`, `bottom-tabs`, `safe-area-context`
- [x] Create `src/constants/colors.ts` - app color palette (dark green + gold theme)
- [x] Create `src/navigation/TabNavigator.tsx` - bottom tab navigator with 4 tabs
- [x] Create `src/screens/HomeScreen.tsx` - league cards, feature cards, play button
- [x] Create `src/screens/LeaguesScreen.tsx` - league selector + standings placeholder
- [x] Create `src/screens/DreamTeamScreen.tsx` - budget display + tier info
- [x] Create `src/screens/MoreScreen.tsx` - menu items list
- [x] Wire up `App.tsx` with `NavigationContainer` + `TabNavigator`

### 🔲 Remaining Tasks
- [ ] **Test the app runs** - Run `npx expo start` and check for errors
- [ ] **Fix any issues** - Debug crashes, missing imports, layout problems
- [ ] **Add league logos** to `assets/league-logos/` (Premier League, La Liga, etc.)
- [ ] **Polish Home Screen** - Make sure cards look good, spacing is right
- [ ] **Add app icon & splash screen** - Update `app.json` with custom branding

### 📁 Files for Phase 1
| File | Status |
|------|--------|
| `App.tsx` | ✅ Done |
| `src/navigation/TabNavigator.tsx` | ✅ Done |
| `src/screens/HomeScreen.tsx` | ✅ Done |
| `src/screens/LeaguesScreen.tsx` | ✅ Done |
| `src/screens/DreamTeamScreen.tsx` | ✅ Done |
| `src/screens/MoreScreen.tsx` | ✅ Done |
| `src/constants/colors.ts` | ✅ Done |
| `assets/icon.png` | 🔲 To Do |
| `assets/splash.png` | 🔲 To Do |

---

## 📊 Phase 2: League Data

> **Goal:** Connect to API-Football and show real standings, fixtures, and Player of the Month

### Tasks

#### 2A - API Setup 🔌
- [ ] Sign up for [API-Football](https://www.api-football.com/) and get API key
- [ ] Create `src/constants/config.ts` - store API key and base URL
- [ ] Create `src/constants/leagues.ts` - league IDs for the Big 5:
  - Premier League (ID: 39)
  - La Liga (ID: 140)
  - Serie A (ID: 135)
  - Bundesliga (ID: 78)
  - Ligue 1 (ID: 61)
- [ ] Create `src/services/api.ts` - base API client with fetch wrapper
- [ ] Create `src/types/league.ts` - TypeScript types for standings, teams, fixtures

#### 2B - Standings 🏆
- [ ] Create `src/services/leagueService.ts` - `getStandings(leagueId)` function
- [ ] Create `src/hooks/useStandings.ts` - hook that fetches & caches standings
- [ ] Create `src/components/league/StandingsRow.tsx` - single team row (position, logo, name, P, W, D, L, Pts)
- [ ] Create `src/components/league/StandingsTable.tsx` - scrollable table with header
- [ ] Update `src/screens/LeaguesScreen.tsx` - replace placeholder with real standings
- [ ] Create `src/components/league/LeagueSelector.tsx` - horizontal scrolling league tabs with logos

#### 2C - Fixtures & Results ⚽
- [ ] Add `getFixtures(leagueId, round)` to `src/services/leagueService.ts`
- [ ] Create `src/hooks/useFixtures.ts` - hook for match results
- [ ] Create `src/components/league/FixtureCard.tsx` - match card (home vs away, score, date)
- [ ] Create `src/components/league/FixtureList.tsx` - scrollable list of fixtures
- [ ] Create `src/screens/LeagueDetailScreen.tsx` - tabs for Standings / Fixtures / POTM
- [ ] Create `src/screens/MatchDetailScreen.tsx` - detailed match view (lineups, events)

#### 2D - Player of the Month 🌟
- [ ] Add `getTopScorers(leagueId)` to `src/services/leagueService.ts`
- [ ] Create `src/components/league/PlayerOfMonth.tsx` - spotlight card with photo, stats, team
- [ ] Add POTM section to `LeagueDetailScreen.tsx`

#### 2E - Navigation 🧭
- [ ] Create `src/navigation/LeagueStack.tsx` - stack navigator (Leagues -> LeagueDetail -> MatchDetail)
- [ ] Update `TabNavigator.tsx` to use `LeagueStack` for the Leagues tab

### 📁 New Files for Phase 2
| File | Purpose |
|------|---------|
| `src/constants/config.ts` | API key & URLs |
| `src/constants/leagues.ts` | Big 5 league IDs & info |
| `src/types/league.ts` | TypeScript types |
| `src/services/api.ts` | Base API client |
| `src/services/leagueService.ts` | League data fetching |
| `src/hooks/useStandings.ts` | Standings data hook |
| `src/hooks/useFixtures.ts` | Fixtures data hook |
| `src/components/league/LeagueSelector.tsx` | League picker tabs |
| `src/components/league/StandingsTable.tsx` | Full standings table |
| `src/components/league/StandingsRow.tsx` | Single team row |
| `src/components/league/FixtureCard.tsx` | Match result card |
| `src/components/league/FixtureList.tsx` | Match list |
| `src/components/league/PlayerOfMonth.tsx` | POTM spotlight |
| `src/screens/LeagueDetailScreen.tsx` | League deep dive |
| `src/screens/MatchDetailScreen.tsx` | Match details |
| `src/navigation/LeagueStack.tsx` | League stack nav |

### Modified Files
| File | Changes |
|------|---------|
| `src/screens/LeaguesScreen.tsx` | Replace placeholder with real data |
| `src/navigation/TabNavigator.tsx` | Use LeagueStack |

---

## 🔄 Phase 3: Transfers & Highlights

> **Goal:** Add the transfer feed and match highlights browser

### Tasks

#### 3A - Live Transfers 📰
- [ ] Create `src/types/player.ts` - Transfer type (player, from, to, fee, date, type)
- [ ] Create `src/services/transferService.ts` - `getTransfers(leagueId)` function
- [ ] Create `src/hooks/useTransfers.ts` - hook for transfer data
- [ ] Create `src/components/transfers/TransferCard.tsx` - transfer item (player photo, from -> to, fee)
- [ ] Create `src/components/transfers/TransferFeed.tsx` - scrollable feed with pull-to-refresh
- [ ] Create `src/components/transfers/TransferFilter.tsx` - filter by league, transfer type (buy/loan/free)
- [ ] Create `src/screens/TransfersScreen.tsx` - full transfers page
- [ ] Add Transfers to the More screen or create a dedicated tab

#### 3B - Match Highlights 🎥
- [ ] Create `src/types/match.ts` - Highlight type (title, video URL, thumbnail, teams, date)
- [ ] Create `src/services/highlightService.ts` - fetch highlights (using free highlights API or YouTube search)
- [ ] Create `src/hooks/useHighlights.ts` - hook for highlights data
- [ ] Install `expo-av` for video playback
- [ ] Create `src/components/highlights/HighlightCard.tsx` - video thumbnail with play button
- [ ] Create `src/components/highlights/HighlightPlayer.tsx` - full-screen video player
- [ ] Create `src/screens/HighlightsScreen.tsx` - grid/list of highlight videos
- [ ] Add Highlights to navigation

#### 3C - Common Components 🧩
- [ ] Create `src/components/common/LoadingSpinner.tsx` - reusable loading state
- [ ] Create `src/components/common/ErrorMessage.tsx` - reusable error state with retry button
- [ ] Create `src/components/common/Card.tsx` - reusable card wrapper
- [ ] Create `src/components/common/Badge.tsx` - stat badges (goals, assists, etc.)

### 📁 New Files for Phase 3
| File | Purpose |
|------|---------|
| `src/types/player.ts` | Player & transfer types |
| `src/types/match.ts` | Match & highlight types |
| `src/services/transferService.ts` | Transfer API calls |
| `src/services/highlightService.ts` | Highlights API calls |
| `src/hooks/useTransfers.ts` | Transfer data hook |
| `src/hooks/useHighlights.ts` | Highlights data hook |
| `src/components/transfers/TransferCard.tsx` | Transfer item |
| `src/components/transfers/TransferFeed.tsx` | Transfer list |
| `src/components/transfers/TransferFilter.tsx` | League/type filter |
| `src/components/highlights/HighlightCard.tsx` | Video thumbnail |
| `src/components/highlights/HighlightPlayer.tsx` | Video player |
| `src/screens/TransfersScreen.tsx` | Transfers page |
| `src/screens/HighlightsScreen.tsx` | Highlights page |
| `src/components/common/LoadingSpinner.tsx` | Loading indicator |
| `src/components/common/ErrorMessage.tsx` | Error display |
| `src/components/common/Card.tsx` | Card wrapper |
| `src/components/common/Badge.tsx` | Stat badges |

---

## 🎮 Phase 4: Dream Team Game

> **Goal:** Build the core game - pick players, set formation, watch animated match simulation!

### Game Rules Recap 📋
- 💰 **Budget:** $20,000,000
- ⭐ **Star Tier:** $5,000,000 (e.g., Haaland, Mbappé, Vinicius Jr.)
- 🔥 **Great Tier:** $3,000,000 (e.g., Saka, Bellingham, Lautaro)
- 👍 **Good Tier:** $1,500,000 (e.g., solid starters across leagues)
- 🌱 **Rising Tier:** $750,000 (e.g., young talents, future stars)
- 👥 Pick **11 players** (must fit within budget)
- Example squad: 2 Stars ($10M) + 2 Great ($6M) + 2 Good ($3M) + 5 Rising ($3.75M) = $22.75M ❌ too expensive!
- You need to be smart with your budget!

### Tasks

#### 4A - Supabase Setup 🗄️
- [ ] Create Supabase project at [supabase.com](https://supabase.com)
- [ ] Create `src/services/supabase.ts` - Supabase client initialization
- [ ] Design database tables:
  - `players` - id, name, team, league, position, tier, rating, photo_url
  - `dream_teams` - id, user_id, name, formation, created_at
  - `dream_team_players` - dream_team_id, player_id, position_slot
  - `match_results` - id, team1_id, team2_id, score1, score2, events_json
- [ ] Seed player database with ~100 players across all 5 leagues and 4 tiers
- [ ] Update `src/constants/config.ts` with Supabase URL and anon key

#### 4B - Player Selection 🎯
- [ ] Create `src/types/dreamteam.ts` - Squad, DreamTeamPlayer, Formation types
- [ ] Create `src/constants/tiers.ts` - tier names, prices, colors
- [ ] Create `src/hooks/useDreamTeam.ts` - game state (budget, squad, formation)
- [ ] Create `src/components/dreamteam/BudgetBar.tsx` - visual budget remaining (progress bar with $$ left)
- [ ] Create `src/components/dreamteam/TierSelector.tsx` - browse players by tier
- [ ] Create `src/components/dreamteam/PlayerCard.tsx` - player card with photo, stats, price, add/remove button
- [ ] Create `src/components/dreamteam/SquadList.tsx` - list of your 11 picked players
- [ ] Create `src/screens/PlayerPickScreen.tsx` - browse tiers, search players, add to squad
- [ ] Update `src/screens/DreamTeamScreen.tsx` - show current squad, budget, "Pick Players" button

#### 4C - Formation 📐
- [ ] Create `src/components/dreamteam/FormationView.tsx` - visual pitch with player positions
- [ ] Create `src/screens/FormationScreen.tsx` - drag or tap to assign positions
- [ ] Support formations: 4-3-3, 4-4-2, 3-5-2, 4-2-3-1
- [ ] Validate positions (right number of GK, DEF, MID, FWD)

#### 4D - Match Simulation 🎬
- [ ] Create `src/components/dreamteam/MatchSimulation.tsx` - the big animated match!
  - Simulate based on player ratings & tiers
  - Show events: goals, saves, fouls, cards
  - Animated scoreboard updating in real-time
  - Commentary text feed ("GOAL! Haaland scores from close range!")
  - Match duration: ~60 seconds of real time
- [ ] Create `src/screens/MatchSimScreen.tsx` - full-screen match experience
- [ ] Add match result saving to Supabase
- [ ] Add win/loss/draw record tracking

#### 4E - Navigation 🧭
- [ ] Create `src/navigation/DreamTeamStack.tsx` - stack navigator (DreamTeam -> PlayerPick -> Formation -> MatchSim)
- [ ] Update `TabNavigator.tsx` to use `DreamTeamStack` for Dream Team tab

### 📁 New Files for Phase 4
| File | Purpose |
|------|---------|
| `src/services/supabase.ts` | Supabase client |
| `src/types/dreamteam.ts` | Game types |
| `src/constants/tiers.ts` | Tier pricing & colors |
| `src/hooks/useDreamTeam.ts` | Game state management |
| `src/components/dreamteam/BudgetBar.tsx` | Budget display |
| `src/components/dreamteam/TierSelector.tsx` | Tier browser |
| `src/components/dreamteam/PlayerCard.tsx` | Player card |
| `src/components/dreamteam/SquadList.tsx` | Squad list |
| `src/components/dreamteam/FormationView.tsx` | Formation pitch |
| `src/components/dreamteam/MatchSimulation.tsx` | Match animation |
| `src/screens/PlayerPickScreen.tsx` | Pick players |
| `src/screens/FormationScreen.tsx` | Set formation |
| `src/screens/MatchSimScreen.tsx` | Watch match |
| `src/navigation/DreamTeamStack.tsx` | Game flow nav |

### Modified Files
| File | Changes |
|------|---------|
| `src/screens/DreamTeamScreen.tsx` | Add real game functionality |
| `src/constants/config.ts` | Add Supabase credentials |
| `src/navigation/TabNavigator.tsx` | Use DreamTeamStack |

---

## 🏆 Phase 5: Multiplayer & Polish

> **Goal:** Add vs computer and friend challenge modes, then polish everything!

### Tasks

#### 5A - vs Computer 🤖
- [ ] Create computer team generator (random squad from player pool)
- [ ] Add difficulty levels: Easy, Medium, Hard (affects computer team ratings)
- [ ] Add "Play vs Computer" button to DreamTeamScreen
- [ ] Generate computer squad on the fly and run match simulation

#### 5B - Challenge a Friend 👥
- [ ] Create `src/screens/MultiplayerScreen.tsx` - multiplayer lobby
- [ ] Set up Supabase real-time for matchmaking:
  - Create challenge (generates a code)
  - Join challenge (enter friend's code)
  - Both players' teams loaded and matched
- [ ] Add challenge code sharing (copy to clipboard)
- [ ] Add waiting screen ("Waiting for friend to join...")
- [ ] Run match simulation with both real teams
- [ ] Show results to both players

#### 5C - Polish & UX ✨
- [ ] Add pull-to-refresh on all data screens
- [ ] Add offline caching (AsyncStorage) for league data
- [ ] Add skeleton loading screens (instead of blank spinners)
- [ ] Add smooth animations & transitions between screens
- [ ] Add haptic feedback on buttons (Expo Haptics)
- [ ] Dark mode support (already dark theme, but ensure consistency)
- [ ] Error boundaries for graceful crash handling
- [ ] Add "About" section in More screen with app credits

#### 5D - App Branding 🎨
- [ ] Design final app icon (soccer ball + crown/trophy theme)
- [ ] Design splash screen
- [ ] Add custom fonts (sporty look)
- [ ] Review all screens for consistent styling
- [ ] Add subtle animations (card hover effects, tab transitions)

#### 5E - Testing & Launch 🚀
- [ ] Test on iOS Simulator
- [ ] Test on Android Emulator
- [ ] Test on real device via Expo Go
- [ ] Fix any platform-specific bugs
- [ ] Performance testing (smooth scrolling, fast loads)
- [ ] Create EAS Build configuration for app store builds
- [ ] Take screenshots for app store listing

### 📁 New Files for Phase 5
| File | Purpose |
|------|---------|
| `src/screens/MultiplayerScreen.tsx` | Multiplayer lobby |
| `src/utils/computerTeam.ts` | AI opponent generator |
| `src/utils/matchEngine.ts` | Match simulation logic (extracted) |
| `src/utils/storage.ts` | AsyncStorage caching helpers |
| `eas.json` | EAS Build configuration |

---

## 📅 Rough Timeline

| Phase | What | Estimated Time |
|-------|------|---------------|
| **Phase 1** | Foundation | ✅ Almost done! |
| **Phase 2** | League Data | ~2-3 weeks |
| **Phase 3** | Transfers & Highlights | ~1-2 weeks |
| **Phase 4** | Dream Team Game | ~3-4 weeks |
| **Phase 5** | Multiplayer & Polish | ~2-3 weeks |

> 💡 These are estimates - take your time and have fun building it, Rayden! The best apps are built by people who enjoy the process. 🎉

---

## 🔑 Key Accounts Needed

1. **API-Football** (api-football.com) - Free tier gives 100 requests/day
2. **Supabase** (supabase.com) - Free tier is plenty for this project
3. **Expo** (expo.dev) - Free account for builds and updates

---

## 🎯 Current Status

```
Phase 1: ████████████████████░  90% - Just need to test & fix!
Phase 2: ░░░░░░░░░░░░░░░░░░░░   0% - Up next!
Phase 3: ░░░░░░░░░░░░░░░░░░░░   0%
Phase 4: ░░░░░░░░░░░░░░░░░░░░   0%
Phase 5: ░░░░░░░░░░░░░░░░░░░░   0%
```

**Next step:** Run the app and make sure Phase 1 works! 🚀
