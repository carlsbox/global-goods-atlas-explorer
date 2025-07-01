
-- Global Goods Platform Database Schema
-- Supabase PostgreSQL Schema

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Reference Tables

-- Languages table
CREATE TABLE languages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(10) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  native_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Countries table
CREATE TABLE countries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  iso_code VARCHAR(3) UNIQUE NOT NULL,
  type VARCHAR(50) DEFAULT 'Country',
  names JSONB NOT NULL, -- {"en": {"short": "...", "formal": "..."}}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Global Good Types
CREATE TABLE global_good_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) UNIQUE NOT NULL,
  title JSONB NOT NULL, -- {"en": "Software", "fr": "Logiciel", "es": "Software"}
  description JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Classifications
CREATE TABLE classifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) UNIQUE NOT NULL,
  title JSONB NOT NULL,
  description JSONB,
  authority VARCHAR(50) NOT NULL, -- SDG, WHO, WMO, DPI
  group_code VARCHAR(10),
  group_name VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Standards
CREATE TABLE standards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) UNIQUE NOT NULL,
  name JSONB NOT NULL,
  description JSONB NOT NULL,
  domain VARCHAR(50) NOT NULL, -- Health, Weather, Technology
  type VARCHAR(50) NOT NULL, -- exchange, terminology, etc.
  link VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Licenses
CREATE TABLE licenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  license_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  url VARCHAR(500),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Main Entity Tables

-- Organizations
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  url VARCHAR(500),
  description TEXT,
  logo_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Global Goods
CREATE TABLE global_goods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  logo VARCHAR(500),
  summary JSONB NOT NULL, -- Multilingual
  description JSONB NOT NULL, -- Multilingual
  primary_functionality JSONB,
  users JSONB,
  inception_year INTEGER,
  size_of_community INTEGER,
  number_of_implementations INTEGER,
  
  -- Website links
  website_main VARCHAR(500),
  website_docs VARCHAR(500),
  website_source VARCHAR(500),
  website_demo VARCHAR(500),
  
  -- License
  license_id UUID REFERENCES licenses(id),
  
  -- Community information
  community_description JSONB,
  host_organization_id UUID REFERENCES organizations(id),
  
  -- Policies
  governance_url VARCHAR(500),
  terms_of_use_url VARCHAR(500),
  user_agreement_url VARCHAR(500),
  privacy_policy_url VARCHAR(500),
  do_no_harm_url VARCHAR(500),
  pii_collected_url VARCHAR(500),
  npii_used_url VARCHAR(500),
  
  -- Events
  events_description JSONB,
  events_schedule_url VARCHAR(500),
  
  -- Links
  community_url VARCHAR(500),
  mailing_list_url VARCHAR(500),
  
  -- Other fields
  reach_summary JSONB,
  maturity_summary JSONB,
  climate_integration JSONB,
  inclusive_design JSONB,
  environmental_impact JSONB,
  tco_description JSONB,
  tco_url VARCHAR(500),
  sustainability JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Global Good Screenshots
CREATE TABLE global_good_screenshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  global_good_id UUID REFERENCES global_goods(id) ON DELETE CASCADE,
  url VARCHAR(500) NOT NULL,
  description JSONB,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Global Good Contacts
