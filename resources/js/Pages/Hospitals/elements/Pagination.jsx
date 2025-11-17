import { router } from "@inertiajs/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ hospitals }) {
    return (
        <div className="join flex justify-end mt-4">
            {hospitals.links.map((link, index) => {
                const isPrevious = link.label
                    .toLowerCase()
                    .includes("previous");
                const isNext = link.label.toLowerCase().includes("next");

                return (
                    <button
                        key={index}
                        disabled={!link.url}
                        onClick={() => link.url && router.get(link.url)}
                        className={`
                                    join-item btn
                                    ${
                                        link.active
                                            ? "bg-neutral-800 text-white"
                                            : ""
                                    }
                                    ${
                                        !link.url
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }
                                `}
                    >
                        {isPrevious ? (
                            <ChevronLeft size={18} />
                        ) : isNext ? (
                            <ChevronRight size={18} />
                        ) : (
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
