//--------------------Login Types----------------------
interface UserLoginRequest {
    username: string;
    password: string;
}

interface UserLoginResponse {
    ok: string;
    result: {
        access_token: string;
        access_token_expration: string;
    };
}


//--------------------Register Types----------------------
interface UserRegisterRequest {
    first_name: string;
    last_name: string;
    username: string;
    password: string;
}

interface UserRegisterResponse {
    ok: string;
    result: {
        first_name: string;
        last_name: string;
        username: string;
        id: number;
    };
}



//--------------------Music----------------------
interface MusicItem {
    id: number;
    album_name: string;
    artist_name: string;
    duration: string;
    title: string;
    year: string;
    file: string;
    format: string;
}


interface MusicResponse {
    ok: boolean;
    result: {
        items: MusicItem[]
    };
}

//--------------------Playlist----------------------
interface PlaylistRequest {
    title: string;
    cover: File;
}

interface PlaylistResponse {
    ok: boolean;
    result: MusicItem[];
}
interface AllPlaylistResponse {
    ok: boolean;
    result: {
        items: MusicItem[]
    };
}

// interface Song {}

interface RootObject {
    ok: boolean;
    result:{
        title: string;
        created_at: string;
        id: number;
        cover: string;
        updated_at: string | null;
        songs: MusicItem[];
    };
}


//------------------------------------------
export type {
    UserLoginRequest,UserLoginResponse,UserRegisterRequest,UserRegisterResponse,MusicItem,MusicResponse
}
