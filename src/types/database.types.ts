export interface Admin {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
}

export interface NewsPost {
  id: string;
  title: string;
  summary: string | null;
  body: string | null;
  cover_image_url: string | null;
  is_published: boolean;
  published_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface BannerSlide {
  id: string;
  image_url: string;
  headline: string | null;
  link_url: string | null;
  display_order: number;
  is_active: boolean;
}

export interface PresidentSpeech {
  id: string;
  name: string;
  title: string;
  photo_url: string | null;
  message: string | null;
  video_url: string | null;
  updated_at: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  thumbnail_url: string | null;
  course: string | null;
  level: string | null;
  lecturer_name: string | null;
  view_count: number;
  is_published: boolean;
  created_by: string | null;
  created_at: string;
}

export interface AcademicResource {
  id: string;
  title: string;
  resource_type: 'slide' | 'past_question';
  course: string | null;
  level: string | null;
  academic_year: string | null;
  file_url: string;
  file_size_kb: number | null;
  download_count: number;
  created_by: string | null;
  created_at: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  gallery_urls: string[] | null;
  venue: string | null;
  start_date: string;
  end_date: string | null;
  status: 'upcoming' | 'past' | null;
  rsvp_link: string | null;
  created_by: string | null;
  created_at: string;
}

export interface DepartmentInfo {
  id: string;
  description: string | null;
  mission: string | null;
  updated_at: string;
}

export interface DepartmentAuthority {
  id: string;
  full_name: string;
  title: string;
  photo_url: string | null;
  bio: string | null;
  email: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  display_order: number;
}

export interface ItsaExecutive {
  id: string;
  full_name: string;
  position: string;
  photo_url: string | null;
  bio: string | null;
  email: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
  social_link: string | null;
  display_order: number;
}
