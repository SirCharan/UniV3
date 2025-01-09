'use client';

import React from 'react';
import TShape from '@/components/TShape';
import PriceBar from '@/components/PriceBar';
import SplitTShape from '@/components/SplitTShape';
import ShapeSelector from '@/components/ShapeSelector';

const descriptions = {
  tshape: "How tick liquidity changes when price crosses a tick",
  pricebar: "How ranged liquidity changes when price of ETH changes",
  splittshape: "When this liquidity is borrowed, swap does not happen",
  traderpnl: "How trader PnL changes when price of ETH changes"
};

export default function Home() {
  const [selectedShape, setSelectedShape] = React.useState<'tshape' | 'pricebar' | 'splittshape' | 'traderpnl' | null>(null);
  const [ethPrice, setEthPrice] = React.useState('');

  const handleInputChange = (value: string) => {
    const numValue = Number(value);
    if (numValue < 2000) setEthPrice('2000');
    else if (numValue > 5000) setEthPrice('5000');
    else setEthPrice(value);
  };

  return (
    <main className="relative min-h-screen bg-white">
      {/* Shape Selector */}
      <ShapeSelector onSelect={setSelectedShape} />

      {/* Description */}
      <div 
        className="absolute top-24 left-1/2 -translate-x-1/2 text-center text-xl text-black max-w-2xl px-4"
        style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
      >
        {selectedShape && descriptions[selectedShape]}
      </div>

      {/* Selected Shape */}
      <div className="flex justify-center items-center min-h-screen">
        {selectedShape === 'tshape' && <TShape ethPrice={ethPrice} />}
        {selectedShape === 'pricebar' && <PriceBar ethPrice={ethPrice} />}
        {selectedShape === 'splittshape' && <SplitTShape ethPrice={ethPrice} />}
        {!selectedShape && (
          <div 
            className="text-2xl text-black"
            style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
          >
            Please select a shape above
          </div>
        )}
      </div>

      {/* Input section */}
      <div className="absolute bottom-8 right-8 text-right w-80">
        <h2 
          className="text-2xl font-semibold mb-4 text-black"
          style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
        >
          Enter ETH Price:
        </h2>
        <div className="space-y-4">
          <input
            type="number"
            value={ethPrice}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full h-12 px-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-black"
            placeholder="Enter ETH price"
            style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
            min="2000"
            max="5000"
          />
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-black">$2000</span>
            <input
              type="range"
              min="2000"
              max="5000"
              step="100"
              value={ethPrice || 2000}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm text-black">$5000</span>
          </div>
        </div>
      </div>
    </main>
  );
}