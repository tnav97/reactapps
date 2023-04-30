export type Organization = {
  id: number;
  parentTenantId: number | null;
  tenantTypeCode: string;
  tenantName: string;
  tenantIdentifier: string;
};
