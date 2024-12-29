'use client';

interface SplitTShapeProps {
  ethPrice: string;
}

const SplitTShape: React.FC<SplitTShapeProps> = ({ ethPrice }) => {
  const prices = Array.from({ length: 7 }, (_, i) => 2000 + i * 500);
  const pnlValues = [0, 250, 500, 750, 1000, 1250, 1500];

  const getMarkerPosition = () => {
    const price = Number(ethPrice);
    if (!price) return null;
    
    const minPrice = 2000;
    const maxPrice = 5000;
    const totalWidth = 480;
    
    if (price < minPrice) return 0;
    if (price > maxPrice) return totalWidth;
    
    return ((price - minPrice) / (maxPrice - minPrice)) * totalWidth;
  };

  const getCallOptionPath = () => {
    const strikePrice = 3500;
    const width = 480;
    const height = 120;
    
    const strikePriceX = ((strikePrice - 2000) / 3000) * width;
    
    return `
      M 0 ${height}
      L ${strikePriceX} ${height}
      L ${width} 0
    `;
  };

  const getCurrentPayoff = () => {
    const price = Number(ethPrice) || 2000;
    const strikePrice = 3500;
    const width = 480;
    const height = 120;
    
    const x = getMarkerPosition() || 0;
    let y = height;
    
    if (price > strikePrice) {
      const payoff = price - strikePrice;
      const maxPayoff = 5000 - strikePrice;
      y = height - (payoff / maxPayoff) * height;
    }
    
    return { x, y };
  };

  const getCurrentPnL = () => {
    const price = Number(ethPrice) || 2000;
    const strikePrice = 3500;
    
    if (price <= strikePrice) return 0;
    return price - strikePrice;
  };

  const payoffPoint = getCurrentPayoff();

  const getDebtValue = () => {
    const price = Number(ethPrice) || 2000;
    if (price <= 3500) {
      return "1 ETH";
    }
    return "3500 USDC";
  };

  const getPayoffValue = () => {
    const price = Number(ethPrice) || 2000;
    if (price <= 3500) {
      return "0 USDC";
    }
    const payoff = price - 3500;
    return `${payoff} USDC`;
  };

  const getBorrowedValue = () => {
    const price = Number(ethPrice) || 2000;
    return `${price} USDC`;
  };

  return (
    <div className="flex flex-col gap-20">
      <div className="flex items-center gap-12">
        {/* Vertical rectangle - now always shows 1 ETH */}
        <div className="relative w-8 h-60 bg-black">
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            <span className="text-white font-bold text-lg" style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}>
              1 ETH
            </span>
          </div>
        </div>

        {/* Plus Sign */}
        <div 
          className="text-4xl font-bold text-black"
          style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
        >
          +
        </div>

        {/* Horizontal line with price labels */}
        <div className="relative">
          <div className="w-[480px] h-1 bg-black"></div>
          {/* Price marker */}
          {ethPrice && (
            <div 
              className="absolute top-0 w-1 h-4 bg-red-500"
              style={{ 
                left: `${getMarkerPosition()}px`,
                transform: 'translateX(-50%)'
              }}
            />
          )}
          {/* Ticks and Labels */}
          <div className="flex justify-between absolute w-[480px] top-6">
            {prices.map((price) => (
              <div key={price} className="flex flex-col items-center">
                <div className="w-0.5 h-3 bg-black -mt-4 mb-2"></div>
                <div 
                  className="text-base text-black"
                  style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
                >
                  ${price.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ml-[108px] flex items-center gap-8">
        {/* Value of borrowed asset */}
        <div className="border-2 border-black p-4 rounded-lg min-w-[200px]">
          <div 
            className="text-lg font-bold mb-2 text-black"
            style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
          >
            Value of borrowed asset
          </div>
          <div 
            className="text-2xl font-bold text-black"
            style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
          >
            {getBorrowedValue()}
          </div>
        </div>

        {/* Plus Sign */}
        <div 
          className="text-4xl font-bold text-black"
          style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
        >
          +
        </div>

        {/* Debt Rectangle */}
        <div className="border-2 border-black p-4 rounded-lg min-w-[200px]">
          <div 
            className="text-lg font-bold mb-2 text-black"
            style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
          >
            Debt to repay LP
          </div>
          <div 
            className="text-2xl font-bold text-black"
            style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
          >
            {getDebtValue()}
          </div>
        </div>

        {/* Plus Sign */}
        <div 
          className="text-4xl font-bold text-black"
          style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
        >
          +
        </div>

        {/* Call Option Payoff section with PnL */}
        <div className="flex gap-8">
          {/* Vertical PnL Chart */}
          <div className="relative w-16 h-[120px]">
            <div className="absolute inset-0 flex flex-col justify-between">
              {pnlValues.map((value, index) => (
                <div 
                  key={value}
                  className="flex items-center justify-end w-full"
                  style={{ 
                    position: 'absolute',
                    bottom: `${(index * 120) / (pnlValues.length - 1)}px`,
                    transform: 'translateY(50%)'
                  }}
                >
                  <span 
                    className="text-xs text-black mr-2"
                    style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
                  >
                    ${value}
                  </span>
                  <div className="w-2 h-[1px] bg-gray-300"></div>
                </div>
              ))}
              {/* Current PnL marker */}
              {ethPrice && (
                <div 
                  className="absolute w-3 h-3 bg-red-500 rounded-full -right-1.5"
                  style={{ 
                    bottom: `${(getCurrentPnL() / 1500) * 120}px`,
                    transform: 'translateY(50%)'
                  }}
                />
              )}
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-black"></div>
          </div>

          {/* Payoff Diagram and Value */}
          <div>
            <div 
              className="text-lg font-bold mb-4 text-black"
              style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
            >
              Call Option Payoff
            </div>
            <div className="relative">
              <svg width="480" height="120">
                <line 
                  x1={((3500 - 2000) / 3000) * 480}
                  y1="0"
                  x2={((3500 - 2000) / 3000) * 480}
                  y2="120"
                  stroke="#888"
                  strokeDasharray="4"
                />
                <path
                  d={getCallOptionPath()}
                  stroke="black"
                  fill="none"
                  strokeWidth="2"
                />
                {ethPrice && (
                  <circle
                    cx={payoffPoint.x}
                    cy={payoffPoint.y}
                    r="4"
                    fill="red"
                  />
                )}
                <text
                  x={((3500 - 2000) / 3000) * 480}
                  y="140"
                  textAnchor="middle"
                  style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
                  className="text-sm"
                >
                  Strike $3500
                </text>
              </svg>
              
              {/* Payoff Value Box */}
              <div className="mt-8 border-2 border-black p-4 rounded-lg inline-block">
                <div 
                  className="text-lg font-bold text-black"
                  style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
                >
                  Current Payoff:
                </div>
                <div 
                  className="text-2xl font-bold text-black"
                  style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
                >
                  {getPayoffValue()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitTShape;