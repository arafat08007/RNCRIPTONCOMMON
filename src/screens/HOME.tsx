import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native-elements';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';

import theme, { appColors } from '~/theme';
import { setShowModal } from '~/redux/attendance';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { RootStackParamList } from '~/App';
import { TabParamList } from '~/screens/Dashboard';
import Summary from '~/components/Summary';
const width = Dimensions.get('window').width;

const Card = ({
  title,
  iconSrc,
  onPress,
}: {
  title: string;
  iconSrc: any;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardRoot}>
      <Image source={iconSrc} />
      <Text style={styles.menu_text}>{title}</Text>
    </TouchableOpacity>
  );
};

type SSPScreenParamList = CompositeNavigationProp<
  MaterialTopTabNavigationProp<TabParamList, 'HOME'>,
  StackNavigationProp<RootStackParamList, 'Dashboard'>
>;
type Props = {
  navigation: SSPScreenParamList;
};

export default ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const status = useSelector(
    (state: RootState) => state.attendance.dailyStatus,
  );


  var date = new Date().getDate();
  var month=new Date().getMonth() + 1 ;
  var year=new Date().getFullYear(); //Current Month; //Current Date
  var currentDate = date+"/"+month+"/"+year;

  // console.log(status);
  return (
    <>

<View style={styles.attendanceBar}>

<View style={styles.attendanceBarItem1}>
<TouchableOpacity
    onLongPress={() => dispatch(setShowModal(true))}
    style={styles.monthlyAttendance}>
    <Text style={{ color: 'white', textAlign: 'center' }}>
     14/28
    </Text>
  </TouchableOpacity>
  <Text style={{ color: 'grey', textAlign: 'center', fontSize:9,padding:5, }} > Monthy Attendance</Text>

</View>
<View style={styles.attendanceBarItem2}>
<View style={{width:'70%', justifyContent:'flex-end', flexDirection:'column', left:5,}}>
<Text style={{fontSize:9, color:appColors.grey2, textAlign:'left', padding:5,}}>Date: {currentDate} </Text>
<View style={{flexDirection:'row',}}>
  <Text style={styles.timeText}>In Time: </Text>
  <Text style={styles.timeText}>{status.InTime}</Text>
</View>
<View style={{flexDirection:'row'}}>
  <Text style={styles.timeText}>Out Time: </Text>
  <Text style={styles.timeText}>{status.OutTime}</Text>
</View>
<View style={{flexDirection:'row'}}>
  <Text style={styles.timeText}>Status:</Text>
  <Text style={styles.timeText}>{status.Status}</Text>
</View>
</View>
<View style={{width:'30%', justifyContent:'flex-end', right:5,}}>
{!(status.OutTime && status.InTime) && (
<View style={styles.attendance}>
 
 
  <TouchableOpacity
    onLongPress={() => dispatch(setShowModal(true))}
    style={styles.roundButton}>
    <Text style={{ color: 'white', textAlign: 'center' }}>
      {status.Status === 'Absent' ? 'IN' : 'OUT'}
    </Text>
  </TouchableOpacity>

</View>
)}
</View>

</View>


 <Summary />


</View>

<View style={styles.bodycontainer}>

</View>
      
    
    </>
  );
};

const cardWidth = width / 2 - 150;

const styles = StyleSheet.create({
  cardRoot: {
    width: cardWidth,
    height: cardWidth * 1.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 5,
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
    borderRadius: 5,
  },


  menu_text:{
  textAlign:'center',
  color:appColors.grey2,
  fontSize:7,
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
  attendanceBar:{
    flex:0,
 
    
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignContent:'center',
    padding:5,
    
    
  

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
  
  bodycontainer:{
    flex:2, 
    padding:5,   
    justifyContent:'space-evenly',  
    alignContent:'flex-start',
    marginTop:7, 
    marginBottom:7, 
    backgroundColor:'#FFF', 
    borderRadius:13,
},
  


});
