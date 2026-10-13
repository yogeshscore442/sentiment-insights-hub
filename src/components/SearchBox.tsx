import { useState } from 'react';
import { Search, Loader2, ShoppingBag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockProducts } from '@/data/mockData';
import type { ProductSearchResult } from '@/services/api';

interface SearchBoxProps {
  compact?: boolean;
  onProductSelect?: (product: ProductSearchResult) => void;
}

const SearchBox = ({ onProductSelect, compact = false }: SearchBoxProps) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ProductSearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    // Simulate API call with mock data
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const filtered = mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.platform.toLowerCase().includes(query.toLowerCase())
    );
    
    setResults(filtered.length > 0 ? filtered : mockProducts);
    setIsLoading(false);
  };

  const handleProductClick = (product: ProductSearchResult) => {
    onProductSelect?.(product);
  };

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            aria-label="Search products"
            data-product-search
            placeholder="Search a product name or paste a product URL..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 pl-11 pr-28 text-sm rounded-md border border-input focus:border-primary transition-colors bg-card"
          />
          <Button
            type="submit"
            disabled={isLoading}
            aria-label={isLoading ? "Searching products" : "Search"}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-9 px-4"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Search'
            )}
          </Button>
        </div>
      </form>

      {/* Search Results */}
      {hasSearched && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {results.length} products found
            </p>
          </div>
          
          <div className="grid gap-3">
            {results.map((product) => (
              <Card
                key={product.id}
                role="button"
                tabIndex={0}
                aria-label={`Analyze ${product.name}`}
                onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); handleProductClick(product); } }}
                className="p-4 cursor-pointer hover:border-primary/40 hover:bg-accent/30 transition-colors group"
                onClick={() => handleProductClick(product)}
              >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="secondary"
                        className={
                          product.platform === 'amazon'
                            ? 'bg-destructive/10 text-destructive'
                            : 'bg-primary/10 text-primary'
                        }
                      >
                        {product.platform === 'amazon' ? 'Amazon' : 'Flipkart'}
                      </Badge>
                      <span className="text-sm font-semibold">{product.price}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 search-result-rating">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-positive">
                        ★ {product.rating}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {product.reviewCount.toLocaleString()} reviews
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {isLoading && <div role="status" className="flex items-center gap-3 py-4 text-sm text-muted-foreground"><Loader2 size={16} className="animate-spin" /> Searching sample products…</div>}
      {!hasSearched && !compact && <div className="flex items-center gap-2 text-xs text-muted-foreground"><ShoppingBag size={14} /><span>Amazon & Flipkart · Sample product catalog</span></div>}

    </div>
  );
};

export default SearchBox;