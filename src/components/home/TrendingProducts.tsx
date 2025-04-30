
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from '@/components/ProductCard';
import { products, vendors } from '@/data/mockData';

const TrendingProducts = () => {
  // Filter trending products
  const trendingProducts = products.filter(product => product.trending);

  // Get vendor names for each product
  const productsWithVendorNames = trendingProducts.map(product => {
    const vendor = vendors.find(v => v.id === product.vendorId);
    return {
      ...product,
      vendorName: vendor ? vendor.name : 'Unknown Vendor'
    };
  });

  return (
    <section className="py-10">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Trending Products</h2>
          <Button variant="link" className="text-theme-purple">
            View All
          </Button>
        </div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {productsWithVendorNames.map(product => (
              <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  description={product.description}
                  vendorId={product.vendorId}
                  vendorName={product.vendorName}
                  showQuickBuy={true}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default TrendingProducts;
