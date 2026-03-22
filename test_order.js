
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://lwopwtoeuhorobwztene.supabase.co';
const supabaseKey = 'sb_publishable_k9EU7wFdWQqwKxncN_JH5Q_yXsUBzsv';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testOrder() {
    console.log('--- Testing Packages Order ---');
    try {
        const { data, error } = await supabase.from('packages').select('*').order('created_at', { ascending: false }).limit(1);
        if (error) {
            console.log('created_at failed:', error.message);
            const { data: data2, error: error2 } = await supabase.from('packages').select('*').limit(1);
            if (data2 && data2[0]) console.log('Available columns:', Object.keys(data2[0]));
        } else {
            console.log('created_at exists! Sample keys:', Object.keys(data[0] || {}));
        }
    } catch (e) {
        console.error('Error:', e.message);
    }
}

testOrder();
