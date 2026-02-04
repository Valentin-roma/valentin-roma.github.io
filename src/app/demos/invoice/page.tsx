import LiveFrame from "../../components/LiveFrame";
import Link from "next/link";

export default function InvoiceDemoPage() {
    return (
        <div className="h-screen w-screen bg-black flex flex-col overflow-hidden">
            {/* Bouton Retour Flottant */}
            <Link
                href="/"
                className="fixed top-6 right-6 z-50 bg-black/80 text-white px-4 py-2 font-mono text-sm border border-neutral-700 hover:bg-neutral-800 transition-colors backdrop-blur-md"
            >
                [ESC] RETOUR AU PORTFOLIO
            </Link>

            {/* Conteneur Plein Écran pour la démo */}
            <div className="flex-1 p-4 md:p-8 flex items-center justify-center">
                {/* On limite la largeur pour que ça reste lisible comme un logiciel de bureau */}
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