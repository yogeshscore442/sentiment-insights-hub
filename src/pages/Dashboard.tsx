import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RefreshCw, Download, Calendar, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SearchBox from '@/components/SearchBox';
import ChartSection from '@/components/ChartSection';
import ReviewTable from '@/components/ReviewTable';
import { mockProducts } from '@/data/mockData';
import type { ProductSearchResult } from '@/services/api';

const Dashboard = () => {
  const location = useLocation();
  const initialProduct = location.state?.product as ProductSearchResult | undefined;
  
  const [selectedProduct, setSelectedProduct] = useState<ProductSearchResult | undefined>(
    initialProduct || mockProducts[0]
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState('7d');

  const handleProductSelect = (product: ProductSearchResult) => {
    setSelectedProduct(product);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const handleExport = () => {
    // In production, this would generate a CSV/PDF report
    const data = {
      product: selectedProduct?.name,
      exportDate: new Date().toISOString(),
      // ... other data
    };
    console.log('Exporting data:', data);
    alert('Export functionality will download a detailed report');
  };

  return (
    <div className="dashboard-page">
      <div className="page-container">
        {/* Header */}
        <div className="page-heading">
          <div>
            <div className="eyebrow"><span className="tiny-square" /> CUSTOMER INTELLIGENCE</div>
            <h1>
              Review analytics
            </h1>
            <p className="text-muted-foreground">
              {selectedProduct
                ? `A closer look at your product’s customer feedback.`
                : 'Search for a product to view analytics'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Date Range */}
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[140px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>

            {/* Refresh */}
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>

            {/* Export */}
            <Button variant="outline" onClick={handleExport} className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Search Section */}
        <section className="dashboard-search mb-6">
          <SearchBox onProductSelect={handleProductSelect} compact />
        </section>

        {/* Selected Product Info */}
        {selectedProduct && (
          <Card className="selected-product mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground mb-1">SELECTED PRODUCT</div><h3 className="font-semibold text-sm line-clamp-2">{selectedProduct.name}</h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-muted-foreground">
                    <span className="capitalize">{selectedProduct.platform}</span>
                    <span>•</span>
                    <span>{selectedProduct.price}</span>
                    <span>•</span>
                    <span>★ {selectedProduct.rating}</span>
                    <span>•</span>
                    <span>{selectedProduct.reviewCount.toLocaleString()} reviews</span>
                  </div>
                </div>
                <span className="demo-badge hidden sm:inline-flex">Sample data</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Charts */}
        <div className="mb-6">
          <ChartSection />
        </div>

        {/* Review Table */}
        <ReviewTable />
        <div className="page-footer"><span>Sample reviews · Not connected to a live backend</span><span>SentimentAI</span></div>
      </div>
    </div>
  );
};

export default Dashboard;
