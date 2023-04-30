import qs from 'querystring';

function parseQueryParams() {
  const queryParams = qs.parse(window.location.search.substring(1));
  return queryParams && (queryParams.rp as string);
}

export default function redirectIfRedirectPathSet() {
  const redirectPath = parseQueryParams();
  if (redirectPath?.length && redirectPath.startsWith('http')) {
    window.location.href = redirectPath;
  } else {
    window.location.href = '/login';
  }
}
export const redirectToLogout = () => {
  const redirectPath = parseQueryParams();
  if (window.location.href.indexOf('logout') === -1 && redirectPath?.length) {
    window.location.href = '/logout';
  }
};
