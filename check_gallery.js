
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://lwopwtoeuhorobwztene.supabase.co';
const supabaseKey = 'sb_publishable_k9EU7wFdWQqwKxncN_JH5Q_yXsUBzsv';

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log('--- Gallery ---');
    const { data: g, error: ge } = await supabase.from('gallery').select('*');
    if (ge) console.error('Gallery error:', ge);
    else console.log(g);
}

check();
