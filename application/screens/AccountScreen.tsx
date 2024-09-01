import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { ListItem } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import Avatar from "../components/Avatar";
import { getUserbyEmail } from "../api/users"

const menuItems = [
  {
    title: "Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.MESSAGES,
  },
];

function AccountScreen({ navigation }: any) {
  const { user, logOut } = useAuth();
  const [displayImage, setDisplayImage] = useState<{ url: string | null, thumbnailUrl: string | null } | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const result = await getUserbyEmail(user.email)
      setDisplayImage({ url: result.images?.url || null, thumbnailUrl: result.images?.thumbnailUrl || null })
    }
    fetchImages()
  }, [])

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.email}
          subTitle="Edit User Info"
          onPress={() => navigation.navigate(routes.USER_EDIT)}
          IconComponent={
            <Avatar
              firstName={user.name.split(" ")[0]}
              lastName={user.name.split(" ")[1] || ""}
              size={40}
              imageUrl={displayImage?.url || null}
              thumbnailUrl={displayImage?.thumbnailUrl || null}
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
