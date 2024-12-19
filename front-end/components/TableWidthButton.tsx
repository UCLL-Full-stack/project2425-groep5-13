import Link from 'next/link';

type Props = {
    text: string;
    dest: string;
}

const TableWidthButton: React.FC<Props> = ({text, dest}: Props) => {
    return (
        <Link href={dest} className="bg-blue-800 my-2 rounded-l text-white text-center">{text}</Link>
    );
}

export default TableWidthButton;