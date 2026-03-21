-- ============================================
-- TOP LEAGUE DATABASE SCHEMA
-- ============================================

-- Users / Profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  wins INT DEFAULT 0,
  losses INT DEFAULT 0,
  draws INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Saved Squads
CREATE TABLE squads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  formation TEXT DEFAULT '4-3-3',
  players_json JSONB NOT NULL,
  total_cost BIGINT DEFAULT 0,
  average_rating INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Match History
CREATE TABLE match_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  user_squad_json JSONB NOT NULL,
  opponent_name TEXT NOT NULL,
  opponent_type TEXT NOT NULL CHECK (opponent_type IN ('computer_easy','computer_medium','computer_hard','computer_legends','computer_best','local','online')),
  opponent_squad_json JSONB,
  home_goals INT NOT NULL,
  away_goals INT NOT NULL,
  result TEXT NOT NULL CHECK (result IN ('win','loss','draw')),
  motm_name TEXT,
  motm_rating NUMERIC(3,1),
  events_json JSONB,
  played_at TIMESTAMPTZ DEFAULT NOW()
);

-- Multiplayer Challenges
CREATE TABLE challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  host_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  host_squad_json JSONB NOT NULL,
  guest_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  guest_squad_json JSONB,
  status TEXT DEFAULT 'waiting' CHECK (status IN ('waiting','matched','playing','finished','cancelled')),
  match_seed INT,
  result_json JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE squads ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;

-- Profiles: anyone can read, users can update their own
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Squads: users can CRUD their own
CREATE POLICY "Users can view own squads" ON squads FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own squads" ON squads FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own squads" ON squads FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own squads" ON squads FOR DELETE USING (auth.uid() = user_id);

-- Match History: users can view and insert their own
CREATE POLICY "Users can view own matches" ON match_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own matches" ON match_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Challenges: anyone can view (to join), host/guest can update
CREATE POLICY "Anyone can view waiting challenges" ON challenges FOR SELECT USING (true);
CREATE POLICY "Auth users can create challenges" ON challenges FOR INSERT WITH CHECK (auth.uid() = host_user_id);
CREATE POLICY "Host or guest can update challenge" ON challenges FOR UPDATE USING (auth.uid() = host_user_id OR auth.uid() = guest_user_id);

-- Enable realtime on challenges for multiplayer
ALTER PUBLICATION supabase_realtime ADD TABLE challenges;
