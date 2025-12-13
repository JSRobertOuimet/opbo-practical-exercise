// Types
type PageHeaderProps = {
    title: string;
    subtitle: string;
};

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
    return (
        <header className="mb-8 text-center">
            <h1 className="mb-2 text-4xl">{title}</h1>
            <p className="text">{subtitle}</p>
        </header>
    );
};

export default PageHeader;
