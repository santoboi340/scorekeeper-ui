let API_URL = "https://scorepal-dev.mts-lab.net";

// Fetch config at runtime from server
if (typeof window !== 'undefined') {
  fetch('/api/config')
    .then(res => res.json())
    .then(config => {
      API_URL = config.apiUrl;
    })
    .catch(err => console.error('Failed to load config:', err))
}

export { API_URL };

// if(API_URL===undefined)
// API_URL = `http://${window.location.hostname}:8080`