import CustomProvider from './CustomProvider'; // Αν ο φάκελος είναι μέσα στον κατάλογο `app`
import { Stack, Tabs } from 'expo-router';
import TabBar from '../components/TabBar';

export default function RootLayout() {
    return (
        <CustomProvider>
            <Tabs 
                tabBar={props => <TabBar {...props}/>}
            
             >
                <Tabs.Screen name='index' options={{headerShown: false}}/>
                <Tabs.Screen name='onlinehelp' options={{ title: 'Help', headerShown: false }} />
                <Tabs.Screen name='cafe' options={{ title: 'Coffee & Food', headerShown: false }} />
                <Tabs.Screen name='energy' options={{ title: 'Energy Management', headerShown: false }} />
                <Tabs.Screen name='weather' options={{ title: 'Weather Conditions', headerShown: false }} />
                <Tabs.Screen name='newtent' options={{ headerShown: false }} />
                <Tabs.Screen name='lighting1' options={{ headerShown: false }} />
                <Tabs.Screen name='covers' options={{ headerShown: false }} />
                <Tabs.Screen name='covers2' options={{ headerShown: false }} />
                <Tabs.Screen name='lighting2' options={{ headerShown: false }} />
                <Tabs.Screen name='stakes' options={{ headerShown: false }} />
                <Tabs.Screen name='sports' options={{ headerShown: false }} />
            </Tabs>
        </CustomProvider>
         
        
    );
}

 