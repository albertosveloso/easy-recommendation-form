
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  ChevronRight, 
  Sparkle, 
  User,
  Calendar,
  MapPin,
  Baby,
  GraduationCap,
  HelpCircle,
  Male,
  Female
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

import ProductCard from './ProductCard';
import ShimmerCard from './ShimmerCard';

// Data for selections
const GENRES = [
  { value: 'Masculino', label: 'Masculino', icon: Male },
  { value: 'Feminino', label: 'Feminino', icon: Female },
  { value: 'Não informar', label: 'Não informar', icon: HelpCircle },
];

const AGE_RANGES = [
  { value: 'Até 25 anos', label: 'Até 25 anos', icon: Baby },
  { value: 'Entre 26 e 35 anos', label: 'Entre 26 e 35 anos', icon: User },
  { value: 'Entre 36 e 50 anos', label: 'Entre 36 e 50 anos', icon: User },
  { value: 'Acima de 51 anos', label: 'Acima de 51 anos', icon: GraduationCap },
];

const STATES = [
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'PR', label: 'Paraná' },
];

const MONTHS = [
  { value: 'Janeiro', label: 'Janeiro' },
  { value: 'Fevereiro', label: 'Fevereiro' },
  { value: 'Março', label: 'Março' },
  { value: 'Abril', label: 'Abril' },
  { value: 'Maio', label: 'Maio' },
  { value: 'Junho', label: 'Junho' },
  { value: 'Julho', label: 'Julho' },
  { value: 'Agosto', label: 'Agosto' },
  { value: 'Setembro', label: 'Setembro' },
  { value: 'Outubro', label: 'Outubro' },
  { value: 'Novembro', label: 'Novembro' },
  { value: 'Dezembro', label: 'Dezembro' },
];

// Mock API function
const fetchRecommendations = async ({ genero, idade, estado, mes }: FormData) => {
  console.log('Fetching recommendations with:', { genero, idade, estado, mes });
  
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return [
    {
      id: '1',
      name: 'Kit de Organização Premium',
      description: 'Conjunto de acessórios de organização para otimizar seu espaço com design minimalista e materiais de alta qualidade.',
      imageUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      name: 'Luminária Inteligente TouchSense',
      description: 'Iluminação adaptativa com controle por gestos e integração com assistentes de voz para criar o ambiente perfeito.',
      imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '3',
      name: 'Headphone Noise Cancelling Pro',
      description: 'Som imersivo com cancelamento de ruído adaptativo e bateria de longa duração para experiências sonoras perfeitas.',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
  ];
};

// Types
interface FormData {
  genero: string;
  idade: string;
  estado: string;
  mes: string;
}

const RecommendationForm = () => {
  // State
  const [formData, setFormData] = useState<FormData>({
    genero: 'Não informar',
    idade: 'Entre 36 e 50 anos',
    estado: 'MT',
    mes: '',
  });

  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.genero || !formData.idade || !formData.estado || !formData.mes) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);
    setHasSubmitted(true);
    
    try {
      const recommendations = await fetchRecommendations(formData);
      setProducts(recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast.error('Erro ao buscar recomendações. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center px-3 py-1 mb-4 rounded-full bg-primary bg-opacity-10 text-primary text-sm font-medium">
          <Sparkle className="w-4 h-4 mr-2" />
          <span>Recomendações Personalizadas</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Conheça a IA da Trivio e
          <br />
          impulsione suas vendas
        </h1>
        
        <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
          Preencha suas informações e veja produtos recomendados especialmente para você!
        </p>
      </div>

      <form 
        onSubmit={handleSubmit}
        className="glass rounded-3xl p-6 sm:p-8 shadow-soft transition-all duration-500 animate-fade-in"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="genero">Gênero</Label>
            <div className="grid grid-cols-3 gap-2">
              {GENRES.map((genre) => {
                const Icon = genre.icon;
                return (
                  <Button
                    key={genre.value}
                    type="button"
                    variant={formData.genero === genre.value ? "default" : "outline"}
                    className={cn(
                      "relative h-auto py-3 px-4 transition-all",
                      "flex items-center justify-center",
                      formData.genero === genre.value ? "shadow-md" : "hover:bg-gray-50"
                    )}
                    onClick={() => handleInputChange('genero', genre.value)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    <span>{genre.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="idade">Idade</Label>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
              {AGE_RANGES.map((ageRange) => {
                const Icon = ageRange.icon;
                return (
                  <Button
                    key={ageRange.value}
                    type="button"
                    variant={formData.idade === ageRange.value ? "default" : "outline"}
                    className={cn(
                      "relative h-auto py-3 px-4 transition-all",
                      "flex items-center justify-center",
                      formData.idade === ageRange.value ? "shadow-md" : "hover:bg-gray-50"
                    )}
                    onClick={() => handleInputChange('idade', ageRange.value)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    <span>{ageRange.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="estado">Estado</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-2 border rounded-md">
              {STATES.map((state) => (
                <Button
                  key={state.value}
                  type="button"
                  variant={formData.estado === state.value ? "default" : "outline"}
                  className={cn(
                    "h-auto py-2 px-3 transition-all text-sm",
                    "flex items-center justify-start",
                    formData.estado === state.value ? "shadow-md" : "hover:bg-gray-50"
                  )}
                  onClick={() => handleInputChange('estado', state.value)}
                >
                  <MapPin className="w-3 h-3 mr-2 flex-shrink-0" />
                  <span className="truncate">{state.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mes">Mês do Ano</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {MONTHS.map((month) => (
                <Button
                  key={month.value}
                  type="button"
                  variant={formData.mes === month.value ? "default" : "outline"}
                  className={cn(
                    "h-auto py-2 px-3 transition-all text-sm",
                    "flex items-center justify-center",
                    formData.mes === month.value ? "shadow-md" : "hover:bg-gray-50"
                  )}
                  onClick={() => handleInputChange('mes', month.value)}
                >
                  <Calendar className="w-3 h-3 mr-2" />
                  <span>{month.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button 
            type="submit" 
            className={cn(
              "px-8 py-6 rounded-full text-base font-medium transition-all duration-300",
              "bg-primary hover:bg-primary/90",
              "flex items-center justify-center gap-2",
              isLoading && "opacity-70 cursor-not-allowed"
            )}
            disabled={isLoading}
          >
            <span>Ver recomendações</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </form>

      {hasSubmitted && (
        <div className={cn("mt-12 transition-all duration-500", isLoading ? "opacity-60" : "opacity-100")}>
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isLoading ? "Buscando recomendações..." : "Produtos Recomendados para Você"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isLoading ? (
              <>
                <ShimmerCard />
                <ShimmerCard />
                <ShimmerCard />
              </>
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationForm;
