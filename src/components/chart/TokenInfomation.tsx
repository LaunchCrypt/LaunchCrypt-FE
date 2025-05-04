import { Check, ExternalLink, Coins, BarChart2, Globe, AlertCircle, Globe as WebsiteIcon, Twitter, Send, MessageCircle, BookOpen } from 'lucide-react';
import React from 'react'
import { truncateText } from '../../utils';

function TokenInfomation({ name, symbol, description, totalSupply, fee, socialLinks }: { name: string, symbol: string, description: string, totalSupply: string, fee: string, socialLinks: any }) {
    const socialLinksAfterFilter = Object.entries(socialLinks || {}).filter(([_, url]) => url);
    return (
        <div className="rounded-xl p-8 shadow-xl relative overflow-hidden pt-2 pb-2 w-[50vw]">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="text-2xl font-bold text-white mb-6">
                ABOUT
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* Token Information Section */}
                <div className="bg-slate-700/30 rounded-xl p-6 space-y-6 backdrop-blur-sm">
                    <div className="flex items-center space-x-3 border-b border-gray-700 pb-4">
                        <Coins className="h-6 w-6 text-purple-400" />
                        <h3 className="text-lg font-semibold text-white">Token Information</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="p-3 bg-slate-700/30 rounded-lg">
                            <p className="text-gray-400 text-sm mb-1">Token Name</p>
                            <p className="text-white font-medium">{name || "Not set"}</p>
                        </div>
                        <div className="p-3 bg-slate-700/30 rounded-lg">
                            <p className="text-gray-400 text-sm mb-1">Token Symbol</p>
                            <p className="text-white font-medium">{symbol || "Not set"}</p>
                        </div>
                        <div className="p-3 bg-slate-700/30 rounded-lg">
                            <p className="text-gray-400 text-sm mb-1">Description</p>
                            <p className="text-white font-medium">{truncateText(description)}</p>
                        </div>
                    </div>
                </div>

                {/* Tokenomics Section */}
                <div className="bg-slate-700/30 rounded-xl p-6 space-y-6 backdrop-blur-sm">
                    <div className="flex items-center space-x-3 border-b border-gray-700 pb-4">
                        <BarChart2 className="h-6 w-6 text-purple-400" />
                        <h3 className="text-lg font-semibold text-white">Tokenomics</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="p-3 bg-slate-700/30 rounded-lg">
                            <p className="text-gray-400 text-sm mb-1">Total Supply</p>
                            <p className="text-white font-medium">
                                {totalSupply?.toLocaleString() || "Not set"}
                            </p>
                        </div>
                        <div className="p-3 bg-slate-700/30 rounded-lg">
                            <p className="text-gray-400 text-sm mb-1">Fee</p>
                            <p className="text-white font-medium">{fee}%</p>
                        </div>
                    </div>
                </div>
            </div>
            {socialLinksAfterFilter.length > 0 && (
                <div className="bg-slate-700/30 rounded-xl p-6 space-y-6 backdrop-blur-sm mb-10">
                    <div className="flex items-center space-x-3 border-b border-gray-700 pb-4">
                        <Globe className="h-6 w-6 text-purple-400" />
                        <h3 className="text-lg font-semibold text-white">Social Links</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {socialLinksAfterFilter.map(([platform, url]) => {
                            const socialLink = renderSocialLink(platform, url as string);
                            if (!socialLink) return null;

                            return (
                                <div key={platform} className="p-3 bg-slate-700/30 rounded-lg">
                                    <p className="text-gray-400 text-sm mb-1 capitalize">{platform}</p>
                                    <div className="truncate">
                                        {socialLink}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

const socialIcons = {
    website: WebsiteIcon,
    twitter: Twitter,
    telegram: Send,
    discord: MessageCircle,
    medium: BookOpen
};

const renderSocialLink = (platform: string, url: string) => {
    if (!url) return null; // Return null instead of "Not provided"
    const Icon = socialIcons[platform as keyof typeof socialIcons];
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 flex items-center group">
            <Icon className="w-4 h-4 mr-2 text-gray-400" />
            {url}
            <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
    );
};

export default TokenInfomation