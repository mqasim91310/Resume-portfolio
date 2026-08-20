import React from 'react';

export const SkeletonRows = ({ count = 4, height = 'h-14' }) => (
    <div className="space-y-2">
        {Array.from({ length: count }).map((_, i) => (
            <div
                key={i}
                className={`animate-pulse rounded-xl border border-blue-500/10 bg-white/[0.03] ${height}`}
                style={{ animationDelay: `${i * 80}ms` }}
            />
        ))}
    </div>
);

export const SkeletonCards = ({ count = 4 }) => (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: count }).map((_, i) => (
            <div
                key={i}
                className="h-[104px] animate-pulse rounded-xl border border-blue-500/10 bg-white/[0.03]"
                style={{ animationDelay: `${i * 80}ms` }}
            />
        ))}
    </div>
);
