export interface Database {
  gazette_publications: {
    Row: {
      id: string;
      title: string;
      volume: string;
      issue_number: string | null;
      release_date: string;
      summary: string | null;
      pdf_url: string | null;
      download_count: number;
      is_published: boolean;
      created_at: string;
    };
    Insert: {
      id?: string;
      title: string;
      volume: string;
      issue_number?: string | null;
      release_date: string;
      summary?: string | null;
      pdf_url?: string | null;
      download_count?: number;
      is_published?: boolean;
    };
    Update: {
      title?: string;
      volume?: string;
      issue_number?: string | null;
      release_date?: string;
      summary?: string | null;
      pdf_url?: string | null;
      download_count?: number;
      is_published?: boolean;
    };
  };
  internship_applications: {
    Row: {
      id: string;
      applicant_name: string;
      email: string;
      phone: string | null;
      institution: string | null;
      program_type: string;
      cover_letter: string | null;
      status: string;
      created_at: string;
    };
    Insert: {
      id?: string;
      applicant_name: string;
      email: string;
      phone?: string | null;
      institution?: string | null;
      program_type: string;
      cover_letter?: string | null;
      status?: string;
    };
    Update: {
      applicant_name?: string;
      email?: string;
      phone?: string | null;
      institution?: string | null;
      program_type?: string;
      cover_letter?: string | null;
      status?: string;
    };
  };
  events: {
    Row: {
      id: string;
      title: string;
      description: string | null;
      event_date: string | null;
      venue: string | null;
      registration_url: string | null;
      prospectus_url: string | null;
      status: string;
      is_featured: boolean;
      created_at: string;
    };
    Insert: {
      id?: string;
      title: string;
      description?: string | null;
      event_date?: string | null;
      venue?: string | null;
      registration_url?: string | null;
      prospectus_url?: string | null;
      status?: string;
      is_featured?: boolean;
    };
    Update: {
      title?: string;
      description?: string | null;
      event_date?: string | null;
      venue?: string | null;
      registration_url?: string | null;
      prospectus_url?: string | null;
      status?: string;
      is_featured?: boolean;
    };
  };
  team_members: {
    Row: {
      id: string;
      name: string;
      role: string;
      category: string;
      expertise: string | null;
      bio: string | null;
      photo_url: string | null;
      linkedin_url: string | null;
      email: string | null;
      display_order: number;
      created_at: string;
    };
    Insert: {
      id?: string;
      name: string;
      role: string;
      category: string;
      expertise?: string | null;
      bio?: string | null;
      photo_url?: string | null;
      linkedin_url?: string | null;
      email?: string | null;
      display_order?: number;
    };
    Update: {
      name?: string;
      role?: string;
      category?: string;
      expertise?: string | null;
      bio?: string | null;
      photo_url?: string | null;
      linkedin_url?: string | null;
      email?: string | null;
      display_order?: number;
    };
  };
  gallery_media: {
    Row: {
      id: string;
      title: string;
      description: string | null;
      category: string;
      media_type: string;
      media_url: string | null;
      event_date: string | null;
      created_at: string;
    };
    Insert: {
      id?: string;
      title: string;
      description?: string | null;
      category: string;
      media_type?: string;
      media_url?: string | null;
      event_date?: string | null;
    };
    Update: {
      title?: string;
      description?: string | null;
      category?: string;
      media_type?: string;
      media_url?: string | null;
      event_date?: string | null;
    };
  };
  inquiries: {
    Row: {
      id: string;
      name: string;
      email: string;
      phone: string | null;
      organization: string | null;
      purpose: string;
      message: string | null;
      status: string;
      created_at: string;
    };
    Insert: {
      id?: string;
      name: string;
      email: string;
      phone?: string | null;
      organization?: string | null;
      purpose: string;
      message?: string | null;
      status?: string;
    };
    Update: {
      name?: string;
      email?: string;
      phone?: string | null;
      organization?: string | null;
      purpose?: string;
      message?: string | null;
      status?: string;
    };
  };
}
