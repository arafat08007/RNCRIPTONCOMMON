import React, { useState,useEffect } from 'react';
import { View, Picker,  Dimensions, Animated, Platform,StyleSheet,DatePickerIOS} from 'react-native';
import { Text, Icon, Button, Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '~/redux/store';
import DatePicker from 'react-native-modal-datetime-picker'
import { appColors } from '~/theme';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { getApprovalSummary } from '~/redux/approvals';

import { Dropdown } from 'react-native-material-dropdown';


import {
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native-gesture-handler';
//import DropdownMenu from 'react-native-dropdown-menu';
import { getStatusBarHeight } from 'react-native-status-bar-height';



const windowHeight = Dimensions.get('window').height;
const headerHeight =
  Platform.select({
    android: 0,
    default: 0,
  }) + getStatusBarHeight();
const touchAreaHeight = 30;
const timeBarHeight = 0;

const topOffset = headerHeight + timeBarHeight;

const height = windowHeight - topOffset;




function toString(d?: Date) {
  return d ? `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}` : '';
}

export default React.memo(() => {
  const user = useSelector((state: RootState) => state.auth.user);
  const locations = useSelector(
    (state: RootState) => state.approvals.locations,
  );
  const dispatch = useDispatch();
  const [sDate, setSDate] = useState('');
  const [eDate, setEDate] = useState('');

  const [showSPicker, setSPicker] = useState(false);
  const [showEPicker, setEPicker] = useState(false);

  const [LocId, setLocId] = useState(user?.LocId);
  const [status, setStatus] = useState('Pending');
  const [ReqNo, setReqNo] = useState('');

  var statusdata = [["Pending", "Approved", "Rejected", "NoAction","Proxy","Postponed"]]
//show hide effect
//Effect
const [showTable, setShowTable] = useState(false);
const [zIndex, setZIndex] = useState(-10);
const [scale] = useState(new Animated.Value(0.0001));
const [fade] = useState(new Animated.Value(1));
function toggleView() {
  setShowTable(!showTable);
  !showTable && setZIndex(99);
  Animated.timing(scale, {
    toValue: showTable ? 0.0001 : 1,
    duration: 500,
    useNativeDriver: true,
  }).start(() => {
    showTable && setZIndex(-10);
  });
}
useEffect(() => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(fade, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(fade, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]),
  ).start();
}, []);

const [chosenDate, setChosenDate] = useState(new Date());

let data = [{
  value: 'Pending',
}, {
  value: 'Approved',
},
{
  value:'Rejected',
},
{
  value: 'NoAction'
},
{
  value:'Proxy',
},
{
  value:'Postponed'
}
];




  return (


<>
      <TouchableWithoutFeedback
        onPress={toggleView}
        style={{
          backgroundColor: '#333',
          height: touchAreaHeight,
        }}>
        <Animated.View
          style={{
            opacity: showTable ? 1 : fade,
            transform: [
              {
                rotate: scale.interpolate({
                  inputRange: [0.0001, 1],
                  outputRange: ['0deg', '180deg'],
                }),
              },
            ],
          }}>
          <Icon color="white" name="keyboard-arrow-down" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <Animated.View
        style={{
          position: 'absolute',
          width: '100%',
          zIndex,
          height,
          top: topOffset,
          transform: [
            {
              translateY: scale.interpolate({
                inputRange: [0.0001, 1],
                outputRange: [-height / 2, 0],
              }),
            },
          ],
        }}>
        <Animated.View
          style={{
            height,
            transform: [{ scaleY: scale }],
          }}>
          <ScrollView>
            <View style={styles.tableroot}>
          
      {showSPicker && (
        

        <DatePicker
          isVisible ={true}
          date={new Date()}
          mode="date"
         
          


          onConfirm={(date) => {
            setSPicker(false);
            setSDate(toString(date) || '');
          }}
          onCancel={()=> setSPicker(false)}
        />
       
      )}
      {showEPicker && (
           <DatePicker
           isVisible ={true}
           date={new Date()}
           mode="date"
 
           onConfirm={(date) => {
             setEPicker(false);
             setEDate(toString(date) || '');
           }}
           onCancel={()=> setEPicker(false)}
         />
      )}

      <View style={{ flexDirection: 'row' , justifyContent:'space-evenly'}}>



        <View style={{ flex:1}}>

        
          <Dropdown

          containerStyle ={{width:'100%',marginBottom:5,}}
          label='Location:'
          data={locations.map((l) => ({label:l.LocName, value:l.LocId}))}
     
          selectedItemColor={'blue'}

          onChangeText={(v:any)=>{setLocId(v);}}

          // set value from state if its set
          // or use default as first value from the data
          value={LocId}
          >
          </Dropdown>




          <Picker
          style={{ width: '100%', display:'none'  }}
          itemStyle={{  color: "blue",  fontSize:12 }}
            selectedValue={LocId}
            onValueChange={(v) => {
              setLocId(v);
            }}>
            {locations.map((l) => (
              <Picker.Item key={l.LocId} value={l.LocId} label={l.LocName} />
            ))
            }
    
                

          </Picker>
        </View>
        <View style={{ flex: 1 }}>
        <Dropdown

            containerStyle ={{width:'100%',marginBottom:5,}}
            label='Status:'
            data={data}
            selectedItemColor={'blue'}
          
            onChangeText={(v)=>{setStatus(v);}}

            // set value from state if its set
            // or use default as first value from the data
            value={ status}
            >
        


        </Dropdown>

          <Picker
            style={{  width: '100%', display:'none' }}
            itemStyle={{  color: "blue",  fontSize:12 }}
            selectedValue={status}
            onValueChange={(v) => {
              setStatus(v);
            }}>
            <Picker.Item value= "Pending" label="Pending" />
            <Picker.Item value= "Approved" label="Approved" />
            <Picker.Item value= "Rejected" label="Rejected" />
            <Picker.Item value= "NoAction" label="NoAction" />
            <Picker.Item value= "Proxy"    label="Proxy" />
            <Picker.Item value= "Postponed" label="Postponed" />
          </Picker>

    

        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          marginBottom:7,
        }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginStart:5, }}
          onPress={() => setSPicker(true)}>
          <Icon
            name="calendar"
            color={appColors.grey0}
            type="material-community"
          />
          <Text>{sDate || 'From Date'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginStart:5,}}
          onPress={() => setEPicker(true)}>
          <Icon
            name="calendar"
            color={appColors.grey0}
            type="material-community"
          />
          <Text>{eDate || 'To Date'}</Text>
        </TouchableOpacity>

        <TextInput
          style={{ width: 150,marginStart:10 }}
          placeholder="#Req No"
          onChangeText={(text) => setReqNo(text)}
        />
       
      </View>
      <View style={{backgroundColor:appColors.grey2, height:2, width:'100%', marginBottom:10,}}></View>
      <Button
      title="Search"
          type="outline"
          icon={<Icon name="search" />}
          onPress={() => {
            toggleView();
            dispatch(
              getApprovalSummary({ LocId, sDate, eDate, status, ReqNo }),
            );
            
          }}
        />
   
           
            </View>
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </>


  );
});


const width = Dimensions.get('window').width;
const cardWidth = width - 10;

const styles = StyleSheet.create({
  tableroot: {
    width: cardWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',

    borderColor:'rgba(0,0,0,0.2)',

    shadowColor: "#306ae5",
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    margin: 3,
    padding:10,
    
    borderRadius: 5,
  },
  datePicker:{
    padding:10,
    width:'60%',
    zIndex:20,
    borderColor:'rgba(0,0,0,0.8)',

    shadowColor: "#306ae5",
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
});