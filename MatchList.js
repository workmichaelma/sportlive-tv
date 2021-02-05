import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { map, groupBy } from 'lodash'

import Match from './Match'

const style = StyleSheet.create({
  time: {
    flex: 1,
    padding: 12,
    fontSize: 24,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 50
  }
});

export default ({ toMatch, matches }) => {
  const [focusing, setFocusing] = useState(null)
  const rows = groupBy(matches, 'start')
  return map(rows, (row, date) => {
    return (
      <View key={date} style={style.row}>
        {map(row, (match, index) => {
          if (focusing === null) {
            setFocusing(match.id)
          }
          return (
            <Match
              toMatch={toMatch}
              match={match}
              key={index}
              focusing={focusing === match.id}
              setFocusing={setFocusing}
            />
          )
        })}
      </View>
    )
  })
}
