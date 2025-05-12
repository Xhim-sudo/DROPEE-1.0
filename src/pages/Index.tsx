
import React from 'react';
import MainNavbar from '@/components/layout/MainNavbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import HowItWorks from '@/components/home/HowItWorks';
import TrendingProducts from '@/components/home/TrendingProducts';
import FeaturedShops from '@/components/home/FeaturedShops';
import ServicesSection from '@/components/home/ServicesSection';
import UpcomingProducts from '@/components/home/UpcomingProducts';
import BlogSection from '@/components/home/BlogSection';

const Index = () => {
  return (
    <>
      <MainNavbar />
      <main>
        <HeroSection />
        <CategoriesSection />
        <HowItWorks />
        <TrendingProducts />
        <FeaturedShops />
        <ServicesSection />
        <UpcomingProducts />
        <BlogSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
