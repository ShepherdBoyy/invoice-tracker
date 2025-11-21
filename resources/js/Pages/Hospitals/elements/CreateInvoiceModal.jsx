import { Form } from "@inertiajs/react";
import { useState } from "react";

export default function CreateInvoiceModal({
    setShowToast,
    setSuccessMessage,
    setOpenCreateInvoiceModal,
    hospitalId,
}) {
    const [error, setError] = useState("");
    const [invoiceNumber, setInvoiceNumber] = useState("");

    console.log(error)

    return (
        <dialog open className="modal">
            <div className="modal-box">
                <p className="text-2xl font-bold">Add Invoice</p>

                <Form
                    action="/hospitals/invoices/store"
                    method="post"
                    transform={(data) => ({
                        ...data,
                        hospital_id: hospitalId,
                    })}
                    onSuccess={() => {
                        setOpenCreateInvoiceModal(false);
                        setShowToast(true);
                        setSuccessMessage(
                            `${invoiceNumber} added successfully`
                        );
                        setTimeout(() => setShowToast(false), 3000);
                    }}
                    onError={(error) => {
                        setError(error);
                    }}
                >
                    <div className="flex flex-col gap-1 mt-8">
                        <div className="flex justify-between">
                            <label htmlFor="invoice_number" className="text-md">
                                Invoice No.
                            </label>
                            {error.invoice_number && (
                                <span className="text-red-500 text-sm">
                                    {error.invoice_number}
                                </span>
                            )}
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input w-full"
                            name="invoice_number"
                            id="invoice_number"
                            value={invoiceNumber}
                            onChange={(e) => setInvoiceNumber(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1 mt-8">
                        <div className="flex justify-between">
                            <label htmlFor="amount" className="text-md">
                                Amount
                            </label>
                            {error.amount && (
                                <span className="text-red-500 text-sm">
                                    {error.amount}
                                </span>
                            )}
                        </div>
                        <input
                            type="number"
                            step="any"
                            placeholder="Type here"
                            className="input w-full"
                            name="amount"
                            id="amount"
                        />
                    </div>

                    <div className="flex flex-col gap-1 mt-8">
                        <div className="flex justify-between">
                            <label htmlFor="status" className="text-md">
                                Status
                            </label>
                            {error.status && (
                                <span className="text-red-500 text-sm">
                                    {error.status}
                                </span>
                            )}
                        </div>
                        <fieldset className="fieldset">
                            <select
                                className="select w-full"
                                defaultValue="default"
                                name="status"
                                id="status"
                            >
                                <option value="default" disabled>
                                    Select Status
                                </option>
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                            </select>
                        </fieldset>
                    </div>

                    <div className="flex flex-col gap-1 mt-8">
                        <div className="flex justify-between">
                            <label
                                htmlFor="transaction_date"
                                className="text-md"
                            >
                                Transaction Date
                            </label>
                            {error.transaction_date && (
                                <span className="text-red-500 text-sm">
                                    {error.transaction_date}
                                </span>
                            )}
                        </div>
                        <input
                            type="date"
                            className="input w-full"
                            id="transaction_date"
                            name="transaction_date"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn bg-gray-800 text-white rounded-xl mt-8"
                    >
                        Confirm
                    </button>
                </Form>
            </div>

            <form
                method="dialog"
                className="modal-backdrop"
                onClick={() => setOpenCreateInvoiceModal(false)}
            />
        </dialog>
    );
}
