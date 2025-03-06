
export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  user_id: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
}

export interface ExchangeRequest {
  id: string;
  requester_id: string;
  skill_id: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
}
