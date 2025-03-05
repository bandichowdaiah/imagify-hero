
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FileUpload from '@/components/ui-custom/FileUpload';
import GenerationForm from '@/components/ui-custom/GenerationForm';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRightIcon, InfoIcon, SparklesIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Placeholder for API generation
const mockGenerateImage = async (prompt: string): Promise<{ url: string; prompt: string }> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return a placeholder image
  return {
    url: `https://source.unsplash.com/random/600x600?${prompt.split(' ').join(',')}`,
    prompt
  };
};

const Upload = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<{ url: string; prompt: string } | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [remainingGenerations] = useState(5);

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleProcessFiles = () => {
    if (selectedFiles.length === 0) return;
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to results or show success
    }, 2000);
  };

  const handleGenerateImage = async (prompt: string) => {
    setIsGenerating(true);
    
    try {
      const result = await mockGenerateImage(prompt);
      setGeneratedImage(result);
      setShowPreviewModal(true);
    } catch (error) {
      console.error('Failed to generate image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadGenerated = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage.url;
    link.download = `imagify-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Create Amazing Images</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Upload your own images for enhancement or generate completely new images with AI.
            </p>
          </div>
          
          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="generate">Generate from Text</TabsTrigger>
              <TabsTrigger value="upload">Upload & Enhance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="generate" className="animate-fade-in">
              <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <SparklesIcon className="mr-2 h-5 w-5 text-primary" />
                  Text to Image
                </h2>
                
                <p className="text-sm text-muted-foreground mb-6">
                  Describe the image you want to create in detail. The more specific your description, the better the results.
                </p>
                
                <GenerationForm 
                  onSubmit={handleGenerateImage}
                  isLoading={isGenerating}
                  remainingGenerations={remainingGenerations}
                />
              </div>
              
              <div className="mt-6 p-4 bg-primary/10 rounded-lg flex gap-3">
                <InfoIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p>
                    <strong>Tip:</strong> For best results, include details about style, mood, lighting, and composition in your description.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="upload" className="animate-fade-in">
              <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Upload Images</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Upload up to 20 images for background removal and enhancement.
                </p>
                
                <FileUpload 
                  onFilesSelected={handleFilesSelected}
                  maxFiles={20}
                  acceptedFileTypes={['image/jpeg', 'image/png']}
                />
                
                {selectedFiles.length > 0 && (
                  <div className="mt-6 flex justify-end">
                    <Button 
                      onClick={handleProcessFiles}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        'Processing...'
                      ) : (
                        <>
                          Process Images
                          <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Generated Image Preview Modal */}
      <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Your Generated Image</DialogTitle>
            <DialogDescription>
              Here's the image created based on your description.
            </DialogDescription>
          </DialogHeader>
          
          {generatedImage && (
            <div className="flex flex-col space-y-4">
              <div className="rounded-lg overflow-hidden border border-border aspect-square w-full">
                <img 
                  src={generatedImage.url} 
                  alt={generatedImage.prompt}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="text-sm">
                <p className="font-medium mb-1">Prompt:</p>
                <p className="text-muted-foreground">{generatedImage.prompt}</p>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowPreviewModal(false)}>
              Close
            </Button>
            <Button onClick={handleGenerateImage.bind(null, generatedImage?.prompt || '')}>
              Regenerate
            </Button>
            <Button variant="default" onClick={handleDownloadGenerated}>
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Upload;
