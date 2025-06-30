// Transaction types
export type Transaction = {
  id: number;
  transaction_type: string;
  description: string;
  amount: string;
  date: string;
};
export type TransactionsList = Transaction[];

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

// Modal type
export type ModalProps = {
  modal: boolean;
  onClose: () => void;
  submit: (formData: {
    transaction_type: string;
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

// Debt type
export type Debt = {
  id: number;
  amount: string;
  description: string;
  date: string;
  is_positive: boolean;
};
export type DebtsList = Debt[];

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

// Category type
export type Category = {
  id: number;
  name: string;
};

export type CategoryList = Category[];
