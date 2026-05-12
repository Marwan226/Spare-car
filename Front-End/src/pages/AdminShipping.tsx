import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AdminSidebar from "@/components/AdminSidebar";
import { toast } from "sonner";
import {
  Truck,
  Plus,
  Pencil,
  Trash2,
  MapPin,
  Clock,
  DollarSign,
  Package,
} from "lucide-react";

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  regions: string[];
  active: boolean;
}

const initialMethods: ShippingMethod[] = [
  {
    id: "1",
    name: "Standard Shipping",
    description: "Regular delivery service",
    price: 5.99,
    estimatedDays: "5-7 days",
    regions: ["Cairo", "Alexandria", "Giza"],
    active: true,
  },
  {
    id: "2",
    name: "Express Shipping",
    description: "Fast delivery service",
    price: 12.99,
    estimatedDays: "2-3 days",
    regions: ["Cairo", "Alexandria", "Giza", "Luxor"],
    active: true,
  },
  {
    id: "3",
    name: "Next Day Delivery",
    description: "Overnight delivery service",
    price: 19.99,
    estimatedDays: "1 day",
    regions: ["Cairo", "Giza"],
    active: true,
  },
  {
    id: "4",
    name: "Free Shipping",
    description: "Free delivery for orders over $100",
    price: 0,
    estimatedDays: "7-10 days",
    regions: ["All Egypt"],
    active: true,
  },
];

const availableRegions = [
  "Cairo",
  "Alexandria",
  "Giza",
  "Luxor",
  "Aswan",
  "Port Said",
  "Suez",
  "All Egypt",
];

