
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, SparklesIcon, ImageIcon, ZapIcon, ShieldIcon } from 'lucide-react';
import { useIntersectionObserver } from '@/lib/animations';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index = () => {
  const navigate = useNavigate();
  
  // Animation sections
  const heroSection = useIntersectionObserver();
  const featureSection = useIntersectionObserver();
  const howItWorksSection = useIntersectionObserver();
  const testimonialsSection = useIntersectionObserver();

  const features = [
    {
      icon: <SparklesIcon className="h-8 w-8" />,
      title: 'AI-Powered Generation',
      description: 'Our advanced AI models create stunning images from your text descriptions in seconds.'
    },
    {
      icon: <ImageIcon className="h-8 w-8" />,
      title: 'Background Removal',
      description: 'Automatically remove backgrounds from your uploaded images with one click.'
    },
    {
      icon: <ZapIcon className="h-8 w-8" />,
      title: 'Lightning Fast',
      description: 'Generate high-quality images in seconds, not minutes. Your time is valuable.'
    },
    {
      icon: <ShieldIcon className="h-8 w-8" />,
      title: 'Secure & Private',
      description: 'Your uploads and generated images remain private and secure on our platform.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Describe Your Vision',
      description: 'Enter a detailed text description of the image you want to create.'
    },
    {
      number: '02',
      title: 'AI Generation',
      description: 'Our AI analyzes your description and generates a unique image matching your vision.'
    },
    {
      number: '03',
      title: 'Download & Share',
      description: 'Download your creation in high resolution or share it directly from the platform.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 px-4"
        ref={heroSection.ref}
      >
        <div 
          className={`container mx-auto text-center max-w-4xl transition-opacity duration-1000 ease-out ${
            heroSection.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium inline-block mb-6">
            AI-Powered Image Generation
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight mb-6">
            Transform Your Words Into Stunning Visuals
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create professional-quality images in seconds using the power of AI. Just describe what you want, and watch the magic happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/upload')}>
              Create Your First Image
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/gallery')}>
              View Gallery
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl">
              <div className="text-3xl font-bold text-primary mb-2">5+</div>
              <div className="text-muted-foreground">Free Generations</div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl">
              <div className="text-3xl font-bold text-primary mb-2">10M+</div>
              <div className="text-muted-foreground">Images Generated</div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl">
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Happy Users</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sample Images Grid */}
      <section className="py-20 px-4 bg-accent">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((img) => (
              <div key={img} className="aspect-square rounded-xl overflow-hidden">
                <img 
                  src={`https://source.unsplash.com/random/600x600?art,${img}`} 
                  alt="Generated AI example" 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        className="py-20 px-4"
        ref={featureSection.ref}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium inline-block mb-4">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Imagify</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with user-friendly features to make image generation accessible to everyone.
            </p>
          </div>
          
          <div 
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 ${
              featureSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {features.map((feature, index) => (
              <div key={index} className="glass-card p-6">
                <div className="p-3 rounded-full bg-primary/10 text-primary inline-block mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section 
        className="py-20 px-4 bg-accent"
        ref={howItWorksSection.ref}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium inline-block mb-4">
              Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Creating stunning AI-generated images is simple with our three-step process.
            </p>
          </div>
          
          <div 
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ${
              howItWorksSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="relative glass-card p-8"
              >
                <div className="absolute -top-6 left-6 text-4xl font-bold text-primary opacity-30">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-4 mt-6">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" onClick={() => navigate('/upload')}>
              Get Started Now
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-primary to-purple-500"></div>
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Amazing Images?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of artists, designers, and creative professionals using Imagify today.
          </p>
          <Button size="lg" onClick={() => navigate('/upload')}>
            Start Creating Now
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
