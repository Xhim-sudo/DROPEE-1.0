
import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingBag, Image, Percent, Info, Calendar, Edit, Trash } from 'lucide-react';
import { Product } from './ProductTypes';

interface ProductsTableProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onManageOffer: (product: Product) => void;
}

const ProductsTable = ({ 
  products, 
  onEditProduct, 
  onDeleteProduct, 
  onManageOffer 
}: ProductsTableProps) => {
  return (
    <div className="mt-6 rounded-md border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Discount</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Limited Offer</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="hover:bg-muted/50">
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded bg-muted/30 flex items-center justify-center mr-2">
                      <ShoppingBag className="h-4 w-4" />
                    </div>
                    {product.name}
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  {product.discountedPrice ? (
                    <span className="text-green-600">${product.discountedPrice.toFixed(2)}</span>
                  ) : "-"}
                </TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${product.status === 'Active' ? 'bg-green-100 text-green-800' :
                    product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'}`}>
                    {product.status}
                  </span>
                </TableCell>
                <TableCell>
                  {product.hasOffer ? (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-amber-600" />
                      <span className="text-xs">Until {new Date(product.offerEnds!).toLocaleDateString()}</span>
                    </div>
                  ) : "-"}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                      onClick={() => onEditProduct(product)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      <span>Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                      onClick={() => onManageOffer(product)}
                    >
                      <Percent className="h-4 w-4 mr-1" />
                      <span>Offer</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600"
                      onClick={() => onDeleteProduct(product.id)}
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      <span>Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductsTable;
