const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkDistricts() {
    const { data: provinces, error: pError } = await supabase.from('provinces').select('*, districts(*)');
    if (pError) {
        console.error('Error fetching provinces:', pError);
        return;
    }
    
    console.log('--- Proviences/Districts Data ---');
    provinces.forEach(p => {
        console.log(`Province: ${p.name} (id: ${p.id})`);
        if (p.districts) {
            p.districts.forEach(d => {
                console.log(`  - District: ${d.name} (id: ${d.id}), Image: "${d.image}"`);
            });
        }
    });

    const { data: famous, error: fError } = await supabase.from('famous_places').select('*');
    if (fError) {
        console.error('Error fetching famous places:', fError);
        return;
    }
    console.log('\n--- Famous Places Data ---');
    famous.forEach(f => {
        console.log(`  - District ID: ${f.district_id}, Name: ${f.name}, Image: "${f.image}"`);
    });
}

checkDistricts();
