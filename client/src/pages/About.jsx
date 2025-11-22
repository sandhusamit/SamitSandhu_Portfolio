import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import '../components/globalStyle.css';

export default function About() {
  const [pageData, setPageData] = useState({
    HeaderMessage: "",
    AboutMessage: "",
    PicturePath: ""
  });
  const { fetchAboutPageInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAboutPageInfo();
        if (data && data.hasError) {
          navigate('/error', { state: { message: data } });
        } else if (data) {
          setPageData({
            HeaderMessage: data.HeaderMessage,
            AboutMessage: data.AboutMessage,
            PicturePath: data.PicturePath.replace(/^\/api\//, '')
          });
        }
      } catch (error) {
        navigate('/error', {
          state: 'A serious error occurred while fetching About page data.\nPlease try again.',
        });
      }
    };
    fetchData();
  }, []);

  return (
    <section className="about-section">
      <h2 style={{ marginBottom: "5.5rem", marginTop: "15.5rem", textAlign: "center" }} className="about-header">{pageData.HeaderMessage || "Loading..."}</h2>

      <div className="about-content">
      <img 
        id="me"
        className="about-image" 
        src={pageData.PicturePath ? pageData.PicturePath.replace(/^\/api\//, '') : ''} 
        alt="Samit Sandhu" 
        style={{ height: "800px", borderRadius: "12px", objectFit: "cover" }}
/>


        <div className="about-text">
          <p>{pageData.AboutMessage || "Loading..."}</p>

          <a 
            href="/Samit-Sandhu.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="resume-button"
          >
            View My Resume
          </a>
        </div>
      </div>
    </section>
  );
}
