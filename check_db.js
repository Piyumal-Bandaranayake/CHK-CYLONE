
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log('--- Districts ---');
    const { data: d, error: de } = await supabase.from('districts').select('id, name');
    if (de) console.error('Districts error:', de);
    else console.log(d);

    console.log('\n--- Famous Places ---');
    const { data: f, error: fe } = await supabase.from('famous_places').select('id, district_id, name');
    if (fe) console.error('Places error:', fe);
    else console.log(f);
}

check();
