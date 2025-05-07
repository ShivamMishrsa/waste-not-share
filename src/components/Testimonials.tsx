
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Chef at Green Table Restaurant",
      quote: "Waste Not, Share has completely changed how we handle our surplus food. Instead of throwing it away, we're now able to help those in need. The platform is incredibly easy to use!",
      image: "/placeholder.svg",
    },
    {
      name: "Michael Rodriguez",
      role: "Director at Hope Community Kitchen",
      quote: "As a small charity, sourcing quality food consistently was always a challenge. This platform has connected us with amazing restaurants and helped us serve 40% more meals each week.",
      image: "/placeholder.svg",
    },
    {
      name: "Jennifer Lee",
      role: "Sustainability Manager at Fresh Bites Cafe",
      quote: "Not only are we reducing our environmental footprint, but we're also strengthening community ties. The impact reports help us showcase our commitment to social responsibility.",
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">What Our Partners Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from the restaurants and charities making a difference in their communities through Waste Not, Share.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden mb-3">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <blockquote className="text-center text-gray-700 italic">
                  "{testimonial.quote}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
