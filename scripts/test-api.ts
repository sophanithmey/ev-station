import { createClient } from '@supabase/supabase-js';

const url = process.env.VITE_SUPABASE_URL;
const key =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in environment.');
  process.exit(1);
}

console.log(`Connecting to Supabase at: ${url}`);
const supabase = createClient(url, key);

async function testApi() {
  console.log('\n--- 1. Querying stations_view ---');
  const { data: stations, error: stErr, count } = await supabase
    .from('stations_view')
    .select('slug, name, province, connector, latitude, longitude, is_24_hours', { count: 'exact' })
    .limit(3);

  if (stErr) {
    console.error('Error fetching stations_view:', stErr);
  } else {
    console.log(`Success! Total active stations: ${count}`);
    console.log('Sample rows:', stations);
  }

  console.log('\n--- 2. Testing RPC nearby_stations (Phnom Penh center) ---');
  const { data: nearby, error: nbErr } = await supabase.rpc('nearby_stations', {
    lat: 11.55,
    lng: 104.92,
    radius_km: 5,
    max_results: 3,
  });

  if (nbErr) {
    console.error('RPC nearby_stations error:', nbErr);
  } else {
    console.log('Nearby stations found:', nearby);
  }

  console.log('\n--- 3. Testing RPC station_stats ---');
  const { data: stats, error: statsErr } = await supabase.rpc('station_stats');
  if (statsErr) {
    console.error('RPC station_stats error:', statsErr);
  } else {
    console.log('Station stats aggregated:', stats);
  }
}

testApi().catch((err) => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
