
import React from 'react';
import { Button } from '@/components/ui/button';
import BlogCard from '@/components/BlogCard';
import { blogPosts } from '@/data/mockData';

const BlogSection = () => {
  return (
    <section className="py-10">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Updates</h2>
          <Button variant="link" className="text-theme-purple">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <BlogCard
              key={post.id}
              id={post.id}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              image={post.image}
              author={post.author}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
