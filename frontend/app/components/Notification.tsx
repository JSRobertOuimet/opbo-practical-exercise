const Notification = ({ message }: { message: string }) => {
    return (
        <p className="mx-auto mt-6 mb-8 w-fit font-bold text-balance">
            {message}
        </p>
    );
};

export default Notification;
