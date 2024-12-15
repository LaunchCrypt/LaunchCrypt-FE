import React, { useEffect, useRef, useState } from 'react';
import { Heart, MessageCircle, ArrowDown, List, PenSquare } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import WalletWarning from '../common/WalletWarning'
import Modal from '../Modal/Modal';
import { userTrade } from '../../hooks/useTrade';
import CommentItem from './CommentItem';
import { TradeList } from './TradeItem';

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

const ActionButton = ({ children, onClick }) => (
    <button
        onClick={onClick}
        className={`
        flex items-center gap-1.5 px-3 py-1.5
        text-sm text-textPrimary
        hover:text-purple-500
        transition-colors duration-200
      `}
    >
        {children}
    </button>
);



const CommentTrade = ({ userAddress, tokenSymbol }) => {
    const location = useLocation();
    const [isWalletWarning, setWalletWarning] = useState(false)
    const [activeTab, setActiveTab] = useState('thread');
    const [newMessage, setNewMessage] = useState('');
    const [replyTo, setReplyTo] = useState<string>('');
    const { liquidityPairId, tokenId } = location.state || {};
    const creator = useSelector((state: any) => state.user.address);
    const { messages, sendMessage, loveMessage, isConnected } = useChat(
        liquidityPairId,
    );

    const { trades } = userTrade(liquidityPairId, tokenId);
    const postMessageRef = useRef(null);
    console.log('message', messages)
    const handleSendMessage = async (e) => {
        if (userAddress == "") {
            setWalletWarning(true)
        }
        e.preventDefault();
        if (newMessage.trim()) {
            await sendMessage(newMessage, creator);
            setNewMessage('');
            setReplyTo('');
        }
    };

    const scrollToBottom = () => {
        postMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-slate-900 text-slate-300 mt-5 rounded-xl pb-4 mb-4">
            {isWalletWarning && <Modal isVisible={isWalletWarning}
                onClose={() => setWalletWarning(false)}
                children={<WalletWarning closeModal={() => setWalletWarning(false)} />} />
            }
            <div className="flex items-center justify-between h-14 bg-slate-900/95 rounded-xl px-3">
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
                {activeTab == 'thread' && <div className="flex items-center gap-1 pr-2">
                    <ActionButton onClick={scrollToBottom}>
                        <PenSquare className="w-3.5 h-3.5" />
                        <span>post a reply</span>
                    </ActionButton>
                </div>}
            </div>

            {/* Comments Section */}

            {activeTab == "thread" ? <div className="space-y-3 p-6">
                {messages.map((message) => (
                    <CommentItem
                        key={message.id}
                        creatorInfo = {message.creatorInfo}
                        creator={message.creator}
                        time={new Date(message.timestamp).toLocaleString()}
                        content={message.message}
                        likes={message.loveCount}
                        onLove={() => loveMessage(message.id)}
                        onReply={() => setReplyTo(message.id)}
                    />
                ))}
            </div> :
                <div className="space-y-3 p-6">
                    <TradeList trades={trades} tokenSymbol={tokenSymbol}/>
                </div>
            }

            {/* Input Section */}
            {isConnected && activeTab == 'thread' && (
                <form onSubmit={handleSendMessage} className="px-6 ">
                    <div className="flex items-center gap-2" ref={postMessageRef}>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder={replyTo ? "Write a reply..." : "Write a message..."}
                            className="flex-1 bg-slate-800 text-slate-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition-colors duration-200"
                        >
                            Send
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};


export default CommentTrade;