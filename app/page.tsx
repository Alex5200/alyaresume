// app/page.tsx
import Header from "@/components/Header";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
    return (
        <main>
            <Header />
            <Portfolio />
            <Services />
            <About />
            <Contact />
        </main>
    );
}