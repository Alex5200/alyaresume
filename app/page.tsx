// app/page.tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import SitePlans from "@/components/SitePlans";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Education from "@/components/Education";

export default function Home() {
    return (
        <div className="min-h-screen">
            <Header />
            <Hero />
            <Portfolio />
            <Education/>
            {/*<SitePlans />*/}
            {/*<Services />*/}
            {/*<About />*/}
            <Contact />
            {/*<Footer />*/}
        </div>
    );
}
