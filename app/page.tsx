// app/page.tsx
import Header from "@/components/Header";
import HeroSimple from "@/components/HeroSimple";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import FAQ from "@/components/FAQ";
import ContactsList from "@/components/ContactsList";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
    return (
        <main>
            <Header />
            {/*<HeroSimple />*/}
            <Portfolio />
            <Services />
            {/*<FAQ />*/}
            {/*<ContactsList />*/}
            <About />
            <Contact />
        </main>
    );
}