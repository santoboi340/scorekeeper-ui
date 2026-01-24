export const API_URL = (process.env.WEB_ORIGIN !== undefined) ? `${process.env.WEB_ORIGIN}` : "https://scorepal-dev.mts-lab.net";

// if(API_URL===undefined)
// API_URL = `http://${window.location.hostname}:8080`