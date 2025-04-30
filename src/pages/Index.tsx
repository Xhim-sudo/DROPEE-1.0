
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import TrendingProducts from '@/components/home/TrendingProducts';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedShops from '@/components/home/FeaturedShops';
import UpcomingProducts from '@/components/home/UpcomingProducts';
import BlogSection from '@/components/home/BlogSection';
import HowItWorks from '@/components/home/HowItWorks';
import ServicesSection from '@/components/home/ServicesSection';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <TrendingProducts />
        <CategoriesSection />
        <FeaturedShops />
        <UpcomingProducts />
        <ServicesSection />
        <HowItWorks />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
