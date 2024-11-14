interface FeatureListProps {
  title: string;
  features: string[];
}

export default function FeatureList({ title, features }: FeatureListProps) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
        {title}
      </h2>
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li
            key={index}
            className="bg-white/5 backdrop-blur-lg rounded-lg p-4 shadow-lg hover:bg-white/10 transition-all duration-300"
          >
            <span className="text-lg text-white/80">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}