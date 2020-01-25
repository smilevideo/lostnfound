import { useRouter } from 'next/router';
import Nav from '../components/nav';

const Results = () => {
    const router = useRouter();

    return (
        <div>
            <Nav />
        </div>
    )
}

export default Results;