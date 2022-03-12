import HeaderComponent from '../components/header/HeaderComponent';
import {ThemeContext} from '../context/ThemeContext';
import {useContext} from 'react';
// import HomeContainer from '../containers/home/HomeContainer';
import dynamic from 'next/dynamic';
// import HomeContainer from '../containers/home/HomeContainer';
const HomeContainer = dynamic(() => import('../containers/home/HomeContainer'), {ssr: false});
const FooterComponent = dynamic(() => import('../components/footer/FooterComponent'), {ssr: false});

export default function Home() {
    const {theme} = useContext(ThemeContext)
    return (
        <div>
            <div className={`tracking-wider border-box wrapper`}
                 style={{
                     backgroundColor: theme === 'dark' ? '#292929' : '#e8ebee',
                 }}>
                <div>
                    {/*{!params.get("key") && <HeaderComponent/>}*/}
                    <HeaderComponent/>
                </div>
                <div>
                    {/*HomeContainer*/}
                    <HomeContainer/>
                </div>
                <div>
                    <FooterComponent/>
                </div>
            </div>
        </div>
    )
}
