import '../styles/globals.scss'
import '../styles/sass/styles.scss'
import {ThemeContextProvider} from '../context/ThemeContext';

function SafeHydrate({children}) {
    return (
        <div suppressHydrationWarning>
            {typeof window === 'undefined' ? null : children}
        </div>
    )
}


function MyApp({Component, pageProps}) {
    return (
        <SafeHydrate>
            <ThemeContextProvider>
                <Component {...pageProps} />
            </ThemeContextProvider>
        </SafeHydrate>
    );
}

export default MyApp
