
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Soup, Clock, MapPin, User, Calendar } from "lucide-react";
import { getDonationById, claimDonation } from "@/services/donations";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";

const DonationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isCharity, loading } = useAuth();
  const [claiming, setClaiming] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: donation, isLoading, error } = useQuery({
    queryKey: ['donation', id],
    queryFn: () => getDonationById(id || ''),
    enabled: !!id,
  });

  const handleClaimDonation = async () => {
    if (!user || !isCharity) {
      toast({
        title: "Authentication Required",
        description: "You need to be signed in as a charity to claim donations",
        variant: "destructive",
      });
      navigate("/signin");
      return;
    }

    setClaiming(true);
    const success = await claimDonation(id || '', user.id);
    setClaiming(false);
    setDialogOpen(false);
    
    if (success) {
      navigate("/donations");
    }
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p>Loading donation details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !donation) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">Failed to load donation details.</p>
            <Button variant="outline" onClick={() => navigate("/donations")}>
              Return to Donations
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 container mx-auto">
        <div className="max-w-4xl mx-auto px-4">
          <Button
            variant="outline"
            className="mb-6"
            onClick={() => navigate("/donations")}
          >
            Back to Donations
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="aspect-w-16 aspect-h-9 mb-6 rounded-lg overflow-hidden">
                <img
                  src={donation.image}
                  alt={donation.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">{donation.name}</h1>
                    <span className="bg-green-100 text-green-600 text-sm font-medium px-3 py-1 rounded-full">
                      Available
                    </span>
                  </div>
                  <p className="text-lg text-gray-600 mt-1">{donation.restaurant}</p>
                </div>

                <div className="border-t border-b py-6">
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p className="text-gray-700">{donation.description}</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Pickup Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700">
                        <MapPin className="h-5 w-5 mr-3 text-green-600" />
                        <span>{donation.location}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Clock className="h-5 w-5 mr-3 text-green-600" />
                        <span>{donation.time_window}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Calendar className="h-5 w-5 mr-3 text-green-600" />
                        <span>{new Date(donation.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <User className="h-5 w-5 mr-3 text-green-600" />
                        <span>Posted by {donation.restaurant}</span>
                      </div>
                    </div>
                  </div>

                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700"
                        disabled={!isCharity}
                      >
                        Claim Donation
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Donation Claim</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to claim this donation? By confirming, you agree to pick up the food during the specified time window.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={handleClaimDonation}
                          disabled={claiming}
                        >
                          {claiming ? "Claiming..." : "Confirm Claim"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  {!isCharity && (
                    <p className="text-sm text-gray-500 text-center">
                      Only registered charities can claim donations.{" "}
                      {!user && (
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-green-600" 
                          onClick={() => navigate("/signin")}
                        >
                          Sign in
                        </Button>
                      )}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DonationDetail;
