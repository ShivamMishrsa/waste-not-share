
import { Card, CardContent } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Restaurants List Surplus Food",
      description: "Restaurants and food providers list their surplus food, specifying quantity, type, and pickup window.",
      color: "border-l-green-500",
    },
    {
      number: "02",
      title: "Charities Browse & Claim",
      description: "Local charities browse available donations and claim items that match their needs and capacity.",
      color: "border-l-orange-500",
    },
    {
      number: "03",
      title: "Arrange Pickup",
      description: "Once a claim is approved, both parties arrange the logistics for a smooth food transfer.",
      color: "border-l-lightgreen-500",
    },
    {
      number: "04",
      title: "Track Your Impact",
      description: "Both donors and recipients can track their contribution to reducing food waste and fighting hunger.",
      color: "border-l-green-500",
    },
  ];

  return (
    <div className="py-16 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform makes the donation process seamless and efficient for all parties involved.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className={`border-l-4 ${step.color} hover:shadow-md transition-shadow h-full`}>
              <CardContent className="p-6">
                <span className="block text-4xl font-bold text-gray-200 mb-3">{step.number}</span>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
