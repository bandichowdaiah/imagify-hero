
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DownloadIcon, 
  ExternalLinkIcon, 
  HeartIcon,
  MoreHorizontalIcon 
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface ImageCardProps {
  imageUrl: string;
  prompt: string;
  date?: string;
  onViewDetails?: () => void;
}

const ImageCard = ({
  imageUrl,
  prompt,
  date = new Date().toLocaleDateString(),
  onViewDetails
}: ImageCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `imagify-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="group glass-card overflow-hidden">
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        
        <img
          src={imageUrl}
          alt={prompt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onLoad={() => setIsLoading(false)}
          style={{ opacity: isLoading ? 0 : 1 }}
        />
        
        {/* Hover overlay with actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="icon" onClick={handleDownload}>
              <DownloadIcon className="h-4 w-4" />
            </Button>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-red-500 border-red-500" : ""}
              >
                <HeartIcon className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreHorizontalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onViewDetails}>
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDownload}>
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Share
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      
      {/* Description */}
      <div className="p-4">
        <p className="text-sm line-clamp-2 font-medium">{prompt}</p>
        <p className="text-xs text-muted-foreground mt-1">{date}</p>
      </div>
    </div>
  );
};

export default ImageCard;
