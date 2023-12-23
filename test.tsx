// import React, {useState} from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   useColorScheme,
//   View,
//   Image,
// } from 'react-native';
// import {
//   launchCamera,
//   launchImageLibrary,
//   ImagePickerResponse,
// } from 'react-native-image-picker';

// import {Colors} from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   const [imageUri, setImageUri] = useState<string | null>(null);
//   const [showButtons, setShowButtons] = useState(true);

//   const backgroundStyle = {
//     flex:1,
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   const handleImageUpload = () => {
//     const options = {
//       title: 'Select Image',
//       mediaType: 'photo' as const,
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };

//     launchImageLibrary(options, (response: ImagePickerResponse) => {
//       if (response.errorCode) {
//         console.error('Image picker error:', response.errorCode);
//       } else if (response.assets && response.assets[0]?.uri) {
//         setImageUri(response.assets[0].uri);
//         setShowButtons(false);
//       } else {
//         console.log('Image picker cancelled');
//       }
//     });
//   };

//   const handleTakePicture = () => {
//     const options = {
//       mediaType: 'photo' as const,
//     };

//     launchCamera(options, (response: ImagePickerResponse) => {
//       if (response.errorCode) {
//         console.error('Camera error:', response.errorCode);
//       } else if (response.assets && response.assets[0]?.uri) {
//         setImageUri(response.assets[0].uri);
//         setShowButtons(false);
//       } else {
//         console.log('Camera cancelled');
//       }
//     });
//   };

//   const handleRestart = () => {
//     setImageUri(null);
//     setShowButtons(true);
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <View style={styles.container}>
//           <Text style={styles.sectionTitle}>Hello, World!</Text>

//           {showButtons && (
//             <>
//               <TouchableOpacity
//                 onPress={handleImageUpload}
//                 style={styles.button}>
//                 <Text style={styles.buttonText}>Upload Image</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={handleTakePicture}
//                 style={styles.button}>
//                 <Text style={styles.buttonText}>Take Picture</Text>
//               </TouchableOpacity>
//             </>
//           )}

//           {imageUri && (
//             <>
//               <Image source={{uri: imageUri}} style={styles.imagePreview} />

//               <TouchableOpacity onPress={handleRestart} style={styles.button}>
//                 <Text style={styles.buttonText}>Restart</Text>
//               </TouchableOpacity>
//             </>
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 24,
//     marginTop: 32,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   button: {
//     backgroundColor: '#3498db',
//     padding: 10,
//     margin: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   imagePreview: {
//     width: 200,
//     height: 200,
//     marginTop: 20,
//   },
// });

// export default App;

// import React, {useState} from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   useColorScheme,
//   View,
//   Image,
// } from 'react-native';
// import {
//   launchImageLibrary,
//   ImagePickerResponse,
// } from 'react-native-image-picker';

// import {Colors} from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   const [imageUri, setImageUri] = useState<string | null>(null);

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   const handleImageUpload = () => {
//     const options = {
//       title: 'Select Image',
//       mediaType: 'photo' as const,
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };

//     launchImageLibrary(options, (response: ImagePickerResponse) => {
//       if (response.errorCode) {
//         console.error('Image picker error:', response.errorCode);
//       } else if (response.assets && response.assets[0]?.uri) {
//         setImageUri(response.assets[0].uri);
//       } else {
//         console.log('Image picker cancelled');
//       }
//     });
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <View style={styles.container}>
//           <Text style={styles.sectionTitle}>Hello, World!</Text>

//           <TouchableOpacity onPress={handleImageUpload} style={styles.button}>
//             <Text style={styles.buttonText}>Upload Image</Text>
//           </TouchableOpacity>

//           {imageUri && (
//             <Image source={{uri: imageUri}} style={styles.imagePreview} />
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   button: {
//     backgroundColor: '#3498db',
//     padding: 10,
//     margin: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   imagePreview: {
//     width: 200,
//     height: 200,
//     marginTop: 20,
//   },
// });

// export default App;

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <View style={styles.container}>
//           <Text style={styles.sectionTitle}>Hello, Wolrd!</Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
