const Header = ({
    pageTitle,
    audience,
}: {
    pageTitle: string;
    audience: string;
}) => {
    return (
        <>
            <h1>{pageTitle}</h1>
            <p>{audience}</p>
        </>
    );
};

export default Header;
