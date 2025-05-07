
import { Button } from "@/components/ui/button";
import { HandHeart } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-cream to-green-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
              <HandHeart className="h-5 w-5" />
              <span className="font-medium">Fighting Food Waste Together</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Connect, Donate, <span className="text-green-500">Make a Difference</span>
            </h1>
            <p className="text-lg text-gray-700 md:pr-12">
              Join our platform connecting restaurants with excess food to charities that serve those in need. 
              Together, we can reduce food waste and fight hunger in our communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white">
                <Link to="/register">Join as Restaurant</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                <Link to="/register">Join as Charity</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-medium">300+</div>
                <div className="h-8 w-8 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 font-medium">150+</div>
              </div>
              <p>Joining 300+ restaurants and 150+ charities nationwide</p>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute -top-6 -right-6 bg-orange-500 h-16 w-16 rounded-full z-0"></div>
            <div className="absolute -bottom-6 -left-6 bg-lightgreen-500 h-16 w-16 rounded-full z-0"></div>
            <div className="relative z-10 bg-white p-4 shadow-xl rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&h=400" 
                alt="Food donation" 
                className="w-full h-auto rounded"
              />
              <div className="bg-white rounded-lg shadow-lg p-4 absolute -bottom-12 -left-12">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <HandHeart className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Impact Today</p>
                    <p className="text-sm text-gray-600">5,280 meals saved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
