import { CardGrid } from '@/components/media/CardGrid';
import { useSearchController } from '@/controllers/useSearchController';

export default function SearchPage() {
  const { q, results, isLoading } = useSearchController();
  return (
    <section className="px-4 pb-16 pt-32 md:px-12">
      {!isLoading && results.length === 0 ? (
        <p className="py-20 text-center text-lg text-muted">Your search for “{q}” did not have any matches.</p>
      ) : (
        <>
          <p className="mb-6 text-muted">Explore titles related to: <span className="text-text">{q}</span></p>
          <CardGrid titles={results} />
        </>
      )}
    </section>
  );
}
