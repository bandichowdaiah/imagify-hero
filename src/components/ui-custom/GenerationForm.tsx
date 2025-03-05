
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SparklesIcon, Loader2Icon } from 'lucide-react';

interface GenerationFormProps {
  onSubmit: (prompt: string) => void;
  isLoading?: boolean;
  remainingGenerations?: number;
  isProUser?: boolean;
}

const GenerationForm = ({
  onSubmit,
  isLoading = false,
  remainingGenerations = 5,
  isProUser = false,
}: GenerationFormProps) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Textarea
          placeholder="Describe your scene... (e.g., 'A serene mountain landscape with a lake at sunset')"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-32 resize-none"
          disabled={isLoading}
        />
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {isProUser ? (
              <span className="text-primary font-medium">Pro account • Unlimited generations</span>
            ) : (
              <span>{remainingGenerations}/5 generations left</span>
            )}
          </div>
          
          <Button 
            type="submit" 
            disabled={!prompt.trim() || isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <SparklesIcon className="mr-2 h-4 w-4" />
                Generate Image
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default GenerationForm;
