import { LookFilter } from '../dtos/lookFilter';
import { LookQueryDto } from '../dtos/lookDto';

export const queryToLookFilterMapper = (
  lookQueryDto: LookQueryDto
): LookFilter[] => {
  const query = lookQueryDto.query;
  if (query) {
    const filterConfig = query.filterConfig;
    return Object.keys(filterConfig).map((filterConfigKey) => {
      return new LookFilter(
        filterConfig[filterConfigKey][0].id,
        lookQueryDto.id.toString(),
        filterConfigKey,
        filterConfig[filterConfigKey][0].type,
        filterConfig[filterConfigKey][0].values[0].constant,
        query.model,
        query.view,
        filterConfigKey
      );
    });
  }
  return [];
};
