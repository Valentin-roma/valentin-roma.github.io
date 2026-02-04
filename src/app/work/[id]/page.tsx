import { notFound } from 'next/navigation';
import { projects } from '@/app/data/projects';
import WorkDetailClient from './WorkDetailClient';

export function generateStaticParams() {
    return projects.map((project) => ({
        id: project.slug,
    }));
}

export default async function WorkDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const project = projects.find((p) => p.slug === id);

    if (!project) {
        notFound();
    }

    return <WorkDetailClient project={project} />;
}
