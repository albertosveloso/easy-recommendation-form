
import React from 'react';
import { ArrowRight, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
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
