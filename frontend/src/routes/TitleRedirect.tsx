// Old /title/:slug links open the details window on Home instead (the modal lives in ?title=).
import { Navigate, useParams } from 'react-router';
import { paths } from './paths';

export function TitleRedirect() {
  const { slug = '' } = useParams();
  return <Navigate to={`${paths.browse}?title=${encodeURIComponent(slug)}`} replace />;
}
