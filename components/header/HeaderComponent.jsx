import React, {useContext} from 'react'
import Toggle from 'react-toggle'
import style from './HeaderComponent.module.css'
import IconComponent from '../icon/IconComponent'
import {isEmpty} from 'lodash-es'
import {ThemeContext} from '../../context/ThemeContext';
import {MdRadio} from '@react-icons/all-files/md/MdRadio';

export default function HeaderComponent() {
    const {theme, toggleTheme} = useContext(ThemeContext)

    return (
        // <div className='flex justify-end items-center px-10 py-5'>
        <Navbar>
            {/*<NavItem icon={<TiWeatherCloudy/>} destinationPath="/"/>*/}
            {/*<NavItem icon={<GiBusStop/>} destinationPath="/dvb"/>*/}
            {/*<NavItem icon={<GiOilPump/>} destinationPath="/pump"/>*/}
            <NavItem icon={<MdRadio/>} destinationPath="/radio"/>
            {/*<NavItem icon={<RiBookLine/>} destinationPath="/logbook?key=ADDC5742944D56A26E8C7CD2EB1F5"/>*/}
            {/*<NavItem icon={<BsBook/>} destinationPath="/recipe"/>*/}
            <CustomNavItem>
                {/*<div>*/}
                {/* below condition to avoid toggle glitch effect on page refresh */}
                {!isEmpty(theme) ? (<Toggle
                    className={'ml-2'}
                    checked={theme === 'light'}
                    icons={{
                        checked: <IconComponent iconType={'light'}/>, unchecked: <IconComponent iconType={'dark'}/>,
                    }}
                    onChange={toggleTheme}
                />) : null}
                {/*</div>*/}
            </CustomNavItem>
        </Navbar>
        // </div>
    )
}

function Navbar(props) {
    return (<nav className={style.navbar}>
        <ul className={style.navbar_nav}> {props.children}</ul>
    </nav>);
}

function NavItem(props) {
    return (<li className={style.nav_item}>
        <a href={props.destinationPath || '#'} className={style.icon_button}>
            {props.icon}
        </a>
    </li>);
}

function CustomNavItem(props) {

    return (<li className={style.nav_item}>
        {props.children}
    </li>);
}
