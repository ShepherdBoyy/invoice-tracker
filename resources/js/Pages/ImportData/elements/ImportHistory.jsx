import React from 'react'

export default function ImportHistory({ importHistory }) {
    console.log(importHistory);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg flex flex-col gap-6 mt-4">
        <p className="font-semibold text-lg mb-2">Import History</p>
        <div className="max-h-96 overflow-y-auto overflow-x-auto">
            <table className="w-full min-w-[500px] text-sm">
                <thead className="rounded-lg">
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
                            <td>{history.total_rows}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}
