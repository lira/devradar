import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

function Profile({ navigation }) {
    const githubUserame = navigation.getParam('github_username');
    return <WebView source={{ uri: `https://github.com/${githubUserame}` }} style={{ flex: 1 }} />
}

export default Profile;