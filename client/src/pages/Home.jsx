import { Link } from "react-router-dom";
import "/Users/samitsandhu/Desktop/MERN/COMP229-Portfolio_301131044/client/src/components/globalStyle.css"
export default function Home() {
  return (
    <section className="home-container">
      <h2 style={{ marginBottom: "2.5rem", marginTop: "20.5rem", textAlign: "center" }} className="home-title">Do we have a problem?</h2>

      <div className="home-content">
        <img 
          id="prob-solve" 
          src="prob_solve.jpg" 
          alt="Samit Sandhu"
          className="home-image"
        />

        <div className="home-text">
          <p>
            Meet Sam — your go-to problem solver. With <strong>2 years of coding experience</strong> and 
            <strong> 5 years in mortgage and real estate</strong>, Sam combines technical know-how 
            with practical business expertise to tackle challenges head-on.
          </p>

          <p>
            Whether you’re trying to streamline your financial systems, automate your workflows, 
            or simply get clear, actionable advice, Sam’s solutions are tailored to make your 
            headaches disappear. No fluff. No delays. Just results.
          </p>

          <p>
            From coding elegant apps to optimizing your mortgage strategies, Sam works behind the 
            scenes so you can focus on what matters most. Your problems become Sam’s mission.
          </p>

          <Link to="/about" className="home-link">
            Learn more about Sam and his solutions...
          </Link>
        </div>
      </div>
    </section>
  );
}
