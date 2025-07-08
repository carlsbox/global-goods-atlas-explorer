export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      _pages_v: {
        Row: {
          autosave: boolean | null
          created_at: string
          id: number
          latest: boolean | null
          parent_id: number | null
          published_locale:
            | Database["public"]["Enums"]["enum__pages_v_published_locale"]
            | null
          snapshot: boolean | null
          updated_at: string
          version__status:
            | Database["public"]["Enums"]["enum__pages_v_version_status"]
            | null
          version_created_at: string | null
          version_hero_media_id: number | null
          version_hero_rich_text: Json | null
          version_hero_type:
            | Database["public"]["Enums"]["enum__pages_v_version_hero_type"]
            | null
          version_published_at: string | null
          version_slug: string | null
          version_slug_lock: boolean | null
          version_title: string | null
          version_updated_at: string | null
        }
        Insert: {
          autosave?: boolean | null
          created_at?: string
          id?: number
          latest?: boolean | null
          parent_id?: number | null
          published_locale?:
            | Database["public"]["Enums"]["enum__pages_v_published_locale"]
            | null
          snapshot?: boolean | null
          updated_at?: string
          version__status?:
            | Database["public"]["Enums"]["enum__pages_v_version_status"]
            | null
          version_created_at?: string | null
          version_hero_media_id?: number | null
          version_hero_rich_text?: Json | null
          version_hero_type?:
            | Database["public"]["Enums"]["enum__pages_v_version_hero_type"]
            | null
          version_published_at?: string | null
          version_slug?: string | null
          version_slug_lock?: boolean | null
          version_title?: string | null
          version_updated_at?: string | null
        }
        Update: {
          autosave?: boolean | null
          created_at?: string
          id?: number
          latest?: boolean | null
          parent_id?: number | null
          published_locale?:
            | Database["public"]["Enums"]["enum__pages_v_published_locale"]
            | null
          snapshot?: boolean | null
          updated_at?: string
          version__status?:
            | Database["public"]["Enums"]["enum__pages_v_version_status"]
            | null
          version_created_at?: string | null
          version_hero_media_id?: number | null
          version_hero_rich_text?: Json | null
          version_hero_type?:
            | Database["public"]["Enums"]["enum__pages_v_version_hero_type"]
            | null
          version_published_at?: string | null
          version_slug?: string | null
          version_slug_lock?: boolean | null
          version_title?: string | null
          version_updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "_pages_v_parent_id_pages_id_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_pages_v_version_hero_media_id_media_id_fk"
            columns: ["version_hero_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      _pages_v_blocks_archive: {
        Row: {
          _order: number
          _parent_id: number
          _path: string
          _uuid: string | null
          block_name: string | null
          id: number
          intro_content: Json | null
          limit: number | null
          populate_by:
            | Database["public"]["Enums"]["enum__pages_v_blocks_archive_populate_by"]
            | null
          relation_to:
            | Database["public"]["Enums"]["enum__pages_v_blocks_archive_relation_to"]
            | null
        }
        Insert: {
          _order: number
          _parent_id: number
          _path: string
          _uuid?: string | null
          block_name?: string | null
          id?: number
          intro_content?: Json | null
          limit?: number | null
          populate_by?:
            | Database["public"]["Enums"]["enum__pages_v_blocks_archive_populate_by"]
            | null
          relation_to?:
            | Database["public"]["Enums"]["enum__pages_v_blocks_archive_relation_to"]
            | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          _path?: string
          _uuid?: string | null
          block_name?: string | null
          id?: number
          intro_content?: Json | null
          limit?: number | null
          populate_by?:
            | Database["public"]["Enums"]["enum__pages_v_blocks_archive_populate_by"]
            | null
          relation_to?:
            | Database["public"]["Enums"]["enum__pages_v_blocks_archive_relation_to"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "_pages_v_blocks_archive_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "_pages_v"
            referencedColumns: ["id"]
          },
        ]
      }
      _pages_v_blocks_content: {
        Row: {
          _order: number
          _parent_id: number
          _path: string
          _uuid: string | null
          block_name: string | null
          id: number
        }
        Insert: {
          _order: number
          _parent_id: number
          _path: string
          _uuid?: string | null
          block_name?: string | null
          id?: number
        }
        Update: {
          _order?: number
          _parent_id?: number
          _path?: string
          _uuid?: string | null
          block_name?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "_pages_v_blocks_content_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "_pages_v"
            referencedColumns: ["id"]
          },
        ]
      }
      _pages_v_blocks_content_columns: {
        Row: {
          _order: number
          _parent_id: number
          _uuid: string | null
          enable_link: boolean | null
          id: number
          link_appearance:
            | Database["public"]["Enums"]["enum__pages_v_blocks_content_columns_link_appearance"]
            | null
          link_label: string | null
          link_new_tab: boolean | null
          link_type:
            | Database["public"]["Enums"]["enum__pages_v_blocks_content_columns_link_type"]
            | null
          link_url: string | null
          rich_text: Json | null
          size:
            | Database["public"]["Enums"]["enum__pages_v_blocks_content_columns_size"]
            | null
        }
        Insert: {
          _order: number
          _parent_id: number
          _uuid?: string | null
          enable_link?: boolean | null
          id?: number
          link_appearance?:
            | Database["public"]["Enums"]["enum__pages_v_blocks_content_columns_link_appearance"]
            | null
          link_label?: string | null
          link_new_tab?: boolean | null
          link_type?:
            | Database["public"]["Enums"]["enum__pages_v_blocks_content_columns_link_type"]
            | null
          link_url?: string | null
          rich_text?: Json | null
          size?:
            | Database["public"]["Enums"]["enum__pages_v_blocks_content_columns_size"]
            | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          _uuid?: string | null
          enable_link?: boolean | null
          id?: number
          link_appearance?:
            | Database["public"]["Enums"]["enum__pages_v_blocks_content_columns_link_appearance"]
            | null
          link_label?: string | null
          link_new_tab?: boolean | null
          link_type?:
            | Database["public"]["Enums"]["enum__pages_v_blocks_content_columns_link_type"]
            | null
          link_url?: string | null
          rich_text?: Json | null
          size?:
            | Database["public"]["Enums"]["enum__pages_v_blocks_content_columns_size"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "_pages_v_blocks_content_columns_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "_pages_v_blocks_content"
            referencedColumns: ["id"]
          },
        ]
      }
      _pages_v_blocks_cta: {
        Row: {
          _order: number
          _parent_id: number
          _path: string
          _uuid: string | null
          block_name: string | null
          id: number
          rich_text: Json | null
        }
        Insert: {
          _order: number
          _parent_id: number
          _path: string
          _uuid?: string | null
          block_name?: string | null
          id?: number
          rich_text?: Json | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          _path?: string
          _uuid?: string | null
          block_name?: string | null
          id?: number
          rich_text?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "_pages_v_blocks_cta_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "_pages_v"
            referencedColumns: ["id"]
          },
        ]
      }
      _pages_v_blocks_cta_links: {
        Row: {
          _order: number
          _parent_id: number
          _uuid: string | null
          id: number
          link_appearance:
            | Database["public"]["Enums"]["enum__pages_v_blocks_cta_links_link_appearance"]
            | null
          link_label: string | null
          link_new_tab: boolean | null
          link_type:
            | Database["public"]["Enums"]["enum__pages_v_blocks_cta_links_link_type"]
            | null
          link_url: string | null
        }
        Insert: {
          _order: number
          _parent_id: number
          _uuid?: string | null
          id?: number
          link_appearance?:
            | Database["public"]["Enums"]["enum__pages_v_blocks_cta_links_link_appearance"]
            | null
          link_label?: string | null
          link_new_tab?: boolean | null
          link_type?:
            | Database["public"]["Enums"]["enum__pages_v_blocks_cta_links_link_type"]
            | null
          link_url?: string | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          _uuid?: string | null
          id?: number
          link_appearance?:
            | Database["public"]["Enums"]["enum__pages_v_blocks_cta_links_link_appearance"]
            | null
          link_label?: string | null
          link_new_tab?: boolean | null
          link_type?:
            | Database["public"]["Enums"]["enum__pages_v_blocks_cta_links_link_type"]
            | null
          link_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "_pages_v_blocks_cta_links_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "_pages_v_blocks_cta"
            referencedColumns: ["id"]
          },
        ]
      }
      _pages_v_blocks_form_block: {
        Row: {
          _order: number
          _parent_id: number
          _path: string
          _uuid: string | null
          block_name: string | null
          enable_intro: boolean | null
          form_id: number | null
          id: number
          intro_content: Json | null
        }
        Insert: {
          _order: number
          _parent_id: number
          _path: string
          _uuid?: string | null
          block_name?: string | null
          enable_intro?: boolean | null
          form_id?: number | null
          id?: number
          intro_content?: Json | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          _path?: string
          _uuid?: string | null
          block_name?: string | null
          enable_intro?: boolean | null
          form_id?: number | null
          id?: number
          intro_content?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "_pages_v_blocks_form_block_form_id_forms_id_fk"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_pages_v_blocks_form_block_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "_pages_v"
            referencedColumns: ["id"]
          },
        ]
      }
      _pages_v_blocks_media_block: {
        Row: {
          _order: number
          _parent_id: number
          _path: string
          _uuid: string | null
          block_name: string | null
          id: number
          media_id: number | null
        }
        Insert: {
          _order: number
          _parent_id: number
          _path: string
          _uuid?: string | null
          block_name?: string | null
          id?: number
          media_id?: number | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          _path?: string
          _uuid?: string | null
          block_name?: string | null
          id?: number
          media_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "_pages_v_blocks_media_block_media_id_media_id_fk"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_pages_v_blocks_media_block_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "_pages_v"
            referencedColumns: ["id"]
          },
        ]
      }
      _pages_v_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: number
          id: number
          version_meta_description: string | null
          version_meta_image_id: number | null
          version_meta_title: string | null
        }
        Insert: {
          _locale: unknown[]
          _parent_id: number
          id?: number
          version_meta_description?: string | null
          version_meta_image_id?: number | null
          version_meta_title?: string | null
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: number
          id?: number
          version_meta_description?: string | null
          version_meta_image_id?: number | null
          version_meta_title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "_pages_v_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "_pages_v"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_pages_v_locales_version_meta_image_id_media_id_fk"
            columns: ["version_meta_image_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      _pages_v_rels: {
        Row: {
          categories_id: number | null
          id: number
          order: number | null
          pages_id: number | null
          parent_id: number
          path: string
          posts_id: number | null
        }
        Insert: {
          categories_id?: number | null
          id?: number
          order?: number | null
          pages_id?: number | null
          parent_id: number
          path: string
          posts_id?: number | null
        }
        Update: {
          categories_id?: number | null
          id?: number
          order?: number | null
          pages_id?: number | null
          parent_id?: number
          path?: string
          posts_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "_pages_v_rels_categories_fk"
            columns: ["categories_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_pages_v_rels_pages_fk"
            columns: ["pages_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_pages_v_rels_parent_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "_pages_v"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_pages_v_rels_posts_fk"
            columns: ["posts_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      _pages_v_version_hero_links: {
        Row: {
          _order: number
          _parent_id: number
          _uuid: string | null
          id: number
          link_appearance:
            | Database["public"]["Enums"]["enum__pages_v_version_hero_links_link_appearance"]
            | null
          link_label: string | null
          link_new_tab: boolean | null
          link_type:
            | Database["public"]["Enums"]["enum__pages_v_version_hero_links_link_type"]
            | null
          link_url: string | null
        }
        Insert: {
          _order: number
          _parent_id: number
          _uuid?: string | null
          id?: number
          link_appearance?:
            | Database["public"]["Enums"]["enum__pages_v_version_hero_links_link_appearance"]
            | null
          link_label?: string | null
          link_new_tab?: boolean | null
          link_type?:
            | Database["public"]["Enums"]["enum__pages_v_version_hero_links_link_type"]
            | null
          link_url?: string | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          _uuid?: string | null
          id?: number
          link_appearance?:
            | Database["public"]["Enums"]["enum__pages_v_version_hero_links_link_appearance"]
            | null
          link_label?: string | null
          link_new_tab?: boolean | null
          link_type?:
            | Database["public"]["Enums"]["enum__pages_v_version_hero_links_link_type"]
            | null
          link_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "_pages_v_version_hero_links_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "_pages_v"
            referencedColumns: ["id"]
          },
        ]
      }
      _posts_v: {
        Row: {
          autosave: boolean | null
          created_at: string
          id: number
          latest: boolean | null
          parent_id: number | null
          published_locale:
            | Database["public"]["Enums"]["enum__posts_v_published_locale"]
            | null
          snapshot: boolean | null
          updated_at: string
          version__status:
            | Database["public"]["Enums"]["enum__posts_v_version_status"]
            | null
          version_content: Json | null
          version_created_at: string | null
          version_hero_image_id: number | null
          version_published_at: string | null
          version_slug: string | null
          version_slug_lock: boolean | null
          version_title: string | null
          version_updated_at: string | null
        }
        Insert: {
          autosave?: boolean | null
          created_at?: string
          id?: number
          latest?: boolean | null
          parent_id?: number | null
          published_locale?:
            | Database["public"]["Enums"]["enum__posts_v_published_locale"]
            | null
          snapshot?: boolean | null
          updated_at?: string
          version__status?:
            | Database["public"]["Enums"]["enum__posts_v_version_status"]
            | null
          version_content?: Json | null
          version_created_at?: string | null
          version_hero_image_id?: number | null
          version_published_at?: string | null
          version_slug?: string | null
          version_slug_lock?: boolean | null
          version_title?: string | null
          version_updated_at?: string | null
        }
        Update: {
          autosave?: boolean | null
          created_at?: string
          id?: number
          latest?: boolean | null
          parent_id?: number | null
          published_locale?:
            | Database["public"]["Enums"]["enum__posts_v_published_locale"]
            | null
          snapshot?: boolean | null
          updated_at?: string
          version__status?:
            | Database["public"]["Enums"]["enum__posts_v_version_status"]
            | null
          version_content?: Json | null
          version_created_at?: string | null
          version_hero_image_id?: number | null
          version_published_at?: string | null
          version_slug?: string | null
          version_slug_lock?: boolean | null
          version_title?: string | null
          version_updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "_posts_v_parent_id_posts_id_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_posts_v_version_hero_image_id_media_id_fk"
            columns: ["version_hero_image_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      _posts_v_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: number
          id: number
          version_meta_description: string | null
          version_meta_image_id: number | null
          version_meta_title: string | null
        }
        Insert: {
          _locale: unknown[]
          _parent_id: number
          id?: number
          version_meta_description?: string | null
          version_meta_image_id?: number | null
          version_meta_title?: string | null
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: number
          id?: number
          version_meta_description?: string | null
          version_meta_image_id?: number | null
          version_meta_title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "_posts_v_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "_posts_v"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_posts_v_locales_version_meta_image_id_media_id_fk"
            columns: ["version_meta_image_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      _posts_v_rels: {
        Row: {
          categories_id: number | null
          id: number
          order: number | null
          parent_id: number
          path: string
          posts_id: number | null
          users_id: number | null
        }
        Insert: {
          categories_id?: number | null
          id?: number
          order?: number | null
          parent_id: number
          path: string
          posts_id?: number | null
          users_id?: number | null
        }
        Update: {
          categories_id?: number | null
          id?: number
          order?: number | null
          parent_id?: number
          path?: string
          posts_id?: number | null
          users_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "_posts_v_rels_categories_fk"
            columns: ["categories_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_posts_v_rels_parent_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "_posts_v"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_posts_v_rels_posts_fk"
            columns: ["posts_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_posts_v_rels_users_fk"
            columns: ["users_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      _posts_v_version_populated_authors: {
        Row: {
          _order: number
          _parent_id: number
          _uuid: string | null
          id: number
          name: string | null
        }
        Insert: {
          _order: number
          _parent_id: number
          _uuid?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          _uuid?: string | null
          id?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "_posts_v_version_populated_authors_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "_posts_v"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          id: number
          parent_id: number | null
          slug: string | null
          slug_lock: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          parent_id?: number | null
          slug?: string | null
          slug_lock?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          parent_id?: number | null
          slug?: string | null
          slug_lock?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_categories_id_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      categories_breadcrumbs: {
        Row: {
          _locale: unknown[]
          _order: number
          _parent_id: number
          doc_id: number | null
          id: string
          label: string | null
          url: string | null
        }
        Insert: {
          _locale: unknown[]
          _order: number
          _parent_id: number
          doc_id?: number | null
          id: string
          label?: string | null
          url?: string | null
        }
        Update: {
          _locale?: unknown[]
          _order?: number
          _parent_id?: number
          doc_id?: number | null
          id?: string
          label?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_breadcrumbs_doc_id_categories_id_fk"
            columns: ["doc_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categories_breadcrumbs_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      climate_standards: {
        Row: {
          code: string
          created_at: string
          id: number
          link: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: number
          link: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: number
          link?: string
          updated_at?: string
        }
        Relationships: []
      }
      climate_standards_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: number
          description: string | null
          domain: Database["public"]["Enums"]["enum_climate_standards_domain"]
          id: number
          name: string
          type: Database["public"]["Enums"]["enum_climate_standards_type"]
        }
        Insert: {
          _locale: unknown[]
          _parent_id: number
          description?: string | null
          domain?: Database["public"]["Enums"]["enum_climate_standards_domain"]
          id?: number
          name: string
          type: Database["public"]["Enums"]["enum_climate_standards_type"]
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: number
          description?: string | null
          domain?: Database["public"]["Enums"]["enum_climate_standards_domain"]
          id?: number
          name?: string
          type?: Database["public"]["Enums"]["enum_climate_standards_type"]
        }
        Relationships: [
          {
            foreignKeyName: "climate_standards_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "climate_standards"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          created_at: string
          id: number
          iso_code: string
          type: Database["public"]["Enums"]["enum_countries_type"]
          un_code: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          iso_code: string
          type?: Database["public"]["Enums"]["enum_countries_type"]
          un_code: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          iso_code?: string
          type?: Database["public"]["Enums"]["enum_countries_type"]
          un_code?: string
          updated_at?: string
        }
        Relationships: []
      }
      countries_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: number
          formal: string
          id: number
          short: string
        }
        Insert: {
          _locale: unknown[]
          _parent_id: number
          formal: string
          id?: number
          short: string
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: number
          formal?: string
          id?: number
          short?: string
        }
        Relationships: [
          {
            foreignKeyName: "countries_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      dpis: {
        Row: {
          authority: string
          code: string
          created_at: string
          description: string | null
          group_code: string
          group_name: string
          id: number
          title: string
          updated_at: string
        }
        Insert: {
          authority: string
          code: string
          created_at?: string
          description?: string | null
          group_code: string
          group_name: string
          id?: number
          title: string
          updated_at?: string
        }
        Update: {
          authority?: string
          code?: string
          created_at?: string
          description?: string | null
          group_code?: string
          group_name?: string
          id?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      footer: {
        Row: {
          created_at: string | null
          id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      footer_nav_items: {
        Row: {
          _order: number
          _parent_id: number
          id: string
          link_label: string
          link_new_tab: boolean | null
          link_type:
            | Database["public"]["Enums"]["enum_footer_nav_items_link_type"]
            | null
          link_url: string | null
        }
        Insert: {
          _order: number
          _parent_id: number
          id: string
          link_label: string
          link_new_tab?: boolean | null
          link_type?:
            | Database["public"]["Enums"]["enum_footer_nav_items_link_type"]
            | null
          link_url?: string | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          id?: string
          link_label?: string
          link_new_tab?: boolean | null
          link_type?:
            | Database["public"]["Enums"]["enum_footer_nav_items_link_type"]
            | null
          link_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "footer_nav_items_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "footer"
            referencedColumns: ["id"]
          },
        ]
      }
      footer_rels: {
        Row: {
          id: number
          order: number | null
          pages_id: number | null
          parent_id: number
          path: string
          posts_id: number | null
        }
        Insert: {
          id?: number
          order?: number | null
          pages_id?: number | null
          parent_id: number
          path: string
          posts_id?: number | null
        }
        Update: {
          id?: number
          order?: number | null
          pages_id?: number | null
          parent_id?: number
          path?: string
          posts_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "footer_rels_pages_fk"
            columns: ["pages_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "footer_rels_parent_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "footer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "footer_rels_posts_fk"
            columns: ["posts_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      form_submissions: {
        Row: {
          created_at: string
          form_id: number
          id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          form_id: number
          id?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          form_id?: number
          id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "form_submissions_form_id_forms_id_fk"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      form_submissions_submission_data: {
        Row: {
          _order: number
          _parent_id: number
          field: string
          id: string
          value: string
        }
        Insert: {
          _order: number
          _parent_id: number
          field: string
          id: string
          value: string
        }
        Update: {
          _order?: number
          _parent_id?: number
          field?: string
          id?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "form_submissions_submission_data_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "form_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      forms: {
        Row: {
          confirmation_type:
            | Database["public"]["Enums"]["enum_forms_confirmation_type"]
            | null
          created_at: string
          id: number
          redirect_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          confirmation_type?:
            | Database["public"]["Enums"]["enum_forms_confirmation_type"]
            | null
          created_at?: string
          id?: number
          redirect_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          confirmation_type?:
            | Database["public"]["Enums"]["enum_forms_confirmation_type"]
            | null
          created_at?: string
          id?: number
          redirect_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      forms_blocks_checkbox: {
        Row: {
          _order: number
          _parent_id: number
          _path: string
          block_name: string | null
          default_value: boolean | null
          id: string
          name: string
          required: boolean | null
          width: number | null
        }
        Insert: {
          _order: number
          _parent_id: number
          _path: string
          block_name?: string | null
          default_value?: boolean | null
          id: string
          name: string
          required?: boolean | null
          width?: number | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          _path?: string
          block_name?: string | null
          default_value?: boolean | null
          id?: string
          name?: string
          required?: boolean | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "forms_blocks_checkbox_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      forms_blocks_checkbox_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          id: number
          label: string | null
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          id?: number
          label?: string | null
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          id?: number
          label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forms_blocks_checkbox_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "forms_blocks_checkbox"
            referencedColumns: ["id"]
          },
        ]
      }
      forms_blocks_country: {
        Row: {
          _order: number
          _parent_id: number
          _path: string
          block_name: string | null
          id: string
          name: string
          required: boolean | null
          width: number | null
        }
        Insert: {
          _order: number
          _parent_id: number
          _path: string
          block_name?: string | null
          id: string
          name: string
          required?: boolean | null
          width?: number | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          _path?: string
          block_name?: string | null
          id?: string
          name?: string
          required?: boolean | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "forms_blocks_country_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      forms_blocks_country_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          id: number
          label: string | null
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          id?: number
          label?: string | null
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          id?: number
          label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forms_blocks_country_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "forms_blocks_country"
            referencedColumns: ["id"]
          },
        ]
      }
      forms_blocks_email: {
        Row: {
          _order: number
          _parent_id: number
          _path: string
          block_name: string | null
          id: string
          name: string
          required: boolean | null
          width: number | null
        }
        Insert: {
          _order: number
          _parent_id: number
          _path: string
          block_name?: string | null
          id: string
          name: string
          required?: boolean | null
          width?: number | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          _path?: string
          block_name?: string | null
          id?: string
          name?: string
          required?: boolean | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "forms_blocks_email_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      forms_blocks_email_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          id: number
          label: string | null
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          id?: number
          label?: string | null
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          id?: number
          label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forms_blocks_email_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "forms_blocks_email"
            referencedColumns: ["id"]
          },
        ]
      }
      forms_blocks_message: {
        Row: {
          _order: number
          _parent_id: number
          _path: string
          block_name: string | null
          id: string
        }
        Insert: {
          _order: number
          _parent_id: number
          _path: string
          block_name?: string | null
          id: string
        }
        Update: {
          _order?: number
          _parent_id?: number
          _path?: string
          block_name?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forms_blocks_message_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      forms_blocks_message_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          id: number
          message: Json | null
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          id?: number
          message?: Json | null
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          id?: number
          message?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "forms_blocks_message_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "forms_blocks_message"
            referencedColumns: ["id"]
          },
        ]
      }
      forms_blocks_number: {
        Row: {
          _order: number
          _parent_id: number
          _path: string
          block_name: string | null
          default_value: number | null
          id: string
          name: string
          required: boolean | null
          width: number | null
        }
        Insert: {
          _order: number
          _parent_id: number
          _path: string
          block_name?: string | null
          default_value?: number | null
          id: string
          name: string
          required?: boolean | null
          width?: number | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          _path?: string
          block_name?: string | null
          default_value?: number | null
          id?: string
          name?: string
          required?: boolean | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "forms_blocks_number_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      forms_blocks_number_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          id: number
          label: string | null
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          id?: number
          label?: string | null
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          id?: number
          label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forms_blocks_number_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "forms_blocks_number"
            referencedColumns: ["id"]
          },
        ]
      }
      forms_blocks_select: {
        Row: {
          _order: number
          _parent_id: number
          _path: string
          block_name: string | null
          id: string
          name: string
          placeholder: string | null
          required: boolean | null
          width: number | null
        }
        Insert: {
          _order: number
          _parent_id: number
          _path: string
          block_name?: string | null
          id: string
          name: string
          placeholder?: string | null
          required?: boolean | null
          width?: number | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          _path?: string
          block_name?: string | null
          id?: string
          name?: string
          placeholder?: string | null
          required?: boolean | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "forms_blocks_select_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      forms_blocks_select_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          default_value: string | null
          id: number
          label: string | null
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          default_value?: string | null
          id?: number
          label?: string | null
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          default_value?: string | null
          id?: number
          label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forms_blocks_select_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "forms_blocks_select"
            referencedColumns: ["id"]
          },
        ]
      }
      forms_blocks_select_options: {
        Row: {
          _order: number
          _parent_id: string
          id: string
          value: string
        }
        Insert: {
          _order: number
          _parent_id: string
          id: string
          value: string
        }
        Update: {
          _order?: number
          _parent_id?: string
          id?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "forms_blocks_select_options_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "forms_blocks_select"
            referencedColumns: ["id"]
          },
        ]
      }
      forms_blocks_select_options_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          id: number
          label: string
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          id?: number
          label: string
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          id?: number
          label?: string
        }
        Relationships: [
          {
            foreignKeyName: "forms_blocks_select_options_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "forms_blocks_select_options"
            referencedColumns: ["id"]
          },
        ]
      }
      forms_blocks_state: {
        Row: {
          _order: number
          _parent_id: number
          _path: string
          block_name: string | null
          id: string
          name: string
          required: boolean | null
          width: number | null
        }
        Insert: {
          _order: number
          _parent_id: number
          _path: string
          block_name?: string | null
          id: string
          name: string
          required?: boolean | null
          width?: number | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          _path?: string
          block_name?: string | null
          id?: string
          name?: string
          required?: boolean | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "forms_blocks_state_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      forms_blocks_state_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          id: number
          label: string | null
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          id?: number
          label?: string | null
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          id?: number
          label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forms_blocks_state_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "forms_blocks_state"
            referencedColumns: ["id"]
          },
        ]
      }
      forms_blocks_text: {
        Row: {
          _order: number
          _parent_id: number
          _path: string
          block_name: string | null
          id: string
          name: string
          required: boolean | null
          width: number | null
        }
        Insert: {
          _order: number
          _parent_id: number
          _path: string
          block_name?: string | null
          id: string
          name: string
          required?: boolean | null
          width?: number | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          _path?: string
          block_name?: string | null
          id?: string
          name?: string
          required?: boolean | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "forms_blocks_text_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      forms_blocks_text_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          default_value: string | null
          id: number
          label: string | null
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          default_value?: string | null
          id?: number
          label?: string | null
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          default_value?: string | null
          id?: number
          label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forms_blocks_text_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "forms_blocks_text"
            referencedColumns: ["id"]
          },
        ]
      }
      forms_blocks_textarea: {
        Row: {
          _order: number
          _parent_id: number
          _path: string
          block_name: string | null
          id: string
          name: string
          required: boolean | null
          width: number | null
        }
        Insert: {
          _order: number
          _parent_id: number
          _path: string
          block_name?: string | null
          id: string
          name: string
          required?: boolean | null
          width?: number | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          _path?: string
          block_name?: string | null
          id?: string
          name?: string
          required?: boolean | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "forms_blocks_textarea_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      forms_blocks_textarea_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          default_value: string | null
          id: number
          label: string | null
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          default_value?: string | null
          id?: number
          label?: string | null
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          default_value?: string | null
          id?: number
          label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forms_blocks_textarea_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "forms_blocks_textarea"
            referencedColumns: ["id"]
          },
        ]
      }
      forms_emails: {
        Row: {
          _order: number
          _parent_id: number
          bcc: string | null
          cc: string | null
          email_from: string | null
          email_to: string | null
          id: string
          reply_to: string | null
        }
        Insert: {
          _order: number
          _parent_id: number
          bcc?: string | null
          cc?: string | null
          email_from?: string | null
          email_to?: string | null
          id: string
          reply_to?: string | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          bcc?: string | null
          cc?: string | null
          email_from?: string | null
          email_to?: string | null
          id?: string
          reply_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forms_emails_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      forms_emails_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          id: number
          message: Json | null
          subject: string
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          id?: number
          message?: Json | null
          subject?: string
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          id?: number
          message?: Json | null
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "forms_emails_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "forms_emails"
            referencedColumns: ["id"]
          },
        ]
      }
      forms_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: number
          confirmation_message: Json | null
          id: number
          submit_button_label: string | null
        }
        Insert: {
          _locale: unknown[]
          _parent_id: number
          confirmation_message?: Json | null
          id?: number
          submit_button_label?: string | null
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: number
          confirmation_message?: Json | null
          id?: number
          submit_button_label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forms_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      global_good_types: {
        Row: {
          code: string
          created_at: string
          id: number
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: number
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: number
          updated_at?: string
        }
        Relationships: []
      }
      global_good_types_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: number
          description: string
          id: number
          title: string
        }
        Insert: {
          _locale: unknown[]
          _parent_id: number
          description: string
          id?: number
          title: string
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: number
          description?: string
          id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "global_good_types_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_good_types"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods: {
        Row: {
          community_forum_url: string | null
          created_at: string
          global_good_type_id: number
          host_anchor_organization_url: string | null
          id: number
          implementation_map_overview: string | null
          inception_year: number | null
          license_id: string
          logo_id: number | null
          mailing_list_url: string | null
          number_of_implementations: number | null
          policies_do_no_harm_url: string | null
          policies_governance_url: string | null
          policies_npii_used_url: string | null
          policies_pii_collected_url: string | null
          policies_privacy_policy_url: string | null
          policies_terms_of_use_url: string | null
          policies_user_agreement_url: string | null
          size_of_community: number | null
          slug: string
          total_cost_of_ownership_url: string | null
          updated_at: string
          website_demo: string | null
          website_docs: string | null
          website_main: string | null
          website_source_code: string | null
        }
        Insert: {
          community_forum_url?: string | null
          created_at?: string
          global_good_type_id: number
          host_anchor_organization_url?: string | null
          id?: number
          implementation_map_overview?: string | null
          inception_year?: number | null
          license_id: string
          logo_id?: number | null
          mailing_list_url?: string | null
          number_of_implementations?: number | null
          policies_do_no_harm_url?: string | null
          policies_governance_url?: string | null
          policies_npii_used_url?: string | null
          policies_pii_collected_url?: string | null
          policies_privacy_policy_url?: string | null
          policies_terms_of_use_url?: string | null
          policies_user_agreement_url?: string | null
          size_of_community?: number | null
          slug: string
          total_cost_of_ownership_url?: string | null
          updated_at?: string
          website_demo?: string | null
          website_docs?: string | null
          website_main?: string | null
          website_source_code?: string | null
        }
        Update: {
          community_forum_url?: string | null
          created_at?: string
          global_good_type_id?: number
          host_anchor_organization_url?: string | null
          id?: number
          implementation_map_overview?: string | null
          inception_year?: number | null
          license_id?: string
          logo_id?: number | null
          mailing_list_url?: string | null
          number_of_implementations?: number | null
          policies_do_no_harm_url?: string | null
          policies_governance_url?: string | null
          policies_npii_used_url?: string | null
          policies_pii_collected_url?: string | null
          policies_privacy_policy_url?: string | null
          policies_terms_of_use_url?: string | null
          policies_user_agreement_url?: string | null
          size_of_community?: number | null
          slug?: string
          total_cost_of_ownership_url?: string | null
          updated_at?: string
          website_demo?: string | null
          website_docs?: string | null
          website_main?: string | null
          website_source_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_global_good_type_id_global_good_types_id_fk"
            columns: ["global_good_type_id"]
            isOneToOne: false
            referencedRelation: "global_good_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "global_goods_license_id_licenses_id_fk"
            columns: ["license_id"]
            isOneToOne: false
            referencedRelation: "licenses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "global_goods_logo_id_media_id_fk"
            columns: ["logo_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_articles: {
        Row: {
          _order: number
          _parent_id: number
          id: string
          url: string | null
        }
        Insert: {
          _order: number
          _parent_id: number
          id: string
          url?: string | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          id?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_articles_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_articles_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          description: string | null
          id: number
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          description?: string | null
          id?: number
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          description?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_articles_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods_articles"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_contacts: {
        Row: {
          _order: number
          _parent_id: number
          email: string | null
          id: string
        }
        Insert: {
          _order: number
          _parent_id: number
          email?: string | null
          id: string
        }
        Update: {
          _order?: number
          _parent_id?: number
          email?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_contacts_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_contacts_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          id: number
          name: string | null
          role: string | null
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          id?: number
          name?: string | null
          role?: string | null
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          id?: number
          name?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_contacts_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_developer_documentation: {
        Row: {
          _order: number
          _parent_id: number
          id: string
          url: string | null
        }
        Insert: {
          _order: number
          _parent_id: number
          id: string
          url?: string | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          id?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_developer_documentation_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_developer_documentation_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          description: string | null
          id: number
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          description?: string | null
          id?: number
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          description?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_developer_documentation_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods_developer_documentation"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_end_user_documentation: {
        Row: {
          _order: number
          _parent_id: number
          id: string
          url: string | null
        }
        Insert: {
          _order: number
          _parent_id: number
          id: string
          url?: string | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          id?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_end_user_documentation_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_end_user_documentation_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          description: string | null
          id: number
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          description?: string | null
          id?: number
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          description?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_end_user_documentation_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods_end_user_documentation"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_events: {
        Row: {
          _order: number
          _parent_id: number
          date: string | null
          id: string
          url: string | null
        }
        Insert: {
          _order: number
          _parent_id: number
          date?: string | null
          id: string
          url?: string | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          date?: string | null
          id?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_events_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_events_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          event: string | null
          id: number
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          event?: string | null
          id?: number
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          event?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_events_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods_events"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_implementer_documentation: {
        Row: {
          _order: number
          _parent_id: number
          id: string
          url: string | null
        }
        Insert: {
          _order: number
          _parent_id: number
          id: string
          url?: string | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          id?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_implementer_documentation_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_implementer_documentation_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          description: string | null
          id: number
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          description?: string | null
          id?: number
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          description?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_implementer_documentation_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods_implementer_documentation"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_installation_documentation: {
        Row: {
          _order: number
          _parent_id: number
          id: string
          url: string | null
        }
        Insert: {
          _order: number
          _parent_id: number
          id: string
          url?: string | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          id?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_installation_documentation_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_installation_documentation_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          description: string | null
          id: number
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          description?: string | null
          id?: number
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          description?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_installation_documentation_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods_installation_documentation"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_key_funders_supporters: {
        Row: {
          _order: number
          _parent_id: number
          id: string
          url: string | null
        }
        Insert: {
          _order: number
          _parent_id: number
          id: string
          url?: string | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          id?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_key_funders_supporters_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_key_funders_supporters_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          description: string | null
          id: number
          name: string | null
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          description?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          description?: string | null
          id?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_key_funders_supporters_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods_key_funders_supporters"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: number
          climate_and_health_integration_description: string | null
          description: string | null
          description_of_community: string | null
          host_anchor_organization_description: string | null
          host_anchor_organization_name: string | null
          id: number
          inclusive_design_description: string | null
          low_carbon: string | null
          name: string
          offline_support: string | null
          policies_do_no_harm_description: string | null
          policies_governance_description: string | null
          policies_npii_used_description: string | null
          policies_pii_collected_description: string | null
          policies_privacy_policy_description: string | null
          policies_terms_of_use_description: string | null
          policies_user_agreement_description: string | null
          primary_functionality: string | null
          summary: string | null
          summary_of_maturity: string | null
          summary_of_reach: string | null
          sustainability_description: string | null
          total_cost_of_ownership_description: string | null
          user_input: string | null
          users: string | null
        }
        Insert: {
          _locale: unknown[]
          _parent_id: number
          climate_and_health_integration_description?: string | null
          description?: string | null
          description_of_community?: string | null
          host_anchor_organization_description?: string | null
          host_anchor_organization_name?: string | null
          id?: number
          inclusive_design_description?: string | null
          low_carbon?: string | null
          name: string
          offline_support?: string | null
          policies_do_no_harm_description?: string | null
          policies_governance_description?: string | null
          policies_npii_used_description?: string | null
          policies_pii_collected_description?: string | null
          policies_privacy_policy_description?: string | null
          policies_terms_of_use_description?: string | null
          policies_user_agreement_description?: string | null
          primary_functionality?: string | null
          summary?: string | null
          summary_of_maturity?: string | null
          summary_of_reach?: string | null
          sustainability_description?: string | null
          total_cost_of_ownership_description?: string | null
          user_input?: string | null
          users?: string | null
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: number
          climate_and_health_integration_description?: string | null
          description?: string | null
          description_of_community?: string | null
          host_anchor_organization_description?: string | null
          host_anchor_organization_name?: string | null
          id?: number
          inclusive_design_description?: string | null
          low_carbon?: string | null
          name?: string
          offline_support?: string | null
          policies_do_no_harm_description?: string | null
          policies_governance_description?: string | null
          policies_npii_used_description?: string | null
          policies_pii_collected_description?: string | null
          policies_privacy_policy_description?: string | null
          policies_terms_of_use_description?: string | null
          policies_user_agreement_description?: string | null
          primary_functionality?: string | null
          summary?: string | null
          summary_of_maturity?: string | null
          summary_of_reach?: string | null
          sustainability_description?: string | null
          total_cost_of_ownership_description?: string | null
          user_input?: string | null
          users?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_operator_documentation: {
        Row: {
          _order: number
          _parent_id: number
          id: string
          url: string | null
        }
        Insert: {
          _order: number
          _parent_id: number
          id: string
          url?: string | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          id?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_operator_documentation_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_operator_documentation_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          description: string | null
          id: number
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          description?: string | null
          id?: number
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          description?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_operator_documentation_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods_operator_documentation"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_product_documentation: {
        Row: {
          _order: number
          _parent_id: number
          id: string
          url: string | null
        }
        Insert: {
          _order: number
          _parent_id: number
          id: string
          url?: string | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          id?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_product_documentation_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_product_documentation_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          description: string | null
          id: number
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          description?: string | null
          id?: number
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          description?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_product_documentation_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods_product_documentation"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_rels: {
        Row: {
          climate_standards_id: number | null
          countries_id: number | null
          dpis_id: number | null
          health_standards_id: number | null
          id: number
          initiatives_id: string | null
          interoperability_standards_id: number | null
          languages_id: number | null
          order: number | null
          parent_id: number
          path: string
          sdgs_id: number | null
          whos_id: number | null
          wmos_id: number | null
        }
        Insert: {
          climate_standards_id?: number | null
          countries_id?: number | null
          dpis_id?: number | null
          health_standards_id?: number | null
          id?: number
          initiatives_id?: string | null
          interoperability_standards_id?: number | null
          languages_id?: number | null
          order?: number | null
          parent_id: number
          path: string
          sdgs_id?: number | null
          whos_id?: number | null
          wmos_id?: number | null
        }
        Update: {
          climate_standards_id?: number | null
          countries_id?: number | null
          dpis_id?: number | null
          health_standards_id?: number | null
          id?: number
          initiatives_id?: string | null
          interoperability_standards_id?: number | null
          languages_id?: number | null
          order?: number | null
          parent_id?: number
          path?: string
          sdgs_id?: number | null
          whos_id?: number | null
          wmos_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_rels_climate_standards_fk"
            columns: ["climate_standards_id"]
            isOneToOne: false
            referencedRelation: "climate_standards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "global_goods_rels_countries_fk"
            columns: ["countries_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "global_goods_rels_dpis_fk"
            columns: ["dpis_id"]
            isOneToOne: false
            referencedRelation: "dpis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "global_goods_rels_health_standards_fk"
            columns: ["health_standards_id"]
            isOneToOne: false
            referencedRelation: "health_standards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "global_goods_rels_initiatives_fk"
            columns: ["initiatives_id"]
            isOneToOne: false
            referencedRelation: "initiatives"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "global_goods_rels_interoperability_standards_fk"
            columns: ["interoperability_standards_id"]
            isOneToOne: false
            referencedRelation: "interoperability_standards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "global_goods_rels_languages_fk"
            columns: ["languages_id"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "global_goods_rels_parent_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "global_goods_rels_sdgs_fk"
            columns: ["sdgs_id"]
            isOneToOne: false
            referencedRelation: "sdgs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "global_goods_rels_whos_fk"
            columns: ["whos_id"]
            isOneToOne: false
            referencedRelation: "whos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "global_goods_rels_wmos_fk"
            columns: ["wmos_id"]
            isOneToOne: false
            referencedRelation: "wmos"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_scores: {
        Row: {
          _order: number
          _parent_id: number
          climate_resilience: number | null
          community_support: number | null
          global_utility: number | null
          id: string
          inclusive_design: number | null
          low_carbon: number | null
          maturity_of_g_g: number | null
          year: number
        }
        Insert: {
          _order: number
          _parent_id: number
          climate_resilience?: number | null
          community_support?: number | null
          global_utility?: number | null
          id: string
          inclusive_design?: number | null
          low_carbon?: number | null
          maturity_of_g_g?: number | null
          year: number
        }
        Update: {
          _order?: number
          _parent_id?: number
          climate_resilience?: number | null
          community_support?: number | null
          global_utility?: number | null
          id?: string
          inclusive_design?: number | null
          low_carbon?: number | null
          maturity_of_g_g?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_scores_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_screenshots: {
        Row: {
          _order: number
          _parent_id: number
          id: string
          image_id: number | null
        }
        Insert: {
          _order: number
          _parent_id: number
          id: string
          image_id?: number | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          id?: string
          image_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_screenshots_image_id_media_id_fk"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "global_goods_screenshots_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_screenshots_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          description: string | null
          id: number
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          description?: string | null
          id?: number
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          description?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_screenshots_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods_screenshots"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_user_requirements: {
        Row: {
          _order: number
          _parent_id: number
          id: string
          url: string | null
        }
        Insert: {
          _order: number
          _parent_id: number
          id: string
          url?: string | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          id?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_user_requirements_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods"
            referencedColumns: ["id"]
          },
        ]
      }
      global_goods_user_requirements_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          description: string | null
          id: number
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          description?: string | null
          id?: number
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          description?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "global_goods_user_requirements_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "global_goods_user_requirements"
            referencedColumns: ["id"]
          },
        ]
      }
      header: {
        Row: {
          created_at: string | null
          id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      header_nav_items: {
        Row: {
          _order: number
          _parent_id: number
          id: string
          link_label: string
          link_new_tab: boolean | null
          link_type:
            | Database["public"]["Enums"]["enum_header_nav_items_link_type"]
            | null
          link_url: string | null
        }
        Insert: {
          _order: number
          _parent_id: number
          id: string
          link_label: string
          link_new_tab?: boolean | null
          link_type?:
            | Database["public"]["Enums"]["enum_header_nav_items_link_type"]
            | null
          link_url?: string | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          id?: string
          link_label?: string
          link_new_tab?: boolean | null
          link_type?:
            | Database["public"]["Enums"]["enum_header_nav_items_link_type"]
            | null
          link_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "header_nav_items_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "header"
            referencedColumns: ["id"]
          },
        ]
      }
      header_rels: {
        Row: {
          id: number
          order: number | null
          pages_id: number | null
          parent_id: number
          path: string
          posts_id: number | null
        }
        Insert: {
          id?: number
          order?: number | null
          pages_id?: number | null
          parent_id: number
          path: string
          posts_id?: number | null
        }
        Update: {
          id?: number
          order?: number | null
          pages_id?: number | null
          parent_id?: number
          path?: string
          posts_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "header_rels_pages_fk"
            columns: ["pages_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "header_rels_parent_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "header"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "header_rels_posts_fk"
            columns: ["posts_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      health_standards: {
        Row: {
          code: string
          created_at: string
          id: number
          link: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: number
          link: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: number
          link?: string
          updated_at?: string
        }
        Relationships: []
      }
      health_standards_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: number
          description: string
          domain: Database["public"]["Enums"]["enum_health_standards_domain"]
          id: number
          name: string
          type: Database["public"]["Enums"]["enum_health_standards_type"]
        }
        Insert: {
          _locale: unknown[]
          _parent_id: number
          description: string
          domain: Database["public"]["Enums"]["enum_health_standards_domain"]
          id?: number
          name: string
          type: Database["public"]["Enums"]["enum_health_standards_type"]
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: number
          description?: string
          domain?: Database["public"]["Enums"]["enum_health_standards_domain"]
          id?: number
          name?: string
          type?: Database["public"]["Enums"]["enum_health_standards_type"]
        }
        Relationships: [
          {
            foreignKeyName: "health_standards_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "health_standards"
            referencedColumns: ["id"]
          },
        ]
      }
      initiatives: {
        Row: {
          created_at: string
          id: string
          logo_url: string
          site_url: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          logo_url: string
          site_url: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string
          site_url?: string
          updated_at?: string
        }
        Relationships: []
      }
      initiatives_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          description: string
          id: number
          label: string
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          description: string
          id?: number
          label: string
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          description?: string
          id?: number
          label?: string
        }
        Relationships: [
          {
            foreignKeyName: "initiatives_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "initiatives"
            referencedColumns: ["id"]
          },
        ]
      }
      interoperability_standards: {
        Row: {
          code: string
          created_at: string
          description: string
          domain: string
          id: number
          link: string
          name: string
          type: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description: string
          domain: string
          id?: number
          link: string
          name: string
          type: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string
          domain?: string
          id?: number
          link?: string
          name?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      languages: {
        Row: {
          code: string
          created_at: string
          id: number
          name: string
          native_name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: number
          name: string
          native_name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: number
          name?: string
          native_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      licenses: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          id: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      licenses_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: string
          description: string
          id: number
          name: string
        }
        Insert: {
          _locale: unknown[]
          _parent_id: string
          description: string
          id?: number
          name: string
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: string
          description?: string
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "licenses_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "licenses"
            referencedColumns: ["id"]
          },
        ]
      }
      media: {
        Row: {
          alt: string | null
          caption: Json | null
          created_at: string
          filename: string | null
          filesize: number | null
          focal_x: number | null
          focal_y: number | null
          height: number | null
          id: number
          mime_type: string | null
          sizes_large_filename: string | null
          sizes_large_filesize: number | null
          sizes_large_height: number | null
          sizes_large_mime_type: string | null
          sizes_large_url: string | null
          sizes_large_width: number | null
          sizes_medium_filename: string | null
          sizes_medium_filesize: number | null
          sizes_medium_height: number | null
          sizes_medium_mime_type: string | null
          sizes_medium_url: string | null
          sizes_medium_width: number | null
          sizes_og_filename: string | null
          sizes_og_filesize: number | null
          sizes_og_height: number | null
          sizes_og_mime_type: string | null
          sizes_og_url: string | null
          sizes_og_width: number | null
          sizes_small_filename: string | null
          sizes_small_filesize: number | null
          sizes_small_height: number | null
          sizes_small_mime_type: string | null
          sizes_small_url: string | null
          sizes_small_width: number | null
          sizes_square_filename: string | null
          sizes_square_filesize: number | null
          sizes_square_height: number | null
          sizes_square_mime_type: string | null
          sizes_square_url: string | null
          sizes_square_width: number | null
          sizes_thumbnail_filename: string | null
          sizes_thumbnail_filesize: number | null
          sizes_thumbnail_height: number | null
          sizes_thumbnail_mime_type: string | null
          sizes_thumbnail_url: string | null
          sizes_thumbnail_width: number | null
          sizes_xlarge_filename: string | null
          sizes_xlarge_filesize: number | null
          sizes_xlarge_height: number | null
          sizes_xlarge_mime_type: string | null
          sizes_xlarge_url: string | null
          sizes_xlarge_width: number | null
          thumbnail_u_r_l: string | null
          updated_at: string
          url: string | null
          width: number | null
        }
        Insert: {
          alt?: string | null
          caption?: Json | null
          created_at?: string
          filename?: string | null
          filesize?: number | null
          focal_x?: number | null
          focal_y?: number | null
          height?: number | null
          id?: number
          mime_type?: string | null
          sizes_large_filename?: string | null
          sizes_large_filesize?: number | null
          sizes_large_height?: number | null
          sizes_large_mime_type?: string | null
          sizes_large_url?: string | null
          sizes_large_width?: number | null
          sizes_medium_filename?: string | null
          sizes_medium_filesize?: number | null
          sizes_medium_height?: number | null
          sizes_medium_mime_type?: string | null
          sizes_medium_url?: string | null
          sizes_medium_width?: number | null
          sizes_og_filename?: string | null
          sizes_og_filesize?: number | null
          sizes_og_height?: number | null
          sizes_og_mime_type?: string | null
          sizes_og_url?: string | null
          sizes_og_width?: number | null
          sizes_small_filename?: string | null
          sizes_small_filesize?: number | null
          sizes_small_height?: number | null
          sizes_small_mime_type?: string | null
          sizes_small_url?: string | null
          sizes_small_width?: number | null
          sizes_square_filename?: string | null
          sizes_square_filesize?: number | null
          sizes_square_height?: number | null
          sizes_square_mime_type?: string | null
          sizes_square_url?: string | null
          sizes_square_width?: number | null
          sizes_thumbnail_filename?: string | null
          sizes_thumbnail_filesize?: number | null
          sizes_thumbnail_height?: number | null
          sizes_thumbnail_mime_type?: string | null
          sizes_thumbnail_url?: string | null
          sizes_thumbnail_width?: number | null
          sizes_xlarge_filename?: string | null
          sizes_xlarge_filesize?: number | null
          sizes_xlarge_height?: number | null
          sizes_xlarge_mime_type?: string | null
          sizes_xlarge_url?: string | null
          sizes_xlarge_width?: number | null
          thumbnail_u_r_l?: string | null
          updated_at?: string
          url?: string | null
          width?: number | null
        }
        Update: {
          alt?: string | null
          caption?: Json | null
          created_at?: string
          filename?: string | null
          filesize?: number | null
          focal_x?: number | null
          focal_y?: number | null
          height?: number | null
          id?: number
          mime_type?: string | null
          sizes_large_filename?: string | null
          sizes_large_filesize?: number | null
          sizes_large_height?: number | null
          sizes_large_mime_type?: string | null
          sizes_large_url?: string | null
          sizes_large_width?: number | null
          sizes_medium_filename?: string | null
          sizes_medium_filesize?: number | null
          sizes_medium_height?: number | null
          sizes_medium_mime_type?: string | null
          sizes_medium_url?: string | null
          sizes_medium_width?: number | null
          sizes_og_filename?: string | null
          sizes_og_filesize?: number | null
          sizes_og_height?: number | null
          sizes_og_mime_type?: string | null
          sizes_og_url?: string | null
          sizes_og_width?: number | null
          sizes_small_filename?: string | null
          sizes_small_filesize?: number | null
          sizes_small_height?: number | null
          sizes_small_mime_type?: string | null
          sizes_small_url?: string | null
          sizes_small_width?: number | null
          sizes_square_filename?: string | null
          sizes_square_filesize?: number | null
          sizes_square_height?: number | null
          sizes_square_mime_type?: string | null
          sizes_square_url?: string | null
          sizes_square_width?: number | null
          sizes_thumbnail_filename?: string | null
          sizes_thumbnail_filesize?: number | null
          sizes_thumbnail_height?: number | null
          sizes_thumbnail_mime_type?: string | null
          sizes_thumbnail_url?: string | null
          sizes_thumbnail_width?: number | null
          sizes_xlarge_filename?: string | null
          sizes_xlarge_filesize?: number | null
          sizes_xlarge_height?: number | null
          sizes_xlarge_mime_type?: string | null
          sizes_xlarge_url?: string | null
          sizes_xlarge_width?: number | null
          thumbnail_u_r_l?: string | null
          updated_at?: string
          url?: string | null
          width?: number | null
        }
        Relationships: []
      }
      pages: {
        Row: {
          _status: Database["public"]["Enums"]["enum_pages_status"] | null
          created_at: string
          hero_media_id: number | null
          hero_rich_text: Json | null
          hero_type: Database["public"]["Enums"]["enum_pages_hero_type"] | null
          id: number
          published_at: string | null
          slug: string | null
          slug_lock: boolean | null
          title: string | null
          updated_at: string
        }
        Insert: {
          _status?: Database["public"]["Enums"]["enum_pages_status"] | null
          created_at?: string
          hero_media_id?: number | null
          hero_rich_text?: Json | null
          hero_type?: Database["public"]["Enums"]["enum_pages_hero_type"] | null
          id?: number
          published_at?: string | null
          slug?: string | null
          slug_lock?: boolean | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          _status?: Database["public"]["Enums"]["enum_pages_status"] | null
          created_at?: string
          hero_media_id?: number | null
          hero_rich_text?: Json | null
          hero_type?: Database["public"]["Enums"]["enum_pages_hero_type"] | null
          id?: number
          published_at?: string | null
          slug?: string | null
          slug_lock?: boolean | null
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pages_hero_media_id_media_id_fk"
            columns: ["hero_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      pages_blocks_archive: {
        Row: {
          _order: number
          _parent_id: number
          _path: string
          block_name: string | null
          id: string
          intro_content: Json | null
          limit: number | null
          populate_by:
            | Database["public"]["Enums"]["enum_pages_blocks_archive_populate_by"]
            | null
          relation_to:
            | Database["public"]["Enums"]["enum_pages_blocks_archive_relation_to"]
            | null
        }
        Insert: {
          _order: number
          _parent_id: number
          _path: string
          block_name?: string | null
          id: string
          intro_content?: Json | null
          limit?: number | null
          populate_by?:
            | Database["public"]["Enums"]["enum_pages_blocks_archive_populate_by"]
            | null
          relation_to?:
            | Database["public"]["Enums"]["enum_pages_blocks_archive_relation_to"]
            | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          _path?: string
          block_name?: string | null
          id?: string
          intro_content?: Json | null
          limit?: number | null
          populate_by?:
            | Database["public"]["Enums"]["enum_pages_blocks_archive_populate_by"]
            | null
          relation_to?:
            | Database["public"]["Enums"]["enum_pages_blocks_archive_relation_to"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_blocks_archive_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      pages_blocks_content: {
        Row: {
          _order: number
          _parent_id: number
          _path: string
          block_name: string | null
          id: string
        }
        Insert: {
          _order: number
          _parent_id: number
          _path: string
          block_name?: string | null
          id: string
        }
        Update: {
          _order?: number
          _parent_id?: number
          _path?: string
          block_name?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pages_blocks_content_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      pages_blocks_content_columns: {
        Row: {
          _order: number
          _parent_id: string
          enable_link: boolean | null
          id: string
          link_appearance:
            | Database["public"]["Enums"]["enum_pages_blocks_content_columns_link_appearance"]
            | null
          link_label: string | null
          link_new_tab: boolean | null
          link_type:
            | Database["public"]["Enums"]["enum_pages_blocks_content_columns_link_type"]
            | null
          link_url: string | null
          rich_text: Json | null
          size:
            | Database["public"]["Enums"]["enum_pages_blocks_content_columns_size"]
            | null
        }
        Insert: {
          _order: number
          _parent_id: string
          enable_link?: boolean | null
          id: string
          link_appearance?:
            | Database["public"]["Enums"]["enum_pages_blocks_content_columns_link_appearance"]
            | null
          link_label?: string | null
          link_new_tab?: boolean | null
          link_type?:
            | Database["public"]["Enums"]["enum_pages_blocks_content_columns_link_type"]
            | null
          link_url?: string | null
          rich_text?: Json | null
          size?:
            | Database["public"]["Enums"]["enum_pages_blocks_content_columns_size"]
            | null
        }
        Update: {
          _order?: number
          _parent_id?: string
          enable_link?: boolean | null
          id?: string
          link_appearance?:
            | Database["public"]["Enums"]["enum_pages_blocks_content_columns_link_appearance"]
            | null
          link_label?: string | null
          link_new_tab?: boolean | null
          link_type?:
            | Database["public"]["Enums"]["enum_pages_blocks_content_columns_link_type"]
            | null
          link_url?: string | null
          rich_text?: Json | null
          size?:
            | Database["public"]["Enums"]["enum_pages_blocks_content_columns_size"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_blocks_content_columns_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "pages_blocks_content"
            referencedColumns: ["id"]
          },
        ]
      }
      pages_blocks_cta: {
        Row: {
          _order: number
          _parent_id: number
          _path: string
          block_name: string | null
          id: string
          rich_text: Json | null
        }
        Insert: {
          _order: number
          _parent_id: number
          _path: string
          block_name?: string | null
          id: string
          rich_text?: Json | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          _path?: string
          block_name?: string | null
          id?: string
          rich_text?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_blocks_cta_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      pages_blocks_cta_links: {
        Row: {
          _order: number
          _parent_id: string
          id: string
          link_appearance:
            | Database["public"]["Enums"]["enum_pages_blocks_cta_links_link_appearance"]
            | null
          link_label: string | null
          link_new_tab: boolean | null
          link_type:
            | Database["public"]["Enums"]["enum_pages_blocks_cta_links_link_type"]
            | null
          link_url: string | null
        }
        Insert: {
          _order: number
          _parent_id: string
          id: string
          link_appearance?:
            | Database["public"]["Enums"]["enum_pages_blocks_cta_links_link_appearance"]
            | null
          link_label?: string | null
          link_new_tab?: boolean | null
          link_type?:
            | Database["public"]["Enums"]["enum_pages_blocks_cta_links_link_type"]
            | null
          link_url?: string | null
        }
        Update: {
          _order?: number
          _parent_id?: string
          id?: string
          link_appearance?:
            | Database["public"]["Enums"]["enum_pages_blocks_cta_links_link_appearance"]
            | null
          link_label?: string | null
          link_new_tab?: boolean | null
          link_type?:
            | Database["public"]["Enums"]["enum_pages_blocks_cta_links_link_type"]
            | null
          link_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_blocks_cta_links_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "pages_blocks_cta"
            referencedColumns: ["id"]
          },
        ]
      }
      pages_blocks_form_block: {
        Row: {
          _order: number
          _parent_id: number
          _path: string
          block_name: string | null
          enable_intro: boolean | null
          form_id: number | null
          id: string
          intro_content: Json | null
        }
        Insert: {
          _order: number
          _parent_id: number
          _path: string
          block_name?: string | null
          enable_intro?: boolean | null
          form_id?: number | null
          id: string
          intro_content?: Json | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          _path?: string
          block_name?: string | null
          enable_intro?: boolean | null
          form_id?: number | null
          id?: string
          intro_content?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_blocks_form_block_form_id_forms_id_fk"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pages_blocks_form_block_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      pages_blocks_media_block: {
        Row: {
          _order: number
          _parent_id: number
          _path: string
          block_name: string | null
          id: string
          media_id: number | null
        }
        Insert: {
          _order: number
          _parent_id: number
          _path: string
          block_name?: string | null
          id: string
          media_id?: number | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          _path?: string
          block_name?: string | null
          id?: string
          media_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_blocks_media_block_media_id_media_id_fk"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pages_blocks_media_block_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      pages_hero_links: {
        Row: {
          _order: number
          _parent_id: number
          id: string
          link_appearance:
            | Database["public"]["Enums"]["enum_pages_hero_links_link_appearance"]
            | null
          link_label: string | null
          link_new_tab: boolean | null
          link_type:
            | Database["public"]["Enums"]["enum_pages_hero_links_link_type"]
            | null
          link_url: string | null
        }
        Insert: {
          _order: number
          _parent_id: number
          id: string
          link_appearance?:
            | Database["public"]["Enums"]["enum_pages_hero_links_link_appearance"]
            | null
          link_label?: string | null
          link_new_tab?: boolean | null
          link_type?:
            | Database["public"]["Enums"]["enum_pages_hero_links_link_type"]
            | null
          link_url?: string | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          id?: string
          link_appearance?:
            | Database["public"]["Enums"]["enum_pages_hero_links_link_appearance"]
            | null
          link_label?: string | null
          link_new_tab?: boolean | null
          link_type?:
            | Database["public"]["Enums"]["enum_pages_hero_links_link_type"]
            | null
          link_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_hero_links_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      pages_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: number
          id: number
          meta_description: string | null
          meta_image_id: number | null
          meta_title: string | null
        }
        Insert: {
          _locale: unknown[]
          _parent_id: number
          id?: number
          meta_description?: string | null
          meta_image_id?: number | null
          meta_title?: string | null
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: number
          id?: number
          meta_description?: string | null
          meta_image_id?: number | null
          meta_title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_locales_meta_image_id_media_id_fk"
            columns: ["meta_image_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pages_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      pages_rels: {
        Row: {
          categories_id: number | null
          id: number
          order: number | null
          pages_id: number | null
          parent_id: number
          path: string
          posts_id: number | null
        }
        Insert: {
          categories_id?: number | null
          id?: number
          order?: number | null
          pages_id?: number | null
          parent_id: number
          path: string
          posts_id?: number | null
        }
        Update: {
          categories_id?: number | null
          id?: number
          order?: number | null
          pages_id?: number | null
          parent_id?: number
          path?: string
          posts_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_rels_categories_fk"
            columns: ["categories_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pages_rels_pages_fk"
            columns: ["pages_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pages_rels_parent_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pages_rels_posts_fk"
            columns: ["posts_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      payload_jobs: {
        Row: {
          completed_at: string | null
          created_at: string
          error: Json | null
          has_error: boolean | null
          id: number
          input: Json | null
          processing: boolean | null
          queue: string | null
          task_slug:
            | Database["public"]["Enums"]["enum_payload_jobs_task_slug"]
            | null
          total_tried: number | null
          updated_at: string
          wait_until: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          error?: Json | null
          has_error?: boolean | null
          id?: number
          input?: Json | null
          processing?: boolean | null
          queue?: string | null
          task_slug?:
            | Database["public"]["Enums"]["enum_payload_jobs_task_slug"]
            | null
          total_tried?: number | null
          updated_at?: string
          wait_until?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          error?: Json | null
          has_error?: boolean | null
          id?: number
          input?: Json | null
          processing?: boolean | null
          queue?: string | null
          task_slug?:
            | Database["public"]["Enums"]["enum_payload_jobs_task_slug"]
            | null
          total_tried?: number | null
          updated_at?: string
          wait_until?: string | null
        }
        Relationships: []
      }
      payload_jobs_log: {
        Row: {
          _order: number
          _parent_id: number
          completed_at: string
          error: Json | null
          executed_at: string
          id: string
          input: Json | null
          output: Json | null
          state: Database["public"]["Enums"]["enum_payload_jobs_log_state"]
          task_i_d: string
          task_slug: Database["public"]["Enums"]["enum_payload_jobs_log_task_slug"]
        }
        Insert: {
          _order: number
          _parent_id: number
          completed_at: string
          error?: Json | null
          executed_at: string
          id: string
          input?: Json | null
          output?: Json | null
          state: Database["public"]["Enums"]["enum_payload_jobs_log_state"]
          task_i_d: string
          task_slug: Database["public"]["Enums"]["enum_payload_jobs_log_task_slug"]
        }
        Update: {
          _order?: number
          _parent_id?: number
          completed_at?: string
          error?: Json | null
          executed_at?: string
          id?: string
          input?: Json | null
          output?: Json | null
          state?: Database["public"]["Enums"]["enum_payload_jobs_log_state"]
          task_i_d?: string
          task_slug?: Database["public"]["Enums"]["enum_payload_jobs_log_task_slug"]
        }
        Relationships: [
          {
            foreignKeyName: "payload_jobs_log_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "payload_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      payload_locked_documents: {
        Row: {
          created_at: string
          global_slug: string | null
          id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          global_slug?: string | null
          id?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          global_slug?: string | null
          id?: number
          updated_at?: string
        }
        Relationships: []
      }
      payload_locked_documents_rels: {
        Row: {
          categories_id: number | null
          climate_standards_id: number | null
          countries_id: number | null
          dpis_id: number | null
          form_submissions_id: number | null
          forms_id: number | null
          global_good_types_id: number | null
          global_goods_id: number | null
          health_standards_id: number | null
          id: number
          initiatives_id: string | null
          interoperability_standards_id: number | null
          languages_id: number | null
          licenses_id: string | null
          media_id: number | null
          order: number | null
          pages_id: number | null
          parent_id: number
          path: string
          payload_jobs_id: number | null
          posts_id: number | null
          redirects_id: number | null
          sdgs_id: number | null
          search_id: number | null
          users_id: number | null
          whos_id: number | null
          wmos_id: number | null
        }
        Insert: {
          categories_id?: number | null
          climate_standards_id?: number | null
          countries_id?: number | null
          dpis_id?: number | null
          form_submissions_id?: number | null
          forms_id?: number | null
          global_good_types_id?: number | null
          global_goods_id?: number | null
          health_standards_id?: number | null
          id?: number
          initiatives_id?: string | null
          interoperability_standards_id?: number | null
          languages_id?: number | null
          licenses_id?: string | null
          media_id?: number | null
          order?: number | null
          pages_id?: number | null
          parent_id: number
          path: string
          payload_jobs_id?: number | null
          posts_id?: number | null
          redirects_id?: number | null
          sdgs_id?: number | null
          search_id?: number | null
          users_id?: number | null
          whos_id?: number | null
          wmos_id?: number | null
        }
        Update: {
          categories_id?: number | null
          climate_standards_id?: number | null
          countries_id?: number | null
          dpis_id?: number | null
          form_submissions_id?: number | null
          forms_id?: number | null
          global_good_types_id?: number | null
          global_goods_id?: number | null
          health_standards_id?: number | null
          id?: number
          initiatives_id?: string | null
          interoperability_standards_id?: number | null
          languages_id?: number | null
          licenses_id?: string | null
          media_id?: number | null
          order?: number | null
          pages_id?: number | null
          parent_id?: number
          path?: string
          payload_jobs_id?: number | null
          posts_id?: number | null
          redirects_id?: number | null
          sdgs_id?: number | null
          search_id?: number | null
          users_id?: number | null
          whos_id?: number | null
          wmos_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "payload_locked_documents_rels_categories_fk"
            columns: ["categories_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_climate_standards_fk"
            columns: ["climate_standards_id"]
            isOneToOne: false
            referencedRelation: "climate_standards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_countries_fk"
            columns: ["countries_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_dpis_fk"
            columns: ["dpis_id"]
            isOneToOne: false
            referencedRelation: "dpis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_form_submissions_fk"
            columns: ["form_submissions_id"]
            isOneToOne: false
            referencedRelation: "form_submissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_forms_fk"
            columns: ["forms_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_global_good_types_fk"
            columns: ["global_good_types_id"]
            isOneToOne: false
            referencedRelation: "global_good_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_global_goods_fk"
            columns: ["global_goods_id"]
            isOneToOne: false
            referencedRelation: "global_goods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_health_standards_fk"
            columns: ["health_standards_id"]
            isOneToOne: false
            referencedRelation: "health_standards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_initiatives_fk"
            columns: ["initiatives_id"]
            isOneToOne: false
            referencedRelation: "initiatives"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_interoperability_standards_fk"
            columns: ["interoperability_standards_id"]
            isOneToOne: false
            referencedRelation: "interoperability_standards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_languages_fk"
            columns: ["languages_id"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_licenses_fk"
            columns: ["licenses_id"]
            isOneToOne: false
            referencedRelation: "licenses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_media_fk"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_pages_fk"
            columns: ["pages_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_parent_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "payload_locked_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_payload_jobs_fk"
            columns: ["payload_jobs_id"]
            isOneToOne: false
            referencedRelation: "payload_jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_posts_fk"
            columns: ["posts_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_redirects_fk"
            columns: ["redirects_id"]
            isOneToOne: false
            referencedRelation: "redirects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_sdgs_fk"
            columns: ["sdgs_id"]
            isOneToOne: false
            referencedRelation: "sdgs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_search_fk"
            columns: ["search_id"]
            isOneToOne: false
            referencedRelation: "search"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_users_fk"
            columns: ["users_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_whos_fk"
            columns: ["whos_id"]
            isOneToOne: false
            referencedRelation: "whos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_wmos_fk"
            columns: ["wmos_id"]
            isOneToOne: false
            referencedRelation: "wmos"
            referencedColumns: ["id"]
          },
        ]
      }
      payload_migrations: {
        Row: {
          batch: number | null
          created_at: string
          id: number
          name: string | null
          updated_at: string
        }
        Insert: {
          batch?: number | null
          created_at?: string
          id?: number
          name?: string | null
          updated_at?: string
        }
        Update: {
          batch?: number | null
          created_at?: string
          id?: number
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      payload_preferences: {
        Row: {
          created_at: string
          id: number
          key: string | null
          updated_at: string
          value: Json | null
        }
        Insert: {
          created_at?: string
          id?: number
          key?: string | null
          updated_at?: string
          value?: Json | null
        }
        Update: {
          created_at?: string
          id?: number
          key?: string | null
          updated_at?: string
          value?: Json | null
        }
        Relationships: []
      }
      payload_preferences_rels: {
        Row: {
          id: number
          order: number | null
          parent_id: number
          path: string
          users_id: number | null
        }
        Insert: {
          id?: number
          order?: number | null
          parent_id: number
          path: string
          users_id?: number | null
        }
        Update: {
          id?: number
          order?: number | null
          parent_id?: number
          path?: string
          users_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "payload_preferences_rels_parent_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "payload_preferences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_preferences_rels_users_fk"
            columns: ["users_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          _status: Database["public"]["Enums"]["enum_posts_status"] | null
          content: Json | null
          created_at: string
          hero_image_id: number | null
          id: number
          published_at: string | null
          slug: string | null
          slug_lock: boolean | null
          title: string | null
          updated_at: string
        }
        Insert: {
          _status?: Database["public"]["Enums"]["enum_posts_status"] | null
          content?: Json | null
          created_at?: string
          hero_image_id?: number | null
          id?: number
          published_at?: string | null
          slug?: string | null
          slug_lock?: boolean | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          _status?: Database["public"]["Enums"]["enum_posts_status"] | null
          content?: Json | null
          created_at?: string
          hero_image_id?: number | null
          id?: number
          published_at?: string | null
          slug?: string | null
          slug_lock?: boolean | null
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_hero_image_id_media_id_fk"
            columns: ["hero_image_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      posts_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: number
          id: number
          meta_description: string | null
          meta_image_id: number | null
          meta_title: string | null
        }
        Insert: {
          _locale: unknown[]
          _parent_id: number
          id?: number
          meta_description?: string | null
          meta_image_id?: number | null
          meta_title?: string | null
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: number
          id?: number
          meta_description?: string | null
          meta_image_id?: number | null
          meta_title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_locales_meta_image_id_media_id_fk"
            columns: ["meta_image_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts_populated_authors: {
        Row: {
          _order: number
          _parent_id: number
          id: string
          name: string | null
        }
        Insert: {
          _order: number
          _parent_id: number
          id: string
          name?: string | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          id?: string
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_populated_authors_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts_rels: {
        Row: {
          categories_id: number | null
          id: number
          order: number | null
          parent_id: number
          path: string
          posts_id: number | null
          users_id: number | null
        }
        Insert: {
          categories_id?: number | null
          id?: number
          order?: number | null
          parent_id: number
          path: string
          posts_id?: number | null
          users_id?: number | null
        }
        Update: {
          categories_id?: number | null
          id?: number
          order?: number | null
          parent_id?: number
          path?: string
          posts_id?: number | null
          users_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_rels_categories_fk"
            columns: ["categories_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_rels_parent_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_rels_posts_fk"
            columns: ["posts_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_rels_users_fk"
            columns: ["users_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      redirects: {
        Row: {
          created_at: string
          from: string
          id: number
          to_type: Database["public"]["Enums"]["enum_redirects_to_type"] | null
          to_url: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          from: string
          id?: number
          to_type?: Database["public"]["Enums"]["enum_redirects_to_type"] | null
          to_url?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          from?: string
          id?: number
          to_type?: Database["public"]["Enums"]["enum_redirects_to_type"] | null
          to_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      redirects_rels: {
        Row: {
          id: number
          order: number | null
          pages_id: number | null
          parent_id: number
          path: string
          posts_id: number | null
        }
        Insert: {
          id?: number
          order?: number | null
          pages_id?: number | null
          parent_id: number
          path: string
          posts_id?: number | null
        }
        Update: {
          id?: number
          order?: number | null
          pages_id?: number | null
          parent_id?: number
          path?: string
          posts_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "redirects_rels_pages_fk"
            columns: ["pages_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "redirects_rels_parent_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "redirects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "redirects_rels_posts_fk"
            columns: ["posts_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      sdgs: {
        Row: {
          authority: string
          code: string
          created_at: string
          description: string
          id: number
          title: string
          updated_at: string
        }
        Insert: {
          authority?: string
          code: string
          created_at?: string
          description: string
          id?: number
          title: string
          updated_at?: string
        }
        Update: {
          authority?: string
          code?: string
          created_at?: string
          description?: string
          id?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      search: {
        Row: {
          created_at: string
          id: number
          meta_description: string | null
          meta_image_id: number | null
          meta_title: string | null
          priority: number | null
          slug: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          meta_description?: string | null
          meta_image_id?: number | null
          meta_title?: string | null
          priority?: number | null
          slug?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          meta_description?: string | null
          meta_image_id?: number | null
          meta_title?: string | null
          priority?: number | null
          slug?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "search_meta_image_id_media_id_fk"
            columns: ["meta_image_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      search_categories: {
        Row: {
          _order: number
          _parent_id: number
          category_i_d: string | null
          id: string
          relation_to: string | null
          title: string | null
        }
        Insert: {
          _order: number
          _parent_id: number
          category_i_d?: string | null
          id: string
          relation_to?: string | null
          title?: string | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          category_i_d?: string | null
          id?: string
          relation_to?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "search_categories_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "search"
            referencedColumns: ["id"]
          },
        ]
      }
      search_locales: {
        Row: {
          _locale: unknown[]
          _parent_id: number
          id: number
          title: string | null
        }
        Insert: {
          _locale: unknown[]
          _parent_id: number
          id?: number
          title?: string | null
        }
        Update: {
          _locale?: unknown[]
          _parent_id?: number
          id?: number
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "search_locales_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "search"
            referencedColumns: ["id"]
          },
        ]
      }
      search_rels: {
        Row: {
          id: number
          order: number | null
          parent_id: number
          path: string
          posts_id: number | null
        }
        Insert: {
          id?: number
          order?: number | null
          parent_id: number
          path: string
          posts_id?: number | null
        }
        Update: {
          id?: number
          order?: number | null
          parent_id?: number
          path?: string
          posts_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "search_rels_parent_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "search"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "search_rels_posts_fk"
            columns: ["posts_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          hash: string | null
          id: number
          lock_until: string | null
          login_attempts: number | null
          name: string | null
          reset_password_expiration: string | null
          reset_password_token: string | null
          salt: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          hash?: string | null
          id?: number
          lock_until?: string | null
          login_attempts?: number | null
          name?: string | null
          reset_password_expiration?: string | null
          reset_password_token?: string | null
          salt?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          hash?: string | null
          id?: number
          lock_until?: string | null
          login_attempts?: number | null
          name?: string | null
          reset_password_expiration?: string | null
          reset_password_token?: string | null
          salt?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      users_sessions: {
        Row: {
          _order: number
          _parent_id: number
          created_at: string | null
          expires_at: string
          id: string
        }
        Insert: {
          _order: number
          _parent_id: number
          created_at?: string | null
          expires_at: string
          id: string
        }
        Update: {
          _order?: number
          _parent_id?: number
          created_at?: string | null
          expires_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_sessions_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      whos: {
        Row: {
          authority: string
          code: string
          created_at: string
          description: string | null
          group_code: string
          group_name: string
          id: number
          title: string
          updated_at: string
        }
        Insert: {
          authority?: string
          code: string
          created_at?: string
          description?: string | null
          group_code: string
          group_name: string
          id?: number
          title: string
          updated_at?: string
        }
        Update: {
          authority?: string
          code?: string
          created_at?: string
          description?: string | null
          group_code?: string
          group_name?: string
          id?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      wmos: {
        Row: {
          authority: string
          code: string
          created_at: string
          description: string | null
          group_code: string
          group_name: string
          id: number
          title: string
          updated_at: string
        }
        Insert: {
          authority?: string
          code: string
          created_at?: string
          description?: string | null
          group_code: string
          group_name: string
          id?: number
          title: string
          updated_at?: string
        }
        Update: {
          authority?: string
          code?: string
          created_at?: string
          description?: string | null
          group_code?: string
          group_name?: string
          id?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      _locales: "en" | "fr" | "es"
      enum__pages_v_blocks_archive_populate_by: "collection" | "selection"
      enum__pages_v_blocks_archive_relation_to: "posts"
      enum__pages_v_blocks_content_columns_link_appearance:
        | "default"
        | "outline"
      enum__pages_v_blocks_content_columns_link_type: "reference" | "custom"
      enum__pages_v_blocks_content_columns_size:
        | "oneThird"
        | "half"
        | "twoThirds"
        | "full"
      enum__pages_v_blocks_cta_links_link_appearance: "default" | "outline"
      enum__pages_v_blocks_cta_links_link_type: "reference" | "custom"
      enum__pages_v_published_locale: "en" | "fr" | "es"
      enum__pages_v_version_hero_links_link_appearance: "default" | "outline"
      enum__pages_v_version_hero_links_link_type: "reference" | "custom"
      enum__pages_v_version_hero_type:
        | "none"
        | "highImpact"
        | "mediumImpact"
        | "lowImpact"
      enum__pages_v_version_status: "draft" | "published"
      enum__posts_v_published_locale: "en" | "fr" | "es"
      enum__posts_v_version_status: "draft" | "published"
      enum_climate_standards_domain: "climate" | "weather_and_climate"
      enum_climate_standards_type:
        | "metadata"
        | "format"
        | "service"
        | "data_format"
        | "exchange"
        | "other"
      enum_countries_type: "State" | "Territory" | "Other"
      enum_footer_nav_items_link_type: "reference" | "custom"
      enum_forms_confirmation_type: "message" | "redirect"
      enum_header_nav_items_link_type: "reference" | "custom"
      enum_health_standards_domain: "health"
      enum_health_standards_type:
        | "messaging"
        | "classification"
        | "terminology"
        | "identifier"
        | "other"
      enum_pages_blocks_archive_populate_by: "collection" | "selection"
      enum_pages_blocks_archive_relation_to: "posts"
      enum_pages_blocks_content_columns_link_appearance: "default" | "outline"
      enum_pages_blocks_content_columns_link_type: "reference" | "custom"
      enum_pages_blocks_content_columns_size:
        | "oneThird"
        | "half"
        | "twoThirds"
        | "full"
      enum_pages_blocks_cta_links_link_appearance: "default" | "outline"
      enum_pages_blocks_cta_links_link_type: "reference" | "custom"
      enum_pages_hero_links_link_appearance: "default" | "outline"
      enum_pages_hero_links_link_type: "reference" | "custom"
      enum_pages_hero_type: "none" | "highImpact" | "mediumImpact" | "lowImpact"
      enum_pages_status: "draft" | "published"
      enum_payload_jobs_log_state: "failed" | "succeeded"
      enum_payload_jobs_log_task_slug: "inline" | "schedulePublish"
      enum_payload_jobs_task_slug: "inline" | "schedulePublish"
      enum_posts_status: "draft" | "published"
      enum_redirects_to_type: "reference" | "custom"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      _locales: ["en", "fr", "es"],
      enum__pages_v_blocks_archive_populate_by: ["collection", "selection"],
      enum__pages_v_blocks_archive_relation_to: ["posts"],
      enum__pages_v_blocks_content_columns_link_appearance: [
        "default",
        "outline",
      ],
      enum__pages_v_blocks_content_columns_link_type: ["reference", "custom"],
      enum__pages_v_blocks_content_columns_size: [
        "oneThird",
        "half",
        "twoThirds",
        "full",
      ],
      enum__pages_v_blocks_cta_links_link_appearance: ["default", "outline"],
      enum__pages_v_blocks_cta_links_link_type: ["reference", "custom"],
      enum__pages_v_published_locale: ["en", "fr", "es"],
      enum__pages_v_version_hero_links_link_appearance: ["default", "outline"],
      enum__pages_v_version_hero_links_link_type: ["reference", "custom"],
      enum__pages_v_version_hero_type: [
        "none",
        "highImpact",
        "mediumImpact",
        "lowImpact",
      ],
      enum__pages_v_version_status: ["draft", "published"],
      enum__posts_v_published_locale: ["en", "fr", "es"],
      enum__posts_v_version_status: ["draft", "published"],
      enum_climate_standards_domain: ["climate", "weather_and_climate"],
      enum_climate_standards_type: [
        "metadata",
        "format",
        "service",
        "data_format",
        "exchange",
        "other",
      ],
      enum_countries_type: ["State", "Territory", "Other"],
      enum_footer_nav_items_link_type: ["reference", "custom"],
      enum_forms_confirmation_type: ["message", "redirect"],
      enum_header_nav_items_link_type: ["reference", "custom"],
      enum_health_standards_domain: ["health"],
      enum_health_standards_type: [
        "messaging",
        "classification",
        "terminology",
        "identifier",
        "other",
      ],
      enum_pages_blocks_archive_populate_by: ["collection", "selection"],
      enum_pages_blocks_archive_relation_to: ["posts"],
      enum_pages_blocks_content_columns_link_appearance: ["default", "outline"],
      enum_pages_blocks_content_columns_link_type: ["reference", "custom"],
      enum_pages_blocks_content_columns_size: [
        "oneThird",
        "half",
        "twoThirds",
        "full",
      ],
      enum_pages_blocks_cta_links_link_appearance: ["default", "outline"],
      enum_pages_blocks_cta_links_link_type: ["reference", "custom"],
      enum_pages_hero_links_link_appearance: ["default", "outline"],
      enum_pages_hero_links_link_type: ["reference", "custom"],
      enum_pages_hero_type: ["none", "highImpact", "mediumImpact", "lowImpact"],
      enum_pages_status: ["draft", "published"],
      enum_payload_jobs_log_state: ["failed", "succeeded"],
      enum_payload_jobs_log_task_slug: ["inline", "schedulePublish"],
      enum_payload_jobs_task_slug: ["inline", "schedulePublish"],
      enum_posts_status: ["draft", "published"],
      enum_redirects_to_type: ["reference", "custom"],
    },
  },
} as const
