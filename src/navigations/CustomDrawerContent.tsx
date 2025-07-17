import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { logoutUser } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

export default function CustomDrawerContent(props) {
    const { setUser } = useAuth();

    const handleLogout = async () => {
        await logoutUser();
        setUser(null);
    };

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={handleLogout} />
        </DrawerContentScrollView>
    );
}
