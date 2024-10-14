
import React, { useReducer, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

function reducer(state, action) {
    switch (action.type) {
        case "Add":
            return [...state, action.payload];
        case "Remove":
            return state.filter((_, index) => index !== action.payload);
        default:
            return state;
    }
}
export default function Todo() {

    const [todos, dispatch] = useReducer(reducer, []);
    const [todo, setTodo] = useState()


    const handleChangeText = (text) => {
        setTodo(text);
    };
    function AddTodo() {
        if (todo.length > 0) {
            dispatch({ type: "Add", payload: todo });
            setTodo('');
        }
    }
  return (
    <View style={styles.container}>
        <View style={styles.AddTodoStyle}>
            <TextInput
                onChangeText={handleChangeText}
                value={todo}
                placeholder="Add new.... "
            />
            <Button title={"Add"} onPress = { AddTodo}></Button>
        </View>
        <FlatList
            data = {todos}
            keyExtractor={(item, index)  => index.toString()}
            renderItem={({item,index }) =>(
                <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => dispatch({type: "Remove", payload: index })}>
            <Text style={styles.textStyle}>{item}</Text>
            </TouchableOpacity>
            </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  AddTodoStyle:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  }, 
  textStyle: {
    fontSize: 18, // Set general text size
    color: '#000', // Optional: text color
},
});
