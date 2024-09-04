import { createBucketClient } from '@cosmicjs/sdk'
import axios from 'axios';


export default async function createHandler(
  { body: { title, description, price, count, color, image, category_id, link } },
  res
) {
  const metadata = {
    description,
    price: Number(price),
    count: Number(count),
    color,
    image: {imgix_url: `https://imgix.cosmicjs.com/${image}`, url: `https://cdn.cosmicjs.com/${image}`},
    link: link
  }
  console.log(metadata)
  try {
    const response = await axios.post('https://api.miart.asia/products', {
      slug: title.toLowerCase().replace(/\s+/g, '-'), // Automatically generating a slug from the title
      title,
      metadata,
      category_id: category_id, // Assuming categories is the category_id
    })

    res.status(200).json(response.data)
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: error.response ? error.response.data.detail : error.message })
  }
}
