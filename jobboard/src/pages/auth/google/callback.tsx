import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useAuth } from '../../../context/authContext';
import Loader from '@/components/Loader';

const GoogleCallback = () => {
    const { login } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('tk');

        if (token) {
            Cookies.set('token', token, { expires: 1 });
            login(token);
            router.push('/');
        } else {
            console.error('Token not found in the URL');
            router.push('/');
        }
    }, [login, router]);

    return <div><Loader/></div>;
};

export default GoogleCallback;