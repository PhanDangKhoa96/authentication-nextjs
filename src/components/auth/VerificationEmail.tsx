import * as React from 'react';

interface EmailTemplateProps {
    firstName: string;
    redirectLink: string;
}

export const VerificationEmail: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
    redirectLink,
}) => (
    <div>
        <h1>
            Welcome, {firstName}!, click{' '}
            <a className="text-red-700" href={redirectLink}>
                Here
            </a>{' '}
            for the next step{' '}
        </h1>
    </div>
);
