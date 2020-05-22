import React, { useEffect } from 'react';
import { View, StyleSheet, Platform, PermissionsAndroid,TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Header, Icon, Text } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import Geolocation from 'react-native-geolocation-service';

import theme, { appColors } from '~/theme';

import SSP from '~/screens/SSP';
import MIS from '~/screens/MIS';
import PRODUCTION from '~/screens/PRODUCTION';
import HOME from '~/screens/HOME';

import { RootState } from '~/redux/store';
import { getStatus, getSummary } from '~/redux/attendance';
import { getLocations } from '~/redux/approvals';
import { logout } from '~/redux/auth';
import { RootStackParamList } from '~/App';

import AttendancePrompt from '~/components/AttendancePrompt';
import { setShowModal } from '~/redux/attendance';
//components
import UserInfo from '~/components/UserInfo';
import NavbarIcon from  '~/components/NavbarIcon';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

interface DashboardScreenProps {
  navigation: NavigationProp;
}

export type TabParamList = {
  SSP: undefined;
  MIS: undefined;
  PRODUCTION: undefined;
  HOME: undefined;
};
//const Tab = createMaterialTopTabNavigator<TabParamList>();
const Tab = createBottomTabNavigator();

async function requestPermissions() {
  if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization();
    Geolocation.setRNConfiguration({
      skipPermissionRequests: true,
      authorizationLevel: 'whenInUse',
    });
  }

  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  }
}

export default ({ navigation }: DashboardScreenProps) => {
  const status = useSelector(
    (state: RootState) => state.attendance.dailyStatus,
  );
  const dispatch = useDispatch();
  var date = new Date().getDate();
  var month=new Date().getMonth() + 1 ;
  var year=new Date().getFullYear(); //Current Month; //Current Date
  var currentDate = date+"/"+month+"/"+year;
  useEffect(() => {
    dispatch(getStatus());
    dispatch(getSummary());
    dispatch(getLocations());
    requestPermissions();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header
        placement="left"
        rightComponent  ={
          <View style={{flexDirection:'row'}}>
          <Icon   
          reverse
          
          name='bell'
          type='font-awesome'
          color={appColors.primary}
          size={16}
          />

          <Icon
          reverse
                
                name='sign-out'
                type='font-awesome'
                color={appColors.primary}
                size={16}
            
                onPress={() => {
                dispatch(logout());
                 navigation.replace('Login');
                }}
            />
            </View>
        }
     //   centerComponent={{ text: 'CRIPTON', style: { color: '#fff' } }}
        leftComponent={
          <UserInfo/>
         
        }
        
        containerStyle={{ borderBottomWidth: 0, borderRadius:10 ,padding:10,}}
      />

      
     
      
      
   


      <Tab.Navigator
      initialRouteName="HOME"
  
      tabBarOptions={{
    
        activeTintColor: appColors.red,
        showIcon: true,
        inactiveTintColor:appColors.lightBlue
      }}

     >

<Tab.Screen 
             options={{ title: "Home", tabBarLabel:"Home", 
             tabBarIcon: ({color}) => (
               <Icon
                   name="home"
                   color={color}
                   size={20}
                   reverse={false}
                   
               />
           )
           }}



        name="HOME" 
        component={HOME} 
        />



        <Tab.Screen 
             options={{ title: "SSP", tabBarLabel:"SSP", 
             tabBarIcon: ({color}) => (
               <Icon
                   name="work"
                   color={color}
                   size={20}
                   reverse={false}
                   
               />
           )
           }}



        name="SSP" 
        component={SSP} 
        />
        <Tab.Screen 
             options={{ title: "MIS", tabBarLabel:"MIS", 
             tabBarIcon: ({color}) => (
               <Icon
                   name="explore"
                   color={color}
                   size={20}
                   reverse={false}
                   
               />
           )
           }}
        name="MIS" 
        component={MIS} 
        />

<Tab.Screen 
             options={{ title: "Production", tabBarLabel:"Production", 
             tabBarIcon: ({color}) => (
               <Icon
                   name="class"
                   type='material'
                   color={color}
                   size={20}
                   reverse={false}
                   
               />
           )
           }}
        name="PRODUCTION" 
        component={PRODUCTION} 
        />



      </Tab.Navigator>

      <AttendancePrompt />
    </View>
  );
};

const styles = StyleSheet.create({
  attendanceBar:{
    
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignContent:'center',
    padding:5,
    margin:10,
    zIndex:99,
  

  },
  attendanceBarItem1:{
    width:'50%',
    justifyContent:'space-evenly',
    alignItems:'center',


  },
  attendanceBarItem2:{
    width:'40%',
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',


  },
  fullattendance:{
    //width:'10%',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center'

  },


  timeBar: {
    marginTop:5,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 5,
    color: 'white',
    height: 80,
  
  },
  timeText: {
    fontSize:9, color:appColors.grey2, textAlign:'left', padding:5,
  
  },
  attendance: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  attendanceText: {
    color: 'grey',
    textAlign: 'center',
    marginVertical: 10,
  },

  roundButton: {
    height: 65,
    width: 65,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f50',
    borderColor:'rgba(0,0,0,0.2)',

    shadowColor: "#306ae5",
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding:10,
    zIndex:100,
    
    
  },

  
  monthlyAttendance: {
    height: 80,
    width: 80,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.lightBlue,
    borderColor:'rgba(0,0,0,0.2)',

    shadowColor: "#306ae5",
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding:10,
    zIndex:100,
    
    
  },
  
  


});
