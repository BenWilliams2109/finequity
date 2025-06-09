'use client';

import { useRouter } from 'next/navigation';
import Button from '../components/ui/Button';
import FadeTransition from '../components/ui/FadeTransition';

export default function Home() {
  const router = useRouter();
  
  return (
    <div className="bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FadeTransition>
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-primary sm:text-5xl sm:tracking-tight lg:text-6xl">
              Financial Access for All
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-700">
              Empowering women-led small businesses in Latin America through alternative credit assessment.
            </p>
            <div className="mt-10">
              <Button 
                onClick={() => router.push('/business-profile')}
                className="text-lg px-8 py-4"
              >
                Get Started
              </Button>
            </div>
          </div>
        </FadeTransition>
        
        <FadeTransition delay={0.2}>
          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="card hover:shadow-lg">
              <h2 className="text-xl font-bold text-primary">Simple Process</h2>
              <p className="mt-4 text-gray-600">
                Share your business information through our easy-to-use platform to discover loan options.
              </p>
            </div>
            <div className="card hover:shadow-lg">
              <h2 className="text-xl font-bold text-primary">Alternative Credit Assessment</h2>
              <p className="mt-4 text-gray-600">
                {"We look beyond traditional credit scores to assess your business's true potential."}
              </p>
            </div>
            <div className="card hover:shadow-lg">
              <h2 className="text-xl font-bold text-primary">Financial Education</h2>
              <p className="mt-4 text-gray-600">
                {"Learn how to improve your business's financial profile and access better loan products."}
              </p>
            </div>
          </div>
        </FadeTransition>
      </div>
    </div>
  );
}