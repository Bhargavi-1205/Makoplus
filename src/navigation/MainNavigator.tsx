import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PrescriptionsScreen from '../screens/PrescriptionsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BookingScreen from '../screens/BookingScreen';
import IntakeScreen from '../screens/IntakeScreen';
import ConfirmScreen from '../screens/ConfirmScreen';
import { MainTabParamList, RootStackParamList } from './types';
import TabBar from './TabBar';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function DummyBookScreen() {
  return null;
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Book" component={DummyBookScreen} />
      <Tab.Screen name="Prescriptions" component={PrescriptionsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="MainTabs" component={MainTabs} />
      <RootStack.Screen name="Booking" component={BookingScreen} />
      <RootStack.Screen name="Intake" component={IntakeScreen} />
      <RootStack.Screen name="Confirm" component={ConfirmScreen} />
    </RootStack.Navigator>
  );
}


