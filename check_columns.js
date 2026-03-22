
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkColumns() {
    console.log('--- Packages Sample ---');
    const { data: p, error: pe } = await supabase.from('packages').select('*').limit(1);
    if (pe) console.error('Packages error:', pe);
    else console.log('Columns:', Object.keys(p[0] || {}));

    console.log('\n--- Hotels Sample ---');
    const { data: h, error: he } = await supabase.from('hotels').select('*').limit(1);
    if (he) console.error('Hotels error:', he);
    else console.log('Columns:', Object.keys(h[0] || {}));
}

checkColumns();
