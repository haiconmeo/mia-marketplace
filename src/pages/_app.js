import { Toaster } from 'react-hot-toast'
import { StateContext } from '../utils/context/StateContext'
import { polyfillPromiseWithResolvers } from "../utils/polyfilsResolver";

import 'core-js/full/promise/with-resolvers.js';

polyfillPromiseWithResolvers();

import '../styles/app.sass'

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Toaster />
      <Component {...pageProps} />
    </StateContext>
  )
}

export default MyApp
