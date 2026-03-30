
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkFamousPlacesColumns() {
    console.log('--- Famous Places Sample ---');
    const { data: fp, error: fpe } = await supabase.from('famous_places').select('*').limit(1);
    if (fpe) console.error('Famous Places error:', fpe);
    else {
        if (fp.length === 0) {
            console.log('No data found, trying to get table definition from PostgREST if possible (might fail silently)');
            // Another way is to try a dummy insert or just check if the table exists
        }
        console.log('Columns found:', Object.keys(fp[0] || {}));
    }
}

checkFamousPlacesColumns();
