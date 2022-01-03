import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import store from '../store'
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/reducer';
import { setBill } from '../reducer/bill';

const Wrapper = (props: { children: React.ReactElement }) => {
	const dispatch = useAppDispatch()
  useEffect(() => {
    try {
      const bills = JSON.parse(localStorage.getItem('bill') || '{}')
      dispatch(setBill(bills))
    } catch (error) {
      
    }
  }, [])
  const { children } = props;
  return children
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </Provider>
  )
}

export default MyApp
