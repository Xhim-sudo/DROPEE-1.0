
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  author: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  excerpt,
  date,
  image,
  author
}) => {
  // Format the date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <Link to={`/blog/${id}`}>
        <div className="aspect-video overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4 flex-grow">
        <Link to={`/blog/${id}`}>
          <h3 className="font-medium text-lg line-clamp-2">{title}</h3>
        </Link>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
          <span>{author}</span>
          <span className="mx-1">•</span>
          <span>{formattedDate}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3 mt-2">{excerpt}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link to={`/blog/${id}`} className="w-full">
          <Button variant="outline" className="w-full">
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
