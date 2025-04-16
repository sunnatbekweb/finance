export type Transaction = {
  id: number;
  transaction_type: string;
  description: string;
  amount: string;
  date: string;
};

export type TransactionsList = Transaction[];

export type ModalProps = {
  modal: boolean;
  onClose: () => void;
  submit: (formData: {
    transaction_type: string;
    amount: string;
    description: string;
  }) => void;
};
