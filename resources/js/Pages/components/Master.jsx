import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import PageWrapper from "./PageWrapper";

export default function Master({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedState = localStorage.getItem('sidebar-open');
        if (savedState !== null) {
            setIsOpen(savedState === 'true');
        }
        setMounted(true);
    }, []);

    const handleToggle = (e) => {
        const newState = e.target.checked;
        setIsOpen(newState);
        localStorage.setItem('sidebar-open', newState.toString());
    };

    if (!mounted) {
        return null;
    }

    return (
        <div className="drawer lg:drawer-open min-h-screen">
            <input 
                id="my-drawer-4" 
                type="checkbox" 
                className="drawer-toggle"
                checked={isOpen}
                onChange={handleToggle}
            />
            <div className="drawer-content flex flex-col">
                <Navbar />
                <main className="flex-1 overflow-auto bg-base-200 px-4 sm:px-6 lg:px-10 py-4 sm:py-5">
                    <PageWrapper>{children}</PageWrapper>
                </main>
            </div>

            <Sidebar />
        </div>
    );
}