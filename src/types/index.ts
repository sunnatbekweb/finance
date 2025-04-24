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

export type EditTransactionProps = {
  id: number | null;
  modal: boolean;
  onClose: () => void;
  submit: (formData: {
    transaction_type: string;
    amount: string;
    description: string;
  }) => void;
};

export type EditDebtProps = {
  id: number | null;
  modal: boolean;
  onClose: () => void;
  submit: (formData: {
    is_positive: string;
    amount: string;
    description: string;
  }) => void;
};


export type DebtModalProps = {
  modal: boolean;
  onClose: () => void;
  submit: (formData: {
    is_positive: string;
    amount: string;
    description: string;
  }) => void;
};

export type Debt = {
  id: number;
  amount: string;
  description: string;
  date: string;
  is_positive: boolean;
};

export type DebtsList = Debt[];
