
import React from 'react';
import { ArrowRight, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
  };
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  return (
    <div 
      className={cn(
        "glass shadow-soft rounded-3xl p-6 transition-all duration-300",
        "hover:translate-y-[-4px] hover:shadow-lg",
        "flex flex-col h-full animate-fade-up",
        className
      )}
      style={{ animationDelay: `${Math.random() * 0.2}s` }}
    >
      <div className="relative w-full h-40 mb-6 overflow-hidden rounded-2xl bg-gray-100">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-50">
            <Package className="w-12 h-12 text-gray-300" />
          </div>
        )}
      </div>

      <h3 className="text-xl font-medium mb-2 line-clamp-2">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-4 flex-grow line-clamp-3">{product.description}</p>
      
      <div className="mt-auto">
        <button className="flex items-center text-sm font-medium text-primary group">
          <span>Ver detalhes</span>
          <ArrowRight className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
