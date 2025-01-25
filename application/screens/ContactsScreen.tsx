import React, { useEffect, useState } from 'react';
import { View, Alert, FlatList, Linking } from 'react-native';
import * as Contacts from 'expo-contacts';
import Button from '../components/Button';
import Text from '../components/AppText';
import useApi from '../hooks/useApi';
import { getUserbyId, getUserbyPhoneNumber } from '../api/users';
import { Entry, EntrySeparator } from '../components/entries';
import Avatar from '../components/Avatar';
import useAuth from '../auth/useAuth';
import messagesApi from '../api/messages';
import colors from '../config/colors';



const ContactsScreen: React.FC = ({ navigation }: any) => {
  const [contacts, setContacts] = useState<any>([]);
  const getUsersApi = useApi(getUserbyId);
  const { user } = useAuth()
  const [userDetails, setUserDetails] = useState<{ [key: string]: any }>({});
  const [profileUser, setProfileUser] = useState<any>(user)

  const requestContactsPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    return status === 'granted';
  };

  const permissions = async () => {
    const permissionGranted = await requestContactsPermission();
    if (permissionGranted) {
      await loadContacts()

    } else {
      Alert.alert('Permission Denied', 'You need to allow access to contacts.');
    }
  };


  const loadContacts = async () => {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
    });
    if (data.length > 0) {
      const formattedContacts = data.map(contact => ({
        name: contact.name,
        email: contact.emails ? contact.emails[0].email : null,
        phoneNumber: contact.phoneNumbers ? formatPhoneNumber(contact.phoneNumbers[0].number) : null,
      })).filter(contact => contact.name && contact.name.trim() !== '')
      setContacts(formattedContacts)
      await fetchUsers(formattedContacts)
    }
  }

  const fetchUsers = async (formattedContacts: any) => {
    const phoneNumbers = new Set<string>();
    formattedContacts.forEach((contact: any) => {
      phoneNumbers.add(contact.phoneNumber);
    });
    const usersDetails: { [key: string]: any } = {};
    for (const phoneNumber of phoneNumbers) {
      const userData = await getUserbyPhoneNumber(phoneNumber);
      usersDetails[phoneNumber] = userData
    }
    setUserDetails(usersDetails);
    const updatedContacts = formattedContacts.map((contact: any) => ({
      ...contact,
      _id: usersDetails[contact.phoneNumber]?._id || "",
      images:
      {
        url: usersDetails[contact.phoneNumber].images?.url || "",
        thumbnailUrl: usersDetails[contact.phoneNumber]?.images?.thumbnailUrl || "",
      }
    }));
    setContacts(updatedContacts)
    const userData = await getUserbyId(user._id);
    setProfileUser(userData)
  }



  useEffect(() => {
    permissions()
  }, []);

  function formatPhoneNumber(phone: any) {
    const cleaned = phone?.replace(/\D/g, '') || ''
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned?.length === 11 && cleaned.startsWith('1')) {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    } return phone;
  }

  const sendText = async (item: any) => {
    try {
      await Linking.openURL(`sms:${item.phoneNumber.replace(/\D/g, '')}?body=${encodeURIComponent(`
Join me on an exciting new app where we can share and discover amazing rentals together. 
It's a fantastic way to learn new dishes and connect over our love for cooking!

Here’s how to get started:

Download Expo Go:

If you haven't already, download the Expo Go app:
- For iOS: [Download Expo Go]
(https://apps.apple.com/app/expo-go/id982107777)
- For Android: [Download Expo Go]
(https://play.google.com/store/apps/details?id=host.exp.exponent)

Join Our App:

Once you have Expo Go, open the app and scan this link to access our rental-sharing platform:
          
exp://192.168.1.6:8081

About the App: Our app allows users to easily share their favorite rentals, explore new culinary ideas, 
and connect with fellow food enthusiasts.
        `)}`)
    } catch (error) {
      console.error("Failed to open SMS app:", error);
      Alert.alert("Error", "Could not open the SMS app.");
    }
  }

  return (
    <View>
      {(getUsersApi.error || contacts ? contacts.length === 0 : null) && (
        <Text style={{ marginVertical: 15 }}>{getUsersApi.error ? "Temporarily encountering issues." : "No contacts found."}</Text>
      )}
      {contacts.length > 0 && <Text style={{ padding: 15, color: colors.primary, fontWeight: 'bold' }}>Select friends to invite to ShareIt:</Text>}
      <FlatList
        data={contacts.sort((a: any, b: any) => {
          const aName = a.name ? a.name[0] : ''
          const bName = b.name ? b.name[0] : ''
          return aName.localeCompare(bName)
        }).sort((a: any, b: any) => {
          return b._id?.localeCompare(a._id) || a
        })}
        keyExtractor={(contact) => `${contact?.phoneNumber || null}`}
        renderItem={({ item }) => {
          return (
            <Entry
              title={item.name}
              subTitle={item?.phoneNumber || null}
              IconComponent={
                <Avatar
                  firstName={item.name?.split(" ")[0] || null}
                  lastName={item.name?.split(" ")[1] || "" || null}
                  size={55}
                  imageUrl={item.images?.url || null}
                  thumbnailUrl={item.images?.thumbnailUrl || null}
                />}
              onPress={item._id ? async () => {
                navigation.navigate(
                  'Users Rentals',
                  { userId: item._id })
              } : item.phoneNumber ? () => sendText(item) : () => null}
              icon2={item._id ? "email" : null}
              icon2Function={async () => {
                const result = await messagesApi.sendMessage(null, user._id, item._id, null, null) as any;
                if (!result.ok) {
                  return Alert.alert("Error", "Could not send the message.")
                }
                navigation.navigate(
                  "Chat", { ...result.data } as any,
                )
              }}
              icon3={"message-outline"}
              icon3Color={item._id ? "green" : null}
              icon3Function={item._id ? null : () => {
                sendText(item)
              }} />)
        }}
        ItemSeparatorComponent={EntrySeparator} />
      <View style={{ padding: 15, marginHorizontal: 10 }}>
        <Button title="Reload Contacts" onPress={loadContacts} />
      </View></View>)
}
export default ContactsScreen
