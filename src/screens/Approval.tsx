import React, { useEffect, useCallback } from 'react';
import { View, ScrollView, ActivityIndicator ,StyleSheet,} from 'react-native';
import { Text ,Icon} from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '~/redux/store';
import { getApprovalSummary, ApprovalInfo } from '~/redux/approvals';
import { appColors } from '~/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Filter from '~/components/Filter';

const ApprovalCard = ({ data }: { data: ApprovalInfo }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Requisition', { approvalInfo: data })}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 15,
  
        margin: 5,
        borderRadius:0,
      borderColor:'rgba(0,0,0,0.2)',
  
      shadowColor: "#306ae5",
      shadowOffset: {
      width: 0,
      height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  
      elevation: 5,





      }}>
      <View>
        <View
          style={{
            backgroundColor: appColors.grey5,
            height: 30,
            width: 30,
            borderRadius: 15,
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>{data.SL}</Text>
        </View>
        <Text style={{ fontSize: 18 }}>{data.RequesterName}</Text>
        <Text style={{ color: appColors.lightBlue }}>{data.RequesterDesi}</Text>
      </View>
      <View>
        <Text style={{ fontSize: 18, color: appColors.green }}>
          {data.ReqNum}
        </Text>
        <Text>{data.ReqDate}</Text>
        <Text style={{ color: appColors.red }}>{data.DocName}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const summary = useSelector((state: RootState) => state.approvals.summary);
  const loading = useSelector((state: RootState) => state.approvals.loading);
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(getApprovalSummary());
    }, [])
  )
  // useEffect(() => {
  //   dispatch(getApprovalSummary());
  // }, []);
  return (
  
    <View style={{ flex: 1 }}>

      

      <Filter />
    

      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator />
        </View>
      )}
      {summary.length === 0 && !loading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor:appColors.red,
          }}>
            
        

                <Icon
            name="warning"
            color={'red'}
            size={30}
            raised={true}
            
        />
        
          <Text style={{padding:'10%', marginTop:50, textAlign:'center', justifyContent:'center', fontSize:20, color:'white'}}>
            No Data Found</Text>
            <Text style={{justifyContent:'center', textAlign:'center', fontSize:10, color:'white'}}> Please change LOCATION or STATUS etc from the FILTER</Text>
        </View>
      )}
      <ScrollView>
        {summary.map((x) => (
          <ApprovalCard key={x.SL} data={x} />
        ))}
      </ScrollView>
    </View>
  
  );
};



const styles = StyleSheet.create({

productArea:{
  padding:10,
  backgroundColor:'#F5F5F5',
  borderRadius:3,
  borderColor:'rgba(0,0,0,0.2)',

  shadowColor: "#306ae5",
  shadowOffset: {
  width: 0,
  height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
  },
  pickerArea:{

    //alignContent:'center',
    //justifyContent:'space-evenly',
    marginTop:'1%',
    marginBottom:'2%',
    zIndex:10,
    padding:10,
    backgroundColor:'#FFF',
    borderRadius:9,
    borderColor:'rgba(0,0,0,0.2)',

    shadowColor: "#306ae5",
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    
  },
  
});