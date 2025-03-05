
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SearchIcon, FilterIcon } from 'lucide-react';
import ImageCard from '@/components/ui-custom/ImageCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Gallery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('all');

  // Mock data for the gallery
  const mockImages = [
    {
      id: 1,
      imageUrl: 'https://source.unsplash.com/random/600x600?nature',
      prompt: 'A serene mountain landscape with a crystal clear lake reflecting the sunset',
      date: '2023-10-15'
    },
    {
      id: 2,
      imageUrl: 'https://source.unsplash.com/random/600x600?city',
      prompt: 'Futuristic cityscape with neon lights and flying cars in a cyberpunk style',
      date: '2023-10-14'
    },
    {
      id: 3,
      imageUrl: 'https://source.unsplash.com/random/600x600?portrait',
      prompt: 'Portrait of a young woman with flowing red hair in a forest setting',
      date: '2023-10-12'
    },
    {
      id: 4,
      imageUrl: 'https://source.unsplash.com/random/600x600?abstract',
      prompt: 'Abstract geometric shapes in vibrant colors with a minimal design',
      date: '2023-10-10'
    },
    {
      id: 5,
      imageUrl: 'https://source.unsplash.com/random/600x600?food',
      prompt: 'A gourmet dessert with chocolate and berries, styled for food photography',
      date: '2023-10-08'
    },
    {
      id: 6,
      imageUrl: 'https://source.unsplash.com/random/600x600?architecture',
      prompt: 'Modern minimalist architecture with clean lines and large glass windows',
      date: '2023-10-05'
    },
    {
      id: 7,
      imageUrl: 'https://source.unsplash.com/random/600x600?animal',
      prompt: 'A majestic tiger walking through a misty jungle at dawn',
      date: '2023-10-03'
    },
    {
      id: 8,
      imageUrl: 'https://source.unsplash.com/random/600x600?space',
      prompt: 'Deep space nebula with stars and planets in vibrant purple and blue colors',
      date: '2023-10-01'
    },
  ];

  // Filter images based on search query
  const filteredImages = mockImages.filter(image => 
    image.prompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Gallery</h1>
              <p className="text-muted-foreground">
                Browse and manage your generated images
              </p>
            </div>
            
            <Button asChild>
              <a href="/upload">Create New Image</a>
            </Button>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="w-full sm:w-48">
              <Select value={filterOption} onValueChange={setFilterOption}>
                <SelectTrigger>
                  <FilterIcon className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Images</SelectItem>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="favorites">Favorites</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Gallery Grid */}
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <ImageCard
                  key={image.id}
                  imageUrl={image.imageUrl}
                  prompt={image.prompt}
                  date={new Date(image.date).toLocaleDateString()}
                  onViewDetails={() => {}}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No images found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or create some new images.
              </p>
              <Button asChild>
                <a href="/upload">Create New Image</a>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;
