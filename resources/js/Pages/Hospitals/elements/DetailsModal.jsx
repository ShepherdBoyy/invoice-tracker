import { Form } from "@inertiajs/react";
import { FileText } from "lucide-react";
import Index from "../../InvoiceHistory/Index";

export default function DetailsModal({
    selectedInvoice,
    setSelectedInvoice,
    setOpen,
}) {
    return (
        <dialog open className="modal">
            <div className="modal-box max-w-6xl  p-0 rounded-2xl overflow-hidden shadow-xl ">
                <div className="bg-linear-to-br from-primary/10 to-base-200 p-8 border-b border-base-300">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div>
                            <div className="flex items-center gap-2">
                                <FileText className="w-5 h-5" />
                                <h2 className="text-2xl">History</h2>
                            </div>
                            <p className="text-sm opacity-60 mt-1">
                                Invoice log of revisions and status updates
                            </p>
                        </div>

                        <div className="text-right mt-4 sm:mt-0">
                            <p className="text-xs opacity-60 uppercase">
                                Invoice No.
                            </p>
                            <p className="font-semi-bold text-lg">
                                {selectedInvoice.invoice_number}
                            </p>
                        </div>
                    </div>
                </div>

                <Index 
                    selectedInvoice={selectedInvoice}
                />
            </div>

            <form
                method="dialog"
                className="modal-backdrop"
                onClick={() => {
                    setOpen(false);
                    setSelectedInvoice(null);
                }}
            />
        </dialog>
    );
}
