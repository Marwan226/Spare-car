import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  X,
  Filter,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

// تعريف نوع المنتج الجديد
interface Product {
  _id: string;
  name: string;
  arabicName?: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  carBrand: string;
  carModel: string;
  year?: string;
  partNumber: string;
  stock: number;
  images: string[];
  rating: number;
  reviews: number;
  discount?: number;
  isFeatured?: boolean;
  specifications?: Record<string, any>;
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category")
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Advanced Filters State
  const [filters, setFilters] = useState({
    brand: "",
    carBrand: "",
    carModel: "",
    year: "",
    minPrice: "",
    maxPrice: "",
    inStock: "",
  });

  // جلب المنتجات من API
  useEffect(() => {
    fetchProducts();
  }, []);

  // عند تغيير الفلاتر
  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedCategory, filters, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        "http://localhost:5000/api/products?limit=100"
      );

      if (response.data.success) {
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        console.log(
          `✅ Loaded ${response.data.products.length} products from API`
        );
      } else {
        setError("Failed to load products");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  // استخراج القيم الفريدة من المنتجات الحقيقية
  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean))
  );
  const uniqueBrands = Array.from(
    new Set(products.map((p) => p.brand).filter(Boolean))
  );
  const uniqueCarBrands = Array.from(
    new Set(products.map((p) => p.carBrand).filter(Boolean))
  );
  const uniqueCarModels = Array.from(
    new Set(products.map((p) => p.carModel).filter(Boolean))
  );
  const uniqueYears = Array.from(
    new Set(products.map((p) => p.year).filter(Boolean))
  ).sort();

  const applyFilters = () => {
    let filtered = [...products];

    // Category Filter
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Search Term Filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.arabicName?.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          p.carBrand.toLowerCase().includes(term) ||
          p.carModel.toLowerCase().includes(term) ||
          p.partNumber.toLowerCase().includes(term)
      );
    }

    // Advanced Filters
    if (filters.brand) {
      filtered = filtered.filter((p) => p.brand === filters.brand);
    }

    if (filters.carBrand) {
      filtered = filtered.filter((p) => p.carBrand === filters.carBrand);
    }

    if (filters.carModel) {
      filtered = filtered.filter((p) => p.carModel === filters.carModel);
    }

    if (filters.year) {
      filtered = filtered.filter((p) => p.year === filters.year);
    }

    if (filters.minPrice) {
      filtered = filtered.filter(
        (p) => p.price >= parseFloat(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(
        (p) => p.price <= parseFloat(filters.maxPrice)
      );
    }

    if (filters.inStock === "true") {
      filtered = filtered.filter((p) => p.stock > 0);
    } else if (filters.inStock === "false") {
      filtered = filtered.filter((p) => p.stock === 0);
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setSearchParams({});
    } else {
      setSelectedCategory(category);
      setSearchParams({ category });
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    setSearchParams({});
    setFilters({
      brand: "",
      carBrand: "",
      carModel: "",
      year: "",
      minPrice: "",
      maxPrice: "",
      inStock: "",
    });
  };

  const activeFiltersCount =
    Object.values(filters).filter(Boolean).length + (selectedCategory ? 1 : 0);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading products from database...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Error Loading Products</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button
            onClick={fetchProducts}
            className="bg-orange-500 hover:bg-orange-600 text-white">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-4xl font-bold mb-8">Car Parts Store</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search products, brands, car models..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Stats Info */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-600">Total products in database:</p>
            <p className="text-2xl font-bold">{products.length} products</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Currently showing:</p>
            <p className="text-2xl font-bold">
              {filteredProducts.length} products
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => console.log("Products:", products)}
            className="text-sm">
            Debug Log
          </Button>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Advanced Filters
          {activeFiltersCount > 0 && (
            <Badge variant="default" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
          {showAdvancedFilters ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Brand Filter */}
              <div>
                <Label htmlFor="brand">Part Brand</Label>
                <Select
                  value={filters.brand}
                  onValueChange={(value) => handleFilterChange("brand", value)}>
                  <SelectTrigger id="brand">
                    <SelectValue placeholder="All Brands" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Brands</SelectItem>
                    {uniqueBrands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Car Brand Filter */}
              <div>
                <Label htmlFor="carBrand">Car Brand</Label>
                <Select
                  value={filters.carBrand}
                  onValueChange={(value) =>
                    handleFilterChange("carBrand", value)
                  }>
                  <SelectTrigger id="carBrand">
                    <SelectValue placeholder="All Car Brands" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Car Brands</SelectItem>
                    {uniqueCarBrands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Car Model Filter */}
              <div>
                <Label htmlFor="carModel">Car Model</Label>
                <Select
                  value={filters.carModel}
                  onValueChange={(value) =>
                    handleFilterChange("carModel", value)
                  }>
                  <SelectTrigger id="carModel">
                    <SelectValue placeholder="All Car Models" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Car Models</SelectItem>
                    {uniqueCarModels.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Year Filter */}
              <div>
                <Label htmlFor="year">Year</Label>
                <Select
                  value={filters.year}
                  onValueChange={(value) => handleFilterChange("year", value)}>
                  <SelectTrigger id="year">
                    <SelectValue placeholder="All Years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Years</SelectItem>
                    {uniqueYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Min Price Filter */}
              <div>
                <Label htmlFor="minPrice">Min Price ($)</Label>
                <Input
                  id="minPrice"
                  type="number"
                  placeholder="0"
                  value={filters.minPrice}
                  onChange={(e) =>
                    handleFilterChange("minPrice", e.target.value)
                  }
                />
              </div>

              {/* Max Price Filter */}
              <div>
                <Label htmlFor="maxPrice">Max Price ($)</Label>
                <Input
                  id="maxPrice"
                  type="number"
                  placeholder="10000"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    handleFilterChange("maxPrice", e.target.value)
                  }
                />
              </div>

              {/* Stock Filter */}
              <div>
                <Label htmlFor="inStock">Stock Status</Label>
                <Select
                  value={filters.inStock}
                  onValueChange={(value) =>
                    handleFilterChange("inStock", value)
                  }>
                  <SelectTrigger id="inStock">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All</SelectItem>
                    <SelectItem value="true">In Stock</SelectItem>
                    <SelectItem value="false">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters Button */}
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                  className="w-full">
                  <X className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => handleCategoryClick(category)}>
              {category}
              {selectedCategory === category && <X className="ml-1 h-3 w-3" />}
            </Badge>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {activeFiltersCount > 0 && (
        <div className="mb-6 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedCategory && (
            <Badge variant="secondary" className="gap-1">
              Category: {selectedCategory}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchParams({});
                }}
              />
            </Badge>
          )}
          {filters.brand && (
            <Badge variant="secondary" className="gap-1">
              Brand: {filters.brand}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleFilterChange("brand", "")}
              />
            </Badge>
          )}
          {filters.carBrand && (
            <Badge variant="secondary" className="gap-1">
              Car Brand: {filters.carBrand}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleFilterChange("carBrand", "")}
              />
            </Badge>
          )}
          {filters.carModel && (
            <Badge variant="secondary" className="gap-1">
              Model: {filters.carModel}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleFilterChange("carModel", "")}
              />
            </Badge>
          )}
          {filters.year && (
            <Badge variant="secondary" className="gap-1">
              Year: {filters.year}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleFilterChange("year", "")}
              />
            </Badge>
          )}
          {filters.inStock && (
            <Badge variant="secondary" className="gap-1">
              Stock: {filters.inStock === "true" ? "In Stock" : "Out of Stock"}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleFilterChange("inStock", "")}
              />
            </Badge>
          )}
          {(filters.minPrice || filters.maxPrice) && (
            <Badge variant="secondary" className="gap-1">
              Price: ${filters.minPrice || "0"} - ${filters.maxPrice || "∞"}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  handleFilterChange("minPrice", "");
                  handleFilterChange("maxPrice", "");
                }}
              />
            </Badge>
          )}
        </div>
      )}

      {/* Products Count */}
      <div className="mb-4">
        <p className="text-muted-foreground">
          Showing {filteredProducts.length} product
          {filteredProducts.length !== 1 ? "s" : ""}
          {products.length !== filteredProducts.length &&
            ` (filtered from ${products.length} total)`}
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 place-items-center mx-auto max-w-6xl">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">No products found</p>
          <p className="text-gray-500 mb-4">
            Try changing your filters or search term
          </p>
          <Button variant="outline" className="mt-4" onClick={clearAllFilters}>
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
}
