import "/Users/samitsandhu/Desktop/MERN/COMP229-Portfolio_301131044/client/src/components/globalStyle.css";

export default function Services() {
  return (
    <section style={{marginTop:"20.5rem"}} className="services-wrapper">
      <h2 className="home-title">My Services</h2>

      <div className="service-block">
        <img src="bank-loan.jpg" alt="Mortgage Services" className="service-image" />
        <div>
          <h3>Mortgage Services</h3>
          <ul className="service-list">
            <li>Personalized mortgage advice</li>
            <li>Loan pre-approval assistance</li>
            <li>Mortgage refinancing options</li>
            <li>First-time homebuyer guidance</li>
            <li>Investment property financing</li>
          </ul>
        </div>
      </div>

      <div className="service-block">
        <img src="gitLogo.png" alt="Software Engineering Services" className="service-image" />
        <div>
          <h3>Software Engineering Services</h3>
          <ul className="service-list">
            <li>Custom web application development</li>
            <li>Database design and optimization</li>
            <li>API integration and backend development</li>
            <li>Data analytics and visualization</li>
            <li>Automation scripts and system tools</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
