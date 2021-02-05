import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { format } from 'date-fns'

const size = 1.5

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 30 / size,
    width: 600 / size,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e8e8e8',
    margin: 10,
  },
  centerView: {
    justifyContent: 'center',
    margin: 30 / size
  },
  logo: {
    width: 200 / size,
    height: 200 / size,
  },
  name: {
    fontSize: 28 / size,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20 / size
  },
  league: {
    fontSize: 26 / size,
    textAlign: 'center'
  },
  time: {
    fontSize: 24 / size,
    textAlign: 'center'
  },
  buttonWrapper: {
    alignItems: 'center'
  },
  focusing: {
    backgroundColor: '#fddede'
  }
});

export default ({ toMatch, match, focusing, setFocusing }) => {
  const { id, start, league, homeName, homeLogo, awayName, awayLogo, source } = match || {}
  const date = new Date(parseInt(start))
  return (
    <View>
      <TouchableOpacity
        touchableHandleActivePressIn
        onFocus={() => {
          setFocusing(id)
        }}
        onPress={() => {
          toMatch(match)
        }}
      >
        <View style={{ ...style.container, ...focusing ? style.focusing : {} }}>
          <View>
            <Image style={style.logo} source={{ uri: homeLogo }} />
            <Text style={style.name}>
              {homeName}
            </Text>
          </View>
          <View style={style.centerView}>
            <View>
              <Text style={style.league}>{league}</Text>
            </View>
            <View>
              <Text style={style.time}>
                {format(date, 'p')}
              </Text>
            </View>
          </View>
          <View>
            <Image style={style.logo} source={{ uri: awayLogo }} />
            <Text style={style.name}>
              {awayName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}
