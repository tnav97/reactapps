type useRedirectProp = {
  path: string;
  history?: any;
};
const RedirectTo = ({ history, path }: useRedirectProp): void => {
  history.push('/temp');
  history.replace(path);
};
export default RedirectTo;
