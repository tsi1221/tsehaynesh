import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <Header />

      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      {/* Always dark */}
      <Footer />
    </div>
  );
}

export default App;