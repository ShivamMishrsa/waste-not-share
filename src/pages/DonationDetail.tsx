
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Soup, Clock, MapPin, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getDonationById, claimDonation, Donation } from "@/services/donations";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DonationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isCharity } = useAuth();
  const [donation, setDonation] = useState<Donation | null>(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    const fetchDonation = async () => {
      if (!id) return;
      
      setLoading(true);
      const donationData = await getDonationById(id);
      setDonation(donationData);
      setLoading(false);
    };

    fetchDonation();
  }, [id]);

  const handleClaim = async () => {
    if (!user || !isCharity || !donation || !id) {
      toast.error("Cannot Claim Donation", {
        description: isCharity 
          ? "Please sign in to claim this donation" 
          : "Only charity organizations can claim donations"
      });
      return;
    }
    
    setClaiming(true);
    const success = await claimDonation(id, user.id);
    setClaiming(false);
    
    if (success) {
      navigate("/donations");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p>Loading donation details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold mb-4">Donation Not Found</h1>
          <p className="text-gray-600 mb-6">The donation you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/donations">View Available Donations</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4 container mx-auto">
        <div className="mb-6">
          <Button asChild variant="outline" className="mb-4">
            <Link to="/donations" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Donations
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{donation.name}</h1>
          <p className="text-gray-600">{donation.restaurant}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-lg overflow-hidden mb-6">
              <img 
                src={donation.image} 
                alt={donation.name} 
                className="w-full h-auto object-cover"
              />
            </div>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">About This Donation</h2>
                <p className="text-gray-700 mb-6">{donation.description}</p>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="font-medium">Pickup Location:</span>
                    <span className="ml-2">{donation.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span className="font-medium">Pickup Window:</span>
                    <span className="ml-2">{donation.time_window}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Status</h2>
                  <div className="bg-green-100 text-green-600 text-sm font-medium px-3 py-1 rounded-full">
                    Available
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">
                  This food donation is currently available for claiming.
                </p>
                
                <Button 
                  className="w-full mb-3 bg-green-500 hover:bg-green-600"
                  onClick={handleClaim}
                  disabled={!isCharity || claiming || !user}
                >
                  {claiming ? "Processing..." : "Claim Donation"}
                </Button>
                
                {!user ? (
                  <p className="text-sm text-center text-gray-500">
                    Please <Link to="/signin" className="text-green-600 hover:underline">sign in</Link> to claim this donation.
                  </p>
                ) : !isCharity ? (
                  <p className="text-sm text-center text-gray-500">
                    Only charity organizations can claim donations.
                  </p>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DonationDetail;
