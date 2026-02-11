import { sampleData } from "./sampleData"

export default function ExcelFormat() {
  return (
    <div className="w-2/3 flex flex-col justify-between">
        <div>
            <span className="text-md block text-center font-semibold mb-3">
                Sample Excel Format
            </span>

            <table className="table table-auto w-full border border-base-content/20">
                <thead>
                    <tr className="bg-base-200 text-base-content">
                        <th className="border border-base-content/20 text-center p-2 font-normal">
                            Area
                        </th>
                        <th className="border border-base-content/20 text-center p-2 font-normal">
                            Customer No.
                        </th>
                        <th className="border border-base-content/20 text-center p-2 font-normal">
                            Customer Name
                        </th>
                        <th className="border border-base-content/20 text-center p-2 font-normal">
                            Invoice No.
                        </th>
                        <th className="border border-base-content/20 text-center p-2 font-normal">
                            Document Date
                        </th>
                        <th className="border border-base-content/20 text-center p-2 font-normal">
                            Due Date
                        </th>
                        <th className="border border-base-content/20 text-center p-2 font-normal">
                            Days Overdue
                        </th>
                        <th className="border border-base-content/20 text-center p-2 font-normal">
                            Amount
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {sampleData.map((item, index) => (
                        <tr key={index}>
                            <td className="border border-base-content/20 text-center p-2 whitespace-normal">
                                {item.area}
                            </td>
                            <td className="border border-base-content/20 text-center p-2 whitespace-normal">
                                {item.customer_no}
                            </td>
                            <td className="border border-base-content/20 text-center p-2 whitespace-normal">
                                {item.customer_name}
                            </td>
                            <td className="border border-base-content/20 text-center p-2 whitespace-normal">
                                {item.invoice_number}
                            </td>
                            <td className="border border-base-content/20 text-center p-2 whitespace-normal">
                                {item.document_date}
                            </td>
                            <td className="border border-base-content/20 text-center p-2 whitespace-normal">
                                {item.due_date}
                            </td>
                            <td className="border border-base-content/20 text-center p-2 whitespace-normal">
                                {item.days_overdue}
                            </td>
                            <td className="border border-base-content/20 text-center p-2 whitespace-normal">
                                {item.amount}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="flex items-center justify-center gap-2 mt-4">
            <button
                className="btn shadow-md rounded-xl"
                onClick={() => (window.location.href = "/import-data/download-template")}
            >
                Download
            </button>
            <span>Download template as starting point for your own file.</span>
        </div>
    </div>
  )
}
