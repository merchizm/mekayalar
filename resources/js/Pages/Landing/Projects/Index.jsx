import React from 'react';
import { Link } from '@inertiajs/react';
import LandingLayout from '@/Layouts/LandingLayout';
import FeaturedProjectCard from '@/Components/Landing/Projects/Index/FeaturedProjectCard';
import ProjectCard from '@/Components/Landing/Projects/Index/ProjectCard';

export default function Index({ featuredProjects, projects, seo }) {
  return (
    <LandingLayout seo={seo}>
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-text dark:text-text-dark">Projelerim</h1>
        <p className="mx-auto mt-4 max-w-2xl text-xl text-light-text dark:text-light-text-dark">Geliştirdiğim, katkıda bulunduğum ve gurur duyduğum çalışmalarım.</p>
      </header>

      <div className="container space-y-16">
        {featuredProjects.length > 0 && (
          <section>
            <h2 className="mb-6 text-3xl font-bold text-center text-text dark:text-text-dark">Öne Çıkanlar</h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {featuredProjects.map(project => (
                <FeaturedProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="mb-6 text-3xl font-bold text-center text-text dark:text-text-dark">{featuredProjects.length > 0 ? 'Diğer Projeler' : ''}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}

        {featuredProjects.length === 0 && projects.length === 0 && (
          <div className="py-24 my-5 text-center rounded-2xl border-2 border-dashed bg-background dark:bg-repository-card-bg-dark border-divider dark:border-divider-dark">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6 w-20 h-20 text-light-text dark:text-dark-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h2 className="mb-3 text-3xl font-bold text-text dark:text-text-dark">Henüz Proje Eklenmemiş</h2>
            <p className="text-xl text-center text-light-text dark:text-light-text-dark">Yakında burada projelerimi görebileceksiniz.</p>
          </div>
        )}
      </div>
    </LandingLayout>
  );
} 
