
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Soup, Clock, MapPin } from "lucide-react";
import { getDonations } from "@/services/donations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Donations = () => {
  const { data: donations = [], isLoading, error } = useQuery({
    queryKey: ['donations'],
    queryFn: getDonations,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4 container mx-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Available Donations</h1>
            <p className="text-gray-600 mb-6">
              Browse all available food donations ready for pickup
            </p>
          </div>

          {isLoading && (
            <div className="text-center py-10">
              <p>Loading donations...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-10">
              <p className="text-red-500">Failed to load donations. Please try again later.</p>
            </div>
          )}

          {!isLoading && !error && donations.length === 0 && (
            <div className="text-center py-10">
              <p>No donations available at the moment.</p>
              <Button asChild variant="outline" className="mt-4">
                <Link to="/">Return to Home</Link>
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donations.map((donation) => (
              <Card key={donation.id} className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={donation.image} 
                    alt={donation.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardContent className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{donation.name}</h3>
                    <div className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded">
                      Available
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{donation.restaurant}</p>
                  <p className="text-gray-700 mb-4">{donation.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{donation.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{donation.time_window}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-6">
                  <Button asChild className="w-full bg-green-500 hover:bg-green-600">
                    <Link to={`/donations/${donation.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Donations;
