"use client";
import { motion } from "motion/react";

export default function PageWrapper({ children }) {
    return (
        <motion.div
            key={typeof window !== "undefined" ? window.location.pathname : ""}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}
