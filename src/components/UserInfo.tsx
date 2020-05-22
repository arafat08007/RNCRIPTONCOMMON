import React from 'react';
import { View ,StyleSheet } from 'react-native';
import { Text,Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { appColors } from '~/theme';

export default () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (


        <View style={styles.container}>
            <View style={styles.icon_box}>
            <Icon           
            reverse
                name='user'
                type='font-awesome'
                color='#f50'
                size={16}
            />
        </View>
        <View style={styles.item}>
            <Text style={{fontSize: 12, textAlign: 'left', color:appColors.grey5}}>{user?.Name}</Text>
            <Text style={{fontSize: 8, color: 'tomato'}}>{user?.Designation}</Text>
            <Text style={{display:'none'}} >{user?.Department}</Text>
        </View>

        <View style={styles.icon_box}>
        <Icon color="white" name="keyboard-arrow-down" size={16} />
        </View>

        </View>

        
  
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
 
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'baseline' // if you want to fill rows left to right
    },
    item: {
    // width: '30%' // is 50% of container width
   
    },
    icon_box:{
        width:'20%',
      alignItems:'center',
    
   

    }
  });