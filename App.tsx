/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  // ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Icon from 'react-native-vector-icons/MaterialIcons';

import RNFS from 'react-native-fs';
//@ts-ignore
import logo from './assets/image/detectTeeth.png';

import RNFetchBlob from 'rn-fetch-blob';

import OpenCV from './src/native/OpenCV';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [showButtons, setShowButtons] = useState(true);
  const [processingResult, setProcessingResult] = useState(null);

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleImageUpload = () => {
    const options = {
      title: 'Select Image',
      mediaType: 'photo' as const,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.errorCode) {
        console.error('Image picker error:', response.errorCode);
      } else if (response.assets && response.assets[0]?.uri) {
        setImageUri(response.assets[0].uri);
        setShowButtons(false);
        // Call your OpenCV processing function here
        processImage(response.assets[0].uri);
      } else {
        console.log('Image picker cancelled');
      }
    });
  };

  const handleTakePicture = () => {
    const options = {
      mediaType: 'photo' as const,
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.errorCode) {
        console.error('Camera error:', response.errorCode);
      } else if (response.assets && response.assets[0]?.uri) {
        setImageUri(response.assets[0].uri);
        setShowButtons(false);
      } else {
        console.log('Camera cancelled');
      }
    });
  };

  const handleRestart = () => {
    setImageUri(null);
    setShowButtons(true);
  };

  const processImage = async (uri: string) => {
    try {
      OpenCV.hello(uri, (error: any, result: any) => {
        if (error) {
          console.error('Error:', error);
        } else {
          console.log('Result:', result);
        }
      });

      const base64Image = await convertUriToBase64(uri);

      // Log base64 before passing it to OpenCV
      // console.log('Base64:', base64Image.slice(0, 20));

      OpenCV.loadImageAndProcess(base64Image)
        .then((processedImageBase64: React.SetStateAction<null>) => {
          console.log('Processed Image Base64:', processedImageBase64);
          setProcessingResult(processedImageBase64);
        })
        .catch((error: any) => {
          console.error('Error:', error);
        });
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };

  // const convertUriToBase64 = async (uri: string) => {
  //   try {
  //     const readFileResponse = await RNFS.readFile(uri, 'base64');
  //     return `data:image/jpg;base64,${readFileResponse}`;
  //   } catch (error: any) {
  //     throw new Error(`Error converting URI to base64: ${error.message}`);
  //   }
  // };

  const convertUriToBase64 = async (uri: string) => {
    try {
      console.log('Converting URI to Base64:', uri);

      const response = await RNFetchBlob.fs.readFile(uri, 'base64');
      console.log(
        'Base64 String:',
        `data:image/${getFileExtension(uri)};base64,`,
      );

      return `data:image/${getFileExtension(uri)};base64,${response}`;
    } catch (error: any) {
      console.error('Error converting URI to base64:', error.message);
      throw new Error(`Error converting URI to base64: ${error.message}`);
    }
  };

  const getFileExtension = (uri: string) => {
    return uri.split('.').pop()?.toLowerCase() || '';
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        // contentInsetAdjustmentBehavior="automatic"
        style={[backgroundStyle, styles.ViewContainer]}>
        {showButtons && (
          <View style={styles.TitleContainer}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.sectionTitle}>Taper Angle Detector</Text>
          </View>
        )}

        <View style={[styles.container, {flex: 1}]}>
          {showButtons && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleImageUpload}
                style={styles.button}>
                <Icon name="upload" size={20} color="white" />
                <Text style={styles.buttonText}>Upload Image</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleTakePicture}
                style={styles.button}>
                <Icon name="camera" size={20} color="white" />
                <Text style={styles.buttonText}>Take Picture</Text>
              </TouchableOpacity>
            </View>
          )}

          {processingResult && (
            <>
              <Text style={styles.resultText}>Processed Image</Text>
              <Image
                source={{uri: processingResult}}
                style={styles.processedImage}
              />
            </>
          )}

          {imageUri && (
            <>
              <Image source={{uri: imageUri}} style={styles.imagePreview} />

              <TouchableOpacity
                onPress={handleRestart}
                style={[styles.button, {marginVertical: 20}]}>
                <Text style={styles.buttonText}>Restart</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ViewContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    // borderBlockColor: 'red',
    // borderWidth: 2,
    // borderStyle: 'solid',
    padding: 16,
  },
  TitleContainer: {
    // borderBlockColor: 'red',
    // borderWidth: 2,
    // borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 26,
    fontFamily: 'Aclonica-Regular',
    fontWeight: '600',
    marginTop: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignContent: 'center',
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  resultText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  processedImage: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});

export default App;
