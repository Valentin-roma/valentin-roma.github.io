import LiveFrame from "../../components/LiveFrame";
import Link from "next/link";

export default function DataGridDemoPage() {
    return (
        <div className="h-screen w-screen bg-black flex flex-col overflow-hidden">
            <Link
                href="/"
                className="fixed top-6 right-6 z-50 bg-black/80 text-white px-4 py-2 font-mono text-sm border border-neutral-700 hover:bg-neutral-800 transition-colors backdrop-blur-md"
            >
                [ESC] RETOUR
            </Link>

            <div className="flex-1 p-4 md:p-8 flex items-center justify-center">
                <div className="w-full max-w-5xl h-[85vh]">
                    <LiveFrame
                        src="/demos/alpha-video.html"
                        title="MODULE_ALPHABETISATION"
                    />
                </div>
            </div>
        </div>
    );
}
