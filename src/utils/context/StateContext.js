import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
  const [navigation, setNavigation] = useState([])
  const [cosmicUser, setCosmicUser] = useState({})
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantities, setTotalQuantities] = useState(0)
  const [categories, setCategories] = useState({
    groups: [],
    types: {},
  })
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    const storedTotalPrice = localStorage.getItem('totalPrice');
    const storedTotalQuantities = localStorage.getItem('totalQuantities');

    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
    if (storedTotalPrice) {
      setTotalPrice(parseFloat(storedTotalPrice));
    }
    if (storedTotalQuantities) {
      setTotalQuantities(parseInt(storedTotalQuantities));
    }
  }, []);
  const onCategoriesChange = useCallback(content => {
    setCategories(prevFields => ({ ...prevFields, ...content }))
  }, [])

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', totalPrice.toString());
    localStorage.setItem('totalQuantities', totalQuantities.toString());
  }, [cartItems, totalPrice, totalQuantities]);

  const onAdd = (product, quantity) => {
    if (product) {
      const checkProductInCart = cartItems.find(item => item?._id === product._id)

      setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity)
  
      toast.success(`${quantity} of ${product.title} added to the cart.`, {
        position: 'bottom-right',
      })
  
      if (checkProductInCart) {
        const updatedCartItems = cartItems.map(cartProduct => {
          if (cartProduct.id === product.id)
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            }
        })
  
        setCartItems(updatedCartItems)
        return updatedCartItems
      } else {
        product.quantity = quantity
  
        setCartItems([...cartItems, { ...product }])
        return [...cartItems, { ...product }]
      }
    }

  }

  const onRemove = product => {
    foundProduct = cartItems.find(item => item._id === product._id)
    const newCartItems = cartItems.filter(item => item._id !== product._id)

    setTotalPrice(
      prevTotalPrice =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    )
    setTotalQuantities(
      prevTotalQuantities => prevTotalQuantities - foundProduct.quantity
    )
    setCartItems(newCartItems)
  }

  return (
    <Context.Provider
      value={{
        cartItems,
        totalPrice,
        totalQuantities,
        onAdd,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        categories,
        onCategoriesChange,
        navigation,
        setNavigation,
        cosmicUser,
        setCosmicUser,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
