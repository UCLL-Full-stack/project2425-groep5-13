type Props = {
    text: string;
}

const TableWidthButton: React.FC = ({text}: Props) => {
    return (
        <button className="bg-blue-800 my-2 rounded-l text-white">{text}</button>
    );
}

export default TableWidthButton;