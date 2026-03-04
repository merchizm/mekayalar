import React from 'react';
import LandingLayout from '@/Layouts/LandingLayout';
import ProjectHeader from '@/Components/Landing/Projects/Show/ProjectHeader';
import ProjectContent from '@/Components/Landing/Projects/Show/ProjectContent';
import ProjectSidebar from '@/Components/Landing/Projects/Show/ProjectSidebar';
import RevealSection from '@/Components/Common/RevealSection';

function Show({ project }) {
    return (
        <>
            <div className="mx-auto max-w-4xl">
                <RevealSection>
                    <ProjectHeader project={project} />
                </RevealSection>
                <RevealSection className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12" delay={0.05}>
                    <ProjectContent project={project} />
                    <ProjectSidebar project={project} />
                </RevealSection>
            </div>
        </>
    );
}

Show.layout = (page) => <LandingLayout children={page} seo={page.props.seo} />;

export default Show;
