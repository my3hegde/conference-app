import React from 'react';
import { Notifications, Permissions, Constants } from 'expo';
import { Text, View, Button } from 'react-native';

const PUSH_TOKEN = 'haa_notifications';

export default class AppContainer extends React.Component {
  state = {
    notification: {},
  };

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  };

  componentDidMount() {
    this.registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = notification => {
    this.setState({ notification: notification });
  };

  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
//   sendPushNotification = async () => {
//     const message = {
//       to: YOUR_PUSH_TOKEN,
//       sound: 'default',
//       title: 'Program title',
//       body: 'The event is starting now! Assemble in the hall',
//       data: { data: 'goes here' },
//     };
//     const response = await fetch('https://exp.host/--/api/v2/push/send', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Accept-encoding': 'gzip, deflate',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(message),
//     });
//     const data = response._bodyInit;
//     console.log(`Status & Response ID-> ${data}`);
//   };


sendPushNotification = async () => {
    let localNotification = {
        title : ''
    }
    Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
};

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Origin: {this.state.notification.origin}</Text>
          <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
        </View>
        <Button
          title={'Press to Send Notification'}
          onPress={() => this.sendPushNotification()}
        />
      </View>
    );
  }
}

