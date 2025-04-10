import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  SafeAreaView,
  Text,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {debounce} from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  getSearchProductInStock,
  getSearchProductInStockWithoutCodebar,
} from '../services/Search/products';
import ProductInterface from '../interface/product';
import {ProductItemSearch} from '../components/Cards/ProductItemSearch';
import {CustomBackButton} from '../components/Ui/CustomHeader';
import ModalBottom from '../components/Modals/ModalBottom';
import {ProductInventoryCardSkeleton} from '../components/Skeletons/ProductInventoryCardSkeleton';
import {SettingsContext} from '../context/settings/SettingsContext';
import {SearchProductScreenStyles} from '../theme/SearchProductScreenTheme';
import {useTheme} from '../context/ThemeContext';
import useErrorHandler from '../hooks/useErrorHandler';
import {AppNavigationProp} from '../interface/navigation';
import {updateCodbar} from '../services/costos';
import { ErrorResponse } from '../interface/error';

type SearchProductScreenInterface = {
  route?: {
    params: {
      modal: boolean;
      isModal?: boolean;
      withCodebar: boolean;
    };
  };
};

const DEBOUNCE_DELAY = 300;
const INITIAL_PAGE = 1;
const END_REACHED_THRESHOLD = 0.5;
const MAGIC_NUMBER_ZERO = 0;
const PRODUCTS_INVENTORY_LENGTH_EMPTY = 0;

export const SearchProductScreen = ({route}: SearchProductScreenInterface) : JSX.Element => {
  const {modal, isModal, withCodebar = true} = route?.params ?? {};
  const {handleCodebarScannedProcces, codeBar} = useContext(SettingsContext);
  const {theme, typeTheme} = useTheme();
  const {handleError} = useErrorHandler();

  const navigation = useNavigation<AppNavigationProp>();
  const [productsInInventory, setProductsInInventory] = useState<ProductInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [openModalAdvice, setOpenModalAdvice] = useState(false);
  const [searchingProducts, setSearchingProducts] = useState(false);

  const getSearchData = useCallback(async (searchTerm: string): Promise<void> => {
    try {
      setSearchingProducts(true);
      let response;
      if (withCodebar) {
        response = await getSearchProductInStock(searchTerm ? searchTerm : '');
      } else {
        response = await getSearchProductInStockWithoutCodebar( searchTerm ? searchTerm : '' );
      }
      setProductsInInventory(response.products);
    } catch (error) {
      handleError(error);
    } finally {
      setSearchingProducts(false);
    }
  }, [handleError, withCodebar]);

  const debouncedSearch = useMemo(() => 
  debounce((text: string) => {
    getSearchData(text);
  }, DEBOUNCE_DELAY), 
  [getSearchData]
);


  const renderItem = ({item}: {item: ProductInterface}): JSX.Element => (
    <ProductItemSearch
      fromModal={modal ?? false}
      product={item}
      onClick={() =>
        withCodebar ? navigateToProduct(item) : updateCodebar(item)
      }
    />
  );

  const loadMoreItem = (): void => {
    setCurrentPage(currentPage + INITIAL_PAGE);
  };

  const navigateToProduct = (selectedProduct: ProductInterface): void => {
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

  const updateCodebar = async (item: ProductInterface): Promise<void> => {
    try {
      if (!item.Codigo || !item.Id_Marca) {
        const error: ErrorResponse = {
          response: {
            status: 400,
            data: {
              message: 'Codigo and Id_Marca neccesary in handleUpdateCodebar'
            }
          },
          message: 'Codigo and Id_Marca neccesary in handleUpdateCodebar'
        }
        handleError(error);
        return;
      }

      handleCodebarScannedProcces(true);

      await updateCodbar({
        codigoProps: item.Codigo,
        Id_Marca: item.Id_Marca,
        body: {
          CodBar: codeBar,
        },
      });

      navigation.goBack();

    } catch (error) {
      handleError(error);
    } finally {
      handleCodebarScannedProcces(false);
    }
  };

  useEffect(() => {
    setOpenModalAdvice(modal ?? false);
    getSearchData('');
  }, [modal, getSearchData]);

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
        ): void => {
          debouncedSearch(event.nativeEvent.text);
        },
      },
    });
  }, [navigation, theme, debouncedSearch, modal]);

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

  return productsInInventory && productsInInventory.length > PRODUCTS_INVENTORY_LENGTH_EMPTY ? (
    <>
      <SafeAreaView
        style={SearchProductScreenStyles(theme).SearchProductScreen}>
        <View style={SearchProductScreenStyles(theme).content}>
          <FlatList
            data={productsInInventory}
            renderItem={renderItem}
            keyExtractor={(product) => product.UniqueKey || product.Codigo}
            onEndReached={loadMoreItem}
            onEndReachedThreshold={END_REACHED_THRESHOLD}
            initialNumToRender={10}
          />
        </View>
      </SafeAreaView>

      <ModalBottom
        visible={openModalAdvice}
        onClose={() => setOpenModalAdvice(false)}
        blurNotAvailable={true}
        blurAmount={MAGIC_NUMBER_ZERO}>
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
          <View>
            <Text style={ SearchProductScreenStyles(theme, typeTheme).adviceMessage1}>
              Selecciona un producto al cual podrás asignarle el código de
              barras: <Text style={SearchProductScreenStyles(theme, typeTheme).adviceMessage1_bold}>{codeBar}</Text>
            </Text>
            <Text
              style={
                SearchProductScreenStyles(theme, typeTheme).adviceMessage2
              }>
              Los productos con mensaje &quot;No tiene codigo&quot; son
              elegibles porque aún no tienen código de barras.
            </Text>
          </View>
        </View>
      </ModalBottom>
    </>
  ) : (
    <SafeAreaView style={SearchProductScreenStyles(theme).SearchProductScreen}>
      <View style={SearchProductScreenStyles(theme).content}>
        {Array.from({length: 10}).map((_, index) => (
          <ProductInventoryCardSkeleton key={index} />
        ))}
      </View>
    </SafeAreaView>
  );
};
