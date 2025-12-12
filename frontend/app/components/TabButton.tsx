// Types
type TabButtonProps = {
    id: string;
    controls: string;
    isSelected: boolean;
    label: string;
    onSelect: () => void;
};

const TabButton = ({
    id,
    controls,
    isSelected,
    label,
    onSelect,
}: TabButtonProps) => {
    return (
        <button
            type="button"
            role="tab"
            id={id}
            aria-selected={isSelected}
            aria-controls={controls}
            className={`rounded px-4 py-2 outline-offset-4 ${
                isSelected ? "bg-xtrek-teal text-white" : "cursor-pointer"
            }`}
            onClick={onSelect}
        >
            {label}
        </button>
    );
};

export default TabButton;
