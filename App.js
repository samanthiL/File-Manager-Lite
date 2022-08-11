// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import Home from './Screens/Home';
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
// <Home />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });



// import React, { createContext,useReducer } from 'react';
// import { View,StyleSheet } from 'react-native';
// import Home from './Screens/Home';
// import CreateEmployee from './Screens/CreateEmployee';
// import Profile from './Screens/Profile';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import {Provider} from 'react-redux'
// import {reducer,initState} from './reducers/reducer'

// export const MyContext = createContext()
// const Stack = createStackNavigator();
// const myOptions = {
//   title:"My Home",
//   headerTintColor:"#333",
//   headerStyle:{
//     backgroundColor:"white"
//   }
// }
// function App(){
//     return (
//       <View style={styles.container}>
//         <Stack.Navigator>
//           <Stack.Screen 
//             name="Home" 
//             component={Home} 
//             options={myOptions}
//           />
//           <Stack.Screen 
//             name="Create" 
//             component={CreateEmployee} 
//             options={{...myOptions,title:"CreateEmployee"}}
//           />
//           <Stack.Screen 
//             name="Profile" 
//             component={Profile}
//             options={{...myOptions,title:"Profile"}}
//           />
//         </Stack.Navigator>
//       </View>
//     );
//   }
//   export default () =>{
//     const [ state,dispatch] = useReducer(reducer,initState)
//     return(
//       <MyContext.Provider value ={
//         {state,dispatch}
//       }>
//         <NavigationContainer>
//           <App/>
//         </NavigationContainer>
//       </MyContext.Provider>  
//     )
//   }
// const styles = StyleSheet.create({
//   container:{
//       flex:1,
//       backgroundColor:'#ddd'
//   }
// })


// import React, { useState, useEffect } from 'react';

// import * as ImagePicker from 'expo-image-picker';
// import { Button, Image, View, Platform } from 'react-native';



// export default function GalleryComponenet() {
// 	const [image, setImage] = useState(null);
	
// 	useEffect(() => {
// 		(async () => {
// 		if (Platform.OS !== 'web') {
// 			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
// 			if (status !== 'granted') {
// 			alert('Sorry, Camera roll permissions are required to make this work!');
// 			}
// 		}
// 		})();
// 	}, []);
	
// 	const chooseImg = async () => {
// 		let result = await ImagePicker.launchImageLibraryAsync({
// 			mediaTypes: ImagePicker.MediaTypeOptions.All,
// 			aspect: [4, 3],
// 			quality: 1,			
// 			allowsEditing: true,
// 		});
	
// 		console.log(result);
	
// 		if (!result.cancelled) {
// 		   setImage(result.uri);
// 		}
// 	};
	
// 	return (
// 		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>		
// 			<Button title="Choose image from camera roll" onPress={chooseImg} />
// 			{image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
// 		</View>
// 	);
// }


import React, { useState } from 'react'
const App = () => {
const [image, setImage ] = useState("");
const [ url, setUrl ] = useState("");
const uploadImage = () => {
const data = new FormData()
data.append("file", image)

data.append("upload_preset","File Manager Lite")
data.append("cloud_name","dads")

fetch("https://api.cloudinary.com/v1_1/dads/upload",{
    method:'POST',
body: data
})
.then(resp => resp.json())
.then(data => {
setUrl(data.url)
})
.catch(err => console.log(err))
}
return (
<div>
<div>
<input type="file"  value={searchInputValue}  onChange= {(e)=> setImage(e.target.files[0])}></input>
<button onClick={uploadImage}>Upload</button>
</div>
<div>
<h1>Uploaded image will be displayed here</h1>
<img src={url}/>
</div>
</div>
)
}
export default App;
