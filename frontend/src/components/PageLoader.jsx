import React from 'react';
import { Loader2 } from 'lucide-react';

const PageLoader = () => (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F1F]">
        <Loader2 size={28} className="animate-spin text-sky-400" />
    </div>
);

export default PageLoader;
