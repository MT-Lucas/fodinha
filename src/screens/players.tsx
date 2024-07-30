import { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, TextInput, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import Constants from 'expo-constants';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Modal from '../components/modal';
import theme from '../themes/colors';
import Screen from '../components/screen';

const HEIGHT = Dimensions.get('screen').height;

const Players = ({ navigation }) => {
  const [list, setList] = useState([] as object[]);
  const [showModal, setShowModal] = useState(false);
  const [newPlayer, setNewPlayer] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [playerEdit, setPlayerEdit] = useState();
  const [deletePlayer, setDeletePlayer] = useState();


  const init = useCallback( async() => {
    const players = await getData();
    if (players) {
      setList(players);
    } else {
      const list = [];
      list.push(
        { id: 16, name: "Diego", selectedselected: 0, points: 0 },   { id: 6, name: "Dionisio", selectedselected: 0, points: 0 },  { id: 11, name: "Duda", selectedselected: 0, points: 0 }, 
        { id: 1, name: "Fabio", selectedselected: 0, points: 0 },   { id: 7, name: "Fabricio", selectedselected: 0, points: 0 },  { id: 12, name: "Ferreira", selectedselected: 0, points: 0 }, 
        { id: 2, name: "Gabriel", selectedselected: 0, points: 0 }, { id: 8, name: "Jonatan", selectedselected: 0, points: 0 },   { id: 13, name: "Henrique", selectedselected: 0, points: 0 }, 
        { id: 3, name: "Leoncio", selectedselected: 0, points: 0 }, { id: 9, name: "Lisandro", selectedselected: 0, points: 0 },  { id: 14, name: "Lucas", selectedselected: 0, points: 0 }, 
        { id: 4, name: "Maju", selectedselected: 0, points: 0 },    { id: 10, name: "Raquel", selectedselected: 0, points: 0 },   { id: 15, name: "Soruco", selectedselected: 0, points: 0 }, 
        { id: 5, name: "Teo", selectedselected: 0, points: 0 }
      );
      setList(list);
    }
  }, []);

  const getData = useCallback(async() => {
    try {
      // await AsyncStorage.removeItem('players');
      const jsonValue = await AsyncStorage.getItem('players');
      if (jsonValue) {
        return JSON.parse(jsonValue);
      } else {
        return null
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }, []);

  const renderItem = useCallback((item: object) => {
    return (
      <Pressable
        onPress={() => {
          item.selected = item.selected ? 0 : 1;
          setRefresh(!refresh);
        }}
        style={styles.itemContainer}> 
        <Text style={{ color: theme.white() }}>
          {item.name}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          {Boolean(item.selected) &&
            <Ionicons name="checkmark-circle-outline" size={18} color={theme.tertiaryColor()} style={{ marginRight: 16 }} />
          }
          <Pressable 
            style={{ marginRight: 16 }}
            hitSlop={10} 
            onPress={() => {
              setPlayerEdit(item.id);
              setShowModal(true);
              setNewPlayer(item.name);
            }}>
            <MaterialCommunityIcons name="pencil" size={18} color={theme.white()} />
          </Pressable>
          <Pressable 
            hitSlop={10} 
            onPress={() => {
              setDeletePlayer(item.id);
              setNewPlayer(item.name);
            }}>
            <Ionicons name="trash-outline" size={18} color={theme.primaryColor()} />
          </Pressable>
        </View>
      </Pressable>
    )
  }, [refresh]);

  const deleteFunction = useCallback(async () => {
    const _list = list;
    const index = _list.findIndex((item) => item.id === deletePlayer);
    _list.splice(index, 1);
    _list.sort((a, b) => a.name.localeCompare(b.name));
    await AsyncStorage.setItem('players', JSON.stringify(_list));
    setList(_list);
    setDeletePlayer(undefined);
    setNewPlayer('');
  }, [list, deletePlayer]);

  const renderDeleteModal = useCallback(() => {
    return(
      <View style={styles.modalContainer}>
        <TextInput
          style={styles.textInput}
          value={newPlayer}
          editable={false}
        />
        <Pressable 
          onPress={deleteFunction}
          style={styles.modalButton}> 
          <Text style={styles.modalButtonText}>
            {`Remover`} 
          </Text>
        </Pressable>
      </View>
    )
  }, [newPlayer, list, deletePlayer])

  const generateUniqueId = useCallback((list) => {
    const ids = list.map(player => player.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  }, []);

  const UpdateFunction = useCallback(async () => {
    const _list = [...list]; 
    if (playerEdit) {
      const index = _list.findIndex((item) => item.id === playerEdit);
      if (index !== -1) {
        _list[index].name = newPlayer;
      }
    } else {
      const newId = generateUniqueId(_list);
      _list.push({ id: newId, name: newPlayer, selectedselected: 0, points: 0 });
    }
    _list.sort((a, b) => a.name.localeCompare(b.name));
    await AsyncStorage.setItem('players', JSON.stringify(_list));
    setList(_list);
    setShowModal(false);
    setNewPlayer('');
    setPlayerEdit(undefined);
  }, [list, playerEdit, newPlayer]);

  const renderPlayerModal = useCallback(() => {
    return(
      <View style={styles.modalContainer}>
        <TextInput
          style={styles.textInput}
          value={newPlayer}
          autoFocus={true}
          keyboardAppearance='dark'
          onChangeText={(value) => setNewPlayer(value)}
        />
        <Pressable 
          onPress={UpdateFunction}
          style={styles.modalButton}> 
          <Text style={styles.modalButtonText}>
            {`${playerEdit ? 'Editar' : 'Adicionar'}`} 
          </Text>
        </Pressable>
      </View>
    )
  }, [newPlayer, list, playerEdit])

  const renderFootComponent = useCallback(() => {
    return (
      <Pressable 
        onPress={() => {
          setShowModal(true);
        }}
        style={styles.addPlayerButton}>
        <MaterialCommunityIcons name="plus" size={24} color={theme.white()} />
      </Pressable>
    )
  }, []);

  useEffect(() => {
    init();
  }, [])

  return (
    <Screen>
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.titleText}>
            {`Selecione os jogadores`}
          </Text>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={list}
            renderItem={({item}) => renderItem(item)}
            ListFooterComponent={renderFootComponent()}
          />
        </View>
        <View style={styles.startButtonContainer}>
          <Pressable 
            onPress={() => {
              const filteredList = list.filter((item) => { return item.selected ? true : false });
              navigation.navigate('Game', { players: filteredList });
            }}
            style={styles.startButton}> 
            <Text style={{ color: theme.white(), fontSize: 20 }}>
              {`Começar`} 
            </Text>
          </Pressable>
        </View>
      </View>
      <Modal 
        isVisible={showModal} 
        title='Digite o nome do jogador'
        onClose={() => {
          setShowModal(false);
          setNewPlayer('');
        }}>
        {renderPlayerModal()}
      </Modal>
      <Modal 
        isVisible={!isNaN(deletePlayer)} 
        title='Remover jogador'
        onClose={() => {
          setDeletePlayer(undefined);
          setNewPlayer('');
        }}>
        {renderDeleteModal()}
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    height: HEIGHT, 
    width: '100%', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingTop: Constants.statusBarHeight
  },
  titleText: {
    color: theme.white(), 
    fontSize: 25
  },
  listContainer: {
    flex: 8, 
    width: '85%', 
    backgroundColor: theme.secondaryColor(0.2), 
    borderRadius: 10, 
    borderColor: theme.secondaryColor(0.2), 
    borderWidth: 1, 
    marginBottom: 30
  },
  addPlayerButton: {
    alignSelf: 'center', 
    alignItems: 'center', 
    justifyContent: 'center', 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    marginVertical: 10, 
    backgroundColor: theme.tertiaryColor()
  },
  startButtonContainer: {
    flex: 1, 
    justifyContent: 'center', 
    marginBottom: 8
  },
  startButton: {
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
  },
  textInput: {
    backgroundColor: theme.black(), 
    width: '100%', 
    borderRadius: 8, 
    paddingHorizontal: 8, 
    color: theme.white()
  },
  modalContainer: {
    height: '100%', 
    width: '60%', 
    alignSelf: 'center', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  modalButton: {
    backgroundColor: theme.primaryColor(), 
    paddingHorizontal: 26, 
    paddingVertical: 8, 
    borderRadius: 30, 
    marginVertical: 30
  },
  modalButtonText: {
    color: theme.white(), 
    fontSize: 16
  }
});

export default Players;