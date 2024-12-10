import React, { useState } from 'react';
import { User, Heart, MessageSquare, ExternalLink, Edit2, PlusCircle, Eye } from 'lucide-react';
import { useSelector } from 'react-redux';
import WalletWarning from '../components/common/WalletWarning';
import Modal from '../components/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import EditProfile from '../components/userProfile/EditProfile';

const NavLink = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-8 py-4 text-base transition-colors relative
    ${active
      ? 'text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#8A2BE2]'
      : 'text-gray-500 hover:text-gray-300'}`}
  >
    {children}
  </button>
);

const UserProfile = () => {
  const navigate = useNavigate();
  const userAddress = useSelector((state: any) => state.user.address);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('coins');

  return (
    userAddress == "" ?
      <Modal isVisible={true}
        onClose={() => navigate('/')}
        children={<WalletWarning closeModal={() => { }} />} />
      :
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <Modal isVisible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          children={<EditProfile currentProfile={{ username: 'hello ^^' }} onClose={() => setIsModalOpen(false)} />} />
      

        <div className="rounded-3xl bg-[#13141F] border border-[#1F2037]">
          {/* Profile Header */}
          <div className="p-8 space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex gap-6">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-[#1A1B2A] flex items-center justify-center">
                  <User className="w-10 h-10 text-gray-500" />
                </div>

                {/* User Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl text-white">@</span>
                    <span className="text-gray-500 text-lg">0 followers</span>
                  </div>
                  <p className="text-white text-lg">hello ^^</p>
                </div>
              </div>

              {/* Edit Profile Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-lg 
                bg-[#1A1B2A] hover:bg-[#22233A] transition-colors
                text-gray-300 text-base border border-[#1F2037]">
                <Edit2 className="w-5 h-5" />
                edit profile
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 text-base">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-white">3</span>
                <span className="text-gray-500">likes received</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-green-500" />
                <span className="text-white">0</span>
                <span className="text-gray-500">mentions received</span>
              </div>
            </div>

            {/* Wallet Address */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#1A1B2A] text-base">
              <code className="font-mono text-gray-400">{userAddress}</code>
              <a href={`https://testnet.snowtrace.io/address/${userAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#8A2BE2] hover:text-[#9D44F0]">
                view on snowtrace
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex border-b border-[#1F2037]">
            <NavLink active={activeTab === 'coins'} onClick={() => setActiveTab('coins')}>
              coins held
            </NavLink>
            <NavLink active={activeTab === 'replies'} onClick={() => setActiveTab('replies')}>
              replies
            </NavLink>
            <NavLink active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')}>
              notifications
              <span className="ml-2 px-2 py-0.5 text-sm bg-[#8A2BE2]/20 text-[#9D44F0] rounded-full">
                3
              </span>
            </NavLink>
            <NavLink active={activeTab === 'created'} onClick={() => setActiveTab('created')}>
              coins created
            </NavLink>
            <NavLink active={activeTab === 'followers'} onClick={() => setActiveTab('followers')}>
              followers
            </NavLink>
            <NavLink active={activeTab === 'following'} onClick={() => setActiveTab('following')}>
              following
            </NavLink>
          </nav>

          {/* Content Area */}
          <div className="p-8">
            <div className="flex gap-6 justify-center">
              <button className="flex items-center gap-2 px-8 py-4 rounded-xl 
                bg-[#1A1B2A] hover:bg-[#22233A] transition-colors
                text-gray-300 text-base border border-[#1F2037]">
                <PlusCircle className="w-5 h-5" />
                add coin
              </button>
              <button className="flex items-center gap-2 px-8 py-4 rounded-xl 
                bg-[#1A1B2A] hover:bg-[#22233A] transition-colors
                text-gray-300 text-base border border-[#1F2037]">
                <Eye className="w-5 h-5" />
                show dust coins
              </button>
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-3 mt-8 text-lg">
              <button className="text-gray-500 hover:text-gray-300">[&lt;&lt;]</button>
              <span className="text-white">1</span>
              <button className="text-gray-500 hover:text-gray-300">[&gt;&gt;]</button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default UserProfile;