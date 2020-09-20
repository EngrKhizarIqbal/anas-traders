import getCrudMethods from './crud';

export const { get, add, update, remove } = getCrudMethods('/shops');
