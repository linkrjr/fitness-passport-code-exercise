
import { NavigationContainer, RouteProp, ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import HomeView from 'screens/HomeScreen/HomeView';
import FacilityView from 'screens/FacilityScreen/FacilityView';
import AboutView from 'screens/AboutScreen/AboutView';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const RootStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Locations" component={HomeView}/>

      <Stack.Screen name="Facility" component={FacilityView} options={{ headerBackButtonDisplayMode: 'minimal' }}   />
    </Stack.Navigator>
  )
}

const Tabs = createBottomTabNavigator();

type RouteProps = {
  route: RouteProp<ParamListBase>,
}

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator screenOptions={({ route }: RouteProps) => ({ tabBarIcon: tabBarIcon(route) }) }>
        <Tabs.Screen name='Locations' component={RootStackScreen} options={{ headerShown: false }} />
        <Tabs.Screen name='About' component={AboutView} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

type IconProps = {
  focused: boolean, 
  color: string, 
  size: number,
}

const tabBarIcon = (route: RouteProp<ParamListBase>) => ({focused, color, size}: IconProps) => {
  if (route.name === 'Locations') {
    return <Entypo name="globe" size={size} color={color} />;
  } else {
    return <FontAwesome name="question-circle" size={size} color={color} />;
  }
}

export default AppNavigation;