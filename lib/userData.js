import { getToken } from "./authenticate";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchWithToken(url, method, body = null) {
  const token = getToken();
  const options = {
    method,
    headers: {
      'Authorization': `JWT ${token}`,
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);
  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}

export async function addToFavourites(id) {
  return fetchWithToken(`${API_URL}/favourites/${id}`, 'PUT');
}

export async function removeFromFavourites(id) {
  return fetchWithToken(`${API_URL}/favourites/${id}`, 'DELETE');
}

export async function getFavourites() {
  return fetchWithToken(`${API_URL}/favourites`, 'GET');
}

export async function addToHistory(id) {
  return fetchWithToken(`${API_URL}/history/${id}`, 'PUT');
}

export async function removeFromHistory(id) {
  return fetchWithToken(`${API_URL}/history/${id}`, 'DELETE');
}

export async function getHistory() {
  return fetchWithToken(`${API_URL}/history`, 'GET');
}