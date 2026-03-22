
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://lwopwtoeuhorobwztene.supabase.co';
const supabaseKey = 'sb_publishable_k9EU7wFdWQqwKxncN_JH5Q_yXsUBzsv';

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log('--- Packages ---');
    const { data: p, error: pe } = await supabase.from('packages').select('*');
    if (pe) console.error('Packages error:', pe);
    else console.log(JSON.stringify(p, null, 2));

    console.log('\n--- Hotels ---');
    const { data: h, error: he } = await supabase.from('hotels').select('*');
    if (he) console.error('Hotels error:', he);
    else console.log(JSON.stringify(h, null, 2));
}

check();
