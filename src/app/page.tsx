import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import Hero from '@/components/Hero';
import ChiSiamo from '@/components/ChiSiamo';
import Progetti from '@/components/Progetti';
import Team from '@/components/Team';
import Footer from '@/components/Footer';
import { getProjects, getTeamMembers, getSettings } from '@/lib/data';

// Rivalida i contenuti ogni 60s (ISR) così gli aggiornamenti admin compaiono
// senza necessità di un nuovo deploy.
export const revalidate = 60;

export default async function HomePage() {
  const [projects, team, settings] = await Promise.all([
    getProjects(),
    getTeamMembers(),
    getSettings(),
  ]);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <ChiSiamo text={settings.chi_siamo} />
        <Progetti projects={projects} />
        <Team members={team} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
