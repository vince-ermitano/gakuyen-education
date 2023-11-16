import React from 'react';
import './CourseOverview.css';
import ModuleCard from './ModuleCard';

const CourseOverview = () => {
    return (
        <section id='course-overview' className='course-overview'>
            <h2>What You Will Learn</h2>
            <div className='course-overview-content'>
                <ModuleCard />
                <ModuleCard />
                <ModuleCard />
                <ModuleCard />
                <ModuleCard />
                <ModuleCard />
                <ModuleCard />
                <ModuleCard />
                <ModuleCard />
                <ModuleCard />
                <ModuleCard />
                <ModuleCard />
                <ModuleCard />
                <ModuleCard />
            </div>
        </section>
    )
}

export default CourseOverview;