import React, { useReducer, useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Button,
  Platform,
  TouchableWithoutFeedback,
  ActivityIndicator, Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';
import { Ionicons } from '@expo/vector-icons';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    //type: FORM_INPUT_UPDATE,value: text,isValid: isValid,input: inputIdentifier(email or password),
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const dispatch = useDispatch();
  const [isHidden, setIsHidden] = useState(true);
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('Грешка', error, [{ text: 'Добре' }]);
    }
  }, [error]);

  const onToggleHiddenHandler = () => {
    setIsHidden((current) => !current);
  };

  const authHandler = async () => {
    let action;

    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(action);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff', '#f7c1e6']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Моля въведете валиден email адрес"
              onInputChange={inputChangeHandler}
              initialValue="kotka@kot.kot"
            />
            <View style={{ flexDirection: 'row' }}>
              <Input
                id="password"
                label="Парола"
                required
                minLength={5}
                autoCapitalize="none"
                errorText="Моля въведете валидна парола"
                onInputChange={inputChangeHandler}
                initialValue=""
                keyboardType={
                  !isHidden && (Platform.OS = 'android')
                    ? 'visible-password'
                    : 'default'
                }
                secureTextEntry={isHidden ? true : false}
              />
              <TouchableWithoutFeedback onPress={onToggleHiddenHandler}>
                <View style={{ justifyContent: 'center' }}>
                  <Ionicons
                    name={isHidden ? 'eye' : 'eye-off'}
                    size={19}
                    color="grey"
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primaryColor} />
              ) : (
                <Button
                  title={isSignup ? 'Създай нов' : 'Вписване'}
                  color={Colors.primaryColor}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`към ${
                  isSignup ? 'екран вписване' : 'Създаване потребител'
                } `}
                color={Colors.accentColor}
                onPress={() => {
                  setIsSignup((prevState) => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 480,
    padding: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 10,
  },
});
