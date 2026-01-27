import "../Styles/Aboutus.css";

export default function AboutUs() {
  return (
    <div className="about-page">

      <h1>About Us</h1>

      <p className="tagline">
        Bringing restaurants and customers together
      </p>

      <section className="about-section">
        <h2>Who We Are</h2>
        <p>
          We are a restaurant management and booking platform that helps
          users discover restaurants, book tables, and order food easily.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          To simplify restaurant operations and enhance customer experience
          using modern technology.
        </p>
      </section>

      <section className="about-section">
        <h2>What We Offer</h2>
        <ul>
          <li>📍 Restaurant discovery</li>
          <li>🍽️ Digital menus</li>
          <li>📅 Table booking</li>
          <li>💳 Secure payments</li>
        </ul>
      </section>

    </div>
  );
}
