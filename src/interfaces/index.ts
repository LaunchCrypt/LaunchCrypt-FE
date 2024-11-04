export interface Inetwork {
    name: string;
    symbol: string;
    image: string;
}

export interface ItimeConfig {
    interval: string
    limit: number;
    type: 'dayMonth' | 'time';
}

export interface Itoken {
    name: string;
    symbol: string;
    address: string;
    image: string;
}

export interface SocialLinks {
    website: string;
    twitter: string;
    telegram: string;
    discord: string;
    medium: string;
}
