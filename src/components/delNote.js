import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

export default async function delNote(note,navigation){
    const deleteNote =async () => {
        let data = JSON.parse(await AsyncStorage.getItem('notes'))
        for(let i = 0; i < data.length; i++) {
            if(data[i].id === note.id) {
                data.splice(i,1);
            }
        }
        if(note.notificationId !== null){
            await Notifications.cancelScheduledNotificationAsync(note.notificationId);
        }
        await AsyncStorage.setItem('notes', JSON.stringify(data));
        navigation.goBack();
    };
    if(note.id === undefined){
        Alert.alert(
            'ERROR',
            'Notes Not found',
            [
                {
                    text:'OK',
                    style:'cancel'
                }
            ]
        );
    }else{
        try{ 
            Alert.alert(
                'Are You Sure?',
                'This action will delete your note permanently!',
                [
                {
                    text: 'Delete',
                    onPress: deleteNote,
                },
                {
                    text: 'No Thanks',
                    onPress: () => console.log('No thanks'),
                },
                ],
                {
                cancelable: true,
                }
            );        
        }catch(err){
            console.log(err);
            Alert.alert(
                'ERRO',
                'Cannot delete file!',
                [
                    {
                        text:'OK',
                        style:'cancel'
                    }
                ]
            );
        }
    }
    
}