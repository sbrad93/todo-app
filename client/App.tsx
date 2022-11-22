import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './src/config';
import React from 'react';
import  HomeScreen  from './src/screens/home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Initialize Apollo Client
const client = createApolloClient();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name=" " 
                    component={ HomeScreen } 
                    options={() => ({
                      headerStyle: {
                        backgroundColor: '#363478'
                      },
                    })} />
        </Stack.Navigator>
        </NavigationContainer>
    </ApolloProvider>
  );
}