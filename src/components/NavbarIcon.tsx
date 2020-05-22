import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { View ,StyleSheet } from 'react-native';
import { Text,Icon } from 'react-native-elements';
import { appColors } from '~/theme';
import { logout } from '~/redux/auth';


const styles = StyleSheet.create({
    container: {
      flex: 1,
 
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginEnd:10,
      alignItems: 'center' // if you want to fill rows left to right
      
    },
    item: {
    // width: '30%' // is 50% of container width
   
    },
    icon_box:{
        width:'15%',
      alignItems:'center',
    
      padding:5,
      marginEnd:10,
    
   

    }
  });

  export default () => {
    const dispatch = useDispatch();
    return (
  
  
          <View style={styles.container}>
                <View style={styles.icon_box}>
                    <Icon   
                    name="person"             
                    color="#fff" 
                    size={16}
                    />
                </View>
         
          <View style={styles.icon_box}>
            <Icon
                name="logout"
                type="antdesign"
                color="#fff"
                size={16}
            
                onPress={() => {
                dispatch(logout());
                // navigation.replace('Login');
                }}
            />
          </View>
  
          </View>
  
          
    
    );
  };