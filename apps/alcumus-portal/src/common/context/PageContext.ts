import { createContext } from 'react';
import { UserProfile } from '../types';

export type PageContextValueType = {
  user?: UserProfile;
};

const PageContext = createContext<PageContextValueType>({ user: undefined });

export default PageContext;
