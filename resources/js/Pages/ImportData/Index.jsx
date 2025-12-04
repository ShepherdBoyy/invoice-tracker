import { CloudUpload } from "lucide-react";
import Master from "../components/Master";
import { sampleData } from "./elements/SampleData";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Index() {
    const [dragActive, setDragActive] = useState(false);
    const [fileName, setFileName] = useState("");
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
            setFileName(files[0].name);
            setFile(files[0])
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        if (file) {
            setUploading(true);

            router.post(
                "/import-data/store",
                { file: file },
                {
                    forceFormData: true,
                    onProgress: (progressEvent) => {
                        setProgress(progressEvent.percentage);
                    },
                    onSuccess: () => {
                        setUploading(false);
                        setProgress(0);
                        setFile(null);
                        setFileName("");
                    },
                    onError: () => {
                        setUploading(false);
                        setProgress(0);
                    },
                }
            );
        }
    };

    return (
        <Master>
            <div className="bg-base-200">
                <div className="flex items-center justify-between pb-4">
                    <span className="text-2xl">Import New Data</span>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-lg flex flex-col gap-6">
                    <span className="text-xl text-center">Upload File</span>
                    <div className="flex gap-5">
                        <div className="w-1/2 flex flex-col justify-between gap-3">
                            <div>
                                <span className="text-md block text-center font-semibold mb-3">
                                    Sample Excel Format
                                </span>

                                <table className="table table-auto w-full border border-base-content/20 rounded-lg">
                                    <thead>
                                        <tr className="bg-base-200 text-base-content">
                                            <th className="border border-base-content/20 text-center p-2">
                                                Customer No.
                                            </th>
                                            <th className="border border-base-content/20 text-center p-2">
                                                Customer Name
                                            </th>
                                            <th className="border border-base-content/20 text-center p-2">
                                                Invoice No.
                                            </th>
                                            <th className="border border-base-content/20 text-center p-2">
                                                Document Date
                                            </th>
                                            <th className="border border-base-content/20 text-center p-2">
                                                Due Date
                                            </th>
                                            <th className="border border-base-content/20 text-center p-2">
                                                Days Overdue
                                            </th>
                                            <th className="border border-base-content/20 text-center p-2">
                                                Amount
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {sampleData.map((item, index) => (
                                            <tr key={index}>
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
                            <div className="flex items-center justify-center gap-2">
                                <button
                                    className="btn shadow-md rounded-xl"
                                    onClick={() =>
                                        (window.location.href =
                                            "/import-data/download-template")
                                    }
                                >
                                    Download
                                </button>
                                <span>
                                    Download template as starting point for your
                                    own file.
                                </span>
                            </div>
                        </div>

                        <div className="w-1/2 mx-auto">
                            <div
                                className={`bg-white border-2 ${
                                    dragActive
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-300"
                                } border-dashed rounded-md p-4 min-h-[300px] flex flex-col items-center justify-center cursor-pointer transition-colors`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                onClick={() =>
                                    document
                                        .getElementById("chooseFile")
                                        .click()
                                }
                            >
                                {uploading ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <div
                                            className="radial-progress text-blue-600"
                                            style={{
                                                "--value": progress || 0,
                                                "--size": "5rem",
                                            }}
                                            role="progressbar"
                                        >
                                            {Math.round(progress) || 0}%
                                        </div>
                                        <p className="text-slate-600 font-semibold">
                                            Uploading...
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <CloudUpload
                                            size={34}
                                            className="text-slate-600 mb-2"
                                        />
                                        <h4 className="text-base font-semibold text-slate-600">
                                            Drag & Drop file here
                                        </h4>
                                        <span className="block my-2 text-slate-500">
                                            Or
                                        </span>
                                        <label
                                            htmlFor="chooseFile"
                                            className="text-blue-600 text-base font-semibold cursor-pointer underline"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Choose file
                                        </label>
                                        <input
                                            type="file"
                                            id="chooseFile"
                                            className="hidden"
                                            onChange={handleChange}
                                            accept=".xlsx,.xls,.csv"
                                        />
                                        {fileName && (
                                            <p className="mt-4 text-sm text-slate-600">
                                                Selected:{" "}
                                                <span className="font-semibold">
                                                    {fileName}
                                                </span>
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>

                            {file && !uploading && (
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="btn btn-primary w-full mt-4"
                                >
                                    Upload File
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Master>
    );
}
