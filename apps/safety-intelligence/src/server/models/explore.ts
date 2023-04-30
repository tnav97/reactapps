import { LookmlModelDto } from '../../dtos/lookmlModelDto';
import { LookmlModelNavExploreDto } from '../../dtos/lookmlModelNavExploreDto';
import { internalAxios } from './internalAxios';

export const getAllLookmlModels = async (): Promise<LookmlModelDto[]> => {
  const { data } = await internalAxios.get('api/explore/all');

  return data.map((model) => new LookmlModelDto(model));
};

export const getAllExplores = async (): Promise<LookmlModelNavExploreDto[]> => {
  const models = await getAllLookmlModels();
  const explores: LookmlModelNavExploreDto[] = [];
  models.forEach((model) => {
    if (model.explores.length) {
      explores.push(...model.explores);
    }
  });
  return explores;
};
