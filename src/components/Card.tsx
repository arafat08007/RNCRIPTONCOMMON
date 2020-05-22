import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-elements';

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
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get('window').width;
const cardWidth = width / 2 - 10;

const styles = StyleSheet.create({
  cardRoot: {
    width: cardWidth,
    height: cardWidth * 0.9,
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
});

export default Card;
