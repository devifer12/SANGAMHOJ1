import FeatureIcon from './FeatureIcon';

export default function Features() {
  const features = [
    {
      icon: "delivery",
      title: "DELIVERY",
      description: "Swift, secure, and reliable delivery—bringing your orders to you with care and precision!"
    },
    {
      icon: "customer-care",
      title: "CUSTOMER CARE",
      description: "Customer Care That Goes Beyond—Your Satisfaction, Our Priority."
    },
    {
      icon: "collection",
      title: "COLLECTION",
      description: "Exquisite Collections Curated to Inspire Your Every Moment."
    }
  ];

  return (
    <div id="features" className="bg-gray-50 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="mb-6">
                <FeatureIcon type={feature.icon} className="w-16 h-16 text-gold mx-auto" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-jewel-green mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base max-w-sm mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}