
import React from 'react';

const ShimmerCard = () => {
  return (
    <div className="glass shadow-soft rounded-3xl p-6 h-full">
      <div className="relative w-full h-40 mb-6 overflow-hidden rounded-2xl bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 loading-shimmer"></div>
      </div>
      
      <div className="h-6 w-4/5 mb-2 bg-gray-100 rounded-md overflow-hidden relative">
        <div className="absolute inset-0 loading-shimmer"></div>
      </div>
      
      <div className="h-4 w-full mb-2 bg-gray-100 rounded-md overflow-hidden relative">
        <div className="absolute inset-0 loading-shimmer"></div>
      </div>
      
      <div className="h-4 w-3/4 mb-2 bg-gray-100 rounded-md overflow-hidden relative">
        <div className="absolute inset-0 loading-shimmer"></div>
      </div>
      
      <div className="h-4 w-1/2 bg-gray-100 rounded-md mt-auto overflow-hidden relative">
        <div className="absolute inset-0 loading-shimmer"></div>
      </div>
    </div>
  );
};

export default ShimmerCard;
