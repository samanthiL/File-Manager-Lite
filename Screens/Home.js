import React, { useEffect,useContext } from 'react';
import { View,Text,Image,StyleSheet, FlatList } from 'react-native';
import { Card,FAB} from 'react-native-paper';
import {MyContext} from '../App'

const Home = ({navigation}) =>{
    const {state,dispatch} = useContext(MyContext)
    const {data,loading} = state
    const fetchData = () =>{
        fetch("http://10.0.2.2:3000/")
        .then(res => res.json())
        .then(results => {
            dispatch({type:"ADD_DATA",payload:results})
            dispatch({type:"SET_LOADING",payload:false})
        })
    }
    useEffect (() => {
        fetchData()
    },[])
    const renderList = ((item) => {
        return(
        <Card style={styles.myCard} onPress={() => navigation.navigate("Profile",{item})}>
            <View style={styles.cardViews}>
                <Image style={{width:80,height:80,borderRadius:50}}
                source={{uri:item.picture}}/>
                <View>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.text}>{item.position}</Text>
                </View>
            </View>
        </Card>
        )
    })
    return (
      <View style={{flex:1}}>
          {
            
            <FlatList
               data = {data}
               renderItem = {({item}) => {
                   return renderList(item)
               }}
               keyExtractor={item => item._id}
               onRefresh = {() => fetchData()}
               refreshing ={loading}
             />
          }
        
         <FAB
            style={styles.fab}
            small={false}
            icon="plus"
            theme = {{colors:{accent:'blue'}}}
            onPress={() => navigation.navigate("Create")}
        />
      </View>
    );
  }

const styles = StyleSheet.create({
    myCard:{
        margin:7
    },
    cardViews:{
        flexDirection:'row',
        backgroundColor:'#ddd'
    },
    text:{
        fontSize:20,
        marginLeft:10,
        paddingTop:5
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
})

export default Home;