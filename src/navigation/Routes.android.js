import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useMemo } from 'react';
import { InitialRouteContext } from '../context/initialRoute';
import AddCashSheet from '../screens/AddCashSheet';
import AddTokenSheet from '../screens/AddTokenSheet';
import AvatarBuilder from '../screens/AvatarBuilder';
import BackupSheet from '../screens/BackupSheet';
import ChangeWalletSheet from '../screens/ChangeWalletSheet';
import DepositModal from '../screens/DepositModal';
import ExpandedAssetSheet from '../screens/ExpandedAssetSheet';
import ImportSeedPhraseSheet from '../screens/ImportSeedPhraseSheet';
import ModalScreen from '../screens/ModalScreen';
import PinAuthenticationScreen from '../screens/PinAuthenticationScreen';
import ReceiveModal from '../screens/ReceiveModal';
import RestoreSheet from '../screens/RestoreSheet';
import SavingsSheet from '../screens/SavingsSheet';
import SendSheet from '../screens/SendSheet';
import SettingsModal from '../screens/SettingsModal';
import SpeedUpAndCancelSheet from '../screens/SpeedUpAndCancelSheet';
import TransactionConfirmationScreen from '../screens/TransactionConfirmationScreen';
import WalletConnectApprovalSheet from '../screens/WalletConnectApprovalSheet';
import WalletConnectRedirectSheet from '../screens/WalletConnectRedirectSheet';
import WelcomeScreen from '../screens/WelcomeScreen';
import WithdrawModal from '../screens/WithdrawModal';
import WyreWebview from '../screens/WyreWebview';
import { SwipeNavigator } from './SwipeNavigator';
import { createBottomSheetNavigator } from './bottom-sheet';
import {
  closeKeyboardOnClose,
  defaultScreenStackOptions,
  restoreSheetConfig,
  stackNavigationConfig,
  wyreWebviewOptions,
} from './config';
import {
  bottomSheetPreset,
  emojiPreset,
  exchangePreset,
  overlayExpandedPreset,
  sheetPreset,
  sheetPresetWithSmallGestureResponseDistance,
  speedUpAndCancelStyleInterpolator,
  wcPromptPreset,
} from './effects';
import { onNavigationStateChange } from './onNavigationStateChange';
import Routes from './routesNames';
import { ExchangeModalNavigator } from './index';

const Stack = createStackNavigator();
const OuterStack = createStackNavigator();
const BSStack = createBottomSheetNavigator();

function SendFlowNavigator() {
  return (
    <Stack.Navigator
      {...stackNavigationConfig}
      initialRouteName={Routes.SEND_SHEET}
    >
      <Stack.Screen
        component={ModalScreen}
        name={Routes.MODAL_SCREEN}
        options={overlayExpandedPreset}
      />
      <Stack.Screen
        component={SendSheet}
        name={Routes.SEND_SHEET}
        options={sheetPreset}
      />
    </Stack.Navigator>
  );
}

function ImportSeedPhraseFlowNavigator() {
  return (
    <Stack.Navigator
      {...stackNavigationConfig}
      initialRouteName={Routes.IMPORT_SEED_PHRASE_SHEET}
    >
      <Stack.Screen
        component={ModalScreen}
        name={Routes.MODAL_SCREEN}
        options={overlayExpandedPreset}
      />
      <Stack.Screen
        component={ImportSeedPhraseSheet}
        name={Routes.IMPORT_SEED_PHRASE_SHEET}
        options={sheetPreset}
      />
    </Stack.Navigator>
  );
}

function AddCashFlowNavigator() {
  const { colors } = useTheme();
  const themedWyreWebviewOptions = useMemo(() => wyreWebviewOptions(colors), [
    colors,
  ]);
  return (
    <Stack.Navigator
      initialRouteName={Routes.WYRE_WEBVIEW}
      screenOptions={themedWyreWebviewOptions}
    >
      <Stack.Screen component={WyreWebview} name={Routes.WYRE_WEBVIEW} />
    </Stack.Navigator>
  );
}

