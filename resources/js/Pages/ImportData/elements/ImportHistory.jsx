import { History } from 'lucide-react';

export default function ImportHistory({ importHistory }) {

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg flex flex-col gap-6 mt-4">
        <div className='flex gap-2 items-center'>
            <History size={25} />
            <p className="font-semibold text-lg">Import History</p>
        </div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 pt-5">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left font-semibold border-b border-red-200">Date</th>
                        <th className="px-4 py-2 text-left font-semibold border-b border-red-200">Time</th>
                        <th className="px-4 py-2 text-left font-semibold border-b border-red-200">Imported By</th>
                        <th className="px-4 py-2 text-left font-semibold border-b border-red-200">File Name</th>
                        <th className="px-4 py-2 text-left font-semibold border-b border-red-200">Total Rows</th>
                    </tr>
                </thead>
                <tbody>
                    {importHistory.map((history, index) => (
                        <tr key={index}>
                            <td>{new Date(history.created_at).toLocaleDateString()}</td>
                            <td>{new Date(history.created_at).toLocaleTimeString()}</td>
                            <td>{history.importer.name}</td>
                            <td>{history.file_name}</td>
                            <td>{(history.total_rows).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}
