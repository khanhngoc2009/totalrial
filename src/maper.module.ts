import { createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';

export const mapper = createMapper({
  name: 'map',
  pluginInitializer: classes,
});

export const laughValue = (payload: { value: any; dto: any; entites: any }) => {
  const { dto, entites, value } = payload;
  mapper.createMap(entites, dto);
  const response: any = mapper.map(value, dto, entites);
  return response;
};