export default function AdminShipping() {
  const [methods, setMethods] = useState<ShippingMethod[]>(initialMethods);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteMethodId, setDeleteMethodId] = useState<string | null>(null);
  const [editingMethod, setEditingMethod] = useState<ShippingMethod | null>(
    null
  );

  const [newMethod, setNewMethod] = useState({
    name: "",
    description: "",
    price: "",
    estimatedDays: "",
    regions: [] as string[],
  });

  const handleAddMethod = (e: React.FormEvent) => {
    e.preventDefault();

    const method: ShippingMethod = {
      id: Date.now().toString(),
      name: newMethod.name,
      description: newMethod.description,
      price: parseFloat(newMethod.price),
      estimatedDays: newMethod.estimatedDays,
      regions: newMethod.regions,
      active: true,
    };

    setMethods([...methods, method]);
    toast.success("Shipping method added successfully!");
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditMethod = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingMethod) return;

    const updatedMethods = methods.map((m) =>
      m.id === editingMethod.id ? editingMethod : m
    );

    setMethods(updatedMethods);
    toast.success("Shipping method updated successfully!");
    setIsEditDialogOpen(false);
    setEditingMethod(null);
  };

  const handleDeleteMethod = () => {
    if (!deleteMethodId) return;

    setMethods(methods.filter((m) => m.id !== deleteMethodId));
    toast.success("Shipping method deleted successfully!");
    setDeleteMethodId(null);
  };

  const toggleMethodStatus = (id: string) => {
    setMethods(
      methods.map((m) => (m.id === id ? { ...m, active: !m.active } : m))
    );
    toast.success("Shipping method status updated!");
  };

  const resetForm = () => {
    setNewMethod({
      name: "",
      description: "",
      price: "",
      estimatedDays: "",
      regions: [],
    });
  };

  const activeMethods = methods.filter((m) => m.active).length;
  const totalRegions = new Set(methods.flatMap((m) => m.regions)).size;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Shipping Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage shipping methods and delivery options
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Methods</p>
                  <p className="text-2xl font-bold mt-1">{methods.length}</p>
                </div>
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Methods</p>
                  <p className="text-2xl font-bold mt-1">{activeMethods}</p>
                </div>
                <Package className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Covered Regions</p>
                  <p className="text-2xl font-bold mt-1">{totalRegions}</p>
                </div>
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Delivery</p>
                  <p className="text-2xl font-bold mt-1">3-5 days</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shipping Methods */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Shipping Methods</CardTitle>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Method
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Shipping Method</DialogTitle>
                    <DialogDescription>
                      Create a new shipping method
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddMethod} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Method Name *</Label>
                      <Input
                        id="name"
                        value={newMethod.name}
                        onChange={(e) =>
                          setNewMethod({ ...newMethod, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Input
                        id="description"
                        value={newMethod.description}
                        onChange={(e) =>
                          setNewMethod({
                            ...newMethod,
                            description: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price ($) *</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={newMethod.price}
                          onChange={(e) =>
                            setNewMethod({
                              ...newMethod,
                              price: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="days">Estimated Days *</Label>
                        <Input
                          id="days"
                          placeholder="e.g., 2-3 days"
                          value={newMethod.estimatedDays}
                          onChange={(e) =>
                            setNewMethod({
                              ...newMethod,
                              estimatedDays: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Available Regions *</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {availableRegions.map((region) => (
                          <label
                            key={region}
                            className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={newMethod.regions.includes(region)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setNewMethod({
                                    ...newMethod,
                                    regions: [...newMethod.regions, region],
                                  });
                                } else {
                                  setNewMethod({
                                    ...newMethod,
                                    regions: newMethod.regions.filter(
                                      (r) => r !== region
                                    ),
                                  });
                                }
                              }}
                              className="rounded"
                            />
                            <span className="text-sm">{region}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsAddDialogOpen(false);
                          resetForm();
                        }}>
                        Cancel
                      </Button>
                      <Button type="submit">Add Method</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {methods.map((method) => (
                <div
                  key={method.id}
                  className="flex flex-col md:flex-row md:items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow bg-white">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{method.name}</h3>
                      <Badge variant={method.active ? "default" : "secondary"}>
                        {method.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {method.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {method.regions.map((region) => (
                        <Badge key={region} variant="outline">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-blue-600">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-bold text-xl">
                          {method.price === 0
                            ? "Free"
                            : `$${method.price.toFixed(2)}`}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">Price</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="font-semibold">
                          {method.estimatedDays}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">Delivery</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleMethodStatus(method.id)}>
                      {method.active ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingMethod(method);
                        setIsEditDialogOpen(true);
                      }}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteMethodId(method.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Method Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Shipping Method</DialogTitle>
            <DialogDescription>
              Update the shipping method details
            </DialogDescription>
          </DialogHeader>
          {editingMethod && (
            <form onSubmit={handleEditMethod} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Method Name *</Label>
                <Input
                  id="edit-name"
                  value={editingMethod.name}
                  onChange={(e) =>
                    setEditingMethod({ ...editingMethod, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description *</Label>
                <Input
                  id="edit-description"
                  value={editingMethod.description}
                  onChange={(e) =>
                    setEditingMethod({
                      ...editingMethod,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price ($) *</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    step="0.01"
                    value={editingMethod.price}
                    onChange={(e) =>
                      setEditingMethod({
                        ...editingMethod,
                        price: parseFloat(e.target.value),
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-days">Estimated Days *</Label>
                  <Input
                    id="edit-days"
                    value={editingMethod.estimatedDays}
                    onChange={(e) =>
                      setEditingMethod({
                        ...editingMethod,
                        estimatedDays: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Available Regions *</Label>
                <div className="grid grid-cols-2 gap-2">
                  {availableRegions.map((region) => (
                    <label
                      key={region}
                      className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingMethod.regions.includes(region)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setEditingMethod({
                              ...editingMethod,
                              regions: [...editingMethod.regions, region],
                            });
                          } else {
                            setEditingMethod({
                              ...editingMethod,
                              regions: editingMethod.regions.filter(
                                (r) => r !== region
                              ),
                            });
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{region}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditDialogOpen(false);
                    setEditingMethod(null);
                  }}>
                  Cancel
                </Button>
                <Button type="submit">Update Method</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteMethodId}
        onOpenChange={() => setDeleteMethodId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              shipping method.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteMethod}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
