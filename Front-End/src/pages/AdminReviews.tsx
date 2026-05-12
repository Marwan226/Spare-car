import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
  Star,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Trash2,
  Search,
  Filter,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";

interface Review {
  id: string;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  date: Date;
  status: "pending" | "approved" | "rejected";
  helpful: number;
}

const initialReviews: Review[] = [
  {
    id: "1",
    productName: "Premium Brake Pads",
    customerName: "أحمد محمد",
    rating: 5,
    comment: "منتج ممتاز، جودة عالية وأداء رائع. أنصح به بشدة!",
    date: new Date(2024, 10, 20),
    status: "approved",
    helpful: 12,
  },
  {
    id: "2",
    productName: "Oil Filter Kit",
    customerName: "فاطمة علي",
    rating: 4,
    comment: "جيد جداً، لكن التوصيل كان متأخر قليلاً.",
    date: new Date(2024, 10, 22),
    status: "approved",
    helpful: 8,
  },
  {
    id: "3",
    productName: "LED Headlight Bulbs",
    customerName: "محمود حسن",
    rating: 5,
    comment: "إضاءة قوية جداً، تحسن كبير في الرؤية الليلية.",
    date: new Date(2024, 10, 25),
    status: "pending",
    helpful: 0,
  },
  {
    id: "4",
    productName: "Spark Plugs Set",
    customerName: "سارة خالد",
    rating: 3,
    comment: "المنتج جيد لكن السعر مرتفع قليلاً.",
    date: new Date(2024, 10, 26),
    status: "pending",
    helpful: 0,
  },
  {
    id: "5",
    productName: "Premium Brake Pads",
    customerName: "يوسف أحمد",
    rating: 2,
    comment: "لم يعجبني المنتج، الجودة أقل من المتوقع.",
    date: new Date(2024, 10, 27),
    status: "pending",
    helpful: 0,
  },
];

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRating, setFilterRating] = useState("all");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState<string | null>(null);

  const handleStatusChange = (
    reviewId: string,
    newStatus: Review["status"]
  ) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId ? { ...review, status: newStatus } : review
      )
    );
    toast.success("Review status updated successfully!");
  };

  const handleDeleteReview = () => {
    if (!deleteReviewId) return;

    setReviews(reviews.filter((r) => r.id !== deleteReviewId));
    toast.success("Review deleted successfully!");
    setDeleteReviewId(null);
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || review.status === filterStatus;
    const matchesRating =
      filterRating === "all" || review.rating === parseInt(filterRating);
    return matchesSearch && matchesStatus && matchesRating;
  });

  const stats = {
    total: reviews.length,
    pending: reviews.filter((r) => r.status === "pending").length,
    approved: reviews.filter((r) => r.status === "approved").length,
    rejected: reviews.filter((r) => r.status === "rejected").length,
    avgRating: (
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    ).toFixed(1),
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Review Management
          </h1>
          <p className="text-gray-600 mt-2">
            Monitor and manage customer reviews
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <MessageSquare className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Total Reviews</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold mt-1">{stats.avgRating}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Eye className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold mt-1">{stats.pending}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold mt-1">{stats.approved}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold mt-1">{stats.rejected}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>All Reviews</CardTitle>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search reviews..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-32">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterRating} onValueChange={setFilterRating}>
                  <SelectTrigger className="w-full md:w-32">
                    <Star className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredReviews.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No reviews found matching your criteria
                </div>
              ) : (
                filteredReviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex flex-col gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow bg-white">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">
                            {review.productName}
                          </h3>
                          <Badge
                            variant={
                              review.status === "approved"
                                ? "default"
                                : review.status === "rejected"
                                ? "destructive"
                                : "secondary"
                            }>
                            {review.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-600">
                            by {review.customerName}
                          </span>
                          <span className="text-sm text-gray-400">
                            {format(review.date, "MMM dd, yyyy")}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">{review.comment}</p>
                        {review.status === "approved" && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <ThumbsUp className="w-4 h-4" />
                            <span>
                              {review.helpful} people found this helpful
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        {review.status === "pending" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleStatusChange(review.id, "approved")
                              }
                              className="w-full">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleStatusChange(review.id, "rejected")
                              }
                              className="w-full">
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedReview(review);
                            setIsDetailDialogOpen(true);
                          }}
                          className="w-full">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDeleteReviewId(review.id)}
                          className="w-full text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Review Details Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
            <DialogDescription>
              Complete information about the review
            </DialogDescription>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Product</p>
                  <p className="font-semibold">{selectedReview.productName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Customer</p>
                  <p className="font-semibold">{selectedReview.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  {renderStars(selectedReview.rating)}
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold">
                    {format(selectedReview.date, "MMMM dd, yyyy")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge
                    variant={
                      selectedReview.status === "approved"
                        ? "default"
                        : selectedReview.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }>
                    {selectedReview.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Helpful Votes</p>
                  <p className="font-semibold">{selectedReview.helpful}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Review Comment</p>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{selectedReview.comment}</p>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                {selectedReview.status === "pending" && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleStatusChange(selectedReview.id, "approved");
                        setIsDetailDialogOpen(false);
                      }}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleStatusChange(selectedReview.id, "rejected");
                        setIsDetailDialogOpen(false);
                      }}>
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </>
                )}
                <Button onClick={() => setIsDetailDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteReviewId}
        onOpenChange={() => setDeleteReviewId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              review.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteReview}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
