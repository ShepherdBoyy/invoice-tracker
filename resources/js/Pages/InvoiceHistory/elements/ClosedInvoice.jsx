import HistoryTable from "./HistoryTable";
import ClosedInvoiceBanner from "./ClosedInvoiceBanner";

export default function ClosedInvoice({ invoice, history }) {

    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-linear-to-br from-primary/10 to-base-200 border border-gray-300">
                <ClosedInvoiceBanner dateClosed={invoice.date_closed} />
            </div>

            <div className="col-span-2 border rounded-xl border-gray-300">
                <div className="p-6 bg-linear-to-br from-primary/10 to-base-200 border-b border-base-300 rounded-t-xl">
                    {invoice.invoice_number}
                </div>

                <div className="grid grid-cols-4 p-6">
                    <div>
                        <p className="text-sm opacity-60 mb-1">Status</p>
                        <span className="badge bg-emerald-100 text-emerald-700 border-emerald-600">
                            Closed
                        </span>
                    </div>

                    <div>
                        <p className="text-sm opacity-60 mb-1">Amount</p>
                        <p className="text-md">
                            ₱
                            {parseFloat(invoice.amount).toLocaleString(
                                "en-PH",
                                {
                                    minimumFractionDigits: 2,
                                }
                            )}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm opacity-60 mb-1">Document Date</p>
                        <p className="text-md">
                            {new Date(
                                invoice.document_date
                            ).toLocaleDateString()}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm opacity-60 mb-1">Due Date</p>
                        <p className="text-md">
                            {new Date(invoice.due_date).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>

            <HistoryTable history={history} invoice={invoice} />
        </div>
    );
}
