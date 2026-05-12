import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { categories, brands } from "@/data/products";

interface FilterSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  showInStock: boolean;
  setShowInStock: (show: boolean) => void;
}

export default function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
  showInStock,
  setShowInStock,
}: FilterSidebarProps) {
  const handleBrandToggle = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  return (
    <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-6 space-y-6 sticky top-6">
      <div>
        <h3 className="text-white font-semibold text-lg mb-4">Filters</h3>
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <Label className="text-white font-semibold">Category</Label>
        <RadioGroup
          value={selectedCategory}
          onValueChange={setSelectedCategory}>
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <RadioGroupItem
                value={category}
                id={category}
                className="border-[#2A2A2A] text-[#FF6B00]"
              />
              <Label
                htmlFor={category}
                className="text-[#B0B0B0] hover:text-white cursor-pointer transition-colors">
                {category}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Brand Filter */}
      <div className="space-y-3">
        <Label className="text-white font-semibold">Brand</Label>
        <div className="space-y-2">
          {brands
            .filter((b) => b !== "All")
            .map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => handleBrandToggle(brand)}
                  className="border-[#2A2A2A] data-[state=checked]:bg-[#FF6B00] data-[state=checked]:border-[#FF6B00]"
                />
                <Label
                  htmlFor={brand}
                  className="text-[#B0B0B0] hover:text-white cursor-pointer transition-colors">
                  {brand}
                </Label>
              </div>
            ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <Label className="text-white font-semibold">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={200}
          step={10}
          className="[&_[role=slider]]:bg-[#FF6B00] [&_[role=slider]]:border-[#FF6B00]"
        />
      </div>

      {/* Stock Filter */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="inStock"
          checked={showInStock}
          onCheckedChange={(checked) => setShowInStock(checked as boolean)}
          className="border-[#2A2A2A] data-[state=checked]:bg-[#FF6B00] data-[state=checked]:border-[#FF6B00]"
        />
        <Label
          htmlFor="inStock"
          className="text-[#B0B0B0] hover:text-white cursor-pointer transition-colors">
          In Stock Only
        </Label>
      </div>
    </Card>
  );
}
