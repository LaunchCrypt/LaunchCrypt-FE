import { Globe, Info, Twitter, Send, MessageCircle, BookOpen } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeNewTokenData } from '../../../redux/slice/newTokenSlice';
import { SocialLinks } from '../../../interfaces';


function LinkingSocials() {
  const dispatch = useDispatch();
  const newTokenData = useSelector((state: any) => state.newToken);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    website: '',
    twitter: '',
    telegram: '',
    discord: '',
    medium: ''
  });

  const handleChange = (platform: keyof SocialLinks, value: string) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  useEffect(() => {
    return () => {
      // This function runs when the component is unmounted
      dispatch(changeNewTokenData({
        ...newTokenData,
        socialLinks
      }));
    };
  }, [socialLinks]);

  const socialInputs = [
    {
      platform: 'website',
      label: 'Website URL',
      placeholder: 'https://yourwebsite.com',
      icon: Globe
    },
    {
      platform: 'twitter',
      label: 'Twitter URL',
      placeholder: 'https://twitter.com/yourusername',
      icon: Twitter
    },
    {
      platform: 'telegram',
      label: 'Telegram URL',
      placeholder: 'https://t.me/yourusername',
      icon: Send  // Using Send for Telegram
    },
    {
      platform: 'discord',
      label: 'Discord URL',
      placeholder: 'https://discord.gg/yourserver',
      icon: MessageCircle  // Using MessageCircle for Discord
    },
    {
      platform: 'medium',
      label: 'Medium URL',
      placeholder: 'https://medium.com/@yourusername',
      icon: BookOpen  // Using BookOpen for Medium
    }
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-xl mt-6">
      <div className="space-y-6">
        {socialInputs.map(({ platform, label, placeholder, icon: Icon }) => (
          <div key={platform} className="space-y-2">
            <label className="flex items-center text-white text-sm font-medium">
              {label}
              <Info className="w-4 h-4 ml-2 text-gray-400" />
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                value={socialLinks[platform as keyof SocialLinks]}
                onChange={(e) => handleChange(platform as keyof SocialLinks, e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 px-4 py-3 bg-slate-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LinkingSocials