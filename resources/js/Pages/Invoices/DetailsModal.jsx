import { Building2, User, FileText, Calendar, DollarSign } from "lucide-react";

export default function DetailsModal({
    selectedInvoice,
    setSelectedInvoice,
    setOpen,
    hospitalName,
}) {
    return (
        <dialog open className="modal">
            <div className="modal-box max-w-5xl bg-gradient-to-br from-base-100 to-base-200 shadow-2xl rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 mb-6 border-b-2 border-base-300">
                    <div>
                        <h2 className="text-2xl font-bold text-base-content">
                            Invoice Details
                        </h2>
                        <p className="text-xs text-base-content/60 mt-1">
                            Complete invoice information and history
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-gradient-to-r from-gray-700 to-gray-900 flex flex-col gap-3 text-white p-4 rounded-xl">
                            <p className="text-xs font-medium opacity-90 uppercase tracking-wider">
                                Invoice
                            </p>
                            <h3 className="text-lg font-bold">
                                #{selectedInvoice.invoice_number}
                            </h3>
                        </div>

                        <div className="card bg-base-100 shadow-md">
                            <div className="card-body p-4">
                                <p className="text-xs text-base-content/60 uppercase tracking-wider">
                                    Created By / At
                                </p>
                                <p className="text-sm font-semibold text-base-content">
                                    {selectedInvoice.creator.name}
                                </p>
                                <p className="text-xs font-semibold text-base-content">
                                    {new Date(
                                        selectedInvoice.created_at
                                    ).toLocaleDateString("en-PH", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="bg-success/10 p-2 rounded-lg">
                                    <DollarSign className="w-5 h-5 text-success" />
                                </div>
                                <p className="text-xs font-medium text-base-content/60 uppercase tracking-wider">
                                    Amount
                                </p>
                            </div>
                            <p className="text-xl font-bold text-success">
                                ₱
                                {parseFloat(
                                    selectedInvoice.amount
                                ).toLocaleString("en-PH", {
                                    minimumFractionDigits: 2,
                                })}
                            </p>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="bg-primary/10 p-2 rounded-lg">
                                    <Building2 className="w-5 h-5 text-primary" />
                                </div>
                                <p className="text-xs font-medium text-base-content/60 uppercase tracking-wider">
                                    Hospital
                                </p>
                            </div>
                            <p className="text-base font-bold text-base-content">
                                {hospitalName}
                            </p>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body p-4">
                            <p className="text-xs font-medium text-base-content/60 uppercase tracking-wider mb-2">
                                Status
                            </p>
                            <span
                                className={`badge badge-lg font-semibold w-fit ${
                                    selectedInvoice.status === "Paid"
                                        ? "badge-success"
                                        : selectedInvoice.status === "Pending"
                                        ? "badge-warning"
                                        : "badge-ghost"
                                }`}
                            >
                                {selectedInvoice.status}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <div className="card bg-base-100 shadow-md">
                        <div className="card-body p-4">
                            <p className="text-xs text-base-content/60 uppercase tracking-wider mb-1">
                                Transaction Date
                            </p>
                            <p className="text-sm font-semibold text-base-content">
                                {new Date(
                                    selectedInvoice.transaction_date
                                ).toLocaleDateString("en-PH", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </p>
                        </div>
                    </div>

                    {selectedInvoice.date_closed && (
                        <div className="card bg-base-100 shadow-md">
                            <div className="card-body p-4">
                                <p className="text-xs text-base-content/60 uppercase tracking-wider mb-1">
                                    Date Closed
                                </p>
                                <p className="text-sm font-semibold text-base-content">
                                    {new Date(
                                        selectedInvoice.date_closed
                                    ).toLocaleDateString("en-PH", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-base-200 p-2 rounded-lg">
                                <FileText className="w-4 h-4 text-base-content" />
                            </div>
                            <h4 className="card-title text-lg">
                                Update History
                            </h4>
                            <div>
                                <p className="text-xs text-base-content/60 uppercase tracking-wider mb-1">
                                    Date Closed
                                </p>
                                <p className="text-sm font-semibold text-base-content">
                                    {new Date(
                                        selectedInvoice.date_closed
                                    ).toLocaleDateString("en-PH", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-base-200 bg-base-200/30">
                            <table className="table w-full">
                                <thead className="bg-base-200 text-base-content text-sm uppercase tracking-wide">
                                    <tr>
                                        <th>Updated At</th>
                                        <th>Updated By</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            {new Date(
                                                selectedInvoice.updated_at
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="w-[200px]">
                                            {selectedInvoice.updater.name}
                                        </td>
                                        <td>{selectedInvoice.description}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <form
                method="dialog"
                className="modal-backdrop"
                onClick={() => {
                    setOpen(false);
                    setSelectedInvoice(null);
                }}
            >
                <button>close</button>
            </form>
        </dialog>
    );
}
