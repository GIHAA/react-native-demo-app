import React , {useState , useEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View ,TextInput, Touchable, TouchableOpacity, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from './components/Task';


export default function App() {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    getData()
  }, [3]);

  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(taskItems)
      await AsyncStorage.setItem('new', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('new')
      setTaskItems(jsonValue != null ? JSON.parse(jsonValue) : null)
      console.log(jsonValue)
    } catch(e) {
      console.log(e)
    }
  }


  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null)
    storeData()
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);  
    storeData()
  }

  return (

    <View style={styles.container}>
      {/*  */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>

        <View style={styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task key={index} text={item} />
                </TouchableOpacity>
              )
            })
          }
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TextInput style={styles.input} placeholder={'Write a task'} value = {task} onChangeText={text => setTask(text)} />

          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>

      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',

  },
  tasksWrapper:{
    paddingTop: 30,
    paddingHorizontal: 22,
    height: '100%',
  },
  sectionTitle:{
    fontSize: 24,
    fontWeight: 'bold',
  },
  items:{
    marginTop: 30,
  },
  writeTaskWrapper:{
    marginLeft: 22,
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {

  }
});
