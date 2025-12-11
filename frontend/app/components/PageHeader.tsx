const PageHeader = ({
    pageTitle,
    audience,
}: {
    pageTitle: string;
    audience: string;
}) => {
    return (
        <header className="mb-8 text-center">
            <h1 className="mb-2 text-4xl">{pageTitle}</h1>
            <p className="text">{audience}</p>
        </header>
    );
};

export default PageHeader;
