import { router } from "@inertiajs/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ data }) {
    return (
        <div className="join flex justify-end mt-4 gap-2">
            {data.links.map((link, index) => {
                const isPrevious = link.label
                    .toLowerCase()
                    .includes("previous");
                const isNext = link.label.toLowerCase().includes("next");

                return (
                    <button
                        key={index}
                        disabled={!link.url}
                        onClick={() =>
                            link.url &&
                            router.get(
                                link.url,
                                {},
                                { preserveState: true, preserveScroll: true }
                            )
                        }
                        className={`
                                    join-item btn rounded-xl
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
