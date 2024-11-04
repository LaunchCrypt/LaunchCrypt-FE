import React from 'react';
import { Check, ExternalLink, Coins, BarChart2, Globe, AlertCircle, Globe as WebsiteIcon, Twitter, Send, MessageCircle, BookOpen } from 'lucide-react';
import { useSelector } from 'react-redux';
import { truncateText } from '../../../utils';

function Final() {
  const newTokenData = useSelector((state: any) => state.newToken);

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
        onClick={()=> console.log(url)}
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-purple-400 hover:text-purple-300 flex items-center group">
        <Icon className="w-4 h-4 mr-2 text-gray-400" />
        {url}
        <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>
    );
  };

  // Filter out empty social links
  const socialLinks = Object.entries(newTokenData.socialLinks || {}).filter(([_, url]) => url);

  return (
    <div className="bg-slate-800 rounded-xl p-8 shadow-xl mt-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      {/* Title */}
      <div className="text-center mb-12 relative">
        <div className="h-20 w-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-10 w-10 text-purple-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">Review Your Token</h2>
        <p className="text-gray-400 text-lg">Please review your token details before launching</p>
      </div>

      {/* Token Details Grid */}
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
              <p className="text-white font-medium">{newTokenData.name || "Not set"}</p>
            </div>
            <div className="p-3 bg-slate-700/30 rounded-lg">
              <p className="text-gray-400 text-sm mb-1">Token Symbol</p>
              <p className="text-white font-medium">{newTokenData.symbol || "Not set"}</p>
            </div>
            <div className="p-3 bg-slate-700/30 rounded-lg">
              <p className="text-gray-400 text-sm mb-1">Description</p>
              <p className="text-white font-medium">{truncateText(newTokenData.description)}</p>
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
                {newTokenData.totalSupply?.toLocaleString() || "Not set"}
              </p>
            </div>
            <div className="p-3 bg-slate-700/30 rounded-lg">
              <p className="text-gray-400 text-sm mb-1">Fee</p>
              <p className="text-white font-medium">{newTokenData.fee}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links Section - Only show if there are social links */}
      {socialLinks.length > 0 && (
        <div className="bg-slate-700/30 rounded-xl p-6 space-y-6 backdrop-blur-sm mb-10">
          <div className="flex items-center space-x-3 border-b border-gray-700 pb-4">
            <Globe className="h-6 w-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Social Links</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialLinks.map(([platform, url]) => {
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

      {/* Notice Box */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-purple-400/10 to-purple-500/10 blur-xl" />
        <div className="relative p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm">
          <div className="flex items-start space-x-4">
            <AlertCircle className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-white font-semibold mb-2">Important Note</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                By launching this token, you agree to our terms and conditions. Make sure all the information provided is correct as it cannot be changed after deployment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Final;