function MainNavigator() {
  const initialRoute = useContext(InitialRouteContext);

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      {...stackNavigationConfig}
      screenOptions={defaultScreenStackOptions}
    >
      <Stack.Screen component={SwipeNavigator} name={Routes.SWIPE_LAYOUT} />
      <Stack.Screen
        component={AvatarBuilder}
        name={Routes.AVATAR_BUILDER}
        options={emojiPreset}
      />
      <Stack.Screen
        component={TransactionConfirmationScreen}
        name={Routes.CONFIRM_REQUEST}
        options={exchangePreset}
      />
      <Stack.Screen
        component={SpeedUpAndCancelSheet}
        name={Routes.SPEED_UP_AND_CANCEL_SHEET}
        options={{
          ...exchangePreset,
          cardStyleInterpolator: speedUpAndCancelStyleInterpolator,
        }}
      />
      <Stack.Screen
        component={ExchangeModalNavigator}
        name={Routes.EXCHANGE_MODAL}
        options={exchangePreset}
      />
      <Stack.Screen
        component={ModalScreen}
        {...closeKeyboardOnClose}
        name={Routes.MODAL_SCREEN}
        options={overlayExpandedPreset}
      />
      <Stack.Screen
        component={WalletConnectApprovalSheet}
        name={Routes.WALLET_CONNECT_APPROVAL_SHEET}
        options={wcPromptPreset}
      />
      <Stack.Screen
        component={WalletConnectRedirectSheet}
        name={Routes.WALLET_CONNECT_REDIRECT_SHEET}
        options={wcPromptPreset}
      />
      <Stack.Screen
        component={AddCashSheet}
        name={Routes.ADD_CASH_SHEET}
        options={sheetPreset}
      />
      <Stack.Screen
        component={ImportSeedPhraseSheet}
        name={Routes.IMPORT_SEED_PHRASE_SHEET}
        options={sheetPreset}
      />
      <Stack.Screen
        component={WithdrawModal}
        name={Routes.SAVINGS_WITHDRAW_MODAL}
        options={exchangePreset}
      />
      <Stack.Screen
        component={DepositModal}
        name={Routes.SAVINGS_DEPOSIT_MODAL}
        options={exchangePreset}
      />
      <Stack.Screen
        component={BackupSheet}
        name={Routes.BACKUP_SHEET}
        options={bottomSheetPreset}
      />
      <Stack.Screen
        component={RestoreSheet}
        name={Routes.RESTORE_SHEET}
        {...restoreSheetConfig}
        options={bottomSheetPreset}
      />
      <Stack.Screen
        component={ImportSeedPhraseFlowNavigator}
        name={Routes.IMPORT_SEED_PHRASE_SHEET_NAVIGATOR}
        options={sheetPresetWithSmallGestureResponseDistance}
      />
      <Stack.Screen component={WelcomeScreen} name={Routes.WELCOME_SCREEN} />
      <Stack.Screen
        component={AddCashFlowNavigator}
        name={Routes.WYRE_WEBVIEW_NAVIGATOR}
      />
    </Stack.Navigator>
  );
}

// FIXME do it in one navigator
function MainOuterNavigator() {
  return (
    <OuterStack.Navigator
      initialRouteName={Routes.MAIN_NAVIGATOR}
      {...stackNavigationConfig}
      screenOptions={defaultScreenStackOptions}
    >
      <OuterStack.Screen
        component={MainNavigator}
        name={Routes.MAIN_NAVIGATOR}
      />
      <OuterStack.Screen
        component={PinAuthenticationScreen}
        name={Routes.PIN_AUTHENTICATION_SCREEN}
        options={{ ...sheetPreset, gestureEnabled: false }}
      />
      <OuterStack.Screen
        component={BackupSheet}
        name={Routes.BACKUP_SCREEN}
        options={sheetPreset}
      />
    </OuterStack.Navigator>
  );
}

function BSNavigator() {
  return (
    <BSStack.Navigator>
      <BSStack.Screen
        component={MainOuterNavigator}
        name={Routes.MAIN_NAVIGATOR_WRAPPER}
      />
      <BSStack.Screen
        component={ExpandedAssetSheet}
        name={Routes.EXPANDED_ASSET_SCREEN}
        options={{
          backdropColor: 'black',
          backdropOpacity: 0.5,
          height: 500,
        }}
      />
      <BSStack.Screen
        component={SettingsModal}
        name={Routes.SETTINGS_MODAL}
        options={{
          backdropColor: 'black',
          backdropOpacity: 0.5,
        }}
      />
      <BSStack.Screen
        component={AddTokenSheet}
        name={Routes.ADD_TOKEN_SHEET}
        options={{
          backdropColor: 'black',
          backdropOpacity: 0.5,
          height: 450,
        }}
      />
      <BSStack.Screen
        component={SavingsSheet}
        name={Routes.SAVINGS_SHEET}
        options={{
          backdropColor: 'black',
          backdropOpacity: 0.5,
          height: 420,
        }}
      />
      <BSStack.Screen
        component={ChangeWalletSheet}
        name={Routes.CHANGE_WALLET_SHEET}
        options={{
          backdropColor: 'black',
          backdropOpacity: 0.6,
          height: 650,
        }}
      />
      <BSStack.Screen
        component={ReceiveModal}
        name={Routes.RECEIVE_MODAL}
        options={{
          backdropColor: 'black',
          backdropOpacity: 0.7,
        }}
      />
      <BSStack.Screen
        component={ExpandedAssetSheet}
        name={Routes.TOKEN_INDEX_SHEET}
        options={{
          backdropColor: 'black',
          backdropOpacity: 0.7,
          height: 400,
        }}
      />
      <BSStack.Screen
        component={SendFlowNavigator}
        name={Routes.SEND_SHEET_NAVIGATOR}
      />
      <BSStack.Screen
        component={ExpandedAssetSheet}
        name={Routes.EXPANDED_ASSET_SHEET}
        options={{
          backdropColor: 'black',
          backdropOpacity: 0.7,
          height: 600,
        }}
      />
    </BSStack.Navigator>
  );
}

const AppContainerWithAnalytics = React.forwardRef((props, ref) => (
  <NavigationContainer onStateChange={onNavigationStateChange} ref={ref}>
    <BSNavigator />
  </NavigationContainer>
));

AppContainerWithAnalytics.displayName = 'AppContainerWithAnalytics';

export default React.memo(AppContainerWithAnalytics);
