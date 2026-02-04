import Reveal from './ui/Reveal';

export default function Capabilities() {
    const capabilities = [
        {
            id: 'MODULE_01',
            title: 'ARCHITECTURES SCALABLES & SAAS',
            description: "Je construis des fondations solides capables d'accueillir des milliers d'utilisateurs sans ralentir."
        },
        {
            id: 'MODULE_02',
            title: 'DIGITALISATION DE PROCESSUS',
            description: "Vos fichiers Excel atteignent leurs limites ? Je crée le logiciel sur-mesure qui va remplacer vos tâches manuelles."
        },
        {
            id: 'MODULE_03',
            title: 'OPTIMISATION & PERFORMANCE',
            description: 'Code performant et maintenable. Analyse des goulots d\'étranglement, refactoring stratégique, et mise en place de bonnes pratiques de développement.'
        }
    ];


    return (
        <section className="px-6 lg:px-12 py-24 max-w-7xl mx-auto bg-neutral-950/30" id="capabilities">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <Reveal>
                    <div className="mb-12 border-technical-b pb-6">
                        <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
                            COMPÉTENCES
                        </h2>
                        <p className="font-mono text-sm text-neutral-400 uppercase tracking-tight">
                            SYSTÈME // MODULES DISPONIBLES
                        </p>
                    </div>
                </Reveal>

                {/* Capabilities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {capabilities.map((capability, index) => (
                        <Reveal key={capability.id} delay={0.1 * (index + 1)}>
                            <div className="group bg-black border border-neutral-800 p-6 hover:border-neutral-700 transition-all duration-300">
                                {/* Module ID */}
                                <div className="mb-4">
                                    <span className="inline-block font-mono text-xs text-neutral-600 px-2 py-1 border border-neutral-800 group-hover:border-green-500 group-hover:text-green-500 transition-all duration-300">
                                        {capability.id}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-mono font-bold text-white mb-3 group-hover:text-green-500 transition-colors duration-300">
                                    {capability.title}
                                </h3>

                                {/* Description with vertical bar */}
                                <div className="border-l-2 border-neutral-800 pl-4">
                                    <p className="font-mono text-sm text-neutral-400 leading-relaxed">
                                        {capability.description}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
