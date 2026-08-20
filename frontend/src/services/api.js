import axios from 'axios';

// Vite exposes env vars prefixed with VITE_ — set VITE_API_URL in a .env file
// to point at your backend (defaults to localhost:5000 for local dev).
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Attach the admin JWT (if present) to every outgoing request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('portfolio_admin_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Track an in-flight refresh so concurrent 401s don't each fire their own
// /auth/refresh call.
let refreshPromise = null;

const clearSession = () => {
    localStorage.removeItem('portfolio_admin_token');
    localStorage.removeItem('portfolio_admin_refresh_token');
};

const refreshAccessToken = () => {
    const refreshToken = localStorage.getItem('portfolio_admin_refresh_token');
    if (!refreshToken) return Promise.reject(new Error('No refresh token available'));

    if (!refreshPromise) {
        refreshPromise = axios
            .post(`${API_BASE_URL}/auth/refresh`, { refreshToken })
            .then((res) => {
                const { accessToken } = res.data.data;
                localStorage.setItem('portfolio_admin_token', accessToken);
                return accessToken;
            })
            .finally(() => {
                refreshPromise = null;
            });
    }
    return refreshPromise;
};

// On a 401, try to silently refresh the access token and retry the original
// request once. Only clear the session (forcing a re-login) if the refresh
// itself fails or no refresh token exists.
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { config, response } = error;

        const isAuthEndpoint = config?.url?.includes('/auth/login') || config?.url?.includes('/auth/refresh');

        if (response && response.status === 401 && !config._retry && !isAuthEndpoint) {
            config._retry = true;
            try {
                const accessToken = await refreshAccessToken();
                config.headers.Authorization = `Bearer ${accessToken}`;
                return api(config);
            } catch {
                clearSession();
                return Promise.reject(error);
            }
        }

        if (response && response.status === 401 && isAuthEndpoint) {
            clearSession();
        }

        return Promise.reject(error);
    }
);

export default api;
export { API_BASE_URL };
