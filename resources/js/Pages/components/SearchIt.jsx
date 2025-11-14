import { Search } from "lucide-react";

export default function SearchIt({ search, setSearch }) {
    return (
        <label className="input flex items-center w-sm gap-2">
            <input
                type="search"
                required
                placeholder="Search hospital name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="flex items-center cursor-pointer">
                <Search size="16" />
            </button>
        </label>
    );
}
