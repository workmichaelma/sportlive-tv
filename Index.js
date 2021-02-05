
import React, { useRef, useState, useEffect } from 'react';
import { AppState, StyleSheet, Text, ScrollView, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import axios from 'axios';
import { isArray, isEmpty } from 'lodash'

import MatchList from './MatchList';
import Player from './Player';

const url = 'https://ds04s2074b.execute-api.ap-east-1.amazonaws.com/api/heibai'

const style = StyleSheet.create({
  alert: {
    flex: 1,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollview: {
    flex: 1,
    padding: 12,
    backgroundColor: 'white',
  },
});

const IndexPage = () => {
  const [matches, setMatches] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const appState = useRef(AppState.currentState)

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      fetchMatches()
    } else {
      setMatches([])
      setPlayer({
        visible: false,
        match: {}
      })
    }
    appState.current = nextAppState;
  };

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const [player, setPlayer] = useState({
    visible: false,
    match: {},
  })
  const fetchMatches = () => {
    setIsLoading(true)
    setMatches([])
    axios.get(url).then(({ data }) => {
      setIsLoading(false)
      if (isArray(data) && !isEmpty(data)) {
        setMatches(data)
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    fetchMatches()
  }, [])

  return (
    <PaperProvider>
      {
        isEmpty(matches) && !isLoading && (
          <View style={style.alert}>
            <Text style={{ fontSize: 24 }}>
              最近沒有比賽
            </Text>
          </View>
        )
      }
      {
        isLoading && (
          <View style={style.alert}>
            <Text style={{ fontSize: 24 }}>
              載入中...
            </Text>
          </View>
        )
      }
      <ScrollView style={style.scrollview}>
        <MatchList matches={matches} toMatch={(match) => {
          setPlayer({
            visible: true,
            match,
          })
        }} />
      </ScrollView>
      <Player hidePlayer={() => {
        setPlayer({
          visible: false,
          match: {}
        })
      }} player={player} />
    </PaperProvider>
  )
}

export default IndexPage
