const clientId = 'dae67d5ae07d4550a36ada4bdbb61db9';
const redirectUri = 'http://127.0.0.1:5173/';
let accessToken;

const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

const sha256 = async (plain) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}


const Spotify = {
    async getAccessToken() {
        // Checks for valid token in memory
        if (accessToken) return accessToken;
        // Checks for stored token and expiration time
        const storedToken = localStorage.getItem('access_token');
        const storedExpiry = Number(localStorage.getItem('token_expires_at'));
        const refreshToken = localStorage.getItem('refresh_token');

        const now = Date.now();
        // Checks if the token exists and isn't expired
        if (storedToken && storedExpiry && now < storedExpiry) {
            accessToken = storedToken;
            return accessToken;
        };

        // If expired, but a refresh token exists, refreshes token
        if (refreshToken && now >= storedExpiry) {
            try {
                const url = 'https://accounts.spotify.com/api/token';
                const payload = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({
                        client_id: clientId,
                        grant_type: 'refresh_token',
                        refresh_token: refreshToken,
                    }),
                };

                const response = await fetch(url, payload);
                const data = await response.json();

                if (data.access_token) {
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('token_expires_at', Date.now() + data.expires_in * 1000);
                    accessToken = data.access_token;
                    return accessToken;
                } else {
                    throw new Error('Failed to refresh token');
                };
            } catch(err) {
                console.error('Error refreshing token', err);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('token_expires_at');
                window.location.href = '/';
            };
        };

        // Checks for code in URL, exchanges it for tokens if present
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        // If no code and refresh token, starts a new login
        if (!code) {
            const codeVerifier = generateRandomString(64);
            localStorage.setItem('code_verifier', codeVerifier);

            const hashed = await sha256(codeVerifier);
            const codeChallenge = base64encode(hashed);

            const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
            const authUrl = new URL('https://accounts.spotify.com/authorize');

            const params = {
                response_type: 'code',
                client_id: clientId,
                scope,
                code_challenge_method: 'S256',
                code_challenge: codeChallenge,
                redirect_uri: redirectUri,
            };

            authUrl.search = '?' + new URLSearchParams(params).toString();
            window.location.href = authUrl.toString();
            return;
        };

        // Exchange the code for an access & refresh token
        try {
            const codeVerifier = localStorage.getItem('code_verifier');
            const url = 'https://accounts.spotify.com/api/token';
            const payload = {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    client_id: clientId,
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: redirectUri,
                    code_verifier: codeVerifier,
                }),
            };

            const response = await fetch(url, payload);
            const data = await response.json();
            
            if (data.access_token) {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                localStorage.setItem('token_expires_at', Date.now() + data.expires_in * 1000);
                localStorage.removeItem('code_verifier');

                accessToken = data.access_token;
                window.history.pushState({}, null, '/');
                return accessToken;
            } else {
                throw new Error(`Failed to retrieve access token: ${JSON.stringify(data)}`);
            };
        } catch(err) {
            console.error('Failed fetching access token', err);
            return null;
        };

    },

    async searchTrack(term) {
        const token = await Spotify.getAccessToken();

        if (!token) {
            console.error('No valid access token available.');
            return;
        }
        
        const apiUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(term)}&type=track`;
        
        try {
            const response = await fetch(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if(!response.ok) {
                const errorData = await response.json()
                console.error('Spotify API error:', errorData);
                throw new Error(`HTTP ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
            }
            const data = await response.json();
            console.log(data);
            return data.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        } catch(error) {
            console.log('Error fetching data:', error);
        };
    },

    async savePlaylist(name, trackUris) {
        const token = await Spotify.getAccessToken();

        if (!token) {
            console.error('No valid access token available');
            return;
        }
        
        try {
            const getUserRes = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!getUserRes.ok) {
                const errorData = await getUserRes.json();
                throw new Error(`HTTP ${getUserRes.status} - ${errorData.error?.message || 'Unknown error'}`);
            };
            const userData = await getUserRes.json();
            console.log(userData.id);

            const newPlaylistRes = await fetch(`https://api.spotify.com/v1/users/${userData.id}/playlists`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer  ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: name, description: 'Playlist Created from Jammming!'}),
            });
            if (!newPlaylistRes.ok) {
                const errorData = await newPlaylistRes.json();
                throw new Error(`HTTP ${getUserRes.status} - ${errorData.error?.message || 'Unknown error'}`);
            }
            const playListData = await newPlaylistRes.json()
            
            const addTracksRes = await fetch(`https://api.spotify.com/v1/playlists/${playListData.id}/tracks`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uris: trackUris, position: 0 }),
            });
            if (!addTracksRes.ok) {
                const errorData = await addTracksRes.json();
                throw new Error(`HTTP ${getUserRes.status} - ${errorData.error?.message || 'Unknown error'}`);
            };
            
            return;
            
        } catch (error) {
            console.log('Error fetching User ID & Saving Playlist:', error);
        }

    },
};

export default Spotify;