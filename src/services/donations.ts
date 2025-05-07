
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/sonner';

export interface Donation {
  id: string;
  name: string;
  restaurant: string;
  restaurant_id: string;
  location: string;
  time_window: string;
  description: string;
  image: string;
  created_at: string;
  status: 'available' | 'claimed' | 'completed';
}

export const getDonations = async (): Promise<Donation[]> => {
  try {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .eq('status', 'available')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching donations:', error);
      toast({
        title: "Failed to Load Donations",
        description: error.message,
        variant: "destructive",
      });
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching donations:', error);
    return [];
  }
};

export const getDonationById = async (id: string): Promise<Donation | null> => {
  try {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching donation ${id}:`, error);
      toast({
        title: "Failed to Load Donation",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching donation ${id}:`, error);
    return null;
  }
};

export const createDonation = async (donation: Omit<Donation, 'id' | 'created_at' | 'status'>): Promise<Donation | null> => {
  try {
    const { data, error } = await supabase
      .from('donations')
      .insert([
        { 
          ...donation, 
          status: 'available', 
          created_at: new Date().toISOString() 
        }
      ])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating donation:', error);
      toast({
        title: "Failed to Create Donation",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
    
    toast({
      title: "Donation Created",
      description: "Your donation has been listed successfully",
    });
    
    return data;
  } catch (error) {
    console.error('Error creating donation:', error);
    toast({
      title: "Failed to Create Donation",
      description: "An unexpected error occurred",
      variant: "destructive",
    });
    return null;
  }
};

export const claimDonation = async (donationId: string, charityId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('donations')
      .update({ 
        status: 'claimed',
        claimed_by: charityId,
        claimed_at: new Date().toISOString()
      })
      .eq('id', donationId)
      .eq('status', 'available');
    
    if (error) {
      console.error('Error claiming donation:', error);
      toast({
        title: "Failed to Claim Donation",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
    
    toast({
      title: "Donation Claimed",
      description: "You have successfully claimed this donation",
    });
    
    return true;
  } catch (error) {
    console.error('Error claiming donation:', error);
    toast({
      title: "Failed to Claim Donation",
      description: "An unexpected error occurred",
      variant: "destructive",
    });
    return false;
  }
};
