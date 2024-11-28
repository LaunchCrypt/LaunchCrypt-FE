import React, { useState } from 'react';
import { Heart, MessageCircle, ArrowDown, List, PenSquare } from 'lucide-react';

const TabButton = ({ children, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`
        h-8 flex items-center gap-1.5 px-3 py-1.5 rounded-lg
        transition-all duration-200
        ${isActive
                ? 'bg-slate-800 text-slate-200'
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-300'}
      `}
    >
        {children}
    </button>
);

const ActionButton = ({ children }) => (
    <button
        className={`
        flex items-center gap-1.5 px-3 py-1.5
        text-sm text-blue-500 
        hover:text-blue-400
        transition-colors duration-200
      `}
    >
        {children}
    </button>
);

const CommentTrade = () => {
    const [activeTab, setActiveTab] = useState('thread');

    return (
        <div className="bg-slate-900 text-slate-300 mt-5 rounded-xl pb-4">
            {/* Tabs */}
            <div className="flex items-center justify-between h-14 bg-slate-900/95 rounded-xl">
                {/* Left side - Tabs */}
                <div className="flex gap-1 pl-2">
                    <TabButton
                        isActive={activeTab === 'thread'}
                        onClick={() => setActiveTab('thread')}
                    >
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 text-sm">thread</span>
                    </TabButton>

                    <TabButton
                        isActive={activeTab === 'trades'}
                        onClick={() => setActiveTab('trades')}
                    >
                        <List className="w-4 h-4" />
                        <span className="text-sm">trades</span>
                    </TabButton>
                </div>

                {/* Right side - Actions */}
                <div className="flex items-center gap-1 pr-2">
                    <ActionButton>
                        <PenSquare className="w-3.5 h-3.5" />
                        <span>post a reply</span>
                    </ActionButton>

                    <ActionButton>
                        <ArrowDown className="w-3.5 h-3.5" />
                        <span>scroll to bottom</span>
                    </ActionButton>
                </div>
            </div>

            {/* Comments Section */}
            <div className="space-y-3 p-6">
                {/* Main Post */}
                <div className="bg-slate-800 p-4 rounded-lg transition-colors">
                    <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-purple-500/30">
                            <img src="/api/placeholder/48/48" alt="avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-md text-sm font-medium">
                                    Kindev (dev)
                                </span>
                                <span className="text-slate-500 text-sm">11/28/2024, 9:57:20 AM</span>
                            </div>
                            <div className='flex flex-row'>
                                <h3 className="text-lg font-medium mb-1">SipSip (SipSip)</h3>
                                <p className="text-slate-400">Capybara Sip! Sip!</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comments */}
                <div className="space-y-3">
                    {/* Comment 1 */}
                    <CommentItem
                        username="5L69tj"
                        time="9:57:20 AM"
                        content="were sending this to ray join cto"

                        likes={0}
                    />

                    {/* Comment 2 */}
                    <CommentItem
                        username="ECXxgVnip"
                        time="9:57:20 AM"
                        content="I like this!"
                        likes={0}
                    />
                </div>
            </div>
        </div>
    );
};

// Comment Item Component
const CommentItem = ({ username, userImage, time, content, likes, image }) => (
    <div className="group p-4 rounded-lg transition-colors bg-slate-800">
        <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-slate-700/30">
                <img src="/api/placeholder/40/40" alt="commenter" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 items-start">
                <div className="flex items-center gap-3">
                    <span className="font-medium text-slate-300">{username}</span>
                    <span className="text-slate-500 text-sm">{time}</span>
                    <div className="flex items-center gap-1 text-slate-500 hover:text-fuchsia-400 transition-colors cursor-pointer">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{likes}</span>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                        [reply]
                    </button>
                </div>
                <div className="flex flex-row text-slate-300 mt-2">
                    <h3 className="text-lg font-medium mb-1">SipSip (SipSip)</h3>
                    <p className="text-slate-400">Capybara Sip! Sip!</p>
                </div>
            </div>
        </div>
    </div>
);

export default CommentTrade;