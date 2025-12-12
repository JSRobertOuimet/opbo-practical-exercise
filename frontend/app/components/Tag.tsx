import { FaCircleCheck } from "react-icons/fa6";

const Tag = ({ option }: { option: string }) => {
    return (
        <li key={option} className="align-center flex flex-row gap-2 text-sm">
            <FaCircleCheck className="h-full text-green-500" />
            {option}
        </li>
    );
};

export default Tag;
