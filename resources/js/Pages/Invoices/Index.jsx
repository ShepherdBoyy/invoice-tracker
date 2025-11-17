import { useState } from "react";
import Master from "../components/Master";
import DetailsModal from "./DetailsModal";
import SearchIt from "../components/SearchIt";
import { router } from "@inertiajs/react";
import { UserSearch } from "lucide-react";

export default function Index({
    invoices,
    hospital,
    searchQuery,
    processingFilter,
}) {
    const [open, setOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [search, setSearch] = useState(searchQuery || "");
    const [active, setActive] = useState(processingFilter);

    const handleSearch = (e) => {
        e.preventDefault();

        if (search.trim()) {
            router.get("/invoices", {
                search: search.trim(),
            });
        }
    };

    const showEmptyState = !hospital && !searchQuery;

    const processingDays = [
        { label: "0-30 days" },
        { label: "31-60 days" },
        { label: "61-90 days" },
        { label: "91-over" },
    ];

    return (
        <Master>
            <div className="p-6">
                <div className="flex justify-end">
                    <form onSubmit={handleSearch}>
                        <SearchIt search={search} setSearch={setSearch} />
                    </form>
                </div>

                {showEmptyState ? (
                    <div className="flex flex-col justify-center items-center h-150 py-12">
                        <UserSearch size={80} />
                        <p className="text-lg font-semibold mt-5">
                            Search hospital name to show invoices
                        </p>
                    </div>
                ) : (
                    <div className="mt-4">
                        <div className="flex items-center w-full mb-4 gap-2">
                            <div className="flex gap-2 flex-shrink-0">
                                {processingDays.map((day, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setActive(day.label);
                                            router.get(
                                                "/invoices",
                                                {
                                                    hospital_id:
                                                        hospital?.id ??
                                                        undefined,
                                                    search:
                                                        search ||
                                                        searchQuery ||
                                                        undefined,
                                                    processing_days: day.label,
                                                },
                                                { preserveState: true }
                                            );
                                        }}
                                        className={`px-4 py-2 text-sm rounded-full border transition shadow-md ${
                                            active === day.label
                                                ? "bg-neutral-800 text-white"
                                                : "btn shadow-transparent"
                                        }`}
                                    >
                                        {day.label}
                                    </button>
                                ))}
                            </div>

                            <h1 className="flex-1 text-center">
                                {hospital
                                    ? `${hospital.hospital_name} Invoices`
                                    : searchQuery && invoices.length > 0        
                                    ? `${invoices[0].hospital?.hospital_name} Invoices`
                                    : searchQuery
                                    ? "No invoices found"
                                    : ""
                                }
                            </h1>

                            <div className="flex-shrink-0 w-[120px]"></div>
                        </div>

                        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Invoice No.</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Transaction Date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {invoices.map((invoice, index) => (
                                        <tr
                                            key={invoice.id}
                                            className="hover:bg-base-300 cursor-pointer"
                                            onClick={() => {
                                                setSelectedInvoice(invoice);
                                                setOpen(true);
                                            }}
                                        >
                                            <td>{index + 1}</td>
                                            <td>{invoice.invoice_number}</td>
                                            <td>
                                                ₱
                                                {parseFloat(
                                                    invoice.amount
                                                ).toLocaleString("en-PH", {
                                                    minimumFractionDigits: 2,
                                                })}
                                            </td>
                                            <td className="text-left">
                                                <span
                                                    className={`inline-block px-2.5 py-1 text-sm font-medium rounded-full ${
                                                        invoice.status.toLowerCase() ===
                                                        "closed"
                                                            ? "bg-emerald-100 text-emerald-700"
                                                            : invoice.status.toLowerCase() ===
                                                              "open"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : invoice.status.toLowerCase() ===
                                                              "overdue"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-gray-100 text-gray-700"
                                                    }`}
                                                >
                                                    {invoice.status}
                                                </span>
                                            </td>
                                            <td>
                                                {new Date(
                                                    invoice.transaction_date
                                                ).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {open && (
                                <DetailsModal
                                    selectedInvoice={selectedInvoice}
                                    hospitalName={
                                        hospital?.hospital_name ||
                                        selectedInvoice?.hospital?.hospital_name
                                    }
                                    setSelectedInvoice={setSelectedInvoice}
                                    setOpen={setOpen}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Master>
    );
}
