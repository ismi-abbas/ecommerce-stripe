import { createAction } from '@ngrx/store';

export const getStoreData = createAction('[Dashboard Component] getStoreData');
export const getStoreDataSuccess = createAction(
  '[Dashboard Component] getStoreDataSuccess',
  (data: any) => ({ data })
);
