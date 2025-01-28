export interface Inetwork {
    name: string;
    symbol: string;
    image?: string;
    chainId?: number;
}

export interface ItimeConfig {
    interval: string
    limit: number;
    type: 'dayMonth' | 'time';
}

export interface Itoken {
    name: string;
    symbol: string;
    contractAddress?:string;
    image: string;
    type: 'native' | 'ERC20';
}

export interface SocialLinks {
    website: string;
    twitter: string;
    telegram: string;
    discord: string;
    medium: string;
}

export interface IqueryAll {
    page?: number;
    limit?: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
    keyword?: string;
}

export interface IUserProfile {
    name?:string;
    image?:string;
    bio?:string;
    publickey?: string;
    followers?: string[];
    following?: string[];
    mentionReceived?:number;
    likeReceived?:number;
}

export interface IMessage {
    id: string;
    creator: string;
    message: string;
    timestamp: number;
    loveCount: number;
    children?: IMessage[];
    parent?: string;
    creatorInfo?: any;
}