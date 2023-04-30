import React, { useEffect } from 'react';
import ActiveApps from '../../components/HomePageActiveApps';
import Greeting from '../../components/HomePageGreeting';
import RecommendedApps from '../../components/HomePageRecommendedApps';
import { UserProfile } from '../../types';
import qs from 'querystring';
import { useHistory } from 'react-router-dom';

interface HomePageProps {
  user?: UserProfile;
  isFetchingUserProfile?: boolean;
  error?: string;
  fetchUserProfile: () => void;
  fetchUserRole: () => void;
}

export default function HomePage({
  user,
  isFetchingUserProfile,
  error,
  fetchUserProfile,
  fetchUserRole,
}: HomePageProps) {
  const history = useHistory();
  const { logout } = qs.parse(location.search.substring(1));

  useEffect(() => {
    if (Boolean(logout) === true) {
      history.push('/logout');
    } else if (!user?.email && !isFetchingUserProfile && !error) {
      fetchUserProfile();
      fetchUserRole();
    }
  }, [history, fetchUserProfile, fetchUserRole]);

  return (
    <React.Fragment>
      <Greeting user={user} />

      <ActiveApps />
      <br />
      <br />

      <RecommendedApps />
    </React.Fragment>
  );
}
