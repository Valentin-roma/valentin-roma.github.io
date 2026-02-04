export interface Project {
    id: string;
    slug: string; // URL friendly ID: 'invoice', 'datagrid'
    title: string;
    category: string;
    tech: string;
    status: string;
    demoLink: string;
    challenge: string;
    solution: string;
    stackDetails: string[]; // List of specific technologies
    features: string[];
}

export const projects: Project[] = [
    {
        id: "001",
        slug: "invoice",
        title: "SYSTÈME DE FACTURATION",
        category: "HOTEL INVOICING",
        tech: "REACT / FIREBASE",
        status: "PRODUCTION",
        demoLink: "/demos/invoice",
        challenge: "Le client, un hôtel indépendant, perdait environ 4 heures par semaine à gérer manuellement ses factures sur Excel. Les erreurs de calcul étaient fréquentes et le suivi des impayés inexistant.",
        solution: "Développement d'une application web progressive (PWA) permettant la génération automatique de factures PDF, le calcul de la TVA et des taxes de séjour, ainsi qu'un tableau de bord de suivi du chiffre d'affaires.",
        stackDetails: [
            "REACT", "TYPESCRIPT", "TAILWIND CSS", "HTML2PDF.JS", "RECHARTS"
        ],
        features: [
            "Génération PDF instantanée",
            "Calcul automatique TVA/Taxes",
            "Gestion base clients",
            "Dashboard CA & Statistiques",
            "Mode Offline (PWA)"
        ]
    },
    {
        id: "002",
        slug: "datagrid",
        title: "GESTION D'ÉLÈVES",
        category: "STUDENT MANAGEMENT",
        tech: "REACT / SUPABASE",
        status: "PRODUCTION",
        demoLink: "/demos/datagrid",
        challenge: "Une association d'alphabétisation gérait 200+ bénéficiaires avec des fiches papier. La coordination entre les 5 enseignants était chaotique et aucune statistique fiable n'était disponible pour les financeurs.",
        solution: "Mise en place d'une plateforme SaaS multi-utilisateurs centralisant les dossiers élèves, les présences et les évaluations. Système de rôles (Admin/Enseignant/Financeur) pour sécuriser l'accès aux données sensibles.",
        stackDetails: [
            "NEXT.JS", "SUPABASE (Auth/DB)", "REACT-QUERY"
        ],
        features: [
            "Base de données temps réel",
            "Système de présence QR Code",
            "Tableaux de données filtrables",
            "Gestion des rôles & permissions",
            "Exports Excel automatisés"
        ]
    }
];
