import { AppProps } from 'next/app';
import '../styles/globals.css';
import { AuthProvider } from '../context/authContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
      <>
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
        </>
    );
};

export default MyApp;
