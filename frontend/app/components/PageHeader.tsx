const PageHeader = ({
    pageTitle,
    audience,
}: {
    pageTitle: string;
    audience: string;
}) => {
    return (
        <header className="mb-8 text-center">
            <h1 className="text-3xl">{pageTitle}</h1>
            <p>{audience}</p>
        </header>
    );
};

export default PageHeader;
