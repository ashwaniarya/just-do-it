import React,{ Component } from 'react'
import { 
View,
Text,
TouchableOpacity,
TouchableNativeFeedback
 } from 'react-native'
class Todo extends Component{
  render(){
    console.log(this.props.data)
    return(
    <TouchableNativeFeedback 
      color="#fff0b2"
      onPress={()=>this.props.toggleComplete(this.props.id)}
      style={{padding:5,marginBottom:1,justifyContent:'center',backgroundColor:'white'}}>
      <View style={{height:60,paddingLeft:10,marginBottom:1,justifyContent:'center',backgroundColor:'white'}}>
        <Text style={this.props.data.completed?{textDecorationLine:"line-through"}:{textDecorationLine:'none'}}>{this.props.data.text}</Text>
      </View>
    </TouchableNativeFeedback>
    )
  }
}

export default Todo