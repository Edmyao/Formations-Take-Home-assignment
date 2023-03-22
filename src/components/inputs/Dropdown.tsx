import { TransactionCategory } from "../../interfaces/Transactions";

interface Option {
    id: string;
    name: string;
}

interface DropdownProps {
    optionList: Option[] | TransactionCategory[];
    value: string;
    onChange: (value: string) => void;
}

function Dropdown({ optionList, value, onChange }: DropdownProps) {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
    };

    return (
        <select value={value} onChange={handleChange}>
            {optionList.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </select>
    );
}

export default Dropdown;
