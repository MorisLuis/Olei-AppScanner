import React, { useContext, useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductInterface, { ProductInterfaceBag } from '../interface/product';
import { BottomNavigation } from './BottomNavigation';
import { CustomHeader } from '../components/Ui/CustomHeader';
import { CodebarUpdateNavigation } from './CodebarUpdateNavigation';
import { SettingsContext } from '../context/settings/SettingsContext';

// Screens
import { LoginScreen } from '../screens/Onboarding/LoginScreen';
import { SearchProductScreen } from '../screens/SearchProductScreen';
import { InventoryBagScreen } from '../screens/InventoryBag/InventoryBagScreen';
import { SuccesMessage } from '../screens/SuccesMessage';
import { TypeOfMovementScreen } from '../screens/TypeOfMovementScreen';
import { LoginDatabaseScreen } from '../screens/Onboarding/LoginDatabaseScreen';
import { SearchCodebarWithInput } from '../screens/Modals/SearchCodebarWithInput';
import ScannerResult from '../screens/Modals/ScannerResult';
import { StartupScreen } from '../screens/Onboarding/StartupScreen';
import { ProductDetailsPage } from '../screens/ProductDetails/ProductDetailsPage';
import { ProductsFindByCodeBar } from '../screens/Modals/ProductsFindByCodeBar';
import { AuthContext } from '../context/auth/AuthContext';
import { ConfirmationScreen } from '../screens/InventoryBag/ConfirmationScreen';
import { EditProductInBag } from '../screens/Modals/EditProductInBag';
import { SessionExpiredScreen } from '../screens/SessionExpired';
import AlmacenScreen from '../screens/Camera/AlmacenScreen';

type OptionsScreen = {
    headerBackTitle: 'Atrás',
    headerTitleAlign: 'center'
}

export type AppNavigationStackParamList = {
    // Navigation
    BottomNavigation: undefined;
    CodebarUpdateNavigation: { Codigo: string; Id_Marca: string };

    // Login
    LoginPage: undefined;
    LoginDatabaseScreen: undefined;
    StartupScreen: undefined;

    // Screens
    "[ProductDetailsPage] - inventoryDetailsScreen": {
        selectedProduct: ProductInterface;
        fromUpdateCodebar?: boolean;
        hideActions?: boolean
    };
    "[ProductDetailsPage] - productDetailsScreen": {
        selectedProduct: ProductInterface;
        fromUpdateCodebar?: boolean;
        hideActions?: boolean
    };
    bagInventoryScreen: undefined;
    confirmationScreen: undefined;
    succesMessageScreen: undefined;
    almacenScreen: {
        valueDefault?: number;
    },
    typeOfMovementScreen: undefined;
    searchProductScreen: undefined;
    sessionExpired: undefined;

    // Modal
    "[Modal] - scannerResultScreen": {
        product: ProductInterface;
        fromProductDetails?: boolean
    },
    "[Modal] - findByCodebarInputModal": undefined;
    "[Modal] - searchProductModal": {
        modal: boolean,
        isModal?: boolean
    };
    "[Modal] - productsFindByCodeBarModal": {
        products: ProductInterface[];
    };
    "[Modal] - editProductInBag": {
        product: ProductInterfaceBag
    };

};

const Stack = createNativeStackNavigator<AppNavigationStackParamList>();

export const AppNavigation = () => {
    const { handleCameraAvailable, updateBarCode } = useContext(SettingsContext);
    const { getTypeOfMovementsName } = useContext(AuthContext);

    const commonOptions: OptionsScreen = {
        headerBackTitle: 'Atrás',
        headerTitleAlign: 'center'
    };

    const stackScreens = useMemo(() => (
        <>
            <Stack.Screen
                name="StartupScreen"
                component={StartupScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="LoginDatabaseScreen"
                component={LoginDatabaseScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="LoginPage"
                component={LoginScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="sessionExpired"
                component={SessionExpiredScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BottomNavigation"
                component={BottomNavigation}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="CodebarUpdateNavigation"
                component={CodebarUpdateNavigation}
                options={{ presentation: "modal", headerShown: false }}
            />

            <Stack.Screen
                name="almacenScreen"
                component={AlmacenScreen}
                options={({ navigation }) => ({
                    header: (props) => (
                        <CustomHeader
                            {...props}
                            title="Almacen"
                            navigation={navigation}
                            back={() => navigation.goBack()}
                        />
                    )
                })}
            />

            <Stack.Screen
                name="typeOfMovementScreen"
                component={TypeOfMovementScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="bagInventoryScreen"
                component={InventoryBagScreen}
                options={({ navigation }) => ({
                    presentation: "modal",
                    header: props => (
                        <CustomHeader
                            {...props}
                            title={getTypeOfMovementsName()}
                            navigation={navigation}
                            backCustum={true}
                            back={() => {
                                navigation.goBack()
                            }}
                        />
                    )
                })}
            />

            <Stack.Screen
                name="confirmationScreen"
                component={ConfirmationScreen}
                options={({ navigation }) => ({
                    header: props => (
                        <CustomHeader
                            {...props}
                            title={"Confirmación"}
                            navigation={navigation}
                            backCustum={true}
                            secondaryDesign={true}
                            back={() => navigation.goBack()}
                        />
                    )
                })}
            />

            <Stack.Screen
                name="succesMessageScreen"
                component={SuccesMessage}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="searchProductScreen"
                component={SearchProductScreen}
                options={commonOptions}
            />


            <Stack.Screen
                name="[ProductDetailsPage] - inventoryDetailsScreen"
                component={ProductDetailsPage}
                options={({ navigation }) => ({
                    header: props => (
                        <CustomHeader
                            {...props}
                            title="Detalles de Producto"
                            navigation={navigation}
                            back={() => {
                                navigation.navigate('BottomNavigation', {
                                    screen: 'BottomNavigation - Scanner',
                                    params: { screen: '[ScannerNavigation] - inventory' },
                                });
                                updateBarCode('');
                            }}
                        />
                    )
                })}
            />

            <Stack.Screen
                name="[ProductDetailsPage] - productDetailsScreen"
                component={ProductDetailsPage}
                options={({ navigation, route }) => ({
                    presentation: "modal",
                    header: props => (
                        <CustomHeader
                            {...props}
                            title="Detalles de Producto"
                            navigation={navigation}
                            backCustum={true}
                            back={() => {
                                navigation.goBack();
                                updateBarCode('');

                                if (route.params?.selectedProduct) {
                                    setTimeout(() => {
                                        navigation.navigate('[Modal] - scannerResultScreen', { product: route.params.selectedProduct });
                                    }, 500);
                                }
                            }}
                        />
                    )
                })}
            />

            {/* modals */}
            <Stack.Screen
                name="[Modal] - scannerResultScreen"
                component={ScannerResult}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />
            <Stack.Screen
                name="[Modal] - findByCodebarInputModal"
                component={SearchCodebarWithInput}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />
            <Stack.Screen
                name="[Modal] - searchProductModal"
                component={SearchProductScreen}
                options={{
                    presentation: "modal",
                    headerTitle: "Buscar Producto",
                    ...commonOptions
                }}
                initialParams={{ isModal: true }}
            />
            <Stack.Screen
                name="[Modal] - productsFindByCodeBarModal"
                component={ProductsFindByCodeBar}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />
            <Stack.Screen
                name="[Modal] - editProductInBag"
                component={EditProductInBag}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />
        </>
    ), [handleCameraAvailable, updateBarCode]);

    return (
        <Stack.Navigator>
            {stackScreens}
        </Stack.Navigator>
    );
};
