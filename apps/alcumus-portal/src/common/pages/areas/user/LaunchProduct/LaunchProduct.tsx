import { Text } from '@alcumus/components';
import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { Product, Organization } from '../../../../types';
import AppLauncher from '../../../../components/AppLauncher';
import UserPage from '../UserPage';

interface LaunchProductProps {
  products?: Product[];
  currentOrganization?: Organization;
}

export default function LaunchProduct({
  products = [],
  currentOrganization,
}: LaunchProductProps) {
  const { product: productToLaunch } = useParams<{ product: string }>();

  const match = products.find((p) => p.productCode === productToLaunch);

  if (!match) {
    return <Redirect to="/" />;
  }
  const tenantIdentifier =
    currentOrganization?.tenantIdentifier ?? 'tenantIdentifier';
  const launchUrl =
    match.productCode === 'fieldId'
      ? `https://${tenantIdentifier}.${match.launchUrl}`
      : match.launchUrl;

  return match ? (
    <AppLauncher productToLaunch={match.productCode} callbackUrl={launchUrl} />
  ) : (
    <UserPage>
      <Text as="h3">Sorry, product configuration not found</Text>
    </UserPage>
  );
}
