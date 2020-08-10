import { getAccount } from '../movements/movements-list.api';
import { history } from '../../core/router';
import { setAccountOptions } from './transfer.helpers';
import {
  onUpdateField,
  onSubmitForm,
  onSetError,
  onSetFormErrors,
} from '../../common/helpers';
import { formValidation } from './transfer.validations';
import { insertTransfer } from './transfer.api';
import { mapTransferFromApiToVm } from './transfer.mappers';

const params = history.getParams();
const isEditMode = Boolean(params.id);

if (isEditMode) {
  getAccount(params.id).then((ApiAccount) => {
    setAccountOptions(ApiAccount);
  });
} else {
  getAccount().then((ApiAccount) => {
    setAccountOptions(ApiAccount);
  });
}

let transfer = {
  iban: '',
  name: '',
  amount: '',
  concept: '',
  notes: '',
  day: '',
  month: '',
  year: '',
  email: '',
  date: '',
};


onUpdateField('select-account', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    accountId: value,
  };

  formValidation
    .validateField('select-account', transfer.accountId)
    .then((result) => {
      onSetError('select-account', result);
    });
});

onUpdateField('iban', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    iban: value,
  };
  formValidation.validateField('iban', transfer.iban).then((result) => {
    onSetError('iban', result);
  });
});

onUpdateField('name', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    name: value,
  };
  formValidation.validateField('name', transfer.name).then((result) => {
    onSetError('name', result);
  });
});

onUpdateField('amount', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    amount: value,
  };
  formValidation.validateField('amount', transfer.amount).then((result) => {
    onSetError('amount', result);
  });
});

onUpdateField('concept', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    concept: value,
  };
  formValidation.validateField('concept', transfer.concept).then((result) => {
    onSetError('concept', result);
  });
});

onUpdateField('notes', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    notes: value,
  };
});

onUpdateField('day', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    day: value,
    date: `${transfer.year}-${transfer.month}-${transfer.day}`,
  };
  formValidation.validateField('day', transfer.day).then((result) => {
    onSetError('day', result);
  });
});

onUpdateField('month', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    month: value,
    date: `${transfer.year}-${transfer.month}-${transfer.day}`,
  };
  formValidation.validateField('month', transfer.month).then((result) => {
    onSetError('month', result);
  });
});

onUpdateField('year', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    year: value,
    date: `${transfer.year}-${transfer.month}-${transfer.day}`,
  };
  formValidation.validateField('year', transfer.year).then((result) => {
    onSetError('year', result);
  });
});

onUpdateField('email', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    email: value,
  };
  formValidation.validateField('email', transfer.email).then((result) => {
    onSetError('email', result);
  });
});

onSubmitForm('transfer-button', () => {
  formValidation.validateForm(transfer).then((result) => {
    onSetFormErrors(result);

    const toApi = mapTransferFromApiToVm(transfer);
    console.log(toApi);
    if (result.succeeded) {
      insertTransfer(toApi).then(() => {
        history.back();
      });
    }
  });
});
