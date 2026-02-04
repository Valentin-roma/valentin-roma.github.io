export default function Footer() {
    return (
        <footer className="border-t border-neutral-800 bg-neutral-950 mt-24 px-6 lg:px-12 py-8">
            <div className="max-w-[1800px] mx-auto">
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

                    {/* Left: System Monitoring Info */}
                    <div className="space-y-1 font-mono text-xs text-neutral-500">
                        <div className="flex items-center gap-2">
                            <span className="text-neutral-600">SYSTEM_STATUS:</span>
                            <span className="text-green-500">OPERATIONAL</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-neutral-600">LOCATION:</span>
                            <span>PARIS, FR</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-neutral-600">UPTIME:</span>
                            <span>{new Date().getFullYear()}</span>
                        </div>
                    </div>
                </div>

                {/* Bottom: Copyright */}
                <div className="border-t border-neutral-900 mt-8 pt-6 font-mono text-xs text-neutral-600 text-center">
                    © {new Date().getFullYear()} VALENTIN_RM.DEV // ALL_RIGHTS_RESERVED
                </div>
            </div>
        </footer>
    );
}
