import { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Hero } from './components/Hero';
{/*import { SelectedWorks } from './components/SelectedWorks';*/}
import { Education } from './components/Education';
import { Jobs } from './components/Jobs';
import { Explorations } from './components/Explorations';
import { Stats } from './components/Stats';
import { Footer } from './components/Footer';
import { ServicesCalculatorModal } from './components/ServicesCalculatorModal';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);

  return (
    <div className="bg-bg min-h-screen text-text-primary selection:bg-text-primary selection:text-bg">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <main className="relative">
        <Hero onOpenServices={() => setIsServicesModalOpen(true)} />
        <Jobs />
        {/*<SelectedWorks />*/}
        <Education />
        <Explorations />
        <Stats />
      </main>
      <ServicesCalculatorModal
        open={isServicesModalOpen}
        onClose={() => setIsServicesModalOpen(false)}
        brandName="Geronimo Guevara"
      />
      <Footer />
    </div>
  );
}

export default App;
