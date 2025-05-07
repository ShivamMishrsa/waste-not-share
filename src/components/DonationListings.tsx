
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Soup, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { getDonations } from "@/services/donations";

const DonationListings = () => {
  const { data: listings = [], isLoading } = useQuery({
    queryKey: ['homepageDonations'],
    queryFn: getDonations,
  });

  // Show only 3 most recent donations on homepage
  const displayListings = listings.slice(0, 3);

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Available Donations</h2>
            <p className="text-gray-600">
              Browse recent food donations available for pickup
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:flex">
            <Link to="/donations">View All Donations</Link>
          </Button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-10">
            <p>Loading donations...</p>
          </div>
        ) : (
          <>
            {displayListings.length === 0 ? (
              <div className="text-center py-10">
                <p>No donations available at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayListings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={listing.image} 
                        alt={listing.name} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <CardContent className="p-6 flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">{listing.name}</h3>
                        <div className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded">
                          Available
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{listing.restaurant}</p>
                      <p className="text-gray-700 mb-4">{listing.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{listing.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{listing.time_window}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t p-6">
                      <Button asChild className="w-full bg-green-500 hover:bg-green-600">
                        <Link to={`/donations/${listing.id}`}>Claim Donation</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
        
        <div className="mt-8 text-center md:hidden">
          <Button asChild>
            <Link to="/donations">View All Donations</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DonationListings;
