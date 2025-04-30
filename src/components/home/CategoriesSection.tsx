
import React from 'react';
import { Button } from '@/components/ui/button';
import CategoryCard from '@/components/CategoryCard';
import { categories } from '@/data/mockData';

const CategoriesSection = () => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Browse Categories</h2>
          <Button variant="link" className="text-theme-purple">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              icon={category.icon}
              subcategories={category.subcategories}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
