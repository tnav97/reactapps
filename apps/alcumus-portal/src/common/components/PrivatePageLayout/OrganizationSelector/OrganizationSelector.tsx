import React, { useEffect, useState } from 'react';
import { Input, RegularIcon, StyleVariables, Text } from '@alcumus/components';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { Organization, UserProfile } from '../../../types';
import { Autocomplete } from '@mui/lab';
import {
  CircularProgress,
  Divider,
  IconButton,
  ListItem,
} from '@mui/material';
import { setCurrentOrganization } from './setCurrentOrganization';
import { searchOrganizations } from './searchOrganizations';
import { ROOT_TENANT_ID } from '../../../../lib/utils';

const useStyles = makeStyles({
  inputAdornment: {
    padding: '5px',
  },
  organizationSelector: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    marginRight: '16px',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  divider: {
    marginLeft: '16px',
  },
});

export interface OrganizationSelectorProps {
  currentOrganization?: Organization;
  user?: UserProfile;
}

interface OrganizationOption {
  id: number;
  name: string;
}

export function OrganizationSelector({
  currentOrganization,
  user,
}: OrganizationSelectorProps) {
  const classes = useStyles();
  const { t } = useTranslation(['translation']);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [organizationOptions, setOrganizationOptions] = useState<
    OrganizationOption[]
  >([]);

  if (!currentOrganization) {
    return <></>;
  }

  const currentOrganizationOption: OrganizationOption = {
    id: currentOrganization.id,
    name: currentOrganization.tenantName,
  };

  const [value, setValue] = useState(currentOrganizationOption);
  const [searchPage, setSearchPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  const handleChangeOrganization = async (e, value) => {
    setValue(value);
    setOpen(false);
    await setCurrentOrganization(value.id);
    window.location.reload();
  };

  const handleSearchChange = async (e) => {
    if (e) {
      const search = e.target.value;
      setSearchValue(search);
    }
  };

  // Given an array of results from an API response, appends or sets the options
  function processNextSearchPage(
    results,
    options: { reset: boolean } = { reset: false }
  ) {
    const resultToAppend = [
      ...(options.reset ? [] : organizationOptions),
      ...results,
    ];

    setOrganizationOptions([
      currentOrganizationOption,
      ...resultToAppend.filter(
        (result) => result.id !== currentOrganizationOption?.id
      ),
    ]);
  }

  // Puts selected organization at front, on first load
  useEffect(() => {
    if (currentOrganizationOption) {
      setOrganizationOptions([
        currentOrganizationOption,
        ...organizationOptions.filter(
          (organizationOption) =>
            organizationOption.id !== currentOrganizationOption.id
        ),
      ]);
    }
  }, [!currentOrganizationOption]);

  // When search value changes, reset options
  useEffect(() => {
    let isMounted = true;

    if (open) {
      setLoading(true);
      searchOrganizations(searchValue).then(({ results }) => {
        if (isMounted) {
          processNextSearchPage(results, { reset: true });
          setLoading(false);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [searchValue, open]);

  // When search page changes, append result
  async function loadNextPage() {
    setLoading(true);
    const { results } = await searchOrganizations(searchValue, searchPage + 1);
    setSearchPage(searchPage + 1);
    processNextSearchPage(results);
    setLoading(false);
  }

  const isRootOrganizationMember = Boolean(
    user?.organizations?.find(
      (organization) => organization.organizationId === ROOT_TENANT_ID
    )
  );
  const numberOfOrganizations = user?.organizations?.length || 0;
  const disabled = numberOfOrganizations === 1 && !isRootOrganizationMember;

  return (
    <div className={classes.organizationSelector}>
      <Text className={classes.label}>
        {t('organization', { ns: 'translation' })}
      </Text>
      <Autocomplete
        data-testid="organization-selector-autocomplete"
        id="organization-selector-autocomplete"
        open={open}
        disabled={disabled}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        loading={loading}
        disableClearable={true}
        options={organizationOptions}
        getOptionSelected={(option, value) => option?.id === value.id}
        getOptionLabel={(option) => option?.name || ''}
        onChange={handleChangeOrganization}
        value={value}
        onInputChange={handleSearchChange}
        filterOptions={(options) => options}
        ListboxProps={{
          onScroll: (event: React.SyntheticEvent) => {
            const listBoxNode = event.currentTarget;
            if (
              listBoxNode.scrollTop + listBoxNode.clientHeight ===
              listBoxNode.scrollHeight
            ) {
              loadNextPage();
            }
          },
        }}
        renderOption={(option, { selected }) => (
          <ListItem
            component="div"
            key={option?.id}
            dense
            className={classes.listItem}
          >
            {option?.name}
            {selected && (
              <RegularIcon
                icon="check"
                style={{ color: StyleVariables.colors.text.success }}
              />
            )}
          </ListItem>
        )}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <Input
              {...params.inputProps}
              style={{ width: '300px' }}
              adornmentClassName={classes.inputAdornment}
              data-testid="organization-selector-input"
              adornment={
                !disabled && (
                  <div>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : (
                      <IconButton size="small" onClick={() => setOpen(!open)}>
                        <RegularIcon
                          icon={open ? 'expand_less' : 'expand_more'}
                        />
                      </IconButton>
                    )}
                  </div>
                )
              }
            />
          </div>
        )}
      />
      <Divider className={classes.divider} orientation="vertical" flexItem />
    </div>
  );
}
