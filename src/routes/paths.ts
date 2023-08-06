// -------------Main Paths ------------------------

const ROOTS = {
    AUTH: '/auth',
    WEBSITE: '/',
};

// ------------Page Paths-------------------

export const paths = {
    // AUTH
    auth: {
        login: `${ROOTS.AUTH}/login`,
        register: `${ROOTS.AUTH}/register`,
    },
    // DASHBOARD
    website: {
        root: ROOTS.WEBSITE,
        one: `${ROOTS.WEBSITE}/playlist`
    },
};
// ------------Api Endpoints -------------------
export const BASE_API_URL = `${process.env.BASE_API_URL}`;

export const API_ENDPOINTS = {
    auth: {
        login: "/site/login",
        register: "/site/register",
    },
    song: '/song',
    playlist: '/playlist'
}