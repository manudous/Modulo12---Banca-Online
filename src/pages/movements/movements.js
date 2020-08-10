import { getmovementsList, getAccount } from './movements-list.api';
import { history } from '../../core/router';
import {
  mapMovementsListFromApiToVm,
  mapUsersListFromApiToVm,
} from './movements-list.mappers';
import { addMovementRows } from './movements.helpers';
import { onSetValues } from '../../common/helpers/element.helpers';

const params = history.getParams();
const isEditMode = Boolean(params.id);

let account = {
  balance: '',
  iban: '',
  alias: '',
};

if (isEditMode) {
  getmovementsList(params.id).then((apiMovement) => {
    const movement = mapMovementsListFromApiToVm(apiMovement);
    addMovementRows(movement);
  });
  getAccount(params.id).then((response) => {
    account = mapUsersListFromApiToVm(response);
    onSetValues((([first]) => first)(account));
  });
}
else {
  getmovementsList().then((apiMovement) => {
    const movement = mapMovementsListFromApiToVm(apiMovement);
    addMovementRows(movement);
  });
}
