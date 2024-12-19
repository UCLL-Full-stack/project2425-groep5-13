import { useRouter } from 'next/router';

const Language: React.FC = () => {
    const router = useRouter();
    const { locale, pathname, asPath, query } = router;

    const handleLanguageChange = (event: { target: { value: string } }) => {
        const newLocale = event.target.value;
        const { pathname, asPath, query } = router;
        router.push({ pathname, query }, asPath, { locale: newLocale });
    };
    return (
        <select
            value={locale}
            onChange={handleLanguageChange}
            className="border-2 bg-blue-800 rounded"
        >
            <option value="en">English</option>
            <option value="nl">Dutch</option>
        </select>
    );
}

export default Language;