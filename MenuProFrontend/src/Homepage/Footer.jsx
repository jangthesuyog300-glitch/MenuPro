import './Styles/Footer.css'

export default function Footer() {
    return (
      <footer className="footer">
  
        <div className="footer-container">
  
          {/* BRAND / ABOUT */}
          <div className="footer-section">
            <h4 className="footer-title">🍽️ RestaurantApp</h4>
            <p className="footer-text">
              A smart restaurant management system to manage orders, tables,
              inventory and staff efficiently.
            </p>
          </div>
  
          {/* QUICK LINKS */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li>Home</li>
              <li>Menu</li>
              <li>Orders</li>
              <li>Reservations</li>
            </ul>
          </div>
  
          {/* CONTACT */}
          <div className="footer-section">
            <h4 className="footer-title">Contact</h4>
            <p className="footer-text">📍 Pune, India</p>
            <p className="footer-text">📞 +91 90000 00000</p>
            <p className="footer-text">✉️ support@restaurantapp.com</p>
          </div>
  
        </div>
  
        {/* COPYRIGHT */}
        <div className="footer-bottom">
          <p>© 2026 RestaurantApp | All Rights Reserved</p>
        </div>
  
      </footer>
    );
  }
  