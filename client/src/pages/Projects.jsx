export default function Projects() {
  return (
    <section className="projects-section">
      <h2 className="projects-header">Projects</h2>

      {/* Project 1 */}
      <div className="project-item">
        <img src="Mortana.png" alt="Mortana CRM" />
        <div>
          <h3>Mortana</h3>
          <p>
            Mortgage-based CRM containing a portal for submission and document sharing.
            Mortana will do it all — everything a mortgage agent requires to handle their
            business. From customer relationship management to tax management, it’s a
            budget-friendly admin support system. Currently being developed with Linux SFTP
            servers, Oracle SQL DB, and WinForms on .NET. Future plans include migrating
            to MERN.
          </p>
        </div>
      </div>

      {/* Project 2 */}
      <div className="project-item">
        <img src="mortgageBySam.jpeg" alt="Mortgage Website" />
        <div>
          <h3>Mortgage Website</h3>
          <p>
            A promotional website to showcase services and engage customers with targeted
            advertisements and SEO. Currently in the planning phase.
          </p>
        </div>
      </div>

      {/* Project 3 */}
      <div className="project-item">
        <img src="audiint.jpeg" alt="Audio Interface Outlet" />
        <div>
          <h3>Audio Interface Outlet</h3>
          <p>
            Starting with guitars, this project aims to build a sound outlet application
            that connects to an audio interface (similar to GarageBand). Early-stage
            concept — curiosity-driven but with potential to grow.
          </p>
        </div>
      </div>
    </section>
  );
}
