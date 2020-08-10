import formats from 'qs/lib/formats';
import { getAccountList } from './account-list.api';
import { addAccountRows } from './account-list.helpers';
import { mapAccountListFromApiToVm } from './account-list.mappers';
import { onUpdateField } from '../../common/helpers';
import { history } from '../../core/router';

/**
 * Account {
 *  id: string;
 *  iban: string;
 *  name: string;
 *  balance: string; // number -> string €
 *  lastTransaction: string // string -> DD/MM/YY
 * }
 */

getAccountList().then((accountList) => {
  const viewModelAccountList = mapAccountListFromApiToVm(accountList);
  addAccountRows(viewModelAccountList);

  viewModelAccountList.forEach((account) => {
    onUpdateField(`select-${account.id}`, (event) => {
      const route = event.target.value;
      history.push(route);
    });
  });
});
