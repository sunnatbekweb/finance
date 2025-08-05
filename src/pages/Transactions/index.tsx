import { TransactionsTable } from "@/entities/transaction/ui/TransactionTable";

export const Transactions = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-fit flex items-center justify-between mb-5">
        <div className="flex items-center gap-x-5">
          <h2 className="font-bold text-base sm:text-lg md:text-2xl text-center">
            Transactions
          </h2>
        </div>
        <div className="flex items-center gap-x-10">
          <div className="hidden lg:flex flex-col xl:flex-row items-center gap-x-5 font-medium">
            <div className="text-sm text-gray-700">
              <span>Total income:</span>{" "}
              <span className="text-green-500">
                {/* +{formatNumberWithSpaces(totalIncomeAmount)} UZS */}
              </span>
            </div>
            <div className="text-sm text-gray-700">
              <span>Total expence:</span>{" "}
              <span className="text-red-500">
                {/* -{formatNumberWithSpaces(totalExpenseAmount)} UZS */}
              </span>
            </div>
          </div>
          <button
            // onClick={() => setModal(true)}
            className="py-2 px-4 text-white text-xs rounded bg-[#f8c023] hover:opacity-80 duration-300"
          >
            Add transaction
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <TransactionsTable />
      </div>
    </div>
  );
};
