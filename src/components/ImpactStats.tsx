
import { Utensils, Soup, Carrot } from "lucide-react";

const ImpactStats = () => {
  const stats = [
    {
      icon: Utensils,
      value: "150,000+",
      label: "Meals Saved",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Soup,
      value: "30,000+",
      label: "Kg CO₂ Prevented",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: Carrot,
      value: "500+",
      label: "Active Partners",
      color: "bg-lightgreen-100 text-lightgreen-600",
    },
  ];

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Our Impact So Far</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Together with our partners, we're making a measurable difference in communities nationwide while reducing environmental impact.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`${stat.color} h-14 w-14 rounded-full flex items-center justify-center mb-4`}>
                <stat.icon className="h-7 w-7" />
              </div>
              <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpactStats;
