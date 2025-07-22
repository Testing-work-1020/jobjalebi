import fetch from 'node-fetch';

const API_URL = 'https://jsearch.p.rapidapi.com/search';
const RAPIDAPI_KEY = 'a9f09e8a23msh2031079b33f8b8cp1e1532jsn3e6be4171549';

const queryParams = new URLSearchParams({
  query: 'developer jobs in India',  // Change location or job title here
  page: '1',
  num_pages: '1',
  country: 'in',
  date_posted: 'all'
});

async function fetchJobs() {
  try {
    const response = await fetch(`${API_URL}?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': 'jsearch.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Jobs data:', data);
  } catch (error) {
    console.error('Error fetching jobs:', error.message);
  }
}

fetchJobs();
