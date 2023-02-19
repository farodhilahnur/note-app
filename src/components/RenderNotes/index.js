import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'
import { Feather } from '@expo/vector-icons';
import Colors from '../../styles/colors'

export default function renderNote({item, navigation}){
    return(
        <TouchableOpacity style={Style.noteArea} onPress={()=>navigation.navigate('Notes', {note: item, search: true})}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={Style.txtNoteTitle} numberOfLines={2}>{item.title}</Text>
                {item.notificationId !== null && <Feather name="bell" size={12} color="5e8fff"/>}
            </View>
            <Text style={Style.txtNote} numberOfLines={6}>{item.note}</Text>
        </TouchableOpacity>
    )
}

const width = (Dimensions.get('window').width - 60)/2
const height = (Dimensions.get('window').height - 400)/2

const Style = StyleSheet.create({
    noteArea:{
        backgroundColor: Colors.notes,
        width: width,
        height: height,
        padding: 10,
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4
    },
    txtNoteTitle:{
        color:'#000',
        fontSize:16,
        fontWeight:'bold'
    },
    txtNote:{
        color:'#000',
    }
})

