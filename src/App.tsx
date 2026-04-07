import { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Hero } from './components/Hero';
{/*import { SelectedWorks } from './components/SelectedWorks';*/}
import { Education } from './components/Education';
import { Jobs } from './components/Jobs';
import { Explorations } from './components/Explorations';
import { Stats } from './components/Stats';
import { Footer } from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-bg min-h-screen text-text-primary selection:bg-text-primary selection:text-bg">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <main className="relative">
        <Hero />
        <Jobs />
        {/*<SelectedWorks />*/}
        <Education />
        <Explorations />
        <Stats />
      </main>
      <Footer />
    </div>
  );
}

export default App;
