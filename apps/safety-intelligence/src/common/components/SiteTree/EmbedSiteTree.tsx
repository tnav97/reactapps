/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { FunctionComponent, useEffect, useMemo } from 'react';
import _, { flattenDeep } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  embedInternalSiteIdsState,
  internalSelectedSiteNodesState,
  selectedSiteIdsState,
  siteTreeState,
  syncExternalSiteFilterState,
} from '../EmbeddedReports/EmbedReportPage';
import { TreeSelectProps } from 'antd/lib/tree-select';
import { TreeSelect } from 'antd';
import { DataNode, LegacyDataNode } from 'rc-tree-select/lib/interface';
// import { Translator } from '../../../i18next/services/translator';

interface Props {}

export const EmbedSiteTree: FunctionComponent<Props> = (/* {}: Props */) => {
  const treeData = useRecoilValue(siteTreeState);
  const [selected, setSelected] = useRecoilState(
    internalSelectedSiteNodesState
  );
  const [, setSelectedSiteIds] = useRecoilState(selectedSiteIdsState);
  const embedInternalSiteIds = useRecoilValue(embedInternalSiteIdsState);
  const [, setSyncExternalSiteFilter] = useRecoilState(
    syncExternalSiteFilterState
  );
  let previouslySelectedSiteNode: DataNode;
  const debouncedSelectedSites = useMemo(() => {
    return _.debounce(() => {
      const ids = selected?.map((x: any) => x.value as number);
      setSyncExternalSiteFilter(
        typeof ids !== 'undefined' &&
          embedInternalSiteIds?.slice().sort().join(',') !==
            ids?.slice().sort().join(',')
      );
      setSelectedSiteIds(ids ?? []);
    }, 1500);
  }, [selected, setSelectedSiteIds]);

  const onChange = (value: any[]) => {
    setSelected(value);
  };

  const preventRemovingItemsWhenBackspaced = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace') e.stopPropagation();
  };

  const selectAllChildNodes = (node: DataNode) => getAllParentChildNodes(node);

  type nodeProps = { value: number | string; label: React.ReactNode };

  const getAllParentChildNodes = (data: DataNode): any[] => {
    const nodes: nodeProps[] = [];
    nodes.push({
      value: data.key as number,
      label: data.title,
    });

    data.children?.map((node) => {
      nodes.push({
        value: node.key as number,
        label: node.title,
      });

      if (node.children)
        nodes.push(...flattenDeep(node.children.map(getAllParentChildNodes)));
    });
    return nodes;
  };

  const filterTreeNode = (inputValue: string, option?: LegacyDataNode) =>
    (option?.title as string)
      ?.toLowerCase()
      .indexOf(inputValue.toLowerCase()) >= 0;

  const containInputValue = (
    query: string,
    data: any[],
    parentNode: DataNode
  ): DataNode[] => {
    const nodes: DataNode[] = [];

    data.map((node) => {
      if ((node.title as string).toLowerCase().includes(query)) {
        if (!nodes.includes(parentNode) && parentNode.key !== treeData[0].key) {
          const parent: DataNode = {
            key: parentNode.key,
            title: parentNode.title,
            children: [node],
          };
          return nodes.push(parent);
        }
        return nodes.push(node);
      }

      if (node.children?.length) {
        nodes.push(
          ...containInputValue(query, node.children as DataNode[], node)
        );
      }
    });

    return nodes;
  };

  useEffect(() => {
    debouncedSelectedSites();
    return () => {
      debouncedSelectedSites.cancel();
    };
  }, [debouncedSelectedSites]);

  const defaults: TreeSelectProps<DataNode[]> = {
    bordered: true,
    style: {
      width: 'inherit',
    },
    notFoundContent: (
      <div className={'p-20 text-center'}>
        {/* Translator.getItem('no_sites_found') */ 'No sites found'}
      </div>
    ),
    onChange,
    onInputKeyDown(e) {
      preventRemovingItemsWhenBackspaced(e);
    },
    onClick: (e) => {
      const target = e.target as Element;
      if (
        target.classList.contains('ant-select-tree-checkbox') ||
        target.classList.contains('ant-select-tree-checkbox-inner')
      ) {
        const isChecked = target.classList.contains(
          'ant-select-tree-checkbox-checked'
        );
        const allChildNodes = previouslySelectedSiteNode
          ? selectAllChildNodes(previouslySelectedSiteNode)
          : [];
        if (!isChecked) {
          allChildNodes?.push(...(selected as DataNode[]));
          return onChange(allChildNodes ?? []);
        }
        const difference = _.differenceBy(selected, allChildNodes, 'value');
        onChange(difference);
      }
    },
    onDeselect: (value, option) => {
      previouslySelectedSiteNode = option;
    },
    onSelect: (value, option) => {
      previouslySelectedSiteNode = option;
    },
    treeCheckStrictly: true,
    filterTreeNode,
    allowClear: true,
    showSearch: true,
    showAction: ['click'],
    value: selected ?? undefined,
    treeData,
    treeCheckable: true,
    maxTagCount: 'responsive',
  };

  return (
    <>
      <span
        style={{ alignSelf: 'center', width: '20%' }}
        className={'m-right15 hidden-sm hidden-xs'}
      >
        {/* Translator.getItem('filter_by_site') */ 'Filter by site'}
      </span>
      <TreeSelect {...defaults} />
    </>
  );
};

export default EmbedSiteTree;
