
import { CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  period?: string;
  features: PricingFeature[];
  buttonText: string;
  recommended?: boolean;
  onSubscribe: () => void;
}

const PricingCard = ({
  title,
  description,
  price,
  period = '/month',
  features,
  buttonText,
  recommended = false,
  onSubscribe,
}: PricingCardProps) => {
  return (
    <div 
      className={`rounded-xl ${
        recommended 
          ? 'border-2 border-primary shadow-lg relative' 
          : 'border border-border'
      } p-6 flex flex-col h-full transition-all duration-300 hover:shadow-md`}
    >
      {recommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm font-medium rounded-full">
          Recommended
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground mt-2 text-sm">{description}</p>
      </div>
      
      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">{price}</span>
          {price !== 'Free' && (
            <span className="text-muted-foreground ml-1">{period}</span>
          )}
        </div>
      </div>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className={`mr-2 rounded-full p-1 ${feature.included ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
              <CheckIcon className="h-4 w-4" />
            </span>
            <span className={feature.included ? 'text-foreground' : 'text-muted-foreground line-through'}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
      
      <Button 
        variant={recommended ? 'default' : 'outline'} 
        className="mt-auto w-full"
        onClick={onSubscribe}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default PricingCard;
