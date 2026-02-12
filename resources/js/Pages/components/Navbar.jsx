import { Link, usePage } from "@inertiajs/react";
import Profile from "./Profile";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
    const { user, userInitials } = usePage().props.auth;

    const [openProfile, setOpenProfile] = useState(false);
    const [showToast, setShowToast] = useState(false);

    return (
        <div className="navbar bg-base-100 px-2 sm:px-4">
            {showToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-info">
                        <span>Profile Updated Successfully</span>
                    </div>
                </div>
            )}
            
            <div className="flex-none lg:hidden">
                <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
                    <Menu />
                </label>
            </div>

            <div className="flex-1"></div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mr-1 sm:mr-3">
                        <div className="avatar avatar-placeholder">
                            <div className="bg-neutral text-neutral-content w-9 rounded-full">
                                <span className="text-xs">{userInitials}</span>
                            </div>
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                        <li>
                            <a onClick={() => setOpenProfile(true)}>Profile</a>
                        </li>
                        <li>
                            <Link className="cursor-pointer text-md" href="/logout" method="post">Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>

            {openProfile && (
                <Profile
                    setOpenProfile={setOpenProfile}
                    user={user}
                    setShowToast={setShowToast}
                />
            )}
        </div>
    );
}
