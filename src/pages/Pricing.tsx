
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PricingCard from '@/components/ui-custom/PricingCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CheckIcon, XIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const monthlyPricing = {
    pro: '₹399',
    enterprise: '₹999'
  };
  
  const yearlyPricing = {
    pro: '₹3,999',
    enterprise: '₹9,999'
  };

  const pricingByType = billingCycle === 'monthly' ? monthlyPricing : yearlyPricing;
  const discount = billingCycle === 'yearly' ? 'Save 16%' : null;

  const freeFeatures = [
    { text: '5 Image Generations', included: true },
    { text: 'Basic AI Models', included: true },
    { text: 'Standard Quality', included: true },
    { text: 'Background Removal', included: true },
    { text: 'Max Resolution: 1024x1024', included: true },
    { text: 'Commercial Usage', included: false },
    { text: 'Priority Processing', included: false },
    { text: 'Advanced AI Models', included: false },
  ];

  const proFeatures = [
    { text: 'Unlimited Image Generations', included: true },
    { text: 'Advanced AI Models', included: true },
    { text: 'HD Quality', included: true },
    { text: 'Background Removal', included: true },
    { text: 'Max Resolution: 2048x2048', included: true },
    { text: 'Commercial Usage', included: true },
    { text: 'Priority Processing', included: true },
    { text: '24/7 Email Support', included: true },
  ];

  const enterpriseFeatures = [
    { text: 'Unlimited Image Generations', included: true },
    { text: 'All AI Models + Early Access', included: true },
    { text: 'Ultra HD Quality', included: true },
    { text: 'Background Removal', included: true },
    { text: 'Max Resolution: 4096x4096', included: true },
    { text: 'Commercial Usage', included: true },
    { text: 'Priority Processing', included: true },
    { text: '24/7 Priority Support', included: true },
    { text: 'API Access', included: true },
    { text: 'Dedicated Account Manager', included: true },
  ];

  const handleSubscribe = (plan: string) => {
    // Simulate payment processing
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium inline-block mb-4">
              Pricing
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Pick the perfect plan for your creative needs. All plans include access to our AI image generation technology.
            </p>
            
            {/* Billing Toggle */}
            <div className="mt-8">
              <Tabs defaultValue="monthly" className="mx-auto inline-block" onValueChange={setBillingCycle}>
                <TabsList>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly">
                    Yearly
                    {discount && (
                      <span className="ml-2 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs px-2 py-0.5 rounded-full">
                        {discount}
                      </span>
                    )}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="Free"
              description="Perfect for getting started and exploring our platform."
              price="Free"
              period=""
              features={freeFeatures}
              buttonText="Get Started"
              onSubscribe={() => handleSubscribe('free')}
            />
            
            <PricingCard
              title="Pro"
              description="Ideal for creators who need unlimited access."
              price={pricingByType.pro}
              period={billingCycle === 'monthly' ? '/month' : '/year'}
              features={proFeatures}
              buttonText="Subscribe Now"
              recommended={true}
              onSubscribe={() => handleSubscribe('pro')}
            />
            
            <PricingCard
              title="Enterprise"
              description="For businesses requiring advanced features and support."
              price={pricingByType.enterprise}
              period={billingCycle === 'monthly' ? '/month' : '/year'}
              features={enterpriseFeatures}
              buttonText="Contact Sales"
              onSubscribe={() => handleSubscribe('enterprise')}
            />
          </div>
          
          {/* Feature Comparison */}
          <div className="mt-24">
            <h2 className="text-2xl font-bold text-center mb-12">Feature Comparison</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-4 text-left w-1/4">Feature</th>
                    <th className="px-4 py-4 text-center">Free</th>
                    <th className="px-4 py-4 text-center bg-primary/5 border-x border-border">Pro</th>
                    <th className="px-4 py-4 text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-4 py-4 font-medium">Image Generations</td>
                    <td className="px-4 py-4 text-center">5 per month</td>
                    <td className="px-4 py-4 text-center bg-primary/5 border-x border-border">Unlimited</td>
                    <td className="px-4 py-4 text-center">Unlimited</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-4 font-medium">AI Model Quality</td>
                    <td className="px-4 py-4 text-center">Basic</td>
                    <td className="px-4 py-4 text-center bg-primary/5 border-x border-border">Advanced</td>
                    <td className="px-4 py-4 text-center">All + Early Access</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-4 font-medium">Max Resolution</td>
                    <td className="px-4 py-4 text-center">1024x1024</td>
                    <td className="px-4 py-4 text-center bg-primary/5 border-x border-border">2048x2048</td>
                    <td className="px-4 py-4 text-center">4096x4096</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-4 font-medium">Background Removal</td>
                    <td className="px-4 py-4 text-center">
                      <CheckIcon className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                    <td className="px-4 py-4 text-center bg-primary/5 border-x border-border">
                      <CheckIcon className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <CheckIcon className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-4 font-medium">Commercial Usage</td>
                    <td className="px-4 py-4 text-center">
                      <XIcon className="h-5 w-5 mx-auto text-red-500" />
                    </td>
                    <td className="px-4 py-4 text-center bg-primary/5 border-x border-border">
                      <CheckIcon className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <CheckIcon className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-4 font-medium">API Access</td>
                    <td className="px-4 py-4 text-center">
                      <XIcon className="h-5 w-5 mx-auto text-red-500" />
                    </td>
                    <td className="px-4 py-4 text-center bg-primary/5 border-x border-border">
                      <XIcon className="h-5 w-5 mx-auto text-red-500" />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <CheckIcon className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-4 font-medium">Support</td>
                    <td className="px-4 py-4 text-center">Community</td>
                    <td className="px-4 py-4 text-center bg-primary/5 border-x border-border">Email Support</td>
                    <td className="px-4 py-4 text-center">Dedicated Manager</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* FAQs */}
          <div className="mt-24 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="p-6 rounded-lg bg-background border border-border">
                <h3 className="text-lg font-medium mb-2">Can I upgrade or downgrade my plan?</h3>
                <p className="text-muted-foreground">
                  Yes, you can upgrade, downgrade, or cancel your subscription at any time from your account settings.
                </p>
              </div>
              
              <div className="p-6 rounded-lg bg-background border border-border">
                <h3 className="text-lg font-medium mb-2">How do the image generations work?</h3>
                <p className="text-muted-foreground">
                  Each plan includes a specific number of image generations. Free users get 5 per month, while paid plans include unlimited generations.
                </p>
              </div>
              
              <div className="p-6 rounded-lg bg-background border border-border">
                <h3 className="text-lg font-medium mb-2">How does billing work?</h3>
                <p className="text-muted-foreground">
                  We use secure payment processing through Razorpay. You'll be billed either monthly or yearly depending on your selected billing cycle.
                </p>
              </div>
              
              <div className="p-6 rounded-lg bg-background border border-border">
                <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards, debit cards, UPI, and net banking through our payment processor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Subscription Successful!</DialogTitle>
            <DialogDescription>
              Thank you for subscribing to Imagify Pro. Your account has been upgraded.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-center py-6">
            <div className="p-4 rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
              <CheckIcon className="h-12 w-12" />
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowSuccessModal(false)}>
              Start Creating
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Pricing;
