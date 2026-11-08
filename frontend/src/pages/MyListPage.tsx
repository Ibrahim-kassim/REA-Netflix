import { CardGrid } from '@/components/media/CardGrid';
import { Spinner } from '@/components/ui/Spinner';
import { useMyListController } from '@/controllers/useMyListController';

export default function MyListPage() {
  const { titles, isLoading } = useMyListController();
  if (isLoading) return <Spinner label="Loading your list" />;
  return (
    <section className="px-4 pb-16 pt-32 md:px-12">
      <h1 className="mb-8 text-3xl font-bold">My List</h1>
      {titles.length ? <CardGrid titles={titles} /> : <p className="text-muted">You haven't added any titles to your list yet.</p>}
    </section>
  );
}
