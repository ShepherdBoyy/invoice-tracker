import { CheckCircle } from "lucide-react";

export default function ClosedInvoiceBanner({ dateClosed }) {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4 p-6">
            <CheckCircle className="w-20 h-20 text-emerald-500" />
            <span className="text-2xl font-semibold text-emerald-700">
                Invoice Closed
            </span>
            {dateClosed && (
                <span className="text-sm opacity-70">
                    Closed on {new Date(dateClosed).toLocaleDateString()}
                </span>
            )}
        </div>
    );
}
