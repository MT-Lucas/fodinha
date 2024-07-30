import { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import * as React from 'react';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import theme from '../themes/colors';
import Screen from '../components/screen';

const Game = ({ route }) => {
  const [players, setPlayers] = useState([] as object[]);
  const [refresh, setRefresh] = useState(false);

  const init = useCallback(() => {
    route.params.players.map(p => p.points = 0);
    setPlayers(route.params.players);
  }, []);

  const endGame = useCallback(async () => {
    const result = players.map(p => `${p.name} ${p.points}`).join('\n');
    await Clipboard.setStringAsync(result);
  }, [players])

  const renderItem = useCallback((item: object) => {
    return (
      <View
        style={styles.itemContainer}> 
        <Text style={{ color: theme.white() }}>
          {item.name}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Pressable 
            hitSlop={10}
            onPress={() => {
              if (item.points > 0) {
                item.points -= 1;
              }
              setRefresh(!refresh);
            }}>
            <MaterialCommunityIcons name="minus" size={18} color={theme.tertiaryColor()} />
          </Pressable>
          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ color: theme.white() }}>
              {item.points}
            </Text>
          </View>
          <Pressable 
            hitSlop={10}
            onPress={() => {
              item.points += 1;
              setRefresh(!refresh);
            }}>
            <MaterialCommunityIcons name="plus" size={18} color={theme.tertiaryColor()} />
          </Pressable>
        </View>
      </View>
    )
  }, [refresh]);

  useEffect(() => {
    init();
  }, [])

  return (
    <Screen>
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ color: theme.white(), fontSize: 25 }}>
            {`Jogadores`}
          </Text>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={players}
            renderItem={({item}) => renderItem(item)}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Pressable 
            onPress={endGame}
            style={styles.endButtonContainer}> 
            <Text style={{ color: theme.white(), fontSize: 20 }}>
              {`Finalizar`} 
            </Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%', 
    width: '100%', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingTop: Constants.statusBarHeight
  },
  listContainer: {
    flex: 9, 
    width: '85%', 
    backgroundColor: theme.secondaryColor(0.2), 
    borderRadius: 10, 
    marginBottom: 30
  },
  endButtonContainer: {
    backgroundColor: theme.primaryColor(), 
    paddingHorizontal: 30, 
    paddingVertical: 10, 
    borderRadius: 30
  },
  itemContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: theme.black(), 
    paddingHorizontal: 15, 
    paddingVertical: 10, 
    borderRadius: 30, 
    marginVertical: 7, 
    marginHorizontal: 10
  }
});

export default Game;