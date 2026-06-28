import { LandingProvider } from '@/components/landing/landing-provider';
import LandingPage from '@/components/landing/landing-page';

export default function Home() {
  return (
    <LandingProvider>
      <LandingPage />
    </LandingProvider>
  );
}
