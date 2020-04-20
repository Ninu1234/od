import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from '../database';

export default class HomeScreen extends Component{
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      isLoading: false,
      word  : "starting...",
      type :'',
      meaning : ""
    };
  }

  getWord=(text)=>{
    var text = text.toLowerCase()
    try{
      var word = dictionary[text]["word"]
      var type = dictionary[text]["type"]
      var meaning = dictionary[text]["meaning"]
      this.setState({
        "word" : word,
        "type" : type,
        "meaning" :meaning
      })
    }
    catch(err){
      alert("Sorry This word is not available in the dictionary")
      this.setState({
        'text':'',
        'isSearchPressed':false
      })
    }
  }

  render(){
    return(
      <View style={{flex:2, borderWidth:5}}>
        <Header
          backgroundColor={'pink'}
          centerComponent={{
            text: 'Online Dictionary',
            style: { color: 'white', fontSize:50 },
          }}
        />
        <View style={styles.inputBoxContainer}>
          <TextInput
            style={styles.inputBox}
            onChangeText={text => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word  : "starting...",
                type:'',
                meaning:''
              });
            }}
            value={this.state.text}
          />

          <TouchableOpacity
            style={styles.findButton}
            onPress={() => {
              this.setState({ isSearchPressed: true });
              this.getWord(this.state.text)
            }}>
            <Text style={styles.searchText}>FIND</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.outputBox}>
          <Text style={{fontSize:22}}>
            {
              this.state.isSearchPressed && this.state.word === "Starting..."
              ? this.state.word
              : ""
            }
          </Text>
            {
              this.state.word !== "Starting..." ?
              (
                <View style={{justifyContent:'center', marginLeft:10 }}>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                      Word :{" "}
                    </Text>
                    <Text style={{fontSize:18 }}>
                      {this.state.word}
                    </Text>
                  </View>
                  <View style={styles.detailsBox}>
                    <Text style={styles.detailsTitle}>
                      Type :{" "}
                    </Text>
                    <Text style={{fontSize:18}}>
                      {this.state.type}
                    </Text>
                  </View>
                  <View style={{flexDirection:'row',flexWrap: 'wrap'}}>
                    <Text style={styles.detailsTitle}>
                      Meaning :{" "}
                    </Text>
                    <Text style={{ fontSize:18}}>
                      {this.state.meaning}
                    </Text>
                  </View>
                </View>
              )
              :null
            }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputBoxContainer: {
    flex:4,
    alignItems:'center',
    justifyContent:'center'
  },
  inputBox: {
    width: '70%',
    alignSelf: 'center',
    height: 60,
    textAlign: 'center',
    borderWidth:5,
    fontStyle:'italic'
  },
  findButton: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderWidth: 1,
    borderRadius: 15,
    borderColor:'purple'
  },
  searchText:{
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle:'italic'
  },
  outputBox:{
    flex:2,
    alignItems:'center'
  },
  detailsBox:{
    flexDirection:'row',
    alignItems:'center'
  },
  detailsTitle:{
    color:'violet',
    fontSize:30,
    fontWeight:'bold'
  }
});
