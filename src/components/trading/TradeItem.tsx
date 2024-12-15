import React from 'react';
import { ExternalLink } from 'lucide-react';
import { formatAddress } from '../../utils';

function TradeItem({ creator, side, amount, transactionHash, timestamp, price }) {
    const formatTimeAgo = (timestamp) => {
        const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);

        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        return new Date(timestamp).toLocaleDateString();
    };

    return (
        <div className="flex items-center px-4 py-3 hover:bg-[#1A1B2A] group border-b border-[#1F2037]/50">
            {/* Account */}
            <div className="w-[17.5%] text-left">
                <span className="font-mono text-gray-300">
                    {formatAddress(creator)}
                </span>
            </div>

            {/* Type */}
            <div className="w-[17.5%] text-left">
                <span className={`${side.toLowerCase() === 'buy'
                    ? 'text-emerald-500'
                    : 'text-red-500'
                    }`}>
                    {side.toLowerCase()}
                </span>
            </div>

            {/* Amount */}
            <div className="w-[17.5%] text-left">
                <span className="text-gray-300">
                    {amount.toLocaleString()}
                </span>
            </div>

            {/* Price */}
            <div className="w-[17.5%] text-left">
                <span className="text-gray-300">
                    {price.toLocaleString()}
                </span>
            </div>


            {/* Time */}
            <div className="w-[17.5%] text-left">
                <span className="text-gray-400">
                    {formatTimeAgo(timestamp)}
                </span>
            </div>

            {/* Transaction */}
            <div className="flex-1 text-left">
                <a
                    href={`https://testnet.snowtrace.io/tx/${transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-[#8A2BE2] font-mono"
                >
                    {formatAddress(transactionHash)}
                    <ExternalLink className="w-3.5 h-3.5 inline ml-1 opacity-0 group-hover:opacity-100" />
                </a>
            </div>
        </div>
    );
}

// Table Header Component
function TradeTableHeader({ tokenSymbol }) {
    return (
        <div className="flex px-4 py-3 border-b border-[#1F2037] text-gray-500 text-sm">
            <div className="w-[17.5%] text-left">account</div>
            <div className="w-[17.5%] text-left">type</div>
            <div className="w-[17.5%] text-left">{tokenSymbol}</div>
            <div className="w-[17.5%] text-left">AVAX</div>
            <div className="w-[17.5%] text-left">date</div>
            <div className="flex-1 text-left">transaction</div>
        </div>
    );
}

// Trade List Component that includes the header and items
function TradeList({ trades, tokenSymbol }) {
    return (
        <div className="rounded-lg">
            <TradeTableHeader tokenSymbol={tokenSymbol} />
            {trades.map((trade, index) => (
                <TradeItem
                    key={index}
                    creator={trade.creator}
                    price={trade.price}
                    side={trade.side}
                    amount={trade.amount}
                    transactionHash={trade.transactionHash}
                    timestamp={trade.timestamp}
                />
            ))}
        </div>
    );
}

export { TradeItem, TradeList };