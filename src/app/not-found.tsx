'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-mono selection:bg-red-500/30 selection:text-red-500">

            {/* Background Grid & Noise */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Content Container */}
            <div className="max-w-md w-full relative z-10">

                {/* Error Header */}
                <div className="border-b border-red-500/30 pb-4 mb-8">
                    <p className="text-red-500 text-xs font-bold tracking-widest animate-pulse">
                        /// PAGE_NOT_FOUND
                    </p>
                </div>

                {/* 404 Glitch Effect */}
                <h1 className="text-9xl font-bold mb-2 text-red-500 relative">
                    404
                </h1>

                <h2 className="text-xl text-neutral-400 mb-8">
                    RESSOURCE_INTROUVABLE
                </h2>

                {/* Terminal Output */}
                <div className="bg-neutral-900/50 border border-white/10 p-4 rounded-lg mb-8 font-mono text-xs space-y-2 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50"></div>
                    <p className="text-neutral-500">
                        <span className="text-green-500">root@system:~$</span> trace_error --log
                    </p>
                    <div className="space-y-1 pl-4 border-l border-white/5 ml-1">
                        <p className="text-red-400"> ERROR_CODE: 0x404_NOT_FOUND</p>
                        <p className="text-neutral-400"> TARGET_PATH: /unknown/sector</p>
                        <p className="text-neutral-400"> STATUS: LINK_BROKEN_OR_DEPRECATED</p>
                        <p className="text-neutral-400"> ACTION: RECOVERY_REQUIRED</p>
                    </div>
                </div>

                {/* Recovery Action */}
                <Link
                    href="/"
                    className="group relative inline-flex items-center gap-3 px-6 py-3"
                >
                    <span className="font-bold text-sm">
                        RETOUR_ACCUEIL
                    </span>
                </Link>

                {/* Footer ID */}
                <div className="mt-12 pt-6 border-t border-white/5 flex justify-between text-[10px] text-neutral-600">
                    <span>ID: err_404_seq_99</span>
                    <span>TIME: {new Date().toLocaleTimeString()}</span>
                </div>

            </div>
        </div>
    );
}
