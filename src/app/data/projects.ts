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
        title: "SUITE DE FACTURATION AUTOMATISÉE",
        category: "FINANCIAL SAAS",
        tech: "REACT / FIREBASE",
        status: "PRODUCTION",
        demoLink: "/demos/invoice",
        challenge: "Un établissement hôtelier perdait plusieurs heures par semaine en gestion administrative manuelle avec un logiciel obsolète. L'absence de centralisation entraînait des erreurs de TVA, des oublis de taxes de séjour et une visibilité floue sur la trésorerie.",
        solution: "Développement d'une solution sur-mesure de facturation automatisée. Le système gère l'édition de PDF, le calcul complexe des taxes et offre un dashboard analytique en temps réel pour le suivi du chiffre d'affaires.",
        stackDetails: [
            "React (Hooks & Context)",
            "Firebase SDK",
            "html2pdf.js (Génération PDF)",
            "Recharts (Data Viz)",
            "Technical CSS Framework",
            "Vanilla JS",
            "Responsive Engine"
        ],
        features: [
            "Édition de Factures (PDF instantané)",
            "Calcul Automatique (TVA & Taxes de séjour)",
            "Base de Données Clients centralisée",
            "Dashboard Analytique (CA & Statistiques)",
            "Gestion des Collaborateurs",
            "Historique & Archivage sécurisé",
            "Panneau de Réglages (Tarifs & Devises)",
            "Export de Données (CSV / Excel)",
            "Multi-utilisateurs & Rôles",
            "Design Système 'Technical' Ultra-léger"
        ]
    },
    {
        id: "002",
        slug: "datagrid",
        title: "PLATEFORME DE GESTION ÉDUCATIVE",
        category: "STUDENT MANAGEMENT",
        tech: "REACT / SUPABASE",
        status: "PRODUCTION",
        demoLink: "/demos/datagrid",
        challenge: "Une association d'alphabétisation gérait 200+ bénéficiaires avec des fiches papier. La coordination entre les 5 enseignants était chaotique et aucune statistique fiable n'était disponible pour les financeurs.",
        solution: "Mise en place d'une plateforme SaaS multi-utilisateurs centralisant les dossiers élèves, les présences et les évaluations. Système de rôles (Admin/Enseignant/Financeur) pour sécuriser l'accès aux données sensibles.",
        stackDetails: [
            "React 19 & TypeScript",
            "Vite",
            "Supabase (PostgreSQL / Auth / RLS)",
            "Zustand",
            "Context API",
            "Framer Motion",
            "Vanilla CSS",
            "Lenis",
            "Lucide React",
            "@react-pdf/renderer",
            "qrcode.react",
            "React Helmet Async",
            "Cloudflare Turnstile",
            "Resend"
        ],
        features: [
            "Site Vitrine & Information (Mission, Formation, Blog, Contact)",
            "Suivi des Bénéficiaires (Profils, Groupes, Archivage)",
            "Gestion des Présences (Appel temps réel, Historique)",
            "Pédagogie & Évaluations (Auto-moyennes, Bulletins)",
            "Planning & Calendrier des sessions",
            "Espace Partenaire dédié",
            "Statistiques & Indicateurs clés (Indicateurs CA/Heures)",
            "Accès Sécurisé (Codes simplifiés / Auth classique)",
            "Portails Publics (QR Codes résultats)",
            "Simulateurs Métiers intégrés",
            "Administration multi-rôles complète"
        ]
    }
];
