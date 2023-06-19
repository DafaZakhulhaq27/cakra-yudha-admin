import { HiOutlineHome } from 'react-icons/hi';
import { SidebarItemProps } from "./types";

const menu:SidebarItemProps[] = [
    {
        icon :  HiOutlineHome,
        title : 'Home',
        link : '/home',
    },
    {
        icon :  HiOutlineHome,
        title : 'Page',
        link : '/page_dropdown',
        items : [
            {
                title : 'Section 1',
                link : '/section1'
            },
            {
                title : 'Section 2',
                link : '/section2'
            },
        ]
    },

]

export default menu