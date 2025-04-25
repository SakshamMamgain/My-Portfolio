export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          email: string;
          created_at: string;
        };
        Insert: {
          email: string;
          created_at?: string;
        };
        Update: {
          email?: string;
          created_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          image_url: string;
          tech_stack: string[];
          demo_url: string;
          github_url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          image_url: string;
          tech_stack: string[];
          demo_url: string;
          github_url: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          image_url?: string;
          tech_stack?: string[];
          demo_url?: string;
          github_url?: string;
          created_at?: string;
        };
      };
      skills: {
        Row: {
          id: string;
          name: string;
          proficiency: number;
          category: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          proficiency: number;
          category: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          proficiency?: number;
          category?: string;
          created_at?: string;
        };
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          message?: string;
          created_at?: string;
        };
      };
    };
  };
}
