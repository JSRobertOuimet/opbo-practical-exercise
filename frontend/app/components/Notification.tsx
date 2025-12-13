// Types
type NotificationProps = {
    message: string;
};

const Notification = ({ message }: NotificationProps) => {
    return (
        <p className="mx-auto mt-6 mb-8 w-fit rounded border border-amber-300 bg-amber-100 p-4 font-bold text-amber-900">
            {message}
        </p>
    );
};

export default Notification;
