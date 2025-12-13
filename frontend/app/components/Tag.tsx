// React Icons
import { FaCircleCheck } from "react-icons/fa6";

// Types
type TagProps = {
    option: string;
};

const Tag = ({ option }: TagProps) => {
    return (
        <li key={option} className="align-center flex flex-row gap-2 text-sm">
            <FaCircleCheck className="text-xtrek-teal h-full" />
            {option}
        </li>
    );
};

export default Tag;
