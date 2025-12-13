// Types
type HeroImageProps = {
    src: string;
    alt: string;
};

const HeroImage = ({ src, alt }: HeroImageProps) => {
    return (
        <img
            src={src}
            alt={alt}
            className="mb-12 h-[40vh] w-full object-cover"
        />
    );
};

export default HeroImage;
