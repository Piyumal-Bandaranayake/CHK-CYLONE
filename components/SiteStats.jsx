"use client";

import React from 'react';

const SiteStats = ({ stats }) => (
    <section className="stats-circular container reveal">
        {stats?.map((s, i) => (
            <div key={i} className="stat-circle">
                <h3>{s.value}</h3>
                <p>{s.label}</p>
            </div>
        ))}
    </section>
);

export default SiteStats;
