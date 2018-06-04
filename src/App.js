/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableNativeFeedback,
  Clipboard,
  ToastAndroid,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import MdIcon  from 'react-native-vector-icons/MaterialIcons'
import _ from 'lodash'
import { SwipeListView } from 'react-native-swipe-list-view';
import Todo from './component/todo'
import * as actions from './actions'
import { connect } from 'react-redux'
import shortid from 'shortid'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const primaryColor ='#ffd84f'
let todos = [
  {text:'Meeting Tomorrow'},
  {text:'Dinnar at 9:00'},
  {text:'Wake up 6:00'},
  {text:'Read Books'},
]
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      text:'',
      filter:'All',
      todos:[],
    }
    this.todolist = null
  }
  onPressAdd =()=>{
    if(this.state.text !== ""){
      let newTodo = {
        text:this.state.text,
        completed:false,
        id:shortid.generate()
      }
      this.props.createTodo(newTodo)
      this.todolist.scrollToEnd()
      this.setState({text:''})
    }
    else{
      this.showToast('Todo cannot be empty')
    }

  }

  componentDidMount(){
   // this.onSetFilter('All');
  }

  componentDidUpdate(){
    //this.onSetFilter(this.state.filter);
  }

  onPressCopyToClipboard(str){
    Clipboard.setString(str)
    this.showToast('Todo Copied')
  }

  showToast(str){
    ToastAndroid.show(str,ToastAndroid.SHORT)
  }
  onSetFilter = (filter)=>{
    let todos = null;
    if(filter === 'Incomplete'){
      todos = _.filter(this.props.todo,{completed:false})
    }
    else if(filter === "Complete"){
      todos = _.filter(this.props.todo,{completed:true})
    }
    else{
      todos = _.filter(this.props.todo) 
    }
   return todos;
  }

  renderActions(){

  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
     backgroundColor={primaryColor}
     barStyle="light-content"
     
   />
        <View style={{elevation:20}}>
          <View style={{padding:10,height:40,backgroundColor:'white',justifyContent:'center',backgroundColor:primaryColor}}>
            <Text style={{fontSize:18,fontWeight:'800'}}>JUST DO IT</Text>
          </View>
          <View style={{padding:5,flexDirection:'row',height:40,backgroundColor:primaryColor,justifyContent:'center'}}>
            <TouchableOpacity style={styles.filter} 
              onPress={()=>{
                this.setState({filter:'All'});
                }}>
            <Text style={[styles.filtertext,this.state.filter==='All'?styles.active:{}]}>All</Text></TouchableOpacity>
            <TouchableOpacity style={styles.filter} 
              onPress={()=>{
                  this.setState({filter:'Incomplete'});
                  }}>
              <Text style={[styles.filtertext,this.state.filter==='Incomplete'?styles.active:{}]}>Incompleted</Text></TouchableOpacity>
            <TouchableOpacity style={styles.filter} 
              onPress={()=>{
                  this.setState({filter:'Complete'});
                  }}>
              <Text style={[styles.filtertext,this.state.filter==='Complete'?styles.active:{}]}>Completed</Text></TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>
          <SwipeListView
              useFlatList
              data={this.onSetFilter(this.state.filter)}
              keyExtractor={(item)=>item.id}
              listViewRef={ ref => this.todolist = ref }
              renderItem={ (data, rowMap) =>(
                  <Todo toggleComplete={this.props.toggleComplete} id={data.item.id} key={data.item.id} data={data.item}/>
              )}
              renderHiddenItem={ (data, rowMap) => {

                  
                    return (<View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                    
                    <TouchableOpacity
                      onPress={()=>this.props.removeTodo(data.item.id)}
                      style={{width:50,marginBottom:1,backgroundColor:'#f1f1f1',justifyContent:'center',alignItems:'center'}}><Icon name="md-trash" size={25} color="#fc3c3c" /></TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <TouchableOpacity
                      onPress={()=>this.onPressCopyToClipboard(data.item.text)}
                      style={{width:50,marginBottom:1,backgroundColor:'#f1f1f1',justifyContent:'center',alignItems:'center'}}><MdIcon name="content-copy" size={25} color="#48a5f2" /></TouchableOpacity>
                    </View>
                </View>)
              }}
              leftOpenValue={50}
              rightOpenValue={-50}
          />
          
        </View>
        <View style={styles.footer}>
          <View style={{ flex:1}}>
            <TextInput 
              style={{ flex:1,paddingLeft:20}}
              onChangeText={text=>this.setState({text})}
              value={this.state.text}
              
              underlineColorAndroid="transparent"
              placeholder="What are you up today?"
              returnKeyType="done"
              onSubmitEditing={()=>this.onPressAdd()}
              />
          </View>
          <TouchableOpacity
            style={{ padding:10,paddingLeft:15,paddingRight:15,justifyContent:'center',alignItems:'center'}}
            onPress={()=>this.onPressAdd()}
          >
            
            <Icon name="md-add" size={25} color="grey" />
            
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#f2f2f2'
  },
  body: {
    flex:1,
    margin: 0
  },
  footer: {
    flexDirection:'row',
    height:50,
    elevation:20,
    backgroundColor:primaryColor
  },
  input:{
    borderBottomWidth:0
  },
  filter:{
    padding:5
  },
  active:{
    fontWeight:'800',
    fontSize:15
  }
  ,
  filtertext:{
    color:'rgba(45, 45, 45,0.5)'
  }
});


function mapStateToProps({todo}) {
  return {
    todo
  }
}
export default connect(mapStateToProps,{
  createTodo:actions.createTodo,
  toggleComplete:actions.toggleComplete,
  removeTodo:actions.removeTodo
})(App);

