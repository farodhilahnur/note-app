import React, { useState, useEffect, useLayoutEffect } from 'react'
import { SafeAreaView, View, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Save from '../../components/saveNote';
import Delete from '../../components/delNote';
import ModalNotification from '../../components/Notification';
import Colors from '../../styles/colors'

export default function Notes({route,navigation}){
    const [date, setDate] = useState(new Date())
    const [note,setNote] = useState({
        title:'',
        note:'',
        date: date,
        notificationId: null
    });
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(()=>{
        if(route.params.note){
            setNote(route.params.note);
        }
    },[])

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: () => {
                return(
                    <View style={{width: 150, flexDirection:'row', justifyContent: 'space-between', marginRight: 30}}>
                        <TouchableOpacity onPress={()=>Save(note, navigation)}>
                            <Feather name="save" size={24} color="black"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)}>
                            <Feather name="bell" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>Delete(note, navigation)}>
                            <Feather name="trash" size={24} color="black"/>
                        </TouchableOpacity>
                    </View>
                )
            }  
        })
    },[navigation,note])

    return(
        <SafeAreaView style={Style.container}>
            <TextInput 
                style={Style.txtTitleNote} 
                autoFocus={true} 
                maxLength={40}
                value={note.title} 
                placeholder={'Title'}
                onChangeText={text=>setNote({ ...note, title: text })}
            >
            </TextInput>
            <ScrollView>
                <TextInput style={Style.txtInput} 
                    multiline={true} 
                    value={note.note}
                    placeholder={'Detail'}
                    onChangeText={text=>setNote({ ...note, note: text })}
                    >
                </TextInput>
            </ScrollView>
            <ModalNotification modalVisible={modalVisible} setModalVisible={setModalVisible} date={date} setDate={setDate} note={note} setNote={setNote}/>
        </SafeAreaView>
    )
}

const Style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor:Colors.NoteBackground,
        padding:20
    },
    txtInput:{
        fontSize:18
    },
    txtTitleNote:{
        width:'100%',
        padding:10,
        borderBottomWidth:0.5,
        marginBottom:20,
        fontSize:20,
        color:'#808080'
    }
});
