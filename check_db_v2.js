
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://lwopwtoeuhorobwztene.supabase.co';
const supabaseKey = 'sb_publishable_k9EU7wFdWQqwKxncN_JH5Q_yXsUBzsv';

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
