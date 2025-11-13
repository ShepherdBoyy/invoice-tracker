import React from "react";

export default function DetailsModal({ selectedInvoice, setSelectedInvoice, setOpen }) {
    const updates = [
        {
            id: 1,
            updatedAt: "2025-11-13",
            updatedBy: "You",
            description: "Sample Description",
        },
        {
            id: 2,
            updatedAt: "2025-11-13",
            updatedBy: "Me",
            description: "Sample Description",
        },
        {
            id: 3,
            updatedAt: "2025-11-13",
            updatedBy: "Us",
            description: "Sample Description",
        },
    ];

    return (
        <dialog open className="modal">
            <div className="modal-box max-w-4xl bg-base-100 shadow-2xl rounded-2xl p-8 border border-base-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 mb-10 border-b border-base-400">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
                            Invoice Details
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            View and manage this invoice's details
                        </p>
                    </div>

                    <div className="text-right mt-4 sm:mt-0">
                        <h3 className="text-lg font-semibold text-blue-600">
                            #{selectedInvoice.invoiceNo}
                        </h3>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-16 mb-10 text-center">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">
                                Customer Name
                            </p>
                            <p className="text-base font-medium text-gray-900 mt-1">
                                {selectedInvoice.customerName}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">
                                Created By
                            </p>
                            <p className="text-base font-medium text-gray-900 mt-1">
                                {selectedInvoice.createdBy}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">
                                Amount
                            </p>
                            <p className="text-lg font-semibold mt-1">
                                {selectedInvoice.amount}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">
                                Status
                            </p>
                            <p
                                className={`inline-block mt-1 px-2.5 py-1 text-sm font-medium rounded-full ${
                                    selectedInvoice.status === "Paid"
                                        ? "bg-emerald-100 text-emerald-700"
                                        : selectedInvoice?.status === "Pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-gray-100 text-gray-700"
                                }`}
                            >
                                {selectedInvoice?.status}
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-lg mb-4 text-gray-800">
                        Update History
                    </h4>
                    <div className="overflow-x-auto rounded-xl border border-base-200 bg-base-200/30">
                        <table className="table w-full">
                            <thead className="bg-base-200 text-gray-700 text-sm uppercase tracking-wide">
                                <tr>
                                    <th>#</th>
                                    <th>Updated At</th>
                                    <th>Updated By</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {updates.map((update, index) => (
                                    <tr
                                        key={update.id}
                                    >
                                        <td className="font-medium">
                                            {index + 1}
                                        </td>
                                        <td>{update.updatedAt}</td>
                                        <td>{update.updatedBy}</td>
                                        <td>{update.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-end items-center gap-3 pt-5">
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">
                        Update
                    </button>
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
