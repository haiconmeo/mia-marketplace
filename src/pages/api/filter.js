import axios from 'axios';

const BASE_API_URL = 'https://api.miart.asia';

export default async function filterHandler(req, res) {
  const {
    query: { min, max, color, category, search },
  } = req;

  // Build query parameters
  let queryParams = {};

  if (min !== undefined || max !== undefined) {
    queryParams['metadata.price'] = {
      ...(min !== undefined && { $gte: Number(min) }),
      ...(max !== undefined && { $lte: Number(max) }),
    };
  }

  if (color && color.toLowerCase() !== 'any color') {
    queryParams['metadata.color'] = color;
  }

  if (category) {
    queryParams['categories'] = category;
  }

  if (search) {
    queryParams['title'] = { $regex: search, $options: 'i' };
  }

  try {
    const response = await axios.get(`${BASE_API_URL}/products`, {
      params: queryParams,
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.log('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
