import HeroOverlay from "../molecules/HeroOverlay";

function HeroSection({ title, description, backgroundImage }) {
    return (
  <header
    className="hero"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
    <HeroOverlay title={title} description={description} />
  </header>)
  }

export default HeroSection;