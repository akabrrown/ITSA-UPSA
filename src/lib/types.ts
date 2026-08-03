export interface Activity {
  id: string;
  title: string;
  description?: string;
  cover_image_url?: string;
  venue?: string;
  start_date: string;
  status: 'upcoming' | 'past';
  rsvp_link?: string;
}

export interface Executive {
  id: string;
  full_name: string;
  position: string;
  photo_url?: string;
  bio?: string;
  social_link?: string;
  display_order: number;
}

export interface AcademicResource {
  id: string;
  title: string;
  resource_type: 'slide' | 'past_question';
  course?: string;
  level?: string;
  academic_year?: string;
  file_url: string;
  file_size_kb?: number;
}

export interface Tutorial {
  id: string;
  title: string;
  description?: string;
  video_url: string;
  thumbnail_url?: string;
  course?: string;
  level?: string;
  lecturer_name?: string;
  is_published: boolean;
}

export interface NewsPost {
  id: string;
  title: string;
  summary?: string;
  body?: string;
  cover_image_url?: string;
  is_published: boolean;
  published_at?: string;
  created_at?: string;
}

export interface DepartmentAuthority {
  id: string;
  full_name: string;
  title: string;
  photo_url?: string;
  display_order: number;
}

export interface BannerSlide {
  id: string;
  image_url: string;
  headline?: string;
  link_url?: string;
  display_order: number;
  is_active: boolean;
}

export interface PresidentSpeech {
  id: string;
  name: string;
  title: string;
  photo_url?: string;
  message?: string;
  video_url?: string;
}

export interface DepartmentInfo {
  id: string;
  description?: string;
  mission?: string;
}

// Define the generic type for Cloudinary response
export interface CloudinaryUploadResult {
  info?: {
    secure_url?: string;
  };
}
