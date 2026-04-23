export async function searchParts(query, context) {

  const API = 'http://10.252.0.42:4000'; // YOUR NETWORK IP

  try {
    const res = await fetch(API + '/search?q=' + encodeURIComponent(query));

    if (!res.ok) {
      throw new Error('API not reachable');
    }

    const live = await res.json();

    return {
      results: live.results || []
    };

  } catch (err) {
    console.error('Search API error:', err.message);

    return {
      results: []
    };
  }
}
