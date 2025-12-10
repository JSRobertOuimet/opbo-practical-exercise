const HeroImage = ({ src, alt }: { src: string; alt: string }) => {
    return (
        <img
            src={src}
            alt={alt}
            className="mb-12 h-[50vh] w-full object-cover"
        />
    );
};

export default HeroImage;
