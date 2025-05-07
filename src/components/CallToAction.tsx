
import { Button } from "@/components/ui/button";
import { HandHeart } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className="py-16 bg-green-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center gap-3 mb-3">
              <HandHeart className="h-6 w-6" />
              <h2 className="text-3xl font-bold">Join the Movement</h2>
            </div>
            <p className="text-green-50 max-w-xl">
              Whether you're a restaurant with surplus food or a charity serving those in need, 
              your participation makes a significant impact on our communities and environment.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-green-50">
              <Link to="/register">Join as Restaurant</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-green-700">
              <Link to="/register">Join as Charity</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
