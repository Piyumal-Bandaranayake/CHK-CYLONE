-- Run this in your Supabase SQL Editor to create the necessary tables

-- Drop tables if they exist to start fresh
DROP TABLE IF EXISTS packages;
DROP TABLE IF EXISTS hotels;
DROP TABLE IF EXISTS famous_places;
DROP TABLE IF EXISTS districts;
DROP TABLE IF EXISTS provinces;
CREATE TABLE provinces (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE districts (
    id TEXT PRIMARY KEY,
    province_id TEXT NOT NULL REFERENCES provinces(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE famous_places (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    province_id TEXT NOT NULL,
    district_id TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Note: To allow anonymous reads from your website, you can enable Row Level Security (RLS) and add select policies:
ALTER TABLE provinces ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON provinces FOR SELECT USING (true);

ALTER TABLE districts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON districts FOR SELECT USING (true);

ALTER TABLE famous_places ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON famous_places FOR SELECT USING (true);

CREATE TABLE packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    duration TEXT NOT NULL,
    price TEXT NOT NULL,
    image TEXT,
    tag TEXT NOT NULL,
    color TEXT NOT NULL,
    features TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON packages FOR SELECT USING (true);
CREATE POLICY "Allow public insert." ON packages FOR INSERT WITH CHECK (true);

CREATE TABLE hotels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    image TEXT,
    tag TEXT NOT NULL,
    rating TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON hotels FOR SELECT USING (true);
CREATE POLICY "Allow public insert." ON hotels FOR INSERT WITH CHECK (true);

-- Adding insert policies for destination tables for the admin dashboard
CREATE POLICY "Allow public insert." ON provinces FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert." ON districts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert." ON famous_places FOR INSERT WITH CHECK (true);

-- Gallery Table
CREATE TABLE gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country TEXT NOT NULL,
    image TEXT,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON gallery FOR SELECT USING (true);
CREATE POLICY "Allow public insert." ON gallery FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update." ON gallery FOR UPDATE USING (true);
CREATE POLICY "Allow public delete." ON gallery FOR DELETE USING (true);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    message TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow public to submit reviews
CREATE POLICY "Allow public insert" ON reviews FOR INSERT WITH CHECK (true);

-- Allow public to read ONLY approved reviews
CREATE POLICY "Allow public read approved" ON reviews FOR SELECT USING (status = 'approved');

-- Allow admin (authenticated or with matching policies) to manage all
-- Note: Current admin dashboard uses public actions, so we'll add public update/delete for now to match your existing patterns
CREATE POLICY "Allow public update" ON reviews FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON reviews FOR DELETE USING (true);

-- Note: Admin authentication is handled via Supabase Auth (Authentication > Users).
-- To create an admin, add a user in the Supabase Dashboard.
