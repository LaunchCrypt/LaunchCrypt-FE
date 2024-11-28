import React, { useState } from 'react';

const holders = [
  { address: 'B2cqwF', label: '(bonding curve)', value: 23.74, icon: '🏠' },
  { address: '7t9GgH', label: '(dev)', value: 2.00, icon: '🎖' },
  { address: 'Hx5CYJ', label: '', value: 0.70 },
  { address: '9xSNhA', label: '', value: 0.70 },
  { address: '4Q6EXe', label: '', value: 0.70 },
  { address: '93vwZP', label: '', value: 0.69 },
  { address: 'AoMCC9', label: '', value: 0.69 },
  { address: '7MyTcz', label: '', value: 0.69 },
  { address: 'A8M4wj', label: '', value: 0.68 },
  { address: '36HcYE', label: '', value: 0.68 },
  { address: '6hjotC', label: '', value: 0.68 },
  { address: '49XxgD', label: '', value: 0.68 },
  { address: '9awnKP', label: '', value: 0.68 },
  { address: 'DB4bKX', label: '', value: 0.66 },
  { address: '5H5ekY', label: '', value: 0.66 },
  { address: 'HWcPdg', label: '', value: 0.65 },
  { address: '9DhZYn', label: '', value: 0.65 },
  { address: 'APos4B', label: '', value: 0.65 }
];


const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-colors duration-200";
  const variants = {
    primary: "bg-[#c97dff] hover:bg-[#9c5af3] text-white",
    secondary: "bg-slate-700 hover:bg-slate-600 text-white",
    ghost: "bg-transparent hover:bg-fuchsia-500/10 text-slate-400 hover:text-fuchsia-400",
    outline: "bg-slate-800/50 border border-fuchsia-500/20 text-white hover:bg-fuchsia-500/10 hover:border-fuchsia-500/40"
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const TradingSidebar = () => {
  const [amount, setAmount] = useState('123');

  return (
    <div className="w-[380px] h-fit pb-4">
      <div className="w-[380px] space-y-6 bg-slate-900 p-4 border-l border-slate-800 rounded-xl">
        {/* Trading Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button className="w-full">buy</Button>
          <Button variant="secondary" className="w-full">sell</Button>
        </div>

        {/* Token Switch */}
        <div className="flex justify-between items-center">
          <Button variant="ghost">switch to greg</Button>
          <Button variant="ghost">set max slippage</Button>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <div className="flex justify-between items-center gap-4">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 bg-slate-800/50 border border-fuchsia-500/20 rounded-lg px-3 py-2 w-32 text-white outline-none focus:border-fuchsia-500/50"
            />
            <select className="bg-slate-800/50 border border-fuchsia-500/20 rounded-lg px-3 py-2 text-white outline-none focus:border-fuchsia-500/50 appearance-none cursor-pointer">
              <option>SOL</option>
            </select>
          </div>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" className="w-full">0.1 SOL</Button>
            <Button variant="outline" className="w-full">0.5 SOL</Button>
            <Button variant="outline" className="w-full">1 SOL</Button>
          </div>
        </div>

        <div className='text-left text-sm text-gray-400 '>
          123 GREG
        </div>

        {/* Place Trade Button */}
        <Button className="w-full h-12 text-lg font-semibold">
          place trade
        </Button>

        {/* Bonding Curve Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">bonding curve progress: 6%</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-4 h-4 text-slate-400 fill-current"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div
              className="bg-[#c97dff] h-2 rounded-full transition-all duration-300"
              style={{ width: '6%' }}
            />
          </div>
        </div>
      </div>

      <div className="w-full bg-slate-900 p-4 border-l border-slate-800 rounded-xl text-slate-300 mt-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold flex ">holder distribution</h2>
          <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-400 hover:text-slate-300 transition-colors">
            generate bubble map
          </button>
        </div>

        <div className="space-y-2">
          {holders.map((holder, index) => (
            <div
              key={holder.address}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center space-x-2">
                <span className="text-slate-400">{index + 1}.</span>
                <span className="text-slate-300">{holder.address}</span>
                {holder.icon && <span>{holder.icon}</span>}
                {holder.label && (
                  <span className="text-slate-500 text-xs">
                    {holder.label}
                  </span>
                )}
              </div>
              <span className="text-slate-400">
                {holder.value.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradingSidebar;