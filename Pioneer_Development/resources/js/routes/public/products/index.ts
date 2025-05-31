import show from './show'
import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\ProductController::index
 * @see app\Http\Controllers\ProductController.php:16
 * @route /produk
 */
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '\/produk',
}

/**
 * @see \App\Http\Controllers\ProductController::index
 * @see app\Http\Controllers\ProductController.php:16
 * @route /produk
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ProductController::index
 * @see app\Http\Controllers\ProductController.php:16
 * @route /produk
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\ProductController::index
 * @see app\Http\Controllers\ProductController.php:16
 * @route /produk
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})




const products = {
    index, 
    show,
}

export default products