// Signed-in shell: navbar, hover previews and the details modal are available on every page.
import { Outlet, ScrollRestoration } from 'react-router';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PreviewProvider } from '@/components/media/preview/PreviewContext';
import { TitleModal } from '@/components/title/TitleModal';

export default function AppLayout() {
  return (
    <PreviewProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
      <TitleModal />
      <ScrollRestoration />
    </PreviewProvider>
  );
}
