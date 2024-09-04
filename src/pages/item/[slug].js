import React, { useState, useCallback } from 'react'
import cn from 'classnames'
import { useStateContext } from '../../utils/context/StateContext'
import Layout from '../../components/Layout'
import HotBid from '../../components/HotBid'
import Discover from '../../screens/Home/Discover'
import Modal from '../../components/Modal'
import OAuth from '../../components/OAuth'
import Image from '../../components/Image'
import {
  getAllDataByType,
} from '../../lib/cosmic'
import {getDataByCategory, getCategories,getDataBySlug} from '../../lib/api'
import styles from '../../styles/pages/Item.module.sass'

export async function generateMetadata({
  params,
}) {
  const slug = decodeURI(params.slug.join('/'))
  const itemInfo = await getDataBySlug(slug)
  if (!post) {
    return
  }

  return {
    title: itemInfo[0]?.title,
    description: itemInfo[0]?.metadata?.description,
    openGraph: {
      title: itemInfo[0]?.title,
      description: itemInfo[0]?.metadata?.description,
      siteName: "testy",
      locale: 'vi_VN',
      type: 'article',
      publishedTime: 'publishedAt',
      modifiedTime: 'modifiedAt',
      url: './',
      images: itemInfo[0]?.metadata?.image?.imgix_url,
    },
    twitter: {
      card: 'summary_large_image',
      title: itemInfo[0]?.title,
      description: "testy",
      images: itemInfo[0]?.metadata?.image?.imgix_url,
    },
  }
}

const Item = ({ itemInfo, categoriesGroup, navigationItems }) => {
  const { onAdd, cartItems, cosmicUser } = useStateContext()
  console.log(itemInfo)
  const [visibleAuthModal, setVisibleAuthModal] = useState(false)

  const counts = itemInfo?.[0]?.metadata?.count
    ? Array(itemInfo[0]?.metadata?.count)
      .fill(1)
      .map((_, index) => index + 1)
    : ['Not Available']
  const [option, setOption] = useState(counts[0])

  const handleAddToCart = () => {
     handleCheckout()
  }

  const handleOAuth = useCallback(
    async user => {
      !cosmicUser.hasOwnProperty('id') && setVisibleAuthModal(true)

      if (!user && !user?.hasOwnProperty('id')) return
    },
    [cosmicUser]
  )

  const handleCheckout = async () => {
    const addCart = await onAdd(itemInfo[0], option)
    console.log(cartItems)
    }
  

  return (
    
    <Layout navigationPaths={navigationItems[0]?.metadata}>
      <div className={cn('section', styles.section)}>
        <div className={cn('container', styles.container)}>
          <div className={styles.bg}>
            <div className={styles.preview}>
              <div className={styles.categories}>
                <div className={cn('status-purple', styles.category)}>
                  {itemInfo[0]?.metadata?.color}
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  size={{ width: '100%', height: '100%' }}
                  srcSet={`${itemInfo[0]?.metadata?.image?.imgix_url}`}
                  src={itemInfo[0]?.metadata?.image?.imgix_url}
                  alt="Item"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
          <div className={styles.details}>
            <h1 className={cn('h3', styles.title)}>{itemInfo[0]?.title}</h1>

            <div className={styles.info}>
              {itemInfo[0]?.metadata?.description}
            </div>
            <div className={styles.actions}>

              <div className={styles.btns}>
                {
                  itemInfo[0]?.metadata?.price > 0 ? (
                    <button
                      className={cn('button', styles.button)}
                      onClick={handleAddToCart}
                    >
                      Mua ngay
                    </button>
                  ) : (
                    <button
                      className={cn('button', styles.button)}
                      onClick={() => window.open(itemInfo[0]?.metadata?.link, '_blank')}
                    >
                      Tải xuống
                    </button>
                  )
                }
              </div>
            </div>
          </div>
        </div>
        
        <HotBid classSection="section" info={categoriesGroup['groups'][0]} />
        <Discover
          info={categoriesGroup['groups']}
          type={categoriesGroup['type']}
        />
      </div>
      <Modal
        visible={visibleAuthModal}
        onClose={() => setVisibleAuthModal(false)}
      >
        <OAuth
          className={styles.steps}
          handleOAuth={handleOAuth}
          handleClose={() => setVisibleAuthModal(false)}
        />
      </Modal>
    </Layout>
  )
}

export default Item

export async function getServerSideProps({ params }) {
  const itemInfo = await getDataBySlug(params.slug)

  const navigationItems = (await getAllDataByType('navigation')) || []
  const categoryTypes = (await getCategories()) || []
  const categoriesData = await Promise.all(
    categoryTypes?.map(category => {
      return getDataByCategory(category?.id)
    })
  )

  const categoriesGroups = categoryTypes?.map(({ id }, index) => {
    return { [id]: categoriesData[index] }
  })

  const categoriesType = categoryTypes?.reduce((arr, { title, id }) => {
    return { ...arr, [id]: title }
  }, {})

  const categoriesGroup = { groups: categoriesGroups, type: categoriesType }

  if (!itemInfo) {
    return {
      notFound: true,
    }
  }

  return {
    props: { itemInfo, navigationItems, categoriesGroup },
  }
}
