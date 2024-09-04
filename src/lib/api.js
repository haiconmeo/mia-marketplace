import axios from 'axios';

const BASE_API_URL = 'https://api.miart.asia';

export async function getCategories() {
    const url = `${BASE_API_URL}/categories`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

export async function getDataByCategory(id) {
    const url = `${BASE_API_URL}/categories/${id}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}


export async function getDataBySlug(slug) {
    if (!slug) slug = 'ádasd'
    const url = `${BASE_API_URL}/products/${slug}`;
    console.log("vcvxcvxcvxcvxvx",url)
    try {
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json'
            }
        });

        return [response.data];
    } catch (error) {
        const url = `${BASE_API_URL}/products/ádasd`;
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json'
            }
        });

        return response.data;
    }
}

export async function getProduct() {
    const url = `${BASE_API_URL}/products`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}