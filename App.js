import React, { Component, useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';

export default function App() {

  const GOOGLE_MAPS_APIKEY = '';
  const [state, setState] = useState({
    pickupCords: {
      latitude: 37.3318456,
      longitude: -122.0296002,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    dropCords: {
      latitude: 37.771707,
      longitude: -122.4053769,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  })

  const mapRef = useRef()
  const { pickupCords, dropCords } = state

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} initialRegion={pickupCords}>
        <Marker
          coordinate={pickupCords}
        />
        <Marker
          coordinate={dropCords}
        />
        <MapViewDirections
          origin={pickupCords}
          destination={dropCords}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
          optimizeWaypoints={true}
          onReady={result => {
            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: 30,
                bottom: 300,
                left: 30,
                top: 100,
              }
            })
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});