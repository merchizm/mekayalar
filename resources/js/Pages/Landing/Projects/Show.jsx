import React from 'react';
import LandingLayout from '@/Layouts/LandingLayout';
import ProjectHeader from '@/Components/Landing/Projects/Show/ProjectHeader';
import ProjectContent from '@/Components/Landing/Projects/Show/ProjectContent';
import ProjectSidebar from '@/Components/Landing/Projects/Show/ProjectSidebar';

function Show({ project, seo }) {
  return (
    <>
      <div className="mx-auto max-w-4xl">
        <ProjectHeader project={project} />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          <ProjectContent project={project} />
          <ProjectSidebar project={project} />
        </div>
      </div>
    </>
  );
}

Show.layout = page => <LandingLayout children={page} seo={page.props.seo} />;

export default Show;
