import { useEffect, useState } from "react";
import Master from "../components/Master";
import SearchIt from "../components/SearchIt";
import { motion } from "framer-motion";
import useDebounce from "../hooks/useDebounce";
import { router } from "@inertiajs/react";
import Pagination from "../components/Pagination";
import { ListFilter, X } from "lucide-react";

export default function Index({ latestUpdates, filters, userAreas }) {
    const [search, setSearch] = useState(filters.search || "");
    const [showFilters, setShowFilters] = useState(false);
    const [dateRange, setDateRange] = useState(filters.date_range || "");
    const [customDateFrom, setCustomDateFrom] = useState(filters.custom_date_from || "");
    const [customDateTo, setCustomDateTo] = useState(filters.custom_date_to || "");
    const [selectedArea, setSelectedArea] = useState(filters.area || "");
    const [selectedStatus, setSelectedStatus] = useState(filters.status || "");

    const debouncedSearch = useDebounce(search, 300);

    useEffect(() => {
        if (debouncedSearch.trim() !== "") {
            router.get(
                "/home",
                { search: debouncedSearch },
                { preserveState: true, preserveScroll: true },
            );
        } else {
            router.get(
                "/home",
                {},
                { preserveState: true, preserveScroll: true },
            );
        }
    }, [debouncedSearch]);

    const handleClearFilters = () => {
        setDateRange("");
        setCustomDateFrom("");
        setCustomDateTo("");
        setSelectedArea("");
        setSelectedStatus("");

        router.get(
            "/home",
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleApplyFilters = () => {
        router.get(
            "/home",
            {
                date_range: dateRange,
                custom_date_from:
                    dateRange === "custom" ? customDateFrom : null,
                custom_date_to: dateRange === "custom" ? customDateTo : null,
                selected_area: selectedArea,
                selected_status: selectedStatus
            },
            { preserveState: true, preserveScroll: true },
        );
    };

    return (
        <Master>
            <div className="bg-base-200">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl">Home</span>
                    <SearchIt
                        search={search}
                        setSearch={setSearch}
                        name="Hospital or Invoice"
                    />
                </div>
                <div className="p-6 bg-white rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <span className="text-xl">Recent Updates</span>
                        </div>

                        <button
                            className="btn btn-outline border border-gray-300 rounded-3xl"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <ListFilter size={16} />
                            Filters
                        </button>
                    </div>

                    {showFilters && (
                        <div className="rounded-xl shadow-lg mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <label className="label text-md">
                                        Date Range
                                    </label>
                                    <select
                                        className="select w-full rounded-xl"
                                        value={dateRange}
                                        onChange={(e) => setDateRange(e.target.value)}
                                    >
                                        <option value="" disabled>Select</option>
                                        <option value="today">Today</option>
                                        <option value="7days">Last 7 days</option>
                                        <option value="30days">Last 30 days</option>
                                        <option value="custom">Custom Range</option>
                                    </select>
                                </div>

                                {dateRange === "custom" && (
                                    <>
                                        <div>
                                            <label className="label text-md">
                                                From Date
                                            </label>
                                            <input
                                                type="date"
                                                className="input w-full rounded-xl"
                                                value={customDateFrom}
                                                onChange={(e) =>
                                                    setCustomDateFrom(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="label text-md">
                                                To Date
                                            </label>
                                            <input
                                                type="date"
                                                className="input w-full rounded-xl"
                                                value={customDateTo}
                                                onChange={(e) =>
                                                    setCustomDateTo(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </>
                                )}

                                <div>
                                    <label className="label text-md">
                                        Area
                                    </label>
                                    <select
                                        className="select w-full rounded-xl"
                                        value={selectedArea}
                                        onChange={(e) => setSelectedArea(e.target.value)}
                                    >
                                        <option value="" disabled>Select</option>
                                        {userAreas.map((area) => (
                                            <option key={area.id} value={area.id}>{area.area_name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="label text-md">
                                        Status
                                    </label>
                                    <select
                                        className="select w-full rounded-xl"
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                    >
                                        <option value="" disabled>Select</option>
                                        <option value="open">Open</option>
                                        <option value="overdue">Overdue</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <button
                                    className="btn btn-outline rounded-3xl"
                                    onClick={handleClearFilters}
                                >
                                    Clear All
                                </button>
                                <button
                                    className="btn btn-primary rounded-3xl"
                                    onClick={handleApplyFilters}
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 pt-5">
                        <table className="table table-fixed">
                            <thead>
                                <tr>
                                    <th className="w-[350px]">Hospital Name</th>
                                    <th className="w-[100px]">Invoice No.</th>
                                    <th className="w-2/6">Description</th>
                                    <th className="w-[140px]">Updated by</th>
                                    <th className="w-[120px]">
                                        Processing Days
                                    </th>
                                    <th className="w-[100px]">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {latestUpdates.data.map((update, index) => (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            duration: 0.2,
                                            delay: index * 0.05,
                                        }}
                                        key={update.id}
                                        // className="hover:bg-base-300 cursor-pointer"
                                    >
                                        <td>
                                            {
                                                update.invoice.hospital
                                                    .hospital_name
                                            }
                                        </td>
                                        <td>{update.invoice.invoice_number}</td>
                                        <td className="truncate">
                                            {update.description}
                                        </td>
                                        <td>{update.updater.name}</td>
                                        <td>
                                            {update.invoice.processing_days}
                                        </td>
                                        <td>
                                            <span
                                                className={`badge badge-md text-sm rounded-full   ${
                                                    update.invoice.status ===
                                                    "closed"
                                                        ? "bg-emerald-100 text-emerald-700 border-green-600"
                                                        : update.invoice
                                                                .status ===
                                                            "open"
                                                          ? "bg-yellow-100 text-yellow-700 border-yellow-600"
                                                          : update.invoice
                                                                  .status ===
                                                              "overdue"
                                                            ? "bg-red-100 text-red-700 border-red-600"
                                                            : "badge-neutral"
                                                }`}
                                            >
                                                {update.invoice.status}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <Pagination data={latestUpdates} />
                </div>
            </div>
        </Master>
    );
}
