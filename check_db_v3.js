
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://lwopwtoeuhorobwztene.supabase.co';
const supabaseKey = 'sb_publishable_k9EU7wFdWQqwKxncN_JH5Q_yXsUBzsv';

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log('--- Provinces ---');
    const { data: p, error: pe } = await supabase.from('provinces').select('id, name');
    if (pe) console.error('Provinces error:', pe);
    else console.log(p);

    console.log('\n--- Districts ---');
    const { data: d, error: de } = await supabase.from('districts').select('id, name');
    if (de) console.error('Districts error:', de);
    else console.log(d);
}

check();
