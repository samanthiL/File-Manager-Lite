import React, { Component } from 'react';
import { View,StyleSheet, Image,Text,Linking,Platform, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Title, Card,Button } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';



const Profile = (props)=>{

    const {_id,name,position,phone,email,salary,picture} = props.route.params.item;
    console.log(_id)
    const deleteEmployee = () =>{
        fetch("http://10.0.2.2:3000/delete",{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                id : _id
            })
        }).then(res => res.json())
        .then(deleteEmp => {
            Alert.alert(`${deleteEmp.name} delete Success!`)
        }).catch(err =>{
            console.log("ERROR",err)
        })
    }
    const AlertDelete = () =>
    Alert.alert(
      "Alert Title",
      "Delete Employee?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteEmployee() }
      ],
      { cancelable: false }
    );
    const openDial = () =>{
        if(Platform.OS == "android"){
            Linking.openURL(`tel:${phone}`)
        }else{
            Linking.openURL(`telprompt:${phone}`)
        }
    }

    return(
        <View style={styles.container}>
             <LinearGradient colors={['#70B1FD', '#3b5998']}
              style={styles.linearGradient}
             />
             <View style={{alignItems:"center"}}>
                 <Image
                   source={{uri:picture}}
                   style={styles.img}
                 />
             </View>
             <View style={{alignItems:"center"}}>
                 <Title>{name}</Title>
                 <Text style={{fontSize:20,paddingBottom:10}}>{position}</Text>
             </View>

             <Card style={styles.myCard} onPress={() =>{
                    Linking.openURL(`mailto:${email}`)
             }}>
                 <View style={styles.viewCard}>
                    {/* <Icon name="envelope" style={styles.icon}/> */}
                    <Text style={styles.text}>{email}</Text>
                 </View>
             </Card>

             <Card style={styles.myCard} onPress={() => openDial()}>
                 <View style={styles.viewCard}>
                    {/* <Icon name="phone" style={styles.icon}/> */}
                    <Text style={styles.text}>{phone}</Text>
                 </View>
             </Card>

             <Card style={styles.myCard}>
                 <View style={styles.viewCard}>
                    {/* <Icon name="dollar" style={styles.icon}/> */}
                    <Text style={styles.text}>{salary}</Text>
                 </View>
             </Card>

             <View style={{flexDirection:'row',padding:10,justifyContent:'space-around'}}>
                <Button mode="contained" onPress={() => {props.navigation.navigate("Create",
                {_id,name,position,phone,email,salary,picture})}}>
                    edit-user
                </Button>
                <Button  mode="contained" onPress={() => AlertDelete()}>
                    Press me
                </Button>
             </View>
        </View>
    )
}

const styles = StyleSheet.create({
    linearGradient:{
        height:'20%'
    },
    container:{
        flex:1
    },
    img:{
        height:140,
        width:140,
        borderRadius:140/2,
        marginTop:-50
    },
    viewCard:{
       flexDirection:"row"
    },
    myCard:{
        margin:6,
        height:45
    },
    // icon:{
    //     fontSize:32,
    //     marginLeft:10,
    //     marginTop:5,
    //     color:'blue'
    // },
    text:{
        fontSize:18,
        marginLeft:8,
        marginTop:7
    }
})

export default Profile;