// Route paths in one place (links and the router use the same values).
export const paths = {
  home: '/',
  login: '/login',
  signup: '/signup',
  profiles: '/profiles',
  browse: '/browse',
  newPopular: '/browse/new',
  myList: '/browse/my-list',
  search: '/search',
  account: '/account',
  admin: '/admin',
  adminTitles: '/admin/titles',
  adminUsers: '/admin/users',
  title: (slug = ':slug') => `/title/${slug}`,
  watch: (slug = ':slug') => `/watch/${slug}`,
};
