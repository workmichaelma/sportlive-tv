import React, { useState, useEffect, useMemo } from 'react'
import { StyleSheet, Text, View, Modal } from 'react-native';
import { Avatar, Button, Chip, } from 'react-native-paper'
import { Dimensions } from "react-native";
import { get } from 'lodash'
import Iframe from './Iframe'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height - 30; //full height

const getUrl = (id, subid) => {
  return `https://www.heibaizhibo.com/play-iframe/${id}#${subid}`
}

var styles = StyleSheet.create({
  closeBtn: {
    backgroundColor: 'transparent',
    color: 'black',
    width: 160,
    height: 30,
    fontSize: 20,
  },
});

const Player = ({ player, hidePlayer }) => {
  const { match, visible } = player
  const [source, setSource] = useState({})

  useEffect(() => {
    const firstSource = get(match, 'source[0]', {})
    setSource(firstSource)
  }, [match])

  const url = useMemo(() => {
    if (match.id && source.id) {
      return getUrl(match.id, source.id)
    } else {
      return false
    }
  }, [match, source])

  return (
    <Modal visible={visible} style={{ flex: 1 }}>
      <View style={{ flex: 1, width, height }}>
        {
          url && <Iframe url={url} style={{ width, height }} />
        }
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Button style={styles.closeBtn} icon="arrow-left-circle" onPress={() => { hidePlayer() }}>
            返回
          </Button>
          <Text style={{ textAlign: 'center', marginLeft: 40 }}>
            首次進來後，按一下 <Avatar.Icon size={13} icon="arrow-down-thick" /> 及 <Avatar.Icon size={13} icon="bullseye" /> 以解除靜音
          </Text>
        </View>
      </View>
    </Modal >
  );
}

export default Player
