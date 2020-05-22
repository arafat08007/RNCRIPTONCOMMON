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
  MaterialTopTabNavigationProp<TabParamList, 'SSP'>,
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
  // console.log(status);
  return (
    <ScrollView style={styles.root}>
      <View style={styles.cardsContainer}>
        <Card
          title="Approvals"
          iconSrc={require('~/assets/approval.png')}
          onPress={() => navigation.navigate('Approval')}
        />
        <Card
          title="My Requisition"
          iconSrc={require('~/assets/myrequsition.png')}
          onPress={() => navigation.navigate('MyRequests')}
        />
        <Card
          title="Leave application"
          iconSrc={require('~/assets/leave.png')}
          onPress={() => navigation.navigate('Leave')}
        />
        <Card
          title="All requisitions"
          iconSrc={require('~/assets/allapproval.png')}
          onPress={() => navigation.navigate('Requisitions')}
        />
      </View>
    
    </ScrollView>
  );
};

const cardWidth = width / 2 - 70;

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
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardsContainer: {
    // flexShrink: 1,
    flexWrap: 'wrap',
    margin:5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor:'#f2f2f2',
    minHeight:cardWidth*2.0,
    alignContent:'center',
    padding:10,
    
  },
  menu_text:{
  textAlign:'center',
  color:appColors.grey2,
  fontSize:10,
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
    height: 100,
    width: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors?.primary,
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
    
    
  },
});
