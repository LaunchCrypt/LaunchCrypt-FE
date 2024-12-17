import React, { useEffect, useState } from 'react';
import { approveERC20, calculateAmountNeeded, calculateAmountReceived, get_network, getLiquidityPoolReserve, showAlert, showFailedAlert, swapWithNativeToken } from '../../utils';
import { useLocation } from 'react-router-dom';
import { useLiquidityPair } from '../../hooks/useLiquidityPair';
import { DEFAULT_QUERY_ALL, VIRTUAL_LIQUIDITY } from '../../constant';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { ethers } from 'ethers';
import { axiosInstance, PATCH_API, POST_API } from '../../apis/api';
import { useSelector } from 'react-redux';
import Loading from '../common/Loading';
import Modal from '../Modal/Modal';
import WalletWarning from '../common/WalletWarning';


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

const currentNetwork = get_network();


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

const TradingSidebar = ({ tokenSymbol }: { tokenSymbol: string }) => {
  const location = useLocation();
  const { liquidityPairAddress } = location.state || {}
  const [side, setSide] = useState('buy');
  const [currentSelectedToken, setCurrentSelectedToken] = useState(currentNetwork?.symbol)
  const [amount, setAmount] = useState('0');
  const [waitForApproving, setWaitForApproving] = useState(false)
  const { liquidityPair } = useLiquidityPair({
    contractAddress: liquidityPairAddress,
    searchQuery: DEFAULT_QUERY_ALL
  })
  const userAddress = useSelector((state: any) => state.user.address)
  const [amountOut, setAmountOut] = useState('0');
  const [isError, setError] = useState(false)
  const [isWalletWarning, setIsWalletWarning] = useState(false)


  // if (firstToken?.type === 'native' && secondToken?.type === 'ERC20') {
  //   response = await swapWithNativeToken(firstValue, (liquidityPair as any).poolAddress, 'buy')
  //   showAlert(response.hash, "Swap token successfully")
  // }
  // else if (firstToken?.type === 'ERC20' && secondToken?.type === 'native') {
  //   const tx = await approveERC20(firstToken.contractAddress as any, (liquidityPair as any).poolAddress, firstValue)
  //   setWaitForApproving(true)
  //   await tx.wait()
  //   setWaitForApproving(false)
  //   try {
  //     response = await swapWithNativeToken(ethers.utils.parseUnits(firstValue, 18).toString(), (liquidityPair as any).poolAddress, 'sell')
  //     await response.wait();
  //     showAlert(response.hash, "Swap token successfully")
  //   } catch (error) {
  //     showFailedAlert('Not enough token to swap')
  //     return;
  //   }
  // }
  const handleSwap = async (side) => {
    let response
    let amountERC20
    let amountNative
    let ERC20Side
    // amount out, reserveIn, reserveOut
    if (userAddress == "") {
      setIsWalletWarning(true)
      return;
    }
    if (side == 'buy') {
      if (currentSelectedToken == currentNetwork?.symbol) {
        // sell ERC20 to get AVAX (input = AVAX)
        const amountNeeded = calculateAmountNeeded(parseFloat(amount), parseFloat((liquidityPair as any).tokenAReserve), parseFloat((liquidityPair as any).tokenBReserve)).toString()
        const tx = await approveERC20(
          (liquidityPair as any).tokenA.contractAddress,
          (liquidityPair as any).poolAddress,
          amountNeeded
        )
        setWaitForApproving(true)
        await tx.wait()
        setWaitForApproving(false)
        try {
          response = await swapWithNativeToken(
            ethers.utils.parseUnits(amountNeeded, 18).toString(),
            (liquidityPair as any).poolAddress,
            'sell'
          )
          amountERC20 = amountNeeded
          amountNative = amount
          ERC20Side = 'sell'
          if (response.hash != undefined && response.hash != null) {
            showAlert(response.hash, "Swap token successfully")
          }
        } catch (error) {
          showFailedAlert('Not enough token to swap')
          return;
        }

      }
      if (currentSelectedToken == tokenSymbol) {
        // buy ERC20 with AVAX (input = ERC20)
        const amountNeeded = calculateAmountNeeded(parseFloat(amount), parseFloat((liquidityPair as any).tokenBReserve), parseFloat((liquidityPair as any).tokenAReserve)).toString()
        amountERC20 = amount
        amountNative = amountNeeded
        ERC20Side = 'buy'
        response = await swapWithNativeToken(amountNeeded, (liquidityPair as any).poolAddress, 'buy')
        if (response.hash != undefined && response.hash != null) {
          showAlert(response.hash, "Swap token successfully")
        }
      }
    }
    else if (side == 'sell') {
      if (currentSelectedToken == currentNetwork?.symbol) {
        // buy ERC20 with AVAX (input = AVAX)
        amountERC20 = calculateAmountReceived(parseFloat(amount), parseFloat((liquidityPair as any).tokenBReserve), parseFloat((liquidityPair as any).tokenAReserve)).toString()
        amountNative = amount
        ERC20Side = 'buy'
        response = await swapWithNativeToken(amount, (liquidityPair as any).poolAddress, 'buy')
        if (response.hash != undefined && response.hash != null) {
          showAlert(response.hash, "Swap token successfully")
        }
      }
      if (currentSelectedToken == tokenSymbol) {
        // sell ERC20 to get AVAX (input = ERC20)
        const tx = await approveERC20(
          (liquidityPair as any).tokenA.contractAddress,
          (liquidityPair as any).poolAddress,
          amount)
        setWaitForApproving(true)
        await tx.wait()
        setWaitForApproving(false)
        try {
          response = await swapWithNativeToken(
            ethers.utils.parseUnits(amount, 18).toString(),
            (liquidityPair as any).poolAddress,
            'sell'
          )
          amountERC20 = amount
          amountNative = calculateAmountReceived(parseFloat(amount), parseFloat((liquidityPair as any).tokenAReserve), parseFloat((liquidityPair as any).tokenBReserve)).toString()
          ERC20Side = "sell"
          if (response.hash != undefined && response.hash != null) {
            showAlert(response.hash, "Swap token successfully")
          }
        } catch (error) {
          console.log("error", error)
          showFailedAlert('Not enough token to swap')
          return;
        }
      }
    }

    await response.wait(1)
    const newTrade = await axiosInstance.post(POST_API.CREATE_NEW_TRADE(), {
      liquidityPairId: (liquidityPair as any)._id,
      price: amountNative,
      tokenId: (liquidityPair as any).tokenA._id,
      amount: amountERC20,
      timeStamps: new Date(),
      side: ERC20Side,
      creator: userAddress,
      transactionHash: response.hash
    })

    console.log("newTrade", newTrade)

    const { reserve, collateral } = await getLiquidityPoolReserve((liquidityPair as any).poolAddress)
    await axiosInstance.patch(PATCH_API.UPDATE_LIQUIDITY_PAIR((liquidityPair as any).poolAddress), {
      tokenAReserve: ethers.utils.formatUnits(reserve, 18),
      tokenBReserve: ethers.utils.formatUnits(collateral, 18)
    })
  }

  useEffect(() => {
    setAmountOut('0')
    setAmount('0')
  }, [side, currentSelectedToken])

  return (<>
    {isWalletWarning && <Modal isVisible={isWalletWarning}
      onClose={() => setIsWalletWarning(false)}
      children={<WalletWarning closeModal={() => setIsWalletWarning(false)} />} />
    }
    {waitForApproving && Loading({ title: 'Wait for approve ERC20 process', message: 'Please confirm the swap transaction in your wallet' })}
    <div className="w-[380px] h-fit pb-4">
      <div className="w-[380px] space-y-6 bg-slate-900 p-4 border-l border-slate-800 rounded-xl">
        {/* Trading Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button variant={`${side === 'buy' ? "primary" : "secondary"}`} className="w-full" onClick={() => setSide('buy')}>buy</Button>
          <Button variant={`${side === 'sell' ? "primary" : "secondary"}`} className="w-full" onClick={() => setSide('sell')}>sell</Button>
        </div>

        {/* Token Switch */}
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={() => {
            if (currentSelectedToken == currentNetwork?.symbol)
              setCurrentSelectedToken(tokenSymbol)
            else setCurrentSelectedToken(currentNetwork?.symbol)
          }}>switch to {
              currentSelectedToken == currentNetwork?.symbol ? tokenSymbol : currentNetwork?.symbol
            }</Button>
          <Button variant="ghost">set max slippage</Button>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <div className="flex justify-between items-center gap-4">
            <input
              type="text"
              value={amount}
              onChange={(e) => {
                const inputValue = e.target.value.replace(/,/g, '')
                if (/^\d*\.?\d*$/.test(inputValue) && inputValue.length <= 9) {
                  if (inputValue == '') {
                    setAmount("")
                    setAmountOut("0");
                  }
                  else {
                    setAmount(inputValue)
                    if (side === 'sell') {
                      const reserveIn = currentSelectedToken == currentNetwork?.symbol
                        ? (liquidityPair as any).tokenBReserve
                        : (liquidityPair as any).tokenAReserve

                      const reserveOut = currentSelectedToken == currentNetwork?.symbol
                        ? (liquidityPair as any).tokenAReserve
                        : (liquidityPair as any).tokenBReserve

                      const amountOut = calculateAmountReceived(parseFloat(inputValue), parseFloat(reserveIn), parseFloat(reserveOut))
                      if (currentSelectedToken == tokenSymbol && parseFloat(reserveOut) - parseFloat(amountOut) < VIRTUAL_LIQUIDITY) {
                        setError(true)
                      }
                      else {
                        setError(false)
                      }
                      setAmountOut(amountOut.toString())
                    }
                    else if (side === 'buy') {
                      const reserveIn = currentSelectedToken == currentNetwork?.symbol ?
                        (liquidityPair as any).tokenAReserve : (liquidityPair as any).tokenBReserve
                      const reserveOut = currentSelectedToken == currentNetwork?.symbol ?
                        (liquidityPair as any).tokenBReserve : (liquidityPair as any).tokenAReserve
                      if (parseFloat(inputValue) > reserveOut
                        || (currentSelectedToken == currentNetwork?.symbol && parseFloat(reserveOut) - parseFloat(inputValue) < VIRTUAL_LIQUIDITY)
                      ) {
                        setError(true)
                      }
                      else {
                        setError(false)
                        setAmountOut(calculateAmountNeeded(parseFloat(inputValue), parseFloat(reserveIn), parseFloat(reserveOut)).toString())
                      }
                    }
                  }
                }
              }}
              className="flex-1 bg-slate-800/50 border border-fuchsia-500/20 rounded-lg px-3 py-2 w-32 text-white outline-none focus:border-fuchsia-500/50"
            />
            <div className="bg-slate-800/50 border border-fuchsia-500/20 rounded-lg px-3 py-2 text-white outline-none focus:border-fuchsia-500/50 appearance-none cursor-pointer">
              <p>{currentSelectedToken}</p>
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" className="w-full">0.1 {currentSelectedToken}</Button>
            <Button variant="outline" className="w-full">0.5 {currentSelectedToken}</Button>
            <Button variant="outline" className="w-full">1 {currentSelectedToken}</Button>
          </div>
        </div>

        {isError ? <div className='flex items-center gap-2 rounded-lg animate-fade-in ml-3'>
          <span className='text-sm font-medium text-red-500 italic'>
            Not enough reserve in pool
          </span>
        </div> :
          <div className='flex items-center gap-2 p-3 bg-slate-800 rounded-lg border border-gray-800/50 shadow-sm'>
            <div className='flex items-center gap-2'>
              {side === 'buy' ? (
                <ArrowDownRight className="w-4 h-4 text-red-400" />
              ) : (
                <ArrowUpRight className="w-4 h-4 text-green-400" />
              )}

              <span className='text-sm text-gray-400'>
                {side === 'buy' ? 'You will pay:' : 'You will receive:'}
              </span>

            </div>

            <div className='flex items-center gap-1'>
              <span className='text-sm font-medium text-white'>
                {amountOut}
              </span>
              <span className='text-sm text-gray-400'>
                {currentSelectedToken == currentNetwork?.symbol ? tokenSymbol : currentNetwork?.symbol}
              </span>
            </div>
          </div>
        }

        {/* Place Trade Button */}
        <Button
          onClick={() => handleSwap(side)}
          className="w-full h-12 text-lg font-semibold">
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
  </>
  );
}
export default TradingSidebar;