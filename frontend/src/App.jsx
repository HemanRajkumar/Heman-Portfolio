import Navbar from "./components/Navbar.jsx";
import Hero3D from "./components/Hero3D.jsx";
import AboutSection from "./components/AboutSection.jsx";
import SkillsSection from "./components/SkillsSection.jsx";
import ProjectsGrid from "./components/ProjectsGrid.jsx";
import AIChatBot from "./components/AIChatBot.jsx";
import EducationSection from "./components/EducationSection.jsx";
import CertificationsSection from "./components/CertificationsSection.jsx";
import AchievementsSection from "./components/AchievementsSection.jsx";
import ContactSection from "./components/ContactSection.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero3D />
        <AboutSection />
        <SkillsSection />
        <ProjectsGrid />
        <AIChatBot />
        <EducationSection />
        <CertificationsSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
