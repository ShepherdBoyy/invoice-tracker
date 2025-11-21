import { motion } from "motion/react";
export default function Login() {
    return (
        <>
            <div className="grid min-h-svh lg:grid-cols-2">
                <div className="flex flex-col gap-4 p-6 ">
                    <div className="flex justify-center gap-2 md:justify-start">
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.7,
                                scale: {
                                    type: "spring",
                                    visualDuration: 0.4,
                                    bounce: 0.5,
                                },
                            }}
                        >
                            <div className="flex items-center gap-2 font-medium">
                                <div className=" flex size-6 items-center justify-center rounded-md">
                                    {/* <WalletCards
                                        className="size-4"
                                        color="black"
                                    /> */}
                                </div>
                                SaleSync
                            </div>
                        </motion.div>
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <div className="flex flex-col gap-4 p-6 md:p-10  overflow-hidden">
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                <div className=" w-[500px] flex items-center justify-center">
                                    <form>
                                        <div className="flex flex-col items-center gap-2 text-center ">
                                            <div className="flex  items-center justify-center rounded-md">
                                                {/* <img src="images/pmcLogo.jpg" className="w-20" /> */}
                                            </div>
                                            <h1 className="text-2xl font-bold">
                                                Welcome Back
                                            </h1>
                                            <span>Login your credentials</span>

                                            <div className="flex flex-col gap-y-4 w-full ">
                                                <fieldset className="fieldset ">
                                                    <legend className="fieldset-legend text-left">
                                                        Username
                                                    </legend>
                                                    <input
                                                        type="text"
                                                        className="input w-96 "
                                                        placeholder="Type here"
                                                    />
                                                </fieldset>
                                                <fieldset className="fieldset w-full">
                                                    <legend className="fieldset-legend text-left">
                                                        Password
                                                    </legend>
                                                    <input
                                                        type="text"
                                                        className="input w-96"
                                                        placeholder="Type here"
                                                    />
                                                </fieldset>
                                            </div>

                                            <div className="w-96 pt-8">
                                                <button className="cursor-pointer w-full btn btn-neutral">
                                                    {" "}
                                                    Login
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
                <div className="bg-muted relative hidden lg:block">
                    <img
                        src="/images/Loginimage.png"
                        alt="Image"
                        className="absolute inset-0 h-full w-full object-cover "
                    />
                </div>
            </div>
        </>
    );
}
