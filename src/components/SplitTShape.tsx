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

  const getDebtValue = () => {
    const price = Number(ethPrice) || 2000;
    if (price <= 3500) {
      return "1 ETH";
    }
    return "3500 USDC";
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
            1 ETH = {getBorrowedValue()}
          </div>
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
      </div>
    </div>
  );
};

export default SplitTShape;