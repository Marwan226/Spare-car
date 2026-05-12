import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function ServiceCard({
  title,
  description,
  image,
  link,
}: ServiceCardProps) {
  return (
    <Card className="service-card bg-card border-border overflow-hidden group">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
      </div>

      <CardContent className="p-6 space-y-4">
        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-muted-foreground leading-relaxed">{description}</p>

        <Button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground btn-glow group/btn"
          onClick={() => {
            // يمكن للمستخدم تحديث هذا الرابط لاحقاً
            window.location.href = link;
          }}>
          <span className="mr-2">Need Service</span>
          <ArrowLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
}
