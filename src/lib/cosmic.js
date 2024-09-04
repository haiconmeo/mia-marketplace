import { createBucketClient } from '@cosmicjs/sdk'

const cosmic = createBucketClient({
  bucketSlug: process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG,
  readKey: process.env.NEXT_PUBLIC_COSMIC_READ_KEY,
})

const is404 = error => /not found/i.test(error?.message)

// new versions
export async function getDataByCategory(id) {
 return [{
      "slug": "tam-kinh",
      "title": "Tâm kinh chữ hán",
      "metadata": {
        "image": {
          "url": "https://cdn.cosmicjs.com/a4983ad0-519d-11ef-bbaa-af49ecc8228f-20180711184235378.jpg",
          "imgix_url": "https://imgix.cosmicjs.com/a4983ad0-519d-11ef-bbaa-af49ecc8228f-20180711184235378.jpg"
        },
        "description": "Bản kinh Bát Nhã Ba La Mật Đa do Nhan Chân Khanh viết kiểu chữ Khải, nguồn: Trần Trung Kiến biên soạn, Nhà xuất bản Văn vật. Nhan Chân Khanh (709—784), tự Thanh Thần, tên hiệu là Hy Môn Tử, biệt hiệu là Ứng Phương, người Kinh Triệu Vạn Niên (nay là Tây An, Thiểm Tây), quê gốc là Lăng Nha Lâm Ấp (nay là Lâm Ấp, Sơn Đông). Cùng với Triệu Mạnh Phủ, Lưu Công Quyền, và Âu Dương Tuấn được gọi là \"Tứ đại gia chữ Khải\". Cùng với Lưu Công Quyền, Nhan Chân Khanh được gọi là \"Nhan Lưu\", và phong cách của họ được miêu tả là \"Nhan cốt Lưu gân\".",
        "price": 0,
        "count": 1000,
        "color": "Red",
        "categories": [
          {
            "id": "66ab8c04b2c7922156ac153b",
            "slug": "an-tong",
            "title": "Ấn tống",
            "content": "",
            "created_at": "2022-05-13T09:06:41.974Z",
            "modified_at": "2024-08-03T02:27:41.671Z",
            "status": "published",
            "thumbnail": "https://imgix.cosmicjs.com/409dff00-fa1b-11ec-b2b1-473235369c53-card-pic-32x.jpg",
            "published_at": "2024-08-03T02:27:41.671Z",
            "publish_at": null,
            "unpublish_at": null,
            "bucket": "66ab8c02d70e5c5cd3fa6202",
            "created_by": "66ab86e9d70e5c5cd3fa61ff",
            "modified_by": "66ab86e9d70e5c5cd3fa61ff",
            "type": "categories",
            "metadata": {
              "title": "Ấn tống",
              "description": "Ấn tống",
              "image": {
                "url": "https://cdn.cosmicjs.com/409dff00-fa1b-11ec-b2b1-473235369c53-card-pic-32x.jpg",
                "imgix_url": "https://imgix.cosmicjs.com/409dff00-fa1b-11ec-b2b1-473235369c53-card-pic-32x.jpg"
              }
            }
          }
        ],
        "link": "https://drive.google.com/drive/folders/1PzgcEaXNTuHozxLjpDo9HZerajhCtRhg?usp=sharing"
      }
    }]
  }


export async function getAllDataByType(dataType = 'categories') {
  try {
    const data = await cosmic.objects
      .find({ type: dataType })
      .props('title,slug,id,metadata')
      .depth(1)
    return data.objects
  } catch (error) {
    // Don't throw if an slug doesn't exist
    return []
  }
}

export async function getDataBySlug(slug) {
  console.log(slug)
  try {
    const data = await cosmic.objects
      .find({
        slug,
        type: 'products',
      })
      .props('title,slug,id,metadata,created_at')
      .depth(1)
    console.log(data.objects)
    return data.objects
  } catch (error) {
    // Don't throw if an slug doesn't exist
    if (is404(error)) return
    throw error
  }
}
