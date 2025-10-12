import Text from "../atoms/Text";

function HeroOverlay({ title, description }) {
  return (
    <div className="overlay">
      <Text variant="h1" className="text-white mb-4">{title}</Text>
      <Text variant="p" className="text-white lead">{description}</Text>
    </div>
  );
}

export default HeroOverlay;