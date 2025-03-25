import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  SafeAreaView,
  Text,
  TextInputChangeEventData,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  getSearchProductInStock,
  getSearchProductInStockWithoutCodebar,
} from '../services/Search/products';
import ProductInterface from '../interface/product';
import { ProductItemSearch } from '../components/Cards/ProductItemSearch';
import { CustomBackButton } from '../components/Ui/CustomHeader';
import ModalBottom from '../components/Modals/ModalBottom';
import { ProductInventoryCardSkeleton } from '../components/Skeletons/ProductInventoryCardSkeleton';
import { SettingsContext } from '../context/settings/SettingsContext';
import { SearchProductScreenStyles } from '../theme/SearchProductScreenTheme';
import { useTheme } from '../context/ThemeContext';
import useErrorHandler from '../hooks/useErrorHandler';
import { AppNavigationProp } from '../interface/navigation';
import { updateCodbar } from '../services/costos';

type SearchProductScreenInterface = {
  route?: {
    params: {
      modal: boolean;
      isModal?: boolean;

      // handle if we get products with codebas or not
      withCodebar: boolean;
    };
  };
};

export const SearchProductScreen = ({ route }: SearchProductScreenInterface) => {
  const { modal, isModal, withCodebar = true } = route?.params ?? {};
  const {
    handleCodebarScannedProcces,
    codeBar,
  } = useContext(SettingsContext);
  const { theme, typeTheme } = useTheme();
  const { handleError, handleErrorCustum } = useErrorHandler();

  const navigation = useNavigation<AppNavigationProp>();
  const [productsInInventory, setProductsInInventory] = useState<ProductInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModalAdvice, setOpenModalAdvice] = useState(false);
  const [searchingProducts, setSearchingProducts] = useState(false);

  const getSearchData = async (searchTerm: string) => {
    try {
      setSearchingProducts(true);
      let products;
      if (withCodebar) {
        products = await getSearchProductInStock(searchTerm ? searchTerm : '');
      } else {
        products = await getSearchProductInStockWithoutCodebar(
          searchTerm ? searchTerm : '',
        );
      }

      if (products.error) return handleError(products.error);
      setProductsInInventory(products);
    } catch (error) {
      handleError(error, true);
    } finally {
      setSearchingProducts(false);
    }
  };

  // Crear la función debounced para evitar múltiples llamadas
  const debouncedSearch = useCallback(
    debounce((text: string) => {
      getSearchData(text);
    }, 300),
    [], // Se asegura que debounce se cree solo una vez
  );

  const renderItem = ({ item }: { item: ProductInterface }) => (
    <ProductItemSearch
      fromModal={modal ? modal : false}
      product={item}
      onClick={() => withCodebar ? navigateToProduct(item) : updateCodebar(item)}
    />
  );

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };

  const navigateToProduct = (selectedProduct: ProductInterface) => {
    if (modal) {
      if (isModal) {
        navigation?.goBack();
        navigation.navigate('[ProductDetailsPage] - inventoryDetailsScreen', {
          selectedProduct,
        });
      } else {
        navigation.navigate('[ProductDetailsPage] - inventoryDetailsScreen', {
          selectedProduct,
        });
      }
    } else {
      navigation.navigate('[ProductDetailsPage] - inventoryDetailsScreen', {
        selectedProduct,
      });
    }
  };

  const updateCodebar = async (item: ProductInterface) => {
    try {
      if (!item.Codigo || !item.Id_Marca) {
        handleErrorCustum({
          status: 400,
          Message:
            'Codigo, Id_Marca  neccesary in hanldeUpdateCodebarWithCodeFound',
          Metodo: 'B-PUT',
        });
        return;
      }

      handleCodebarScannedProcces(true);

      const response = await updateCodbar({
        codigo: item.Codigo,
        Id_Marca: item.Id_Marca,
        body: {
          CodBar: codeBar,
        },
      });

      navigation.goBack();

      if (response.error) return handleError(response.error);
    } catch (error) {
      handleError(error, true);
    } finally {
      handleCodebarScannedProcces(false);
    }
  };

  useEffect(() => {
    setOpenModalAdvice(modal ? true : false);
    getSearchData('');
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLargeTitle: modal ? false : true,
      headerTitle: 'Productos',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: theme.text_color,
      },
      headerStyle: {
        backgroundColor: theme.background_color,
      },
      headerLeft: () => <CustomBackButton navigation={navigation} />,
      headerSearchBarOptions: {
        placeholder: 'Buscar producto por nombre...',
        tintColor: theme.text_color,
        textColor: theme.text_color,
        onChangeText: (
          event: NativeSyntheticEvent<TextInputChangeEventData>,
        ) => {
          debouncedSearch(event.nativeEvent.text);
        },
      },
    });
  }, [navigation, theme, debouncedSearch]);

  if (searchingProducts) {
    return (
      <SafeAreaView
        style={SearchProductScreenStyles(theme).SearchProductScreen}>
        <View style={SearchProductScreenStyles(theme).content}>
          <Text>Buscando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return productsInInventory && productsInInventory.length > 0 ? (
    <>
      <SafeAreaView
        style={SearchProductScreenStyles(theme).SearchProductScreen}>
        <View style={SearchProductScreenStyles(theme).content}>
          <FlatList
            data={productsInInventory}
            renderItem={renderItem}
            keyExtractor={(product) => product.UniqueKey || product.Codigo}
            onEndReached={loadMoreItem}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
          />
        </View>
      </SafeAreaView>

      <ModalBottom
        visible={openModalAdvice}
        onClose={() => setOpenModalAdvice(false)}
        blurNotAvailable={true}
        blurAmount={0}>
        <View style={SearchProductScreenStyles(theme, typeTheme).searchAdvice}>
          <View
            style={SearchProductScreenStyles(theme, typeTheme).adviceHeader}>
            <Icon
              name="bulb"
              size={hp('3%')}
              color={typeTheme === 'light' ? 'red' : 'white'}
            />
            <Text
              style={SearchProductScreenStyles(theme, typeTheme).titleHeader}>
              Asignar producto
            </Text>
          </View>
          <View
            style={SearchProductScreenStyles(theme, typeTheme).adviceMessage}>
            <Text
              style={
                SearchProductScreenStyles(theme, typeTheme).adviceMessage1
              }>
              Selecciona un producto al cual podrás asignarle el código de
              barras: <Text style={{ fontWeight: 'bold' }}>{codeBar}</Text>
            </Text>
            <Text
              style={
                SearchProductScreenStyles(theme, typeTheme).adviceMessage2
              }>
              Los productos con mensaje "No tiene codigo" son elegibles por que
              aun no tienen codigo de barras.
            </Text>
          </View>
        </View>
      </ModalBottom>
    </>
  ) : (
    <SafeAreaView style={SearchProductScreenStyles(theme).SearchProductScreen}>
      <View style={SearchProductScreenStyles(theme).content}>
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductInventoryCardSkeleton key={index} />
        ))}
      </View>
    </SafeAreaView>
  );
};
