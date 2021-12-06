import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Button,
} from 'react-native';

import DefaultText from './DefaultText';

const ShoeBox = (props) => {return (    <View style={styles.mealItem}>
    <TouchableOpacity onPress={props.onSelectItem}>
      <View>
        <View style={{ ...styles.shopRow, ...styles.shopHeader }}>
          <ImageBackground
            source={{ uri: props.image }}
            style={styles.bgImage}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {props.title}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
            <DefaultText>Детайли</DefaultText>
            <DefaultText>{props.prise}</DefaultText>
            <Button onPress={onAddToCart} title={'Купи'}></Button>
        </View>
      </View>
    </TouchableOpacity>
  </View>
)};

const styles = StyleSheet.create({
  content: {},
});

export default ShoeBox;
