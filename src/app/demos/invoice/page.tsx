'use client';

import LiveFrame from "../../components/LiveFrame";
import Link from "next/link";
import { useState } from "react";
import { AlertTriangle, Check, Monitor, Database, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InvoiceDemoPage() {
    const [showWarning, setShowWarning] = useState(true);

    return (
        <div className="h-screen w-screen bg-black flex flex-col overflow-hidden relative">
            <Link
                href="/"
                className="fixed top-6 right-6 z-50 bg-black/80 text-white px-4 py-2 font-mono text-sm border border-neutral-700 hover:bg-neutral-800 transition-colors backdrop-blur-md"
            >
                [ESC] RETOUR
            </Link>

            <AnimatePresence>
                {showWarning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-neutral-900 border border-white/10 p-8 rounded-2xl max-w-lg w-full shadow-2xl"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                                    <AlertTriangle size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Mode Démonstration</h2>
                                    <p className="text-neutral-400 text-sm">Environnement simulé</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex gap-4">
                                    <Monitor className="text-blue-400 shrink-0" size={20} />
                                    <div>
                                        <h3 className="text-white font-medium text-sm">Interface Réelle</h3>
                                        <p className="text-neutral-500 text-xs mt-1">Vous naviguez sur la véritable interface utilisateur utilisée en production.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Database className="text-purple-400 shrink-0" size={20} />
                                    <div>
                                        <h3 className="text-white font-medium text-sm">Données Fictives</h3>
                                        <p className="text-neutral-500 text-xs mt-1">Toutes les données (clients, CA) sont générées localement pour cette démo.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Lock className="text-orange-400 shrink-0" size={20} />
                                    <div>
                                        <h3 className="text-white font-medium text-sm">Fonctions Limitées</h3>
                                        <p className="text-neutral-500 text-xs mt-1">L&apos;export PDF et la sauvegarde sont simulés.</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowWarning(false)}
                                className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                            >
                                <span>Accéder à la démo</span>
                                <Check size={18} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex-1 p-4 md:p-8 flex items-center justify-center">
                <div className="w-full max-w-5xl h-[85vh]">
                    <LiveFrame
                        src="/demos/index.html"
                        title="MODULE_FACTURATION"
                    />
                </div>
            </div>
        </div>
    );
}