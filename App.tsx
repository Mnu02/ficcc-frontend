import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Home from './Home';

export default function App() {
  return (
    <>
      <Home />
      <StatusBar barStyle="dark-content" />
    </>
  );
}
