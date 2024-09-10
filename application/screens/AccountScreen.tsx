import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { ListItem } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import Avatar from "../components/Avatar";
import { getUserbyId } from "../api/users"

const menuItems = [
  {
    title: "Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: "Messages",
  },
];

function AccountScreen({ navigation }: any) {
  const { user, logOut } = useAuth();
  const [newUser, setNewUser] = useState<any>(user);

  useEffect(() => {
    const fetchImages = async () => {
      const result = await getUserbyId(user._id)
      setNewUser(result)
    }
    fetchImages()
  }, [newUser])

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={newUser.name}
          subTitle="Edit User Info"
          onPress={() => navigation.navigate("User Edit")}
          IconComponent={
            <Avatar
              firstName={newUser.name.split(" ")[0]}
              lastName={newUser.name.split(" ")[1] || ""}
              size={40}
              imageUrl={newUser.images?.url || null}
              thumbnailUrl={newUser.images?.thumbnailUrl || null}
            />
          }
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <View style={styles.container}>
        <ListItem
          title="Logout"
          IconComponent={<Icon name="logout" backgroundColor="red" />}
          onPress={() => logOut()}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginTop: 20,
  },
});

export default AccountScreen;
