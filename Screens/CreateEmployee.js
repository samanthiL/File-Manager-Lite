import React, { useState } from 'react';
import { View,Alert,StyleSheet, Modal,ScrollView } from 'react-native';
import { TextInput,Button } from 'react-native-paper';
//  import ImagePicker from 'react-native-image-picker';

// import React, { useState, useEffect } from 'react';

import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';

 
const CreateEmployee = ({navigation,route}) =>{

    const getDetails =(type) =>{
        if(route.params){
            switch(type){
                case "name":
                    return route.params.name
                case "phone":
                    return route.params.phone
                case "email":
                    return route.params.email
                case "salary":
                    return route.params.salary
                case "picture":
                    return route.params.picture
                case "position":
                    return route.params.position
            }
        }
        return ""
    }
 	const [image, setImage] = useState(null);

    const [name ,setName] = useState(getDetails("name"))
    const [phone ,setPhone] = useState(getDetails("phone"))
    const [email ,setEmail] = useState(getDetails("email"))
    const [salary ,setSalary] = useState(getDetails("salary"))
    const [picture ,setPicture] = useState(getDetails("picture"))
    const [position ,setPosition] = useState(getDetails("position"))
    const [modal ,setModal] = useState(false)

    const _submitData = () =>{
        fetch("http://10.0.2.2:3000/send-data", {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                name : name,
                email : email,
                phone : phone,
                picture : picture,
                salary : salary,
                position : position,
            })
        }).then(res => res.json())
        .then(data =>{
            Alert.alert(`${data.name}is valid successfly!!`)
            navigation.navigate("Home")
        }).catch(err =>{
            console.log("error",err)
        })
    }

    const updateData = ()=>{
        fetch("http://10.0.2.2:3000/update", {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                id : route.params._id,
                name : name,
                email : email,
                phone : phone,
                picture : picture,
                salary : salary,
                position : position,
            })
        }).then(res => res.json())
        .then(data =>{
            Alert.alert(`${data.name}is Update successffly!!`)
            navigation.navigate("Home")
        }).catch(err =>{
            console.log("error",err)
        })
    }

    const _uploadImage = async () => {
    
        // const chooseImg = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                aspect: [4, 3],
                quality: 1,			
                allowsEditing: true,
            });
        
            console.log(result);
        
            if (!result.cancelled) {
               setImage(result.uri);
            }
            const uri = result.uri
            const type = "image/jpg"
            const name = result.fileName

            const source = {uri,type,name}
            console.log(source)
            handleUpdata(source)
        }
            // };

    
    //     const options ={
    //         title : 'Select Image',
    //         storageOptions: {
    //             skipBackup: true,
    //             path:'Image_Italy_'
    //         }
    //     }
    //     ImagePicker.launchImageLibrary(options,(response) =>{
    //         console.log('Response=',response);
    //         if(response.didCancel){
    //             console.log("User cancelled image picker");
    //         }else if(response.error){
    //             console.log("Image Picker Error",response.error);
    //         }else{
    //             const uri = response.uri
    //             const type = "image/jpg"
    //             const name = result.fileName
    //             const source = {uri,type,name}
    //             console.log(source)
    //             handleUpdata(source)
    //         }
    //     })
    // }

    const handleUpdata = (photo) => {
        const data = new FormData()
        data.append('file',photo)
        data.append("upload_preset","File Manager Lite")
        data.append("cloud_name","dads")

        fetch("https://api.cloudinary.com/v1_1/dads/upload",{
            method:'POST',
            body:data,
            headers:{
                'Accept':'application/json',
                'Content-Type':'multipart/form-data'
            }
        }).then(res => res.json())
        .then(data => {
            setPicture(data.url)
            setModal(false)
            console.log("dsssssssssssssssssssss",data)
        }).catch(err => {
            Alert.alert("Error While Uploading")
        })
    }
	
    const _takePhoto = () => {
        const options ={
            title : 'Select Image',
            storageOptions: {
                skipBackup: true,
                path:'Image_Italy_'
            }
        }
        ImagePicker.launchCamera(options,(response) =>{
            console.log('Response=',response);
            if(response.didCancel){
                console.log("User cancelled image picker");
            }else if(response.error){
                console.log("Image Picker Error",response.error);
            }else{
                const uri = response.uri
                const type = "image/jpg"
                const name = response.fileName
                const source = {uri,type,name}
                console.log(source)
                handleUpdata(source)
            }
        })
    }

    return(
        <ScrollView>
        <View style={styles.container}>
            <TextInput
                label='Name'
                style={styles.input}
                value={name}
                theme = {theme}
                mode="outlined"
                onChangeText={text => setName( text )}
            />

            <TextInput
                label='Phone'
                style={styles.input}
                value={phone}
                keyboardType="phone-pad"
                theme = {theme}
                mode="outlined"
                onChangeText={text => setPhone( text )}
            />

            <TextInput
                label='Email'
                style={styles.input}
                value={email}
                theme = {theme}
                mode="outlined"
                onChangeText={text => setEmail( text )}
            />

            <TextInput
                label='Salary'
                style={styles.input}
                value={salary}
                theme = {theme}
                mode="outlined"
                onChangeText={text => setSalary( text )}
            />

            <TextInput
                label='Position'
                style={styles.input}
                value={position}
                theme = {theme}
                mode="outlined"
                onChangeText={text => setPosition( text)}
            />


        
         <Button icon={picture == ""?"upload":"check-bold"} style={styles.input} mode="contained" onPress={() => setModal(true)}>
                Upload Image
            </Button> 

            {route.params?
                <Button icon="content-save" style={styles.input} mode="contained" onPress={() => updateData()}>
                    Update-User
                </Button>
                :
                <Button icon="content-save" style={styles.input} mode="contained" onPress={() => _submitData()}>
                    Save
                </Button>
            }
            <Modal
             animationType='slide'
             transparent={true}
             visible={modal}
             onRequestClose= {() => {setModal(false)}}
            >

                <View style={styles.modalView}>
                    <View style={styles.buttonModalView}>
                         <Button icon="camera" style={styles.input} mode="contained" onPress={() => _takePhoto()}>
                            Camera
                        </Button> 
                         <Button icon="folder-image" style={styles.input} mode="contained" onPress={() => _uploadImage()}>
                             Gellery
                         </Button>
                     </View>
                    <Button icon="cancel" style={styles.input} mode="contained" onPress={() => setModal(false)}>
                        Cancel
                    </Button>
                </View> 

            </Modal>
        </View>
        </ScrollView>
    )
}

const theme = {
    colors: {  
      primary: 'red',
    },
  };

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    input:{
        margin:6
    },
    buttonModalView:{
        flexDirection:'row',
        padding:10,
        justifyContent:'space-around',
        backgroundColor:'white',
        
    },
    modalView:{
        position:'absolute',
        bottom:2,
        width:'100%',
        height:120,
    }
})

export default CreateEmployee;