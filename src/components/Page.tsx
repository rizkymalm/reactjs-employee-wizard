import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet-async';

interface PageProps {
    children: React.ReactNode;
    title: string;
    meta?: React.ReactNode;
}

const Page = forwardRef<HTMLDivElement, PageProps>(
    ({ children, title, meta, ...other }, ref) => {
        return (
            <>
                <Helmet>
                    <title>{title}</title>
                    {meta}
                </Helmet>
                <div
                    ref={ref}
                    {...other}
                    className='container'
                >
                    {children}
                </div>
            </>
        );
    }
);

export default Page;
