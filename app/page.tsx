// app/page.tsx
import Header from "@/components/Header";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
    return (
        <main>
            <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
                <Header />
                <Portfolio />
                <Services />
                <About />
                <Contact />
            </div>
        </main>
    );
}