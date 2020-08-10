export const mapTransferFromApiToVm = (transfer) => {
  return {
   ...transfer,
    date: Date(transfer.date),
  };
};

