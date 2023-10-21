type FeatureListProps = {
    title: string;
    features: string[];
  };
  
  function FeatureList({ title, features }: FeatureListProps) {
    return (
      <div className="mb-10">
        <h2 className="text-4xl mt-6 mb-6 font-semibold">{title}</h2>
        <ul className="list-none pl-8 text-xl">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default FeatureList;
  