CREATE TABLE global_good_contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  global_good_id UUID REFERENCES global_goods(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(200),
  role VARCHAR(200),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Global Good Events
CREATE TABLE global_good_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  global_good_id UUID REFERENCES global_goods(id) ON DELETE CASCADE,
  event_name VARCHAR(300) NOT NULL,
  event_date DATE,
  url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Maturity Scores
CREATE TABLE maturity_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  global_good_id UUID REFERENCES global_goods(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  global_utility INTEGER CHECK (global_utility >= 0 AND global_utility <= 10),
  community_support INTEGER CHECK (community_support >= 0 AND community_support <= 10),
  maturity_of_gg INTEGER CHECK (maturity_of_gg >= 0 AND maturity_of_gg <= 10),
  inclusive_design INTEGER CHECK (inclusive_design >= 0 AND inclusive_design <= 10),
  climate_resilience INTEGER CHECK (climate_resilience >= 0 AND climate_resilience <= 10),
  low_carbon INTEGER CHECK (low_carbon >= 0 AND low_carbon <= 10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Use Cases
CREATE TABLE use_cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  title JSONB NOT NULL,
  purpose JSONB NOT NULL,
  scope JSONB NOT NULL,
  actors JSONB NOT NULL,
  preconditions JSONB,
  process_steps JSONB NOT NULL,
  postconditions JSONB,
  data_requirements JSONB,
  technology_components JSONB,
  challenges JSONB,
  sustainability_considerations JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resources
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  global_good_id UUID REFERENCES global_goods(id) ON DELETE CASCADE,
  type VARCHAR(100) NOT NULL, -- Articles, ProductDocumentation, etc.
  description JSONB NOT NULL,
  url VARCHAR(500) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Key Funders/Supporters
CREATE TABLE funders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  global_good_id UUID REFERENCES global_goods(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  url VARCHAR(500),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Junction Tables for Many-to-Many Relationships

-- Global Good Types Junction
CREATE TABLE global_good_type_relations (
  global_good_id UUID REFERENCES global_goods(id) ON DELETE CASCADE,
  type_id UUID REFERENCES global_good_types(id) ON DELETE CASCADE,
  PRIMARY KEY (global_good_id, type_id)
);

-- Global Good Languages Junction
CREATE TABLE global_good_languages (
  global_good_id UUID REFERENCES global_goods(id) ON DELETE CASCADE,
  language_id UUID REFERENCES languages(id) ON DELETE CASCADE,
  PRIMARY KEY (global_good_id, language_id)
);

-- Global Good Classifications Junction
CREATE TABLE global_good_classifications (
  global_good_id UUID REFERENCES global_goods(id) ON DELETE CASCADE,
  classification_id UUID REFERENCES classifications(id) ON DELETE CASCADE,
  PRIMARY KEY (global_good_id, classification_id)
);

-- Global Good Standards Junction
CREATE TABLE global_good_standards (
  global_good_id UUID REFERENCES global_goods(id) ON DELETE CASCADE,
  standard_id UUID REFERENCES standards(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL, -- HealthStandards, Interoperability, ClimateStandards
  PRIMARY KEY (global_good_id, standard_id, category)
);

-- Global Good Countries Junction (Implementation)
CREATE TABLE global_good_countries (
  global_good_id UUID REFERENCES global_goods(id) ON DELETE CASCADE,
  country_id UUID REFERENCES countries(id) ON DELETE CASCADE,
  PRIMARY KEY (global_good_id, country_id)
);

-- Organization Countries Junction
CREATE TABLE organization_countries (
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  country_id UUID REFERENCES countries(id) ON DELETE CASCADE,
  PRIMARY KEY (organization_id, country_id)
);

-- Use Case Global Goods Junction
CREATE TABLE use_case_global_goods (
  use_case_id UUID REFERENCES use_cases(id) ON DELETE CASCADE,
  global_good_id UUID REFERENCES global_goods(id) ON DELETE CASCADE,
  PRIMARY KEY (use_case_id, global_good_id)
);

-- Use Case Classifications Junction
CREATE TABLE use_case_classifications (
  use_case_id UUID REFERENCES use_cases(id) ON DELETE CASCADE,
  classification_id UUID REFERENCES classifications(id) ON DELETE CASCADE,
  PRIMARY KEY (use_case_id, classification_id)
);

-- Use Case Standards Junction
CREATE TABLE use_case_standards (
  use_case_id UUID REFERENCES use_cases(id) ON DELETE CASCADE,
  standard_id UUID REFERENCES standards(id) ON DELETE CASCADE,
  PRIMARY KEY (use_case_id, standard_id)
);

-- Create indexes for performance
CREATE INDEX idx_global_goods_slug ON global_goods(slug);
CREATE INDEX idx_use_cases_slug ON use_cases(slug);
CREATE INDEX idx_classifications_authority ON classifications(authority);
CREATE INDEX idx_standards_domain ON standards(domain);
CREATE INDEX idx_maturity_scores_year ON maturity_scores(year);

-- Enable Row Level Security (RLS)
ALTER TABLE global_goods ENABLE ROW LEVEL SECURITY;
ALTER TABLE use_cases ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on global_goods" ON global_goods FOR SELECT USING (true);
CREATE POLICY "Allow public read access on use_cases" ON use_cases FOR SELECT USING (true);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_global_goods_updated_at BEFORE UPDATE ON global_goods FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_use_cases_updated_at BEFORE UPDATE ON use_cases FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
