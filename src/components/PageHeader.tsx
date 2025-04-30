
import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description
}) => {
  return (
    <div className="py-6 md:py-10 text-center">
      <h1 className="font-bold text-3xl md:text-4xl">{title}</h1>
      {description && (
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
};

export default PageHeader